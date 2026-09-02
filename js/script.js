/**
 * PORTFOLIO - SCRIPT.JS
 * Author: Your Name
 * Description: Main JavaScript file for portfolio website
 * Features: Loading screen, navbar, typing effect, particles,
 *           skill bars, counters, testimonial slider, dark mode,
 *           contact form validation, and more.
 */

// ============================================================
// 1. LOADING SCREEN
// ============================================================
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 2000);
});

// ============================================================
// 2. THEME TOGGLE (DARK / LIGHT MODE)
// ============================================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

// Apply saved theme on load
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// ============================================================
// 3. STICKY NAVBAR & ACTIVE LINK ON SCROLL
// ============================================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky + scrolled class
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active navbar link based on scroll position
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Back to top visibility
  const backToTop = document.querySelector('.back-to-top');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ============================================================
// 4. HAMBURGER MOBILE MENU
// ============================================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ============================================================
// 5. TYPING ANIMATION EFFECT
// ============================================================
const typedElement = document.getElementById('typed-text');
const words = [
  'Aspiring Data Analyst',
  'Data Visualization Enthusiast',
  'Financial Analyst',
  'Business Intelligence Specialist',
  'Informatics Student',
  'Web Developer'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typedElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ============================================================
// 6. PARTICLE ANIMATION (CANVAS)
// ============================================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '239, 68, 68' : '167, 139, 250';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        const opacity = (1 - dist / 120) * 0.15;
        ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

// ============================================================
// 7. SKILL BARS ANIMATION
// ============================================================
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  skillBars.forEach(bar => {
    const target = bar.getAttribute('data-width');
    bar.style.width = target + '%';
  });
}

// ============================================================
// 8. ANIMATED COUNTERS
// ============================================================
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Easing function
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ============================================================
// 9. INTERSECTION OBSERVER (Skill Bars + Counter + AOS)
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Skill bars
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }

      // Counters
      if (entry.target.id === 'statistics') {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, target);
        });
      }

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
const statsSection = document.getElementById('statistics');
if (skillsSection) observer.observe(skillsSection);
if (statsSection) observer.observe(statsSection);

// ============================================================
// 10. ABOUT TABS
// ============================================================
const aboutTabs = document.querySelectorAll('.about-tab');
const aboutTabContents = document.querySelectorAll('.about-tab-content');

aboutTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    aboutTabs.forEach(t => t.classList.remove('active'));
    aboutTabContents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');
  });
});

// ============================================================
// 11. PORTFOLIO FILTER
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        card.style.animation = 'fade-in 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============================================================
// 12. TESTIMONIALS SLIDER
// ============================================================
const track = document.querySelector('.testimonials-track');
const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;
let autoSlideInterval;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('slider-dot');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

startAutoSlide();
if (track) {
  track.addEventListener('mouseenter', stopAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);
}

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

if (track) {
  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
  });
}

// ============================================================
// 13. CERTIFICATE MODAL
// ============================================================
const certCards = document.querySelectorAll('.cert-card');
const certModal = document.getElementById('cert-modal');
const certModalClose = document.getElementById('cert-modal-close');
const certModalOverlay = document.querySelector('.cert-modal-overlay');
const certModalImg = document.getElementById('cert-modal-img');
const certModalTitle = document.getElementById('cert-modal-title');

certCards.forEach(card => {
  card.addEventListener('click', () => {
    const imgSrc = card.getAttribute('data-img');
    const title = card.getAttribute('data-title');
    certModalImg.src = imgSrc;
    certModalTitle.textContent = title;
    certModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeCertModal() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
if (certModalOverlay) certModalOverlay.addEventListener('click', closeCertModal);

// ============================================================
// 14. CONTACT FORM VALIDATION
// ============================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (name.value.trim().length < 2) {
      showError(name, nameError, 'Nama harus minimal 2 karakter.');
      valid = false;
    } else {
      clearError(name, nameError);
    }

    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email, emailError, 'Masukkan alamat email yang valid.');
      valid = false;
    } else {
      clearError(email, emailError);
    }

    // Message validation
    const message = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (message.value.trim().length < 10) {
      showError(message, messageError, 'Pesan harus minimal 10 karakter.');
      valid = false;
    } else {
      clearError(message, messageError);
    }

    if (valid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Membuka WhatsApp...';
      submitBtn.disabled = true;

      const subjectInput = document.getElementById('subject');
      const subjectVal = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : 'Diskusi Proyek';

      // Format WhatsApp message
      const waNumber = '6285174220774';
      const waMessage = `Halo Muhammad Fadhila Ulinnuha,\n\nSaya ingin menghubungi Anda melalui website portofolio:\n👤 *Nama:* ${name.value.trim()}\n📧 *Email:* ${email.value.trim()}\n📌 *Subjek:* ${subjectVal}\n\n💬 *Pesan:*\n${message.value.trim()}`;

      const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(waMessage)}`;

      await new Promise(resolve => setTimeout(resolve, 600));

      // Open WhatsApp in a new tab
      window.open(waUrl, '_blank');

      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        successMsg.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i> Berhasil dialihkan ke WhatsApp! Pesan Anda telah siap dikirimkan.';
        successMsg.classList.add('visible');
      }

      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      if (successMsg) {
        setTimeout(() => successMsg.classList.remove('visible'), 5000);
      }
    }
  });

  // Real-time validation
  ['name', 'email', 'message'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          input.classList.remove('error');
          const errorEl = document.getElementById(`${id}-error`);
          if (errorEl) errorEl.classList.remove('visible');
        }
      });
    }
  });
}

function showError(input, errorEl, message) {
  input.classList.add('error');
  errorEl.textContent = message;
  errorEl.classList.add('visible');
}

function clearError(input, errorEl) {
  input.classList.remove('error');
  errorEl.classList.remove('visible');
}

// ============================================================
// 15. RIPPLE EFFECT ON BUTTONS
// ============================================================
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================================
// 16. LAZY LOADING IMAGES
// ============================================================
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      img.classList.add('loaded');
      obs.unobserve(img);
    }
  });
}, { rootMargin: '100px' });

lazyImages.forEach(img => imageObserver.observe(img));

// ============================================================
// 17. BACK TO TOP
// ============================================================
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// 18. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  });
});

// ============================================================
// 19. AOS (ANIMATE ON SCROLL) INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 0,
    });
  }
});

// ============================================================
// 20. KEYBOARD NAVIGATION & ACCESSIBILITY
// ============================================================
document.addEventListener('keydown', (e) => {
  // Close modal on Escape
  if (e.key === 'Escape') {
    closeCertModal();
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Slider keyboard navigation
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

// ============================================================
// 21. PERFORMANCE: Throttle scroll event
// ============================================================
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Re-apply throttle to scroll
window.addEventListener('scroll', throttle(() => {
  // (already handled above, this is a secondary trigger)
}, 100));
