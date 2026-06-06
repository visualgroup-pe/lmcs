/* ═══════════════════════════════════════════
   LMCS — Premium JavaScript
   La Molina Christian Schools
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────
     LOADING SCREEN
  ────────────────────────────────────── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 2200);
  });

  /* ──────────────────────────────────────
     PARTICLES
  ────────────────────────────────────── */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 20}%;
        --dur: ${6 + Math.random() * 8}s;
        --delay: ${Math.random() * 6}s;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        opacity: ${0.3 + Math.random() * 0.5};
      `;
      particlesContainer.appendChild(p);
    }
  }

  /* ──────────────────────────────────────
     NAVBAR SCROLL BEHAVIOR
  ────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ──────────────────────────────────────
     MOBILE MENU
  ────────────────────────────────────── */
  const menuBtn  = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });

  /* ──────────────────────────────────────
     SMOOTH SCROLL (native fallback)
  ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────
     AOS INIT
  ────────────────────────────────────── */
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });

  /* ──────────────────────────────────────
     EDUCATION TABS
  ────────────────────────────────────── */
  const eduTabs   = document.querySelectorAll('.edu-tab');
  const eduPanels = document.querySelectorAll('.edu-panel');

  eduTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      eduTabs.forEach(t => t.classList.remove('active'));
      eduPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`tab-${target}`);
      if (panel) {
        panel.classList.add('active');
        AOS.refresh();
      }
    });
  });

  /* ──────────────────────────────────────
     GALLERY FILTER
  ────────────────────────────────────── */
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryItems   = document.querySelectorAll('.gallery-item');

  galleryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'none';
          requestAnimationFrame(() => {
            item.style.animation = '';
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ──────────────────────────────────────
     ANIMATED COUNTERS
  ────────────────────────────────────── */
  const counters = document.querySelectorAll('.counter-number');
  let countersStarted = false;

  const animateCounter = (el) => {
    const target = +el.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(animateCounter);
      }
    });
  }, { threshold: 0.3 });

  const logrosSection = document.getElementById('logros');
  if (logrosSection) counterObserver.observe(logrosSection);

  /* ──────────────────────────────────────
     STAT BARS ANIMATION
  ────────────────────────────────────── */
  const statBars = document.querySelectorAll('.stat-bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statBars.forEach(bar => barObserver.observe(bar));

  /* ──────────────────────────────────────
     TESTIMONIOS SWIPER
  ────────────────────────────────────── */
  new Swiper('.testimonios-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: { el: '.testimonios-pagination', clickable: true },
    navigation: { prevEl: '.testimonios-prev', nextEl: '.testimonios-next' },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2 },
    },
    effect: 'slide',
    grabCursor: true,
  });

  /* ──────────────────────────────────────
     TOUR SWIPER
  ────────────────────────────────────── */
  new Swiper('.tour-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.tour-pagination', clickable: true },
    navigation: { prevEl: '.tour-prev', nextEl: '.tour-next' },
    breakpoints: {
      640:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    grabCursor: true,
  });

  /* ──────────────────────────────────────
     ADMISSION FORM
  ────────────────────────────────────── */
  const admissionForm = document.getElementById('admission-form');
  if (admissionForm) {
    admissionForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = admissionForm.querySelector('.btn-submit');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>¡Mensaje enviado!';
        btn.classList.add('success');
        admissionForm.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('success');
          btn.disabled = false;
        }, 4000);
      }, 1800);
    });
  }

  /* ──────────────────────────────────────
     NEWSLETTER FORM
  ────────────────────────────────────── */
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.newsletter-btn');
      btn.textContent = '¡Suscrito!';
      btn.style.background = '#10b981';
      btn.style.color = 'white';
      form.querySelector('input').value = '';
      setTimeout(() => {
        btn.textContent = 'Suscribirse';
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    });
  });

  /* ──────────────────────────────────────
     PARALLAX HERO (subtle)
  ────────────────────────────────────── */
  const heroSection = document.getElementById('inicio');
  const heroBg = heroSection?.querySelector('.hero-gradient-bg');

  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────
     ACTIVE NAV LINK ON SCROLL
  ────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active-nav', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ──────────────────────────────────────
     NAVBAR ACTIVE LINK STYLE (dynamic)
  ────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `.nav-link.active-nav { color: var(--gold) !important; }
    .nav-link.active-nav::after { width: 100% !important; }`;
  document.head.appendChild(style);

  /* ──────────────────────────────────────
     LIGHTBOX (simple)
  ────────────────────────────────────── */
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    galleryGrid.addEventListener('click', e => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `position:fixed;inset:0;z-index:9998;background:rgba(6,15,37,0.95);display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(10px);animation:fadeIn 0.3s ease;`;

      const label = item.querySelector('.gallery-overlay span')?.textContent || 'LMCS';
      const imgSrc = item.querySelector('img')?.src || '';
      const inner = document.createElement('div');
      inner.style.cssText = `text-align:center;color:white;`;
      inner.innerHTML = imgSrc
        ? `<img src="${imgSrc}" alt="${label}" style="max-width:min(90vw,800px);max-height:80vh;border-radius:16px;object-fit:contain;display:block;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
           <p style="font-family:Poppins,sans-serif;font-weight:600;color:rgba(255,255,255,0.8);margin-top:14px;font-size:0.95rem;">${label}</p>
           <p style="font-family:Inter,sans-serif;font-size:0.8rem;color:rgba(255,255,255,0.4);margin-top:6px;">Haz clic en cualquier lugar para cerrar</p>`
        : `<div style="width:min(80vw,500px);height:300px;background:rgba(255,255,255,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:16px;">
             <i class="fas fa-image" style="font-size:3rem;color:rgba(201,168,76,0.5);"></i>
             <p style="font-family:Poppins,sans-serif;font-weight:600;color:rgba(255,255,255,0.7);margin-top:12px;">${label}</p>
           </div>
           <p style="font-family:Inter,sans-serif;font-size:0.85rem;color:rgba(255,255,255,0.4);">Haz clic en cualquier lugar para cerrar</p>`;
      overlay.appendChild(inner);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      overlay.addEventListener('click', () => {
        overlay.remove();
        document.body.style.overflow = '';
      });
    });
  }

  /* ──────────────────────────────────────
     FADE IN ANIMATION CSS
  ────────────────────────────────────── */
  const fadeStyle = document.createElement('style');
  fadeStyle.textContent = `@keyframes fadeIn{from{opacity:0}to{opacity:1}}`;
  document.head.appendChild(fadeStyle);

  /* ──────────────────────────────────────
     SCROLL TO TOP on logo click
  ────────────────────────────────────── */
  document.querySelectorAll('a[href="#inicio"]').forEach(a => {
    a.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });

});
