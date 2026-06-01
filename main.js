// ====== PARTICLES SYSTEM ======
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

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
        this.color = Math.random() > 0.5 ? '168, 85, 247' : '6, 182, 212';
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
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.5)`;
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < maxDist) {
                const opacity = (1 - dist / maxDist) * 0.15;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    connectParticles();
    ctx.shadowBlur = 0;
    
    animationId = requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

resizeCanvas();
initParticles();
animateParticles();

// ====== NAVBAR SCROLL ======
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ====== HAMBURGER MENU ======
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ====== SCROLL REVEAL ======
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// ====== ACCORDION RULES ======
document.querySelectorAll('.rule-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const wasActive = item.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.rule-item').forEach(i => i.classList.remove('active'));
        
        // Toggle clicked
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// ====== SMOOTH SCROLL ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ====== TYPING EFFECT FOR HERO ======
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    const originalHTML = tagline.innerHTML;
    tagline.style.opacity = '0';
    setTimeout(() => {
        tagline.style.opacity = '1';
        tagline.style.transition = 'opacity 1s ease';
    }, 800);
}

// ====== COUNTER ANIMATION ======
function animateCounters() {
    // Placeholder for future stat counters
}

// ====== CURSOR TRAIL EFFECT ======
const cursorTrail = [];
const maxTrail = 20;

document.addEventListener('mousemove', (e) => {
    // Only on desktop
    if (window.innerWidth < 900) return;
    
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        background: rgba(168, 85, 247, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: opacity 0.5s ease;
        box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => trail.remove(), 500);
    }, 100);
});

// Throttle cursor trail
let lastTrailTime = 0;
const originalMoveHandler = document.onmousemove;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < 50) return;
    lastTrailTime = now;
});

// ====== RULES - AUTO-OPEN FIRST ======
const firstRule = document.querySelector('.rule-item');
if (firstRule) {
    firstRule.classList.add('active');
}

console.log('%c🎮 The Digital Den', 'font-size: 24px; font-weight: bold; color: #a855f7; text-shadow: 2px 2px #06b6d4;');
console.log('%cWelcome to the digital side.', 'font-size: 14px; color: #94a3b8;');
