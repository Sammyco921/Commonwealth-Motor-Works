/* Commonwealth Motor Company — site behaviour
   Two small, independent pieces: the mobile navigation panel and the
   commission enquiry form. */
(function () {
  'use strict';

  /* ---- Mobile navigation ------------------------------------------------- */
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('mb');

  function closeMenu(focusButton) {
    if (!nav || !menuBtn) return;
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = 'Menu';
    if (focusButton) menuBtn.focus();
  }

  if (nav && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? 'Close' : 'Menu';
    });

    // Close after choosing a destination.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1180) closeMenu(false);
    });
  }

  /* ---- Sticky offsets and the commission stage index -------------------- */
  var header = document.querySelector('header');

  function measureHeader() {
    if (header) document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }
  measureHeader();
  window.addEventListener('resize', measureHeader);
  window.addEventListener('load', measureHeader);

  var stageIndex = document.querySelector('.stage-index');
  var stages = [].slice.call(document.querySelectorAll('.stage[id]'));
  if (stageIndex && stages.length) {
    var links = {};
    [].slice.call(stageIndex.querySelectorAll('a[href^="#"]')).forEach(function (anchor) {
      links[anchor.getAttribute('href').slice(1)] = anchor;
    });

    var currentId = null;
    function setCurrent(id) {
      if (!id || id === currentId || !links[id]) return;
      currentId = id;
      Object.keys(links).forEach(function (key) { links[key].removeAttribute('aria-current'); });
      links[id].setAttribute('aria-current', 'location');
    }

    // The active stage is the last one whose top has passed the 40% line.
    var ticking = false;
    function updateStageIndex() {
      ticking = false;
      var line = window.innerHeight * 0.4;
      var activeId = stages[0].id;
      stages.forEach(function (stage) {
        if (stage.getBoundingClientRect().top <= line) activeId = stage.id;
      });
      setCurrent(activeId);
    }
    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateStageIndex);
      }
    }
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    updateStageIndex();
  }

  /* ---- Commission enquiry form ------------------------------------------ */
  var form = document.getElementById('f');
  if (!form) return;

  var FIELDS = [
    { name: 'name', error: 'e-name', test: function (v) { return v.trim().length > 0; }, message: 'Please tell us your name.' },
    { name: 'email', error: 'e-email', test: function (v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim()); }, message: 'Please enter a valid email address.' },
    { name: 'b', error: 'e-b', test: function (v) { return v.trim().length > 0; }, message: 'A few words are enough: what should it feel like?' }
  ];

  function clearErrors() {
    FIELDS.forEach(function (field) {
      var input = form.elements[field.name];
      if (input) input.setAttribute('aria-invalid', 'false');
      var message = document.getElementById(field.error);
      if (message) message.textContent = '';
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstInvalid = null;
    FIELDS.forEach(function (field) {
      var input = form.elements[field.name];
      if (!input) return;
      var valid = field.test(input.value);
      input.setAttribute('aria-invalid', valid ? 'false' : 'true');
      var message = document.getElementById(field.error);
      if (message) message.textContent = valid ? '' : field.message;
      if (!valid && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    form.hidden = true;
    var confirmation = document.getElementById('ok');
    if (confirmation) {
      confirmation.hidden = false;
      confirmation.focus();
    }
  });

  // If the form is ever restored, clear it back to a clean state.
  form.addEventListener('reset', function () {
    clearErrors();
    var confirmation = document.getElementById('ok');
    if (confirmation) confirmation.hidden = true;
    form.hidden = false;
  });
})();
