(function() {
  // Prevent double-init
  if (window.__scFeedbackWidget) return;
  window.__scFeedbackWidget = true;

  var submitted = false;

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = [
    '.scfw-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s}',
    '.scfw-overlay.open{opacity:1;visibility:visible}',
    '.scfw-box{background:#fff;border-radius:16px;width:420px;max-width:92vw;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3);position:relative}',
    '.scfw-header{background:#fe2700;color:#fff;padding:16px 20px;border-radius:16px 16px 0 0;display:flex;justify-content:space-between;align-items:center}',
    '.scfw-header h3{margin:0;font-size:18px;font-weight:700}',
    '.scfw-close{background:none;border:none;color:#fff;font-size:22px;cursor:pointer;padding:0 4px;line-height:1}',
    '.scfw-body{padding:20px}',
    '.scfw-subtitle{color:#333;font-size:15px;font-weight:600;margin:0 0 4px}',
    '.scfw-subtitle2{color:#888;font-size:13px;margin:0 0 18px;font-style:italic}',
    '.scfw-label{font-size:14px;font-weight:600;color:#333;margin-bottom:8px;display:block}',
    '.scfw-group{margin-bottom:18px}',
    '.scfw-emojis{display:flex;gap:8px;margin-top:4px}',
    '.scfw-emoji{font-size:32px;cursor:pointer;filter:grayscale(100%) opacity(0.4);transition:all .15s;border:none;background:none;padding:4px;border-radius:8px}',
    '.scfw-emoji:hover{filter:grayscale(0) opacity(0.8);transform:scale(1.15)}',
    '.scfw-emoji.active{filter:grayscale(0) opacity(1);transform:scale(1.2);background:rgba(254,39,0,0.08)}',
    '.scfw-textarea{width:100%;min-height:70px;border:1px solid #ddd;border-radius:8px;padding:10px;font-size:14px;font-family:inherit;resize:vertical;box-sizing:border-box;outline:none}',
    '.scfw-textarea:focus{border-color:#fe2700}',
    '.scfw-input{width:100%;border:1px solid #ddd;border-radius:8px;padding:10px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none}',
    '.scfw-input:focus{border-color:#fe2700}',
    '.scfw-actions{display:flex;justify-content:flex-end;gap:12px;margin-top:18px}',
    '.scfw-submit{background:#fe2700;color:#fff;border:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .15s}',
    '.scfw-submit:hover{opacity:0.9}',
    '.scfw-submit:disabled{opacity:0.4;cursor:not-allowed}',
    '.scfw-thanks{text-align:center;padding:40px 20px}',
    '.scfw-thanks h3{font-size:20px;color:#333;margin:0 0 8px}',
    '.scfw-thanks p{color:#666;font-size:14px;margin:0}',
    '.scfw-req{color:#fe2700;margin-left:2px}',
    '',
    '/* Floating feedback button */',
    '.scfw-float-wrap{position:fixed;bottom:24px;right:24px;z-index:99998;display:flex;flex-direction:column;align-items:center;gap:8px}',
    '.scfw-float-top{color:#fff;font-size:13px;font-weight:700;text-align:center;pointer-events:none}',
    '.scfw-float{display:flex;align-items:center;gap:8px;background:#fe2700;color:#fff;border:none;padding:12px 22px 12px 16px;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(254,39,0,0.4);transition:all .2s}',
    '.scfw-float:hover{transform:scale(1.05);box-shadow:0 6px 28px rgba(254,39,0,0.5)}',
    '.scfw-float svg{width:20px;height:20px;fill:#fff}',
    '.scfw-float-bottom{color:#94a3b8;font-size:12px;font-style:italic;text-align:center;pointer-events:none}',
    '@media print{.scfw-float-wrap{display:none}}'
  ].join('\n');
  document.head.appendChild(style);

  // Build floating button with text above
  var floatWrap = document.createElement('div');
  floatWrap.className = 'scfw-float-wrap';
  floatWrap.innerHTML = '<div class="scfw-float-top">Just used a tool? We want to hear it.</div><button class="scfw-float" aria-label="Give feedback"><svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg> Feedback</button><div class="scfw-float-bottom">The good, the bad, and the &ldquo;why doesn\'t it do this?&rdquo;</div>';
  document.body.appendChild(floatWrap);
  var floatBtn = floatWrap.querySelector('.scfw-float');

  // Build popup HTML
  var overlay = document.createElement('div');
  overlay.className = 'scfw-overlay';
  overlay.innerHTML = [
    '<div class="scfw-box">',
    '  <div class="scfw-header">',
    '    <h3>Quick Feedback</h3>',
    '    <button class="scfw-close" aria-label="Close">&times;</button>',
    '  </div>',
    '  <div class="scfw-body" id="scfw-form">',
    '    <p class="scfw-subtitle">Just used a tool? We want to hear it.</p>',
    '    <p class="scfw-subtitle2">The good, the bad, and the &ldquo;why doesn\'t it do <em>this</em>?&rdquo;</p>',
    '',
    '    <div class="scfw-group">',
    '      <label class="scfw-label">How would you rate SummCore?<span class="scfw-req">*</span></label>',
    '      <div class="scfw-emojis" id="scfw-emojis">',
    '        <button class="scfw-emoji" data-val="1" title="Poor">&#128542;</button>',
    '        <button class="scfw-emoji" data-val="2" title="Fair">&#128528;</button>',
    '        <button class="scfw-emoji" data-val="3" title="OK">&#128578;</button>',
    '        <button class="scfw-emoji" data-val="4" title="Good">&#128522;</button>',
    '        <button class="scfw-emoji" data-val="5" title="Excellent">&#129321;</button>',
    '      </div>',
    '    </div>',
    '',
    '    <div class="scfw-group">',
    '      <label class="scfw-label">What\'s working well? What needs improvement?<span class="scfw-req">*</span></label>',
    '      <textarea class="scfw-textarea" id="scfw-text" placeholder="Tell us what you think..."></textarea>',
    '    </div>',
    '',
    '    <div class="scfw-group">',
    '      <label class="scfw-label">Your email<span class="scfw-req">*</span></label>',
    '      <input type="email" class="scfw-input" id="scfw-email" placeholder="you@company.com">',
    '    </div>',
    '',
    '    <div class="scfw-actions">',
    '      <button class="scfw-submit" id="scfw-btn" disabled>Submit Feedback</button>',
    '    </div>',
    '  </div>',
    '  <div class="scfw-thanks" id="scfw-thanks" style="display:none">',
    '    <div style="font-size:40px;margin-bottom:12px">&#10003;</div>',
    '    <h3>Thank you!</h3>',
    '    <p>Your feedback helps us build a better SummCore.</p>',
    '  </div>',
    '</div>'
  ].join('\n');
  document.body.appendChild(overlay);

  // State
  var rating = 0;

  // Elements
  var closeBtn = overlay.querySelector('.scfw-close');
  var emojis = overlay.querySelectorAll('.scfw-emoji');
  var textEl = overlay.querySelector('#scfw-text');
  var emailEl = overlay.querySelector('#scfw-email');
  var submitBtn = overlay.querySelector('#scfw-btn');
  var formEl = overlay.querySelector('#scfw-form');
  var thanksEl = overlay.querySelector('#scfw-thanks');

  function checkValid() {
    var textOk = textEl.value.trim().length > 0;
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
    submitBtn.disabled = !(rating > 0 && textOk && emailOk);
  }

  // Emoji clicks
  emojis.forEach(function(btn) {
    btn.addEventListener('click', function() {
      rating = parseInt(btn.getAttribute('data-val'));
      emojis.forEach(function(e) { e.classList.remove('active'); });
      btn.classList.add('active');
      checkValid();
    });
  });

  textEl.addEventListener('input', checkValid);
  emailEl.addEventListener('input', checkValid);

  // Close
  function closeWidget() {
    overlay.classList.remove('open');
  }
  closeBtn.addEventListener('click', closeWidget);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeWidget();
  });

  // Submit
  submitBtn.addEventListener('click', function() {
    if (submitBtn.disabled) return;

    var ratingLabels = ['', 'Poor', 'Fair', 'OK', 'Good', 'Excellent'];
    var summary = [
      'SUMMCORE QUICK FEEDBACK',
      '=======================',
      '',
      'Rating: ' + rating + '/5 (' + ratingLabels[rating] + ')',
      'Feedback: ' + textEl.value.trim(),
      'Email: ' + emailEl.value.trim(),
      'Page: ' + window.location.pathname
    ].join('\n');

    var body = new FormData();
    body.append('business_name', 'Quick Feedback Widget');
    body.append('your_name', emailEl.value.trim());
    body.append('email', emailEl.value.trim());
    body.append('website', window.location.pathname);
    body.append('needs', summary);

    fetch('/send.php', { method: 'POST', body: body }).catch(function() {});

    if (typeof gtag !== 'undefined') {
      gtag('event', 'quick_feedback', { rating: rating, page: window.location.pathname });
    }

    formEl.style.display = 'none';
    thanksEl.style.display = 'block';
    submitted = true;

    setTimeout(closeWidget, 2500);
  });

  // Public open function
  window.openFeedbackWidget = function() {
    if (submitted) {
      // Reset for another submission
      rating = 0;
      emojis.forEach(function(e) { e.classList.remove('active'); });
      textEl.value = '';
      emailEl.value = '';
      submitBtn.disabled = true;
      formEl.style.display = 'block';
      thanksEl.style.display = 'none';
      submitted = false;
    }
    overlay.classList.add('open');
  };

  // Floating button opens widget
  floatBtn.addEventListener('click', function() {
    window.openFeedbackWidget();
  });
})();
