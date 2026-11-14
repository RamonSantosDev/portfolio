
              (() => {
    'use strict';

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => [...document.querySelectorAll(selector)];

    const header = $('#header');
    const progress = $('#progress');
    const toggle = $('#menuToggle');
    const nav = $('#navLinks');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');

    $('#year').textContent = new Date().getFullYear();

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      header.classList.toggle('menu-open', open);
    });

    $$('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        header.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      });
    });

    $('#moreProjects').addEventListener('click', () => {
      const extra = $('#extraProjects');
      const expanded = extra.hidden;
      extra.hidden = !expanded;
      $('#moreProjects').setAttribute('aria-expanded', String(expanded));
      $('#moreProjects').textContent = expanded
        ? 'Ver menos projetos ↑'
        : 'Ver mais projetos ↓';
    });

   

    const revealObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 })
      : null;

    $$('.reveal').forEach((element) => {
      if (reduce.matches || !revealObserver) {
        element.classList.add('visible');
      } else {
        revealObserver.observe(element);
      }
    });

    const sections = $$('main section[id]');
    let ticking = false;

    function update() {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + '%';
      header.classList.toggle('scrolled', scrollY > 25);

      let active = 'inicio';
      for (const section of sections) {
        if (section.getBoundingClientRect().top < innerHeight * 0.35) {
          active = section.id;
        }
      }

      $$('.nav-links a').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + active);
      });

      if (!reduce.matches) {
        const hero = $('.hero');
        if (hero.getBoundingClientRect().bottom > 0) {
          $$('[data-parallax]').forEach((element) => {
            const speed = parseFloat(element.dataset.parallax);
            element.style.transform = `translate3d(0,${Math.min(scrollY, innerHeight) * speed}px,0)`;
          });
        }

        $$('[data-project-parallax]').forEach((element) => {
          const box = element.closest('.project-media').getBoundingClientRect();
          if (box.bottom > 0 && box.top < innerHeight) {
            const delta = (box.top + box.height / 2 - innerHeight / 2) / innerHeight;
            element.style.transform = `translate3d(0,${-delta * 35}px,0)`;
          }
        });
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
  })();
