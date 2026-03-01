<?php
// Production: log errors to file, never display to users
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Simple rate limiting: max 5 submissions per 15 minutes per IP
session_start();
$rate_key = 'form_submissions_' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (!isset($_SESSION[$rate_key])) $_SESSION[$rate_key] = [];
$_SESSION[$rate_key] = array_filter($_SESSION[$rate_key], function($t) { return $t > time() - 900; });
if (count($_SESSION[$rate_key]) >= 5) {
    http_response_code(429);
    echo "Too many requests. Please try again in a few minutes.";
    exit();
}

// ── Local submission log ──────────────────────────────────────────────────────
// Appends each submission as a JSON line to data/submissions.json.
// Readable via /admin/index.php (password-protected).
define('DATA_FILE', __DIR__ . '/data/submissions.json');

function log_submission(string $type, array $fields): void {
    $dir = dirname(DATA_FILE);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    $entry = array_merge(['id' => uniqid('sc_', true), 'timestamp' => date('Y-m-d H:i:s'), 'type' => $type], $fields);
    file_put_contents(DATA_FILE, json_encode($entry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}
// ─────────────────────────────────────────────────────────────────────────────

// ── Boost dashboard integration ──────────────────────────────────────────────
// Posts data to the Boost admin dashboard (server-to-server, no CORS issues).
// Failures are silent — email delivery is the primary notification path.
define('BOOST_API_BASE', 'https://boost.summcore.com/api/boost');
define('BOOST_API_KEY',  getenv('WEBSITE_API_KEY') ?: '');

function boost_post(string $endpoint, array $data): void {
    $ch = curl_init(BOOST_API_BASE . $endpoint);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($data),
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Accept: application/json',
            'X-Api-Key: ' . BOOST_API_KEY,
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 5,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    curl_exec($ch);
    curl_close($ch);
}
// ─────────────────────────────────────────────────────────────────────────────

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Required fields
    $businessName = htmlspecialchars(trim($_POST['business_name'] ?? ''));
    $website = htmlspecialchars(trim($_POST['website'] ?? ''));
    $yourName = htmlspecialchars(trim($_POST['your_name'] ?? ''));
    $email = trim($_POST['email'] ?? '');
    $needs = htmlspecialchars(trim($_POST['needs'] ?? ''));

    // Optional field
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : 'Not provided';

    // Email is optional for feedback submissions
    $isFeedbackEarly = in_array(trim($_POST['business_name'] ?? ''), [
        'Quick Feedback Widget', 'Feedback Survey', 'Customer Discovery Survey',
    ]);

    // Check required fields are not empty
    if (empty($businessName) || empty($yourName) || (!$isFeedbackEarly && empty($email)) || empty($needs)) {
        echo "Error: Please fill in all required fields.";
        exit();
    }

    // Validate email format (only if provided)
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Error: Please provide a valid email address.";
        exit();
    }
    if (!empty($email)) {
        $email = htmlspecialchars($email);
    }

    // Sanitise inputs for email header injection (strip newlines)
    $yourName = str_replace(["\r", "\n", "\t"], '', $yourName);
    $email = str_replace(["\r", "\n", "\t"], '', $email);

    // Record this submission for rate limiting
    $_SESSION[$rate_key][] = time();

    // Determine submission type from business_name field
    $isWidget    = ($businessName === 'Quick Feedback Widget');
    $isSurvey    = ($businessName === 'Feedback Survey');
    $isDiscovery = ($businessName === 'Customer Discovery Survey');
    $isFeedback  = $isWidget || $isSurvey || $isDiscovery;
    $subType     = $isWidget ? 'widget' : ($isSurvey ? 'survey' : ($isDiscovery ? 'discovery' : 'consultation'));

    // Log to local dashboard
    log_submission($subType, [
        'name'    => $yourName,
        'email'   => $email,
        'company' => ($businessName && !$isFeedback) ? $businessName : null,
        'website' => $website ?: null,
        'phone'   => ($phone !== 'Not provided') ? $phone : null,
        'message' => mb_substr($needs, 0, 5000),
    ]);

    // Email settings
    $to = "info@summcore.com";

    if ($isWidget) {
        $subject = "[SummCore] Quick Feedback - " . mb_substr($yourName, 0, 50);
    } elseif ($isSurvey) {
        $subject = "[SummCore] Feedback Survey - " . mb_substr($yourName, 0, 50);
    } elseif ($isDiscovery) {
        $subject = "[SummCore] Customer Discovery - " . mb_substr($yourName, 0, 50);
    } else {
        $subject = "[SummCore] New Consultation Request - " . mb_substr($yourName, 0, 50);
    }

    if ($isFeedback) {
        $body = "SUMMCORE FEEDBACK\n";
        $body .= "================================\n\n";
    } else {
        $body = "SUMMCORE CONSULTATION REQUEST\n";
        $body .= "================================\n\n";
        $body .= "A new consultation request has been submitted through your website.\n\n";
    }
    $body .= "CLIENT DETAILS:\n";
    $body .= "Business Name: $businessName\n";
    $body .= "Website: " . ($website ? $website : 'Not provided') . "\n";
    $body .= "Contact Name: $yourName\n";
    $body .= "Phone: $phone\n";
    $body .= "Email: $email\n\n";
    $body .= "PROJECT REQUIREMENTS:\n";
    $body .= "------------------------\n";
    $body .= "$needs\n\n";
    $body .= "================================\n";
    $body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    $body .= "Source: SummCore Website Contact Form";

    // Enhanced headers to avoid spam filters
    $headers = "From: SummCore Contact Form <info@summcore.com>\r\n";
    if ($email) {
        $headers .= "Reply-To: " . $yourName . " <" . $email . ">\r\n";
    }
    $headers .= "Return-Path: info@summcore.com\r\n";
    $headers .= "X-Mailer: SummCore Website\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    // ── Thank-you email to the submitter ─────────────────────────────────────
    $reply_sent = false;
    $cleanEmail = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
    if ($cleanEmail) {
        if ($isFeedback) {
            $reply_subject = "Thank you for your feedback — SummCore";
            $reply_body    = "Hi $yourName,\n\n";
            $reply_body   .= "Thank you for taking the time to share your feedback with us.\n\n";
            $reply_body   .= "We read every response and use it to improve SummCore for businesses like yours.\n\n";
            $reply_body   .= "If you'd like to chat or have any questions, feel free to reply to this email.\n\n";
            $reply_body   .= "Best regards,\n";
            $reply_body   .= "The SummCore Team\n";
            $reply_body   .= "info@summcore.com\n";
            $reply_body   .= "https://summcore.com";
        } else {
            $reply_subject = "We've received your request — SummCore";
            $reply_body    = "Hi $yourName,\n\n";
            $reply_body   .= "Thank you for reaching out to SummCore!\n\n";
            $reply_body   .= "We've received your consultation request and will be in touch with you shortly to discuss how we can help your business.\n\n";
            $reply_body   .= "In the meantime, if you have any questions, just reply to this email.\n\n";
            $reply_body   .= "Best regards,\n";
            $reply_body   .= "The SummCore Team\n";
            $reply_body   .= "info@summcore.com\n";
            $reply_body   .= "https://summcore.com";
        }
        $reply_headers  = "From: SummCore <info@summcore.com>\r\n";
        $reply_headers .= "Reply-To: SummCore <info@summcore.com>\r\n";
        $reply_headers .= "Return-Path: info@summcore.com\r\n";
        $reply_headers .= "X-Mailer: SummCore Website\r\n";
        $reply_headers .= "MIME-Version: 1.0\r\n";
        $reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $reply_headers .= "Content-Transfer-Encoding: 8bit\r\n";
        $reply_sent = mail($cleanEmail, $reply_subject, $reply_body, $reply_headers);
    }

    // Note thank-you status in notification email
    $body .= "\nThank-you email: " . ($reply_sent ? "Sent to $email" : ($cleanEmail ? "Failed to send to $email" : "Not sent (no valid email)"));

    // Try to send notification email to SummCore
    $mail_sent = mail($to, $subject, $body, $headers);

    // ── Post to Boost dashboard (fire-and-forget, non-blocking) ──────────────
    if ($isWidget) {
        // Feedback widget → Landing Page Feedback section in dashboard
        boost_post('/landing-survey', [
            'rating'               => isset($_POST['rating']) ? (int)$_POST['rating'] : null,
            'improvement_feedback' => mb_substr($needs, 0, 2000),
            'email'                => filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : null,
        ]);
    } elseif (!$isFeedback) {
        // Consultation form → Website Enquiries section in dashboard
        boost_post('/website-enquiry', [
            'name'    => $yourName,
            'email'   => $email,
            'company' => $businessName !== 'Quick Feedback Widget' ? $businessName : null,
            'website' => $website ?: null,
            'phone'   => $phone !== 'Not provided' ? $phone : null,
            'message' => mb_substr($needs, 0, 5000),
            'source'  => 'consultation',
        ]);
    }
    // ─────────────────────────────────────────────────────────────────────────

    if ($mail_sent) {
        header("Location: thank-you.html?email=" . urlencode($email));
        exit();
    } else {
        echo "Error: Email could not be sent. Please try again or contact us directly at info@summcore.com";
    }
} else {
    echo "Invalid request.";
}
?>
