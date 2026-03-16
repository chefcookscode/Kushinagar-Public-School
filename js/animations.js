// ============================================
// KUSHINAGAR PUBLIC SCHOOL - ANIMATIONS JS
// ============================================

(function () {
  'use strict';

  // ── AOS Initialization ─────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        once: true,
        offset: 60,
        delay: 0,
      });
    }
  });

  // ── Typewriter Effect ──────────────────────
  const typewriterEl = document.getElementById('typewriter-text');
  const phrases = [
    'Excellence in Education',
    'Shaping Future Leaders',
    'Nurturing Young Minds',
    'Building Tomorrow Today',
    'CBSE Affiliated School',
  ];

  if (typewriterEl) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          typingSpeed = 2200; // pause before delete
        } else {
          typingSpeed = 90;
        }
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingSpeed = 300;
        }
      }
      setTimeout(type, typingSpeed);
    }

    // Start after preloader
    setTimeout(type, 2000);
  }

  // ── Counter Animation ──────────────────────
  const counters = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.querySelector('.stat-suffix') ? el.querySelector('.stat-suffix').textContent : '';
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(startValue + (target - startValue) * eased);

      // Preserve the suffix element
      const suffixEl = el.querySelector('.stat-suffix');
      el.childNodes[0].textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    // Set initial text node if needed
    if (!el.querySelector('.stat-suffix')) {
      el.textContent = '0';
    } else {
      el.childNodes[0].textContent = '0';
    }

    requestAnimationFrame(update);
  }

  // Intersection Observer for counters
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ── Particle System (hero) ─────────────────
  const heroParticles = document.querySelector('.hero-particles');

  if (heroParticles) {
    const colors = ['rgba(200,145,47,0.4)', 'rgba(200,145,47,0.2)', 'rgba(255,255,255,0.1)', 'rgba(123,29,29,0.3)'];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 8 + 4;
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = Math.random() * 10 + 8;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: ${color};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `;
      heroParticles.appendChild(particle);
    }
  }

  // ── Number Ticker (inline stats) ──────────
  // Hero stats animate on appear
  const heroStats = document.querySelectorAll('.hero-stat-num[data-target]');
  if (heroStats.length > 0) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          const target = parseInt(entry.target.getAttribute('data-target'));
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.textContent = Math.floor(current) + (entry.target.getAttribute('data-suffix') || '');
          }, 25);
        }
      });
    }, { threshold: 0.5 });

    heroStats.forEach(stat => heroObserver.observe(stat));
  }

})();
