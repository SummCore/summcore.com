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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Required fields
    $businessName = htmlspecialchars(trim($_POST['business_name'] ?? ''));
    $website = htmlspecialchars(trim($_POST['website'] ?? ''));
    $yourName = htmlspecialchars(trim($_POST['your_name'] ?? ''));
    $email = trim($_POST['email'] ?? '');
    $needs = htmlspecialchars(trim($_POST['needs'] ?? ''));

    // Optional field
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : 'Not provided';

    // Check required fields are not empty
    if (empty($businessName) || empty($yourName) || empty($email) || empty($needs)) {
        echo "Error: Please fill in all required fields.";
        exit();
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Error: Please provide a valid email address.";
        exit();
    }
    $email = htmlspecialchars($email);

    // Sanitise inputs for email header injection (strip newlines)
    $yourName = str_replace(["\r", "\n", "\t"], '', $yourName);
    $email = str_replace(["\r", "\n", "\t"], '', $email);

    // Record this submission for rate limiting
    $_SESSION[$rate_key][] = time();

    // Email settings
    $to = "info@summcore.com";
    // Determine submission type from business_name field
    $isWidget = ($businessName === 'Quick Feedback Widget');
    $isSurvey = ($businessName === 'Feedback Survey');
    $isDiscovery = ($businessName === 'Customer Discovery Survey');
    $isFeedback = $isWidget || $isSurvey || $isDiscovery;

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
    $headers .= "Reply-To: " . $yourName . " <" . $email . ">\r\n";
    $headers .= "Return-Path: info@summcore.com\r\n";
    $headers .= "X-Mailer: SummCore Website\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    // Try to send email
    $mail_sent = mail($to, $subject, $body, $headers);

    if ($mail_sent) {
        header("Location: thank-you.html");
        exit();
    } else {
        echo "Error: Email could not be sent. Please try again or contact us directly at info@summcore.com";
    }
} else {
    echo "Invalid request.";
}
?>
