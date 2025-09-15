document.addEventListener("DOMContentLoaded", function () {

  /* ======================================== */
  /*                CONTACT FORM MODAL         */
  /* ======================================== */
  const form = document.querySelector("#contact form");
  const modalEl = document.getElementById('formModal');
  const modal = new bootstrap.Modal(modalEl);
  const modalBody = modalEl.querySelector('.modal-body');
  const modalTitle = modalEl.querySelector('.modal-title');

  // Initialisation des tooltips Bootstrap
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      animation: true,
      delay: { "show": 200, "hide": 100 }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          form.reset();
          modalEl.classList.remove('modal-error');
          modalEl.classList.add('modal-success');
          modalTitle.textContent = "Message envoyé !";
          modalBody.textContent = "Merci ! Votre message a été envoyé avec succès.";
        } else {
          modalEl.classList.remove('modal-success');
          modalEl.classList.add('modal-error');
          modalTitle.textContent = "Erreur";
          modalBody.textContent = "Oups ! Une erreur est survenue.";
        }
        modal.show();
      })
      .catch(() => {
        modalEl.classList.remove('modal-success');
        modalEl.classList.add('modal-error');
        modalTitle.textContent = "Erreur";
        modalBody.textContent = "Oups ! Une erreur est survenue.";
        modal.show();
      });

  });

  /* ======================================== */
  /*              COUNTER ANIMATION           */
  /* ======================================== */
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.unobserve(counter);
      }
    }, { threshold: 0.5 });

    observer.observe(counter);
  });

  // Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = scrollPercent + '%';
  });

  /* ======================================== */
  /*            LANGUAGE SWITCHER             */
  /* ======================================== */

  let currentLang = 'en';
  
  // Initialiser en anglais par défaut
  document.addEventListener('DOMContentLoaded', function() {
    // S'assurer que tous les éléments sont en anglais au chargement
    document.querySelectorAll('[data-lang-fr]').forEach(el => {
      const englishText = el.getAttribute('data-lang-en');
      if (englishText) {
        if (el.tagName === 'H1' && el.innerHTML.includes('<span')) {
          const spanContent = el.querySelector('span').outerHTML;
          el.innerHTML = `Hi, I'm ${spanContent}`;
        } else {
          el.textContent = englishText;
        }
      }
    });
  });

  window.toggleLanguage = function () {
    currentLang = currentLang === 'en' ? 'fr' : 'en';

    document.querySelectorAll('[data-lang-fr]').forEach(el => {
      const newText = currentLang === 'en'
        ? el.getAttribute('data-lang-en')
        : el.getAttribute('data-lang-fr');
      
      // Gestion spéciale pour les titres avec HTML
      if (el.tagName === 'H1' && el.innerHTML.includes('<span')) {
        const spanContent = el.querySelector('span').outerHTML;
        if (currentLang === 'fr') {
          el.innerHTML = `Salut, je suis ${spanContent}`;
        } else {
          el.innerHTML = `Hi, I'm ${spanContent}`;
        }
      } else {
        el.textContent = newText;
      }
    });

    // Mise à jour du bouton avec animation
    const langBtn = document.getElementById('langBtn');
    langBtn.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      if (currentLang === 'en') {
        langBtn.innerHTML = `<span class="fi fi-gb"></span>`;
        langBtn.setAttribute('title', 'Switch to French');
      } else {
        langBtn.innerHTML = `<span class="fi fi-fr"></span>`;
        langBtn.setAttribute('title', 'Passer en anglais');
      }
      langBtn.style.transform = 'scale(1)';
    }, 150);

    // Sauvegarder la préférence
    localStorage.setItem('language', currentLang);
  };
  
  // Charger la langue sauvegardée
  const savedLang = localStorage.getItem('language');
  if (savedLang && savedLang !== currentLang) {
    toggleLanguage();
  }

  /* ======================================== */
  /*              DARK MODE TOGGLE            */
  /* ======================================== */
  
  window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const darkModeBtn = document.getElementById('darkModeBtn');
    
    if (isDark) {
      darkModeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      darkModeBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
      localStorage.setItem('darkMode', 'disabled');
    }
  };
  
  // Charger la préférence du mode sombre
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeBtn').innerHTML = '<i class="bi bi-sun-fill"></i>';
  }

  /* ======================================== */
  /*              HERO PARTICLES              */
  /* ======================================== */
  
  function createParticles() {
    const hero = document.querySelector('header');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    hero.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particlesContainer.appendChild(particle);
    }
  }
  
  createParticles();
});
