(function () {
  'use strict';
  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.getAttribute('data-open') === 'true';
      links.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  var success = document.querySelector('[data-form-success]');
  if (success && new URLSearchParams(window.location.search).get('sent') === 'true') {
    success.hidden = false;
    success.focus();
    window.history.replaceState({}, document.title, window.location.pathname);
    window.alert('Your message was sent. We will be in touch soon.');
  }
}());
