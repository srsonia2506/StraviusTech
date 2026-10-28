  // Run the test-report animation once, when it scrolls into view.
  (function () {
    var report = document.querySelector('.report');
    if (!report || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    report.classList.add('waiting');
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) { report.classList.replace('waiting', 'play'); obs.disconnect(); }
    }, { threshold: 0.3 }).observe(report);
  })();

// FAQ: one button to open or close every answer.
(function () {
  var faq = document.querySelector('.faq');
  if (!faq) return;
  var items = faq.querySelectorAll('details');
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'faq-toggle';
  function allOpen() { return Array.prototype.every.call(items, function (d) { return d.open; }); }
  function label() {
    var open = allOpen();
    btn.textContent = open ? 'Collapse all' : 'Expand all';
    btn.setAttribute('aria-expanded', open);
  }
  btn.addEventListener('click', function () {
    var open = !allOpen();
    Array.prototype.forEach.call(items, function (d) { d.open = open; });
    label();
  });
  Array.prototype.forEach.call(items, function (d) { d.addEventListener('toggle', label); });
  label();
  faq.parentNode.insertBefore(btn, faq);
})();

// Calendly: load the booking widget only when the booking section comes near the screen.
(function () {
  var box = document.getElementById('calendly');
  if (!box) return;
  var loaded = false;
  function load() {
    if (loaded) return; loaded = true;
    var s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.body.appendChild(s);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { load(); o.disconnect(); } }, { rootMargin: '400px' }).observe(box);
  } else { load(); }
  window.addEventListener('message', function (e) {
    if (e.origin === 'https://calendly.com' && e.data && e.data.event === 'calendly.event_scheduled') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'calendlyBookingCompleted' });
    }
  });
})();
