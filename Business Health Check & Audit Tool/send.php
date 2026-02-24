<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Required fields
    $businessName = htmlspecialchars(trim($_POST['business_name']));
    $website = htmlspecialchars(trim($_POST['website']));
    $yourName = htmlspecialchars(trim($_POST['your_name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $needs = htmlspecialchars(trim($_POST['needs']));

    // Optional field
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : 'Not provided';

    // Check required fields are not empty (website is now optional)
    if (empty($businessName) || empty($yourName) || empty($email) || empty($needs)) {
        echo "Error: Please fill in all required fields.";
        exit();
    }

    // Email settings
    $to = "info@summcore.com";
    $subject = "[SummCore] Business Health Check Consultation - $yourName";
    $body = "SUMMCORE BUSINESS HEALTH CHECK REQUEST\n";
    $body .= "=====================================\n\n";
    $body .= "A new Business Health Check consultation request has been submitted.\n\n";
    $body .= "CLIENT DETAILS:\n";
    $body .= "Business Name: $businessName\n";
    $body .= "Website: " . ($website ? $website : 'Not provided') . "\n";
    $body .= "Contact Name: $yourName\n";
    $body .= "Phone: $phone\n";
    $body .= "Email: $email\n\n";
    $body .= "CONSULTATION REQUIREMENTS:\n";
    $body .= "--------------------------\n";
    $body .= "$needs\n\n";
    $body .= "=====================================\n";
    $body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    $body .= "Source: SummCore Business Health Check Tool";
    
    // Enhanced headers to avoid spam filters
    $headers = "From: SummCore Health Check <info@summcore.com>\r\n";
    $headers .= "Reply-To: $yourName <$email>\r\n";
    $headers .= "Return-Path: info@summcore.com\r\n";
    $headers .= "X-Mailer: SummCore Website\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "X-MSMail-Priority: Normal\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    // Log attempt for debugging
    $log_message = date('Y-m-d H:i:s') . " - Health Check email attempt for: $email from $yourName\n";
    file_put_contents('email_log.txt', $log_message, FILE_APPEND | LOCK_EX);

    // Try to send email
    $mail_sent = mail($to, $subject, $body, $headers);
    
    if ($mail_sent) {
        // Log success
        file_put_contents('email_log.txt', date('Y-m-d H:i:s') . " - SUCCESS: Health Check email sent\n", FILE_APPEND | LOCK_EX);
        header("Location: ../thank-you.html");
        exit();
    } else {
        // Log failure
        $error = error_get_last();
        file_put_contents('email_log.txt', date('Y-m-d H:i:s') . " - FAILED: " . print_r($error, true) . "\n", FILE_APPEND | LOCK_EX);
        echo "Error: Email could not be sent. Please try again or contact us directly at info@summcore.com";
    }
} else {
    echo "Invalid request.";
}
?>

