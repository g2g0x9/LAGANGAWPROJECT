/* La Ganga – Interactive JS */
(function () {
  'use strict';

  /* ---- Hamburger / mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a nav link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Active nav highlight on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__nav a, .mobile-menu a');

  function setActiveLink() {
    const scrollY = window.scrollY + 80;
    sections.forEach(section => {
      if (
        scrollY >= section.offsetTop &&
        scrollY < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---- Clips tab filter ---- */
  const tabBtns = document.querySelectorAll('.clips-tab');
  const clipCards = document.querySelectorAll('.clip-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      clipCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---- Counter animation for stat values ---- */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ---- IntersectionObserver: animate on enter ---- */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Fade-up animation elements
        if (entry.target.classList.contains('animate-on-scroll')) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }

        // Counter elements
        if (entry.target.classList.contains('counter')) {
          const target = parseFloat(entry.target.dataset.target);
          animateCounter(entry.target, target, 1200);
          observer.unobserve(entry.target);
        }

        // Progress bars
        if (entry.target.classList.contains('progress-bar__fill')) {
          const width = entry.target.dataset.width;
          entry.target.style.width = width;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.animate-on-scroll, .counter, .progress-bar__fill').forEach(el => {
    if (el.classList.contains('progress-bar__fill')) {
      el.style.width = '0%';
    }
    observer.observe(el);
  });

  /* ---- Rankings table sort ---- */
  const tableHeaders = document.querySelectorAll('.rankings-table th[data-sort]');
  let sortState = { col: null, dir: 'desc' };

  tableHeaders.forEach(th => {
    th.style.cursor = 'pointer';
    th.title = 'Click to sort';

    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (sortState.col === col) {
        sortState.dir = sortState.dir === 'desc' ? 'asc' : 'desc';
      } else {
        sortState.col = col;
        sortState.dir = 'desc';
      }

      // Update header indicators
      tableHeaders.forEach(h => h.querySelector('.sort-icon')?.remove());
      const icon = document.createElement('span');
      icon.className = 'sort-icon';
      icon.textContent = sortState.dir === 'desc' ? ' ↓' : ' ↑';
      icon.style.color = 'var(--clr-secondary)';
      th.appendChild(icon);

      const tbody = th.closest('table').querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));

      rows.sort((a, b) => {
        const aVal = parseFloat(a.querySelector(`[data-col="${col}"]`)?.textContent.replace(/[^\d.]/g, '').replace(/\.(?=.*\.)/g, '')) || 0;
        const bVal = parseFloat(b.querySelector(`[data-col="${col}"]`)?.textContent.replace(/[^\d.]/g, '').replace(/\.(?=.*\.)/g, '')) || 0;
        return sortState.dir === 'desc' ? bVal - aVal : aVal - bVal;
      });

      rows.forEach(row => tbody.appendChild(row));
    });
  });

  /* ---- Tooltip on clip stat hover ---- */
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    const tip = document.createElement('div');
    tip.className = 'tooltip';
    tip.textContent = el.dataset.tooltip;
    Object.assign(tip.style, {
      position: 'fixed',
      background: 'var(--clr-surface-2)',
      color: 'var(--clr-text-1)',
      padding: '.3rem .65rem',
      borderRadius: 'var(--radius-sm)',
      fontSize: '.72rem',
      fontFamily: 'var(--font-body)',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity .15s',
      zIndex: '9999',
      border: '1px solid var(--clr-border)',
      whiteSpace: 'nowrap',
    });
    document.body.appendChild(tip);

    el.addEventListener('mouseenter', e => {
      tip.style.opacity = '1';
      tip.style.left = e.clientX + 10 + 'px';
      tip.style.top  = e.clientY - 32 + 'px';
    });
    el.addEventListener('mousemove', e => {
      tip.style.left = e.clientX + 10 + 'px';
      tip.style.top  = e.clientY - 32 + 'px';
    });
    el.addEventListener('mouseleave', () => { tip.style.opacity = '0'; });
  });

})();
