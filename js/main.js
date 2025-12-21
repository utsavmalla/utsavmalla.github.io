// Minimal JS: Theme toggle, smooth scroll, reveal-on-scroll, and small accessibility helpers
(function(){
  'use strict';

  // set year in footer
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme (dark/light) - persisted in localStorage
  var body = document.body;
  var toggle = document.getElementById('theme-toggle');
  var stored = localStorage.getItem('theme');
  if(stored) body.setAttribute('data-theme', stored);
  else body.setAttribute('data-theme', 'dark');

  function setTheme(name){
    body.setAttribute('data-theme', name);
    localStorage.setItem('theme', name);
    if(toggle) toggle.setAttribute('aria-pressed', String(name === 'light'));
  }

  if(toggle){
    toggle.addEventListener('click', function(){
      var cur = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(cur);
    });
    toggle.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); } });
  }

  // Smooth scroll for internal links
  document.addEventListener('click', function(e){
    var a = e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href');
    if(!href || href.charAt(0) !== '#') return;
    var target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      target.focus({preventScroll:true});
    }
  });

  // Reveal on scroll using IntersectionObserver
  var reveals = document.querySelectorAll('.reveal, .project-card, .skill, section');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  reveals.forEach(function(el){ el.classList.add('reveal'); io.observe(el); });

  // small enhancement: graceful form handling (no backend here)
  var form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if(btn){ btn.disabled = true; btn.textContent = 'Sending…'; }
      setTimeout(function(){
        alert('This demo form does not send messages. Replace with your form endpoint or use Formspree/Netlify Forms.');
        if(btn){ btn.disabled = false; btn.textContent = 'Send Message'; }
        form.reset();
      },800);
    });
  }
})();
