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
    '.scfw-box{background:#fff;border-radius:16px;width:440px;max-width:92vw;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3);position:relative}',
    '.scfw-header{background:#fe2700;color:#fff;padding:16px 20px;border-radius:16px 16px 0 0;display:flex;justify-content:space-between;align-items:center}',
    '.scfw-header h3{margin:0;font-size:18px;font-weight:700}',
    '.scfw-close{background:none;border:none;color:#fff;font-size:22px;cursor:pointer;padding:0 4px;line-height:1}',
    '.scfw-body{padding:20px}',
    '.scfw-subtitle{color:#333;font-size:15px;font-weight:600;margin:0 0 18px}',
    '.scfw-label{font-size:14px;font-weight:600;color:#333;margin-bottom:8px;display:block}',
    '.scfw-opt{font-size:12px;color:#aaa;font-weight:400;margin-left:4px}',
    '.scfw-group{margin-bottom:16px}',
    '.scfw-emojis{display:flex;gap:8px;margin-top:4px}',
    '.scfw-emoji{font-size:30px;cursor:pointer;filter:grayscale(100%) opacity(0.4);transition:all .15s;border:none;background:none;padding:4px;border-radius:8px}',
    '.scfw-emoji:hover{filter:grayscale(0) opacity(0.8);transform:scale(1.15)}',
    '.scfw-emoji.active{filter:grayscale(0) opacity(1);transform:scale(1.2);background:rgba(254,39,0,0.08)}',
    '.scfw-btns{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}',
    '.scfw-btn-opt{border:2px solid #ddd;border-radius:8px;padding:7px 16px;font-size:13px;font-weight:600;cursor:pointer;background:#fff;color:#555;transition:all .15s}',
    '.scfw-btn-opt:hover{border-color:#fe2700;color:#fe2700}',
    '.scfw-btn-opt.active{border-color:#fe2700;background:#fe2700;color:#fff}',
    '.scfw-conditional{margin-top:10px;display:none}',
    '.scfw-conditional.show{display:block}',
    '.scfw-textarea{width:100%;min-height:64px;border:1px solid #ddd;border-radius:8px;padding:10px;font-size:14px;font-family:inherit;resize:vertical;box-sizing:border-box;outline:none}',
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
    '.scfw-float-top,.scfw-float-bottom{text-align:center;pointer-events:none;opacity:0;transform:translateY(4px);transition:opacity .25s,transform .25s}',
    '.scfw-float-top{color:#fff;font-size:13px;font-weight:700}',
    '.scfw-float-bottom{color:#94a3b8;font-size:12px;font-style:italic}',
    '.scfw-float-wrap:hover .scfw-float-top,.scfw-float-wrap:hover .scfw-float-bottom{opacity:1;transform:translateY(0)}',
    '.scfw-hint{color:rgba(255,255,255,0.4);font-size:10px;pointer-events:none;animation:scfw-bob 2s ease-in-out infinite}',
    '@keyframes scfw-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}',
    '.scfw-float-wrap:hover .scfw-hint{opacity:0}',
    '.scfw-float{display:flex;align-items:center;gap:8px;background:#fe2700;color:#fff;border:none;padding:12px 22px 12px 16px;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(254,39,0,0.4);transition:all .2s}',
    '.scfw-float:hover{transform:scale(1.05);box-shadow:0 6px 28px rgba(254,39,0,0.5)}',
    '.scfw-float svg{width:20px;height:20px;fill:#fff}',
    '@media print{.scfw-float-wrap{display:none}}'
  ].join('\n');
  document.head.appendChild(style);

  // Build floating button
  var floatWrap = document.createElement('div');
  floatWrap.className = 'scfw-float-wrap';
  floatWrap.innerHTML = '<div class="scfw-float-top">We want to hear what <strong style="text-transform:uppercase;text-decoration:underline">you</strong> have to say</div><div class="scfw-hint">&#9650;</div><button class="scfw-float" aria-label="Give feedback"><svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg> Feedback</button><div class="scfw-float-bottom">What\'s working well &amp; what needs improvement</div>';
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
    '    <p class="scfw-subtitle">We want to hear what <strong style="text-transform:uppercase;text-decoration:underline">YOU</strong> have to say</p>',

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

    '    <div class="scfw-group">',
    '      <label class="scfw-label">What needs improvement?<span class="scfw-req">*</span></label>',
    '      <textarea class="scfw-textarea" id="scfw-improve" placeholder="Tell us what could be better..."></textarea>',
    '    </div>',

    '    <div class="scfw-group">',
    '      <label class="scfw-label">Are you looking for something specific?<span class="scfw-req">*</span></label>',
    '      <div class="scfw-btns" id="scfw-specific-btns">',
    '        <button class="scfw-btn-opt" data-val="Yes">Yes</button>',
    '        <button class="scfw-btn-opt" data-val="No">No</button>',
    '      </div>',
    '      <div class="scfw-conditional" id="scfw-specific-detail">',
    '        <textarea class="scfw-textarea" id="scfw-specific-text" placeholder="Tell us what you\'re looking for..."></textarea>',
    '      </div>',
    '    </div>',

    '    <div class="scfw-group">',
    '      <label class="scfw-label">What would you like SummCore to offer next?<span class="scfw-req">*</span></label>',
    '      <textarea class="scfw-textarea" id="scfw-offer" placeholder="A feature, tool, or service you\'d love to see..."></textarea>',
    '    </div>',

    '    <div class="scfw-group">',
    '      <label class="scfw-label">How can SummCore improve?<span class="scfw-req">*</span></label>',
    '      <textarea class="scfw-textarea" id="scfw-improve2" placeholder="Any changes that would make a real difference..."></textarea>',
    '    </div>',

    '    <div class="scfw-group">',
    '      <label class="scfw-label">Would you recommend us?<span class="scfw-req">*</span></label>',
    '      <div class="scfw-btns" id="scfw-recommend-btns">',
    '        <button class="scfw-btn-opt" data-val="Yes">Yes</button>',
    '        <button class="scfw-btn-opt" data-val="No">No</button>',
    '      </div>',
    '      <div class="scfw-conditional" id="scfw-recommend-detail">',
    '        <textarea class="scfw-textarea" id="scfw-recommend-text" placeholder="Why not? What would change your mind..."></textarea>',
    '      </div>',
    '    </div>',

    '    <div class="scfw-group">',
    '      <label class="scfw-label">Your email<span class="scfw-opt">(optional)</span></label>',
    '      <input type="email" class="scfw-input" id="scfw-email" placeholder="you@company.com">',
    '    </div>',

    '    <div class="scfw-actions">',
    '      <button class="scfw-submit" id="scfw-btn" disabled>Submit Feedback</button>',
    '    </div>',
    '  </div>',
    '  <div class="scfw-thanks" id="scfw-thanks" style="display:none">',
    '    <div style="font-size:40px;margin-bottom:12px">&#10003;</div>',
    '    <h3>Thank you!</h3>',
    '    <p>Your feedback helps us build a better SummCore.</p>',
    '    <p id="scfw-email-sent" style="font-size:13px;color:#888;margin-top:6px"></p>',
    '  </div>',
    '</div>'
  ].join('\n');
  document.body.appendChild(overlay);

  // State
  var rating = 0;
  var specific = '';
  var recommend = '';

  // Elements
  var closeBtn      = overlay.querySelector('.scfw-close');
  var emojis        = overlay.querySelectorAll('.scfw-emoji');
  var improveEl     = overlay.querySelector('#scfw-improve');
  var specificBtns  = overlay.querySelectorAll('#scfw-specific-btns .scfw-btn-opt');
  var specificDetail= overlay.querySelector('#scfw-specific-detail');
  var specificText  = overlay.querySelector('#scfw-specific-text');
  var offerEl       = overlay.querySelector('#scfw-offer');
  var improve2El    = overlay.querySelector('#scfw-improve2');
  var recommendBtns = overlay.querySelectorAll('#scfw-recommend-btns .scfw-btn-opt');
  var recommendDetail = overlay.querySelector('#scfw-recommend-detail');
  var recommendText = overlay.querySelector('#scfw-recommend-text');
  var emailEl       = overlay.querySelector('#scfw-email');
  var submitBtn     = overlay.querySelector('#scfw-btn');
  var formEl        = overlay.querySelector('#scfw-form');
  var thanksEl      = overlay.querySelector('#scfw-thanks');

  function checkValid() {
    var improveOk   = improveEl.value.trim().length > 0;
    var specificOk  = specific !== '' && (specific !== 'Yes' || specificText.value.trim().length > 0);
    var offerOk     = offerEl.value.trim().length > 0;
    var improve2Ok  = improve2El.value.trim().length > 0;
    var recommendOk = recommend !== '' && (recommend !== 'No' || recommendText.value.trim().length > 0);
    var emailVal    = emailEl.value.trim();
    var emailOk     = emailVal === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    submitBtn.disabled = !(rating > 0 && improveOk && specificOk && offerOk && improve2Ok && recommendOk && emailOk);
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

  // "Looking for something specific?" buttons
  specificBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      specific = btn.getAttribute('data-val');
      specificBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (specific === 'Yes') {
        specificDetail.classList.add('show');
      } else {
        specificDetail.classList.remove('show');
        specificText.value = '';
      }
      checkValid();
    });
  });

  // "Would you recommend?" buttons
  recommendBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      recommend = btn.getAttribute('data-val');
      recommendBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (recommend === 'No') {
        recommendDetail.classList.add('show');
      } else {
        recommendDetail.classList.remove('show');
        recommendText.value = '';
      }
      checkValid();
    });
  });

  improveEl.addEventListener('input', checkValid);
  specificText.addEventListener('input', checkValid);
  offerEl.addEventListener('input', checkValid);
  improve2El.addEventListener('input', checkValid);
  recommendText.addEventListener('input', checkValid);
  emailEl.addEventListener('input', checkValid);

  // Close
  function closeWidget() { overlay.classList.remove('open'); }
  closeBtn.addEventListener('click', closeWidget);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeWidget();
  });

  // Submit
  submitBtn.addEventListener('click', function() {
    if (submitBtn.disabled) return;

    var ratingLabels = ['', 'Poor', 'Fair', 'OK', 'Good', 'Excellent'];
    var emailVal = emailEl.value.trim();
    var summary = [
      'SUMMCORE QUICK FEEDBACK',
      '=======================',
      '',
      'Rating: ' + rating + '/5 (' + ratingLabels[rating] + ')',
      'What needs improvement: ' + improveEl.value.trim(),
      'Looking for something specific: ' + specific + (specificText.value.trim() ? ' — ' + specificText.value.trim() : ''),
      'What to offer next: ' + offerEl.value.trim(),
      'How to improve: ' + improve2El.value.trim(),
      'Would recommend: ' + recommend + (recommendText.value.trim() ? ' — ' + recommendText.value.trim() : ''),
      'Email: ' + (emailVal || 'Not provided'),
      'Page: ' + window.location.pathname
    ].join('\n');

    var body = new FormData();
    body.append('business_name', 'Quick Feedback Widget');
    body.append('your_name', emailVal || 'Anonymous');
    body.append('email', emailVal || 'feedback@summcore.com');
    body.append('website', window.location.pathname);
    body.append('needs', summary);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch('/send.php', { method: 'POST', body: body }).then(function(res) {
      if (!res.ok) throw new Error(res.status);
      if (typeof gtag !== 'undefined') {
        gtag('event', 'quick_feedback', { rating: rating, recommend: recommend, page: window.location.pathname });
      }
      formEl.style.display = 'none';
      thanksEl.style.display = 'block';
      var emailSentEl = overlay.querySelector('#scfw-email-sent');
      if (emailSentEl && emailVal) {
        emailSentEl.textContent = 'A confirmation email has been sent to ' + emailVal;
      }
      submitted = true;
      setTimeout(closeWidget, 5000);
    }).catch(function() {
      submitBtn.textContent = 'Submit Feedback';
      checkValid();
      alert('Something went wrong. Please try again or email info@summcore.com');
    });
  });

  // Public open function
  window.openFeedbackWidget = function() {
    if (submitted) {
      rating = 0; specific = ''; recommend = '';
      emojis.forEach(function(e) { e.classList.remove('active'); });
      specificBtns.forEach(function(b) { b.classList.remove('active'); });
      recommendBtns.forEach(function(b) { b.classList.remove('active'); });
      specificDetail.classList.remove('show');
      recommendDetail.classList.remove('show');
      improveEl.value = '';
      specificText.value = '';
      offerEl.value = '';
      improve2El.value = '';
      recommendText.value = '';
      emailEl.value = '';
      submitBtn.disabled = true;
      formEl.style.display = 'block';
      thanksEl.style.display = 'none';
      submitted = false;
    }
    overlay.classList.add('open');
  };

  floatBtn.addEventListener('click', function() {
    window.openFeedbackWidget();
  });
})();
