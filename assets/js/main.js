// ═══════════════════════════════════════════════════════════════════════════
// PSI - Main JavaScript
// NASA-inspired interactions and animations
// ═══════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // STARFIELD ANIMATION
    // ═══════════════════════════════════════════════════════════════════════
    class Starfield {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.stars = [];
            this.shootingStars = [];
            this.mouse = { x: 0, y: 0 };
            this.targetMouse = { x: 0, y: 0 };
            
            this.resize();
            this.createStars();
            this.bindEvents();
            this.animate();
        }

        resize() {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
        }

        createStars() {
            const starCount = Math.floor((this.width * this.height) / 8000);
            this.stars = [];
            
            for (let i = 0; i < starCount; i++) {
                this.stars.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.8 + 0.2,
                    speed: Math.random() * 0.02 + 0.005,
                    twinkleSpeed: Math.random() * 0.02 + 0.01,
                    twinklePhase: Math.random() * Math.PI * 2
                });
            }
        }

        createShootingStar() {
            if (Math.random() > 0.997 && this.shootingStars.length < 2) {
                this.shootingStars.push({
                    x: Math.random() * this.width,
                    y: 0,
                    length: Math.random() * 80 + 40,
                    speed: Math.random() * 8 + 6,
                    opacity: 1,
                    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3
                });
            }
        }

        bindEvents() {
            window.addEventListener('resize', () => {
                this.resize();
                this.createStars();
            });

            document.addEventListener('mousemove', (e) => {
                this.targetMouse.x = (e.clientX / this.width - 0.5) * 20;
                this.targetMouse.y = (e.clientY / this.height - 0.5) * 20;
            });
        }

        animate() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            // Smooth mouse following
            this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
            this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

            // Draw and update stars
            this.stars.forEach(star => {
                star.twinklePhase += star.twinkleSpeed;
                const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
                
                // Parallax effect
                const parallaxX = star.x + this.mouse.x * (star.size * 0.5);
                const parallaxY = star.y + this.mouse.y * (star.size * 0.5);
                
                this.ctx.beginPath();
                this.ctx.arc(parallaxX, parallaxY, star.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
                this.ctx.fill();
            });

            // Create and update shooting stars
            this.createShootingStar();
            
            this.shootingStars = this.shootingStars.filter(star => {
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                star.opacity -= 0.015;

                if (star.opacity > 0) {
                    const gradient = this.ctx.createLinearGradient(
                        star.x, star.y,
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );
                    gradient.addColorStop(0, `rgba(255, 77, 0, ${star.opacity})`);
                    gradient.addColorStop(0.3, `rgba(255, 171, 0, ${star.opacity * 0.6})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                    this.ctx.beginPath();
                    this.ctx.moveTo(star.x, star.y);
                    this.ctx.lineTo(
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                    
                    return true;
                }
                return false;
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // HEADER SCROLL EFFECT
    // ═══════════════════════════════════════════════════════════════════════
    class Header {
        constructor() {
            this.header = document.querySelector('.site-header');
            if (!this.header) return;
            
            this.lastScroll = 0;
            this.bindEvents();
        }

        bindEvents() {
            window.addEventListener('scroll', () => this.onScroll(), { passive: true });
            this.onScroll(); // Initial check
        }

        onScroll() {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            this.lastScroll = scrollY;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MOBILE NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════
    class MobileNav {
        constructor() {
            this.toggle = document.querySelector('.mobile-menu-toggle');
            this.menu = document.querySelector('.nav-menu');
            if (!this.toggle || !this.menu) return;
            
            this.bindEvents();
        }

        bindEvents() {
            this.toggle.addEventListener('click', () => this.toggleMenu());
            
            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
                    this.closeMenu();
                }
            });

            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeMenu();
            });

            // Close on link click
            this.menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }

        toggleMenu() {
            const isExpanded = this.toggle.getAttribute('aria-expanded') === 'true';
            this.toggle.setAttribute('aria-expanded', !isExpanded);
            this.menu.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        }

        closeMenu() {
            this.toggle.setAttribute('aria-expanded', 'false');
            this.menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // REVEAL ON SCROLL
    // ═══════════════════════════════════════════════════════════════════════
    class RevealOnScroll {
        constructor() {
            this.elements = document.querySelectorAll('.feature-card, .project-card, .event-card, .team-card, .contact-method, .content-block');
            if (!this.elements.length) return;
            
            this.init();
        }

        init() {
            // Add reveal class to all elements
            this.elements.forEach((el, index) => {
                el.classList.add('reveal');
                el.style.transitionDelay = `${index * 0.1}s`;
            });

            // Create observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            this.elements.forEach(el => observer.observe(el));
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SMOOTH ANCHOR LINKS
    // ═══════════════════════════════════════════════════════════════════════
    class SmoothScroll {
        constructor() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;
                    
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // CURSOR GLOW EFFECT (Desktop only)
    // ═══════════════════════════════════════════════════════════════════════
    class CursorGlow {
        constructor() {
            if (window.matchMedia('(hover: none)').matches) return;
            
            this.glow = document.createElement('div');
            this.glow.className = 'cursor-glow';
            this.glow.style.cssText = `
                position: fixed;
                width: 400px;
                height: 400px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 77, 0, 0.06) 0%, transparent 70%);
                pointer-events: none;
                z-index: -1;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
                opacity: 0;
            `;
            document.body.appendChild(this.glow);
            
            this.bindEvents();
        }

        bindEvents() {
            document.addEventListener('mousemove', (e) => {
                this.glow.style.left = e.clientX + 'px';
                this.glow.style.top = e.clientY + 'px';
                this.glow.style.opacity = '1';
            });

            document.addEventListener('mouseleave', () => {
                this.glow.style.opacity = '0';
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // TYPING EFFECT FOR HERO
    // ═══════════════════════════════════════════════════════════════════════
    class TypingEffect {
        constructor() {
            const heroStatus = document.querySelector('.hero-status');
            if (!heroStatus) return;
            
            const text = heroStatus.textContent;
            heroStatus.textContent = '';
            heroStatus.style.opacity = '1';
            
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    heroStatus.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                }
            };
            
            setTimeout(type, 1000);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // INITIALIZE
    // ═══════════════════════════════════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize starfield
        const canvas = document.getElementById('stars-canvas');
        if (canvas) {
            new Starfield(canvas);
        }

        // Initialize components
        new Header();
        new MobileNav();
        new RevealOnScroll();
        new SmoothScroll();
        new CursorGlow();
        new TypingEffect();

        // Add loaded class for any CSS animations
        document.body.classList.add('loaded');
    });

})();
