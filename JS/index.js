'use strict';

// ========== PRELOADER ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('preloader--hidden');
        document.body.style.overflow = '';
    }, 1500);
});
document.body.style.overflow = 'hidden';

// ========== AOS ==========
AOS.init({ duration: 1000, once: true, offset: 100 });

// ========== HEADER SCROLL ==========
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('header--scrolled', window.scrollY > 50);
});

// ========== MOBILE MENU ==========
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav__menu--active');
    navToggle.classList.toggle('nav__toggle--active');
});
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('nav__menu--active');
        navToggle.classList.remove('nav__toggle--active');
    });
});

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('theme-toggle');
const getTheme = () => localStorage.getItem('theme') || 'light';
const setTheme = (t) => { document.documentElement.setAttribute('data-theme', t); localStorage.setItem('theme', t); };
setTheme(getTheme());
themeToggle.addEventListener('click', () => setTheme(getTheme() === 'light' ? 'dark' : 'light'));

// ========== HERO SWIPER ==========
new Swiper('.hero-swiper', {
    slidesPerView: 1, loop: true, autoplay: { delay: 5000 }, effect: 'fade', speed: 1000,
});

// ========== PROJECTS SWIPER ==========
new Swiper('.projects-swiper', {
    slidesPerView: 1, spaceBetween: 20, loop: true, autoplay: { delay: 4000 },
    pagination: { el: '.projects__pagination', clickable: true },
    breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
});

// ========== COUNTERS ==========
const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'));
    const step = target / 125; let current = 0;
    const update = () => {
        current += step;
        if (current < target) { el.textContent = Math.floor(current); requestAnimationFrame(update); }
        else el.textContent = target;
    };
    update();
};
new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); } });
}, { threshold: 0.5 }).observe(document.querySelectorAll('[data-counter]')[0]?.parentElement || document.body);

document.querySelectorAll('[data-counter]').forEach(c => {
    new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); } });
    }, { threshold: 0.5 }).observe(c);
});

// ========== WHATSAPP FORM ==========
document.getElementById('whatsapp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    if (!name || !phone || !service || !message) return alert('Complete todos los campos obligatorios.');
    
    let msg = `*NUEVA SOLICITUD M32 CONSTRUCTORA*%0A%0A👤 *Nombre:* ${name}%0A📱 *Teléfono:* ${phone}%0A`;
    const email = document.getElementById('email').value.trim();
    if (email) msg += `📧 *Email:* ${email}%0A`;
    msg += `🔧 *Servicio:* ${service}%0A📝 *Mensaje:* ${message}`;
    
    window.open(`https://wa.me/521234567890?text=${msg}`, '_blank');
    document.getElementById('whatsapp-form').reset();
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const el = document.querySelector(this.getAttribute('href'));
        if (el) { e.preventDefault(); window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }
    });
});

// ========== HAMMER CURSOR ==========
const hammerCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'hammer-cursor';
    cursor.innerHTML = '<i class="fas fa-hammer"></i>';
    document.body.appendChild(cursor);
    
    const impact = document.createElement('div');
    impact.className = 'hammer-impact';
    document.body.appendChild(impact);
    
    let mx = 0, my = 0, cx = 0, cy = 0;
    
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    
    document.addEventListener('click', (e) => {
        cursor.classList.add('hammer-cursor--hit');
        setTimeout(() => cursor.classList.remove('hammer-cursor--hit'), 300);
        impact.style.left = e.clientX - 25 + 'px';
        impact.style.top = e.clientY - 25 + 'px';
        impact.classList.add('hammer-impact--active');
        setTimeout(() => impact.classList.remove('hammer-impact--active'), 500);
        
        const ripple = document.createElement('div');
        ripple.className = 'hammer-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
    
    const animate = () => {
        cx += (mx - cx) * 0.2;
        cy += (my - cy) * 0.2;
        cursor.style.left = cx - 15 + 'px';
        cursor.style.top = cy - 15 + 'px';
        requestAnimationFrame(animate);
    };
    animate();
    
    document.querySelectorAll('a, button, .service-card, .project-card, input, select, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hammer-cursor--hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hammer-cursor--hover'));
    });
    
    document.body.style.cursor = 'none';
};

const hammerStyles = document.createElement('style');
hammerStyles.textContent = `
    .hammer-cursor { position: fixed; width: 40px; height: 40px; pointer-events: none; z-index: 99999; font-size: 1.5rem; color: var(--color-primary); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); transform: rotate(-30deg); transform-origin: bottom right; transition: transform 0.1s; }
    .hammer-cursor--hover { transform: rotate(-30deg) scale(1.3); color: var(--color-primary-dark); }
    .hammer-cursor--hit { animation: hit 0.3s cubic-bezier(0.68,-0.55,0.265,1.55); }
    @keyframes hit { 0%{transform:rotate(-30deg) scale(1)} 30%{transform:rotate(-60deg) scale(1.3)} 60%{transform:rotate(-20deg) scale(0.9)} 100%{transform:rotate(-30deg) scale(1)} }
    .hammer-impact { position: fixed; width: 50px; height: 50px; pointer-events: none; z-index: 99998; border-radius: 50%; background: radial-gradient(circle, rgba(74,93,78,0.4) 0%, transparent 70%); opacity: 0; transform: scale(0); }
    .hammer-impact--active { animation: impact 0.5s ease-out forwards; }
    @keyframes impact { 0%{opacity:1;transform:scale(0)} 100%{opacity:0;transform:scale(3)} }
    .hammer-ripple { position: fixed; width: 10px; height: 10px; pointer-events: none; z-index: 99997; border-radius: 50%; border: 2px solid rgba(74,93,78,0.6); transform: translate(-50%,-50%) scale(1); animation: ripple 0.6s ease-out forwards; }
    @keyframes ripple { 0%{width:10px;height:10px;opacity:1} 100%{width:80px;height:80px;opacity:0} }
`;
document.head.appendChild(hammerStyles);
document.addEventListener('DOMContentLoaded', hammerCursor);