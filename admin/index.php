<?php
// ── SummCore Admin Dashboard ──────────────────────────────────────────────────
// Change this password before deploying!
define('ADMIN_PASSWORD', 'SummCore2026');
define('DATA_FILE',      __DIR__ . '/../data/submissions.json');
define('SESSION_KEY',    'sc_admin_auth');

error_reporting(0);
ini_set('display_errors', 0);
session_start();

$error = '';

// ── Logout ────────────────────────────────────────────────────────────────────
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit();
}

// ── Login ─────────────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password']) && !isset($_POST['delete_id'])) {
    if ($_POST['password'] === ADMIN_PASSWORD) {
        $_SESSION[SESSION_KEY] = true;
        header('Location: index.php');
        exit();
    }
    $error = 'Incorrect password.';
}

// ── Auth gate ─────────────────────────────────────────────────────────────────
$authed = !empty($_SESSION[SESSION_KEY]);

// ── Delete ────────────────────────────────────────────────────────────────────
if ($authed && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    $deleteId = trim($_POST['delete_id']);
    if (file_exists(DATA_FILE)) {
        $lines = file(DATA_FILE, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $kept  = [];
        foreach ($lines as $line) {
            $e = json_decode($line, true);
            if (!$e || ($e['id'] ?? '') !== $deleteId) {
                $kept[] = $line;
            }
        }
        file_put_contents(DATA_FILE, count($kept) ? implode("\n", $kept) . "\n" : '');
    }
    $typeParam = isset($_GET['type']) ? '?type=' . urlencode($_GET['type']) : '';
    header('Location: index.php' . $typeParam);
    exit();
}

// ── Load submissions ──────────────────────────────────────────────────────────
$allSubmissions = [];
if ($authed && file_exists(DATA_FILE)) {
    $lines = file(DATA_FILE, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $e = json_decode($line, true);
        if ($e) $allSubmissions[] = $e;
    }
}
usort($allSubmissions, fn($a, $b) => strcmp($b['timestamp'] ?? '', $a['timestamp'] ?? ''));

$typeFilter   = $_GET['type'] ?? '';
$submissions  = $typeFilter
    ? array_values(array_filter($allSubmissions, fn($s) => ($s['type'] ?? '') === $typeFilter))
    : $allSubmissions;

// Counts
$total         = count($allSubmissions);
$consultCount  = count(array_filter($allSubmissions, fn($s) => ($s['type'] ?? '') === 'consultation'));
$widgetCount   = count(array_filter($allSubmissions, fn($s) => ($s['type'] ?? '') === 'widget'));
$surveyCount   = count(array_filter($allSubmissions, fn($s) => in_array($s['type'] ?? '', ['survey', 'discovery'])));

function typeBadge(string $type): string {
    $map = [
        'consultation' => ['#1a6b3a', '#d4edda', 'Consultation'],
        'widget'       => ['#856404', '#fff3cd', 'Feedback'],
        'survey'       => ['#0c5460', '#d1ecf1', 'Survey'],
        'discovery'    => ['#4a1d96', '#ede9fe', 'Discovery'],
    ];
    $s = $map[$type] ?? ['#555', '#eee', ucfirst($type)];
    return '<span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600;color:'
        . $s[0] . ';background:' . $s[1] . '">' . htmlspecialchars($s[2]) . '</span>';
}

function esc(mixed $v): string {
    return htmlspecialchars((string)($v ?? ''), ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SummCore Admin</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f0f2f5; color: #1a1a1a; min-height: 100vh; }

  /* ── Login ── */
  .login-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .login-card { background: #fff; border-radius: 12px; padding: 40px 36px; width: 340px; box-shadow: 0 4px 24px rgba(0,0,0,.12); }
  .login-logo { font-size: 22px; font-weight: 800; color: #111; letter-spacing: -0.5px; margin-bottom: 4px; }
  .login-sub  { font-size: 13px; color: #666; margin-bottom: 28px; }
  .login-card label { display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px; }
  .login-card input[type=password] { width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; outline: none; }
  .login-card input[type=password]:focus { border-color: #111; box-shadow: 0 0 0 3px rgba(0,0,0,.08); }
  .btn-login { margin-top: 16px; width: 100%; padding: 11px; background: #111; color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; }
  .btn-login:hover { background: #333; }
  .login-error { margin-top: 12px; padding: 10px 14px; background: #fee2e2; color: #991b1b; border-radius: 8px; font-size: 13px; }

  /* ── Layout ── */
  .header { background: #111; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; }
  .header-logo { color: #fff; font-size: 18px; font-weight: 800; letter-spacing: -0.3px; }
  .header-sub  { color: #888; font-size: 12px; margin-left: 10px; }
  .btn-logout { color: #aaa; font-size: 13px; text-decoration: none; padding: 6px 14px; border: 1px solid #444; border-radius: 6px; }
  .btn-logout:hover { color: #fff; border-color: #888; }
  .main { max-width: 1100px; margin: 0 auto; padding: 28px 20px; }

  /* ── Stats ── */
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
  .stat-num  { font-size: 32px; font-weight: 800; color: #111; line-height: 1; }
  .stat-label { font-size: 12px; color: #666; margin-top: 4px; text-transform: uppercase; letter-spacing: .5px; }

  /* ── Filters ── */
  .filters { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .filter-btn { padding: 7px 16px; border-radius: 20px; border: 1px solid #d1d5db; background: #fff; font-size: 13px; cursor: pointer; color: #333; text-decoration: none; }
  .filter-btn.active, .filter-btn:hover { background: #111; color: #fff; border-color: #111; }

  /* ── Table ── */
  .card { background: #fff; border-radius: 10px; box-shadow: 0 1px 4px rgba(0,0,0,.06); overflow: hidden; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  thead { background: #f9fafb; }
  th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .5px; border-bottom: 1px solid #e5e7eb; }
  td { padding: 13px 16px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #fafafa; }
  .td-date  { white-space: nowrap; color: #666; font-size: 12px; }
  .td-name  { font-weight: 600; color: #111; }
  .td-sub   { font-size: 12px; color: #666; margin-top: 2px; }
  .td-msg   { color: #444; max-width: 300px; }
  .btn-del  { padding: 5px 12px; background: #fee2e2; color: #991b1b; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; }
  .btn-del:hover { background: #fca5a5; }
  .empty    { padding: 48px; text-align: center; color: #9ca3af; font-size: 14px; }
  @media (max-width: 700px) {
    .stats { grid-template-columns: repeat(2, 1fr); }
    .hide-mob { display: none; }
    .main { padding: 16px 12px; }
  }
</style>
</head>
<body>

<?php if (!$authed): ?>
<!-- ── Login form ───────────────────────────────────────────────────────────── -->
<div class="login-wrap">
  <div class="login-card">
    <div class="login-logo">SummCore</div>
    <div class="login-sub">Admin Dashboard</div>
    <form method="POST">
      <label for="pw">Password</label>
      <input type="password" id="pw" name="password" autofocus autocomplete="current-password">
      <button type="submit" class="btn-login">Sign In</button>
    </form>
    <?php if ($error): ?>
      <div class="login-error"><?= esc($error) ?></div>
    <?php endif; ?>
  </div>
</div>

<?php else: ?>
<!-- ── Dashboard ────────────────────────────────────────────────────────────── -->
<div class="header">
  <div style="display:flex;align-items:baseline;gap:4px">
    <span class="header-logo">SummCore</span>
    <span class="header-sub">Admin</span>
  </div>
  <a href="?logout=1" class="btn-logout">Sign out</a>
</div>

<div class="main">

  <!-- Stats -->
  <div class="stats">
    <div class="stat">
      <div class="stat-num"><?= $total ?></div>
      <div class="stat-label">Total</div>
    </div>
    <div class="stat">
      <div class="stat-num"><?= $consultCount ?></div>
      <div class="stat-label">Consultations</div>
    </div>
    <div class="stat">
      <div class="stat-num"><?= $widgetCount ?></div>
      <div class="stat-label">Feedback</div>
    </div>
    <div class="stat">
      <div class="stat-num"><?= $surveyCount ?></div>
      <div class="stat-label">Surveys</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="filters">
    <a href="index.php" class="filter-btn <?= $typeFilter === '' ? 'active' : '' ?>">All (<?= $total ?>)</a>
    <a href="?type=consultation" class="filter-btn <?= $typeFilter === 'consultation' ? 'active' : '' ?>">Consultations (<?= $consultCount ?>)</a>
    <a href="?type=widget" class="filter-btn <?= $typeFilter === 'widget' ? 'active' : '' ?>">Feedback (<?= $widgetCount ?>)</a>
    <a href="?type=survey" class="filter-btn <?= $typeFilter === 'survey' ? 'active' : '' ?>">Survey (<?= count(array_filter($allSubmissions, fn($s) => ($s['type'] ?? '') === 'survey')) ?>)</a>
    <a href="?type=discovery" class="filter-btn <?= $typeFilter === 'discovery' ? 'active' : '' ?>">Discovery (<?= count(array_filter($allSubmissions, fn($s) => ($s['type'] ?? '') === 'discovery')) ?>)</a>
  </div>

  <!-- Table -->
  <div class="card">
    <?php if (empty($submissions)): ?>
      <div class="empty">No submissions yet.</div>
    <?php else: ?>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Name / Company</th>
          <th class="hide-mob">Contact</th>
          <th>Message</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($submissions as $s): ?>
        <tr>
          <td class="td-date"><?= esc(substr($s['timestamp'] ?? '', 0, 16)) ?></td>
          <td><?= typeBadge($s['type'] ?? '') ?></td>
          <td>
            <div class="td-name"><?= esc($s['name'] ?? '—') ?></div>
            <?php if (!empty($s['company'])): ?>
              <div class="td-sub"><?= esc($s['company']) ?></div>
            <?php endif; ?>
            <?php if (!empty($s['website'])): ?>
              <div class="td-sub"><?= esc($s['website']) ?></div>
            <?php endif; ?>
          </td>
          <td class="hide-mob">
            <?php if (!empty($s['email'])): ?>
              <div><a href="mailto:<?= esc($s['email']) ?>" style="color:#2563eb"><?= esc($s['email']) ?></a></div>
            <?php endif; ?>
            <?php if (!empty($s['phone'])): ?>
              <div class="td-sub"><?= esc($s['phone']) ?></div>
            <?php endif; ?>
          </td>
          <td class="td-msg">
            <?php
              $msg = $s['message'] ?? '';
              echo esc(mb_strlen($msg) > 120 ? mb_substr($msg, 0, 120) . '…' : $msg);
            ?>
          </td>
          <td>
            <form method="POST" onsubmit="return confirm('Delete this submission?')">
              <input type="hidden" name="delete_id" value="<?= esc($s['id'] ?? '') ?>">
              <?php if ($typeFilter): ?>
                <input type="hidden" name="type_filter" value="<?= esc($typeFilter) ?>">
              <?php endif; ?>
              <button type="submit" class="btn-del">Delete</button>
            </form>
          </td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    <?php endif; ?>
  </div>

</div>
<?php endif; ?>

</body>
</html>
