<?php
// Contact form handler — michalmajewski.dev (hostido / Apache + PHP).
// The form POSTs here directly; mail is delivered locally to a mailbox on the same
// domain (no third-party services, no API keys).

header('Content-Type: application/json; charset=utf-8');

// --- recipient and sender (must exist as a mailbox/alias on hostido) ---
$recipient   = 'michal@michalmajewski.dev';
$fromAddress = 'noreply@michalmajewski.dev';

// POST only
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
  exit;
}

$name    = trim($_POST['from_name'] ?? '');
$email   = trim($_POST['reply_to'] ?? '');
$subject = trim($_POST['subject']  ?? '');
$message = trim($_POST['message']  ?? '');
$hp      = trim($_POST['website']  ?? ''); // anti-spam honeypot

// Honeypot: a hidden field only bots fill — pretend success, send nothing
if ($hp !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

// Validation
if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'invalid_input']);
  exit;
}
if (mb_strlen($name) > 100 || mb_strlen($subject) > 150 || mb_strlen($message) > 5000) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'too_long']);
  exit;
}

// Anti-injection: strip newline characters from values that go into headers
$stripNL = static fn(string $v): string => str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', $v);
$nameHdr  = $stripNL($name);
$emailHdr = $stripNL($email);

$subjectMap = [
  'project'       => 'Projekt',
  'collaboration' => 'Współpraca',
  'other'         => 'Inne',
  ''              => 'Wiadomość',
];
$subjectLabel = $subjectMap[$subject] ?? 'Wiadomość';

$mailSubject = '[michalmajewski.dev] ' . $subjectLabel . ' — ' . $nameHdr;
// RFC 2047 — Polish characters in the subject
$mailSubjectEncoded = '=?UTF-8?B?' . base64_encode($mailSubject) . '?=';

$body =
  "Nowa wiadomość z formularza kontaktowego michalmajewski.dev\n\n" .
  "Imię:   " . $name . "\n" .
  "E-mail: " . $emailHdr . "\n" .
  "Temat:  " . $subjectLabel . "\n\n" .
  "Wiadomość:\n" . $message . "\n";

$headers  = "From: Formularz michalmajewski.dev <{$fromAddress}>\r\n";
$headers .= "Reply-To: {$emailHdr}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

// -f sets the envelope sender (SPF); the part after -f has no space
$sent = @mail($recipient, $mailSubjectEncoded, $body, $headers, '-f' . $fromAddress);

if ($sent) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
