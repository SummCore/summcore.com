<?php
// ── SummCore Admin Dashboard ──────────────────────────────────────────────────
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

// ── CSV Export ────────────────────────────────────────────────────────────────
if ($authed && isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="submissions-' . date('Y-m-d') . '.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['Date', 'Type', 'Name', 'Company', 'Email', 'Phone', 'Message']);
    foreach ($allSubmissions as $s) {
        fputcsv($out, [
            substr($s['timestamp'] ?? '', 0, 16),
            $s['type'] ?? '',
            $s['name'] ?? '',
            $s['company'] ?? '',
            $s['email'] ?? '',
            $s['phone'] ?? '',
            $s['message'] ?? '',
        ]);
    }
    fclose($out);
    exit();
}

$typeFilter   = $_GET['type'] ?? '';
$submissions  = $typeFilter
    ? array_values(array_filter($allSubmissions, fn($s) => ($s['type'] ?? '') === $typeFilter))
    : $allSubmissions;

// Counts
$total         = count($allSubmissions);
$consultCount  = count(array_filter($allSubmissions, fn($s) => ($s['type'] ?? '') === 'consultation'));
$widgetCount   = count(array_filter($allSubmissions, fn($s) => ($s['type'] ?? '') === 'widget'));
$surveyCount   = count(array_filter($allSubmissions, fn($s) => in_array($s['type'] ?? '', ['survey', 'discovery'])));

// New submissions (last 24h)
$newCount = count(array_filter($allSubmissions, function($s) {
    if (empty($s['timestamp'])) return false;
    try { return (time() - (new DateTime($s['timestamp']))->getTimestamp()) < 86400; }
    catch (Exception $e) { return false; }
}));

function isNew(array $s): bool {
    if (empty($s['timestamp'])) return false;
    try { return (time() - (new DateTime($s['timestamp']))->getTimestamp()) < 86400; }
    catch (Exception $e) { return false; }
}

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
  .header-right { display: flex; align-items: center; gap: 10px; }
  .btn-logout { color: #aaa; font-size: 13px; text-decoration: none; padding: 6px 14px; border: 1px solid #444; border-radius: 6px; }
  .btn-logout:hover { color: #fff; border-color: #888; }
  .btn-export { color: #fff; font-size: 13px; text-decoration: none; padding: 6px 14px; border: 1px solid #3b82f6; border-radius: 6px; background: rgba(59,130,246,.15); }
  .btn-export:hover { background: rgba(59,130,246,.3); }
  .main { max-width: 1100px; margin: 0 auto; padding: 28px 20px; }

  /* ── Stats ── */
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); border-top: 3px solid #e5e7eb; position: relative; overflow: hidden; }
  .stat.blue  { border-top-color: #3b82f6; }
  .stat.green { border-top-color: #22c55e; }
  .stat.yellow{ border-top-color: #f59e0b; }
  .stat.purple{ border-top-color: #8b5cf6; }
  .stat-icon  { font-size: 22px; margin-bottom: 8px; }
  .stat-num   { font-size: 32px; font-weight: 800; color: #111; line-height: 1; }
  .stat-label { font-size: 12px; color: #666; margin-top: 4px; text-transform: uppercase; letter-spacing: .5px; }
  .stat-new   { position: absolute; top: 12px; right: 12px; background: #ef4444; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 10px; }

  /* ── Toolbar ── */
  .toolbar { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
  .search-wrap { flex: 1; min-width: 180px; }
  .search-input { width: 100%; padding: 8px 14px 8px 36px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; outline: none; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E") no-repeat 12px center; }
  .search-input:focus { border-color: #111; box-shadow: 0 0 0 3px rgba(0,0,0,.07); }

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
  tr.is-new td { background: #fffbeb; }
  tr.is-new:hover td { background: #fef9c3; }
  .td-date  { white-space: nowrap; color: #666; font-size: 12px; }
  .td-name  { font-weight: 600; color: #111; }
  .td-sub   { font-size: 12px; color: #666; margin-top: 2px; }
  .td-msg   { color: #444; max-width: 260px; }
  .badge-new { display: inline-block; font-size: 9px; font-weight: 700; background: #ef4444; color: #fff; padding: 1px 5px; border-radius: 8px; vertical-align: middle; margin-left: 4px; letter-spacing: .3px; }
  .msg-text { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .msg-link { font-size: 11px; color: #2563eb; cursor: pointer; background: none; border: none; padding: 0; margin-top: 2px; display: inline-block; }
  .msg-link:hover { text-decoration: underline; }
  .actions  { display: flex; gap: 6px; align-items: center; white-space: nowrap; }
  .btn-del  { padding: 5px 12px; background: #fee2e2; color: #991b1b; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; }
  .btn-del:hover { background: #fca5a5; }
  .btn-reply { padding: 5px 12px; background: #dbeafe; color: #1d4ed8; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; text-decoration: none; display: inline-block; }
  .btn-reply:hover { background: #bfdbfe; }
  .empty    { padding: 48px; text-align: center; color: #9ca3af; font-size: 14px; }

  /* ── Modal ── */
  .modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 100; align-items: center; justify-content: center; }
  .modal-backdrop.open { display: flex; }
  .modal { background: #fff; border-radius: 12px; padding: 28px; max-width: 520px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
  .modal-title { font-size: 15px; font-weight: 700; margin-bottom: 12px; color: #111; }
  .modal-body { font-size: 14px; color: #444; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
  .modal-close { margin-top: 20px; padding: 8px 20px; background: #111; color: #fff; border: none; border-radius: 8px; font-size: 13px; cursor: pointer; }

  @media (max-width: 700px) {
    .stats { grid-template-columns: repeat(2, 1fr); }
    .hide-mob { display: none; }
    .main { padding: 16px 12px; }
    .toolbar { flex-direction: column; align-items: stretch; }
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
  <div class="header-right">
    <a href="?export=csv" class="btn-export">⬇ Export CSV</a>
    <a href="?logout=1" class="btn-logout">Sign out</a>
  </div>
</div>

<div class="main">

  <!-- Stats -->
  <div class="stats">
    <div class="stat blue">
      <div class="stat-icon">📥</div>
      <div class="stat-num"><?= $total ?></div>
      <div class="stat-label">Total</div>
      <?php if ($newCount > 0): ?>
        <div class="stat-new"><?= $newCount ?> new</div>
      <?php endif; ?>
    </div>
    <div class="stat green">
      <div class="stat-icon">💼</div>
      <div class="stat-num"><?= $consultCount ?></div>
      <div class="stat-label">Consultations</div>
    </div>
    <div class="stat yellow">
      <div class="stat-icon">💬</div>
      <div class="stat-num"><?= $widgetCount ?></div>
      <div class="stat-label">Feedback</div>
    </div>
    <div class="stat purple">
      <div class="stat-icon">📋</div>
      <div class="stat-num"><?= $surveyCount ?></div>
      <div class="stat-label">Surveys</div>
    </div>
  </div>

  <!-- Toolbar -->
  <div class="toolbar">
    <div class="search-wrap">
      <input type="text" class="search-input" id="searchInput" placeholder="Search by name or email…" oninput="filterRows()">
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
    <table id="submTable">
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
        <?php $new = isNew($s); ?>
        <tr class="<?= $new ? 'is-new' : '' ?>" data-search="<?= esc(strtolower(($s['name'] ?? '') . ' ' . ($s['email'] ?? '') . ' ' . ($s['company'] ?? ''))) ?>">
          <td class="td-date">
            <?= esc(substr($s['timestamp'] ?? '', 0, 16)) ?>
            <?php if ($new): ?><span class="badge-new">NEW</span><?php endif; ?>
          </td>
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
              <div class="td-sub"><a href="tel:<?= esc(preg_replace('/[^+\d]/', '', $s['phone'])) ?>" style="color:#444"><?= esc($s['phone']) ?></a></div>
            <?php endif; ?>
          </td>
          <td class="td-msg">
            <?php
              $msg = $s['message'] ?? '';
              $short = mb_strlen($msg) > 100;
            ?>
            <div class="msg-text"><?= esc($short ? mb_substr($msg, 0, 100) . '…' : $msg) ?></div>
            <?php if ($short): ?>
              <button class="msg-link" onclick="openModal(<?= htmlspecialchars(json_encode($s['name'] ?? ''), ENT_QUOTES) ?>, <?= htmlspecialchars(json_encode($msg), ENT_QUOTES) ?>)">Read more ↗</button>
            <?php endif; ?>
          </td>
          <td>
            <div class="actions">
              <?php if (!empty($s['email'])): ?>
                <a href="mailto:<?= esc($s['email']) ?>?subject=<?= rawurlencode('Re: Your SummCore enquiry') ?>" class="btn-reply">Reply</a>
              <?php endif; ?>
              <form method="POST" onsubmit="return confirm('Delete this submission?')" style="display:inline">
                <input type="hidden" name="delete_id" value="<?= esc($s['id'] ?? '') ?>">
                <?php if ($typeFilter): ?>
                  <input type="hidden" name="type_filter" value="<?= esc($typeFilter) ?>">
                <?php endif; ?>
                <button type="submit" class="btn-del">Delete</button>
              </form>
            </div>
          </td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    <div id="noResults" style="display:none" class="empty">No results match your search.</div>
    <?php endif; ?>
  </div>

</div>

<!-- ── Message modal ─────────────────────────────────────────────────────────── -->
<div class="modal-backdrop" id="modal" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <div class="modal-title" id="modalTitle"></div>
    <div class="modal-body" id="modalBody"></div>
    <button class="modal-close" onclick="closeModal()">Close</button>
  </div>
</div>

<script>
function openModal(name, msg) {
  document.getElementById('modalTitle').textContent = name ? 'Message from ' + name : 'Message';
  document.getElementById('modalBody').textContent = msg;
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });

function filterRows() {
  var q = document.getElementById('searchInput').value.toLowerCase().trim();
  var rows = document.querySelectorAll('#submTable tbody tr');
  var visible = 0;
  rows.forEach(function(row) {
    var match = !q || row.dataset.search.includes(q);
    row.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  document.getElementById('noResults').style.display = visible === 0 ? '' : 'none';
}
</script>

<?php endif; ?>

</body>
</html>
