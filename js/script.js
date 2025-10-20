// ===== LANGUAGE SYSTEM =====
let currentLanguage = localStorage.getItem('language') || 'es';

function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update current language indicator
    const currentLangSpan = document.getElementById('currentLang');
    if (currentLangSpan) {
        currentLangSpan.textContent = lang.toUpperCase();
    }

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let translation = translations[currentLanguage];

        for (let k of keys) {
            translation = translation[k];
        }

        if (translation) {
            element.textContent = translation;
        }
    });

    // Update page title
    document.title = translations[currentLanguage].hero.title + ' - Marc RoMa-88';

    // Update form placeholders
    updateFormPlaceholders();
}

function updateFormPlaceholders() {
    // Update regular translatable elements
    const elements = document.querySelectorAll('[data-translate-placeholder]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const keys = key.split('.');
        let translation = translations[currentLanguage];

        for (let k of keys) {
            translation = translation[k];
        }

        if (translation) {
            element.placeholder = translation;
        }
    });

    // Update button text
    const sendBtn = document.querySelector('button[type="submit"]');
    if (sendBtn) {
        const btnSpan = sendBtn.querySelector('span[data-translate]');
        if (btnSpan) {
            btnSpan.textContent = translations[currentLanguage].contact.send;
        }
    }
}

// ===== THEME TOGGLE FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);

    // Update icon based on current theme
    updateThemeIcon(currentTheme);

    // Theme toggle event listener
    themeBtn.addEventListener('click', function () {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add animation effect
        themeBtn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeBtn.style.transform = 'scale(1)';
        }, 150);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    // Initialize language system
    updateLanguage(currentLanguage);

    // Navigation function for projects
    window.navigateToProjects = function () {
        // Try multiple navigation methods
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');
        const projectsUrl = baseUrl + '/codeOpenSource/';

        // Method 1: Direct navigation
        window.location.href = projectsUrl;

        // Fallback: Try alternative paths after a short delay
        setTimeout(() => {
            if (window.location.href === window.location.origin + window.location.pathname) {
                // Method 2: Try with relative path
                window.location.href = './codeOpenSource/';
            }
        }, 100);

        setTimeout(() => {
            if (window.location.href === window.location.origin + window.location.pathname) {
                // Method 3: Try with absolute path from root
                window.location.href = '/codeOpenSource/';
            }
        }, 200);
    };

    // Language toggle functionality
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function () {
            const selectedLang = this.getAttribute('data-lang');
            updateLanguage(selectedLang);

            // Add animation effect
            const langBtn = document.getElementById('langBtn');
            langBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                langBtn.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
});

// ===== SKILL BARS ANIMATION =====
document.addEventListener('DOMContentLoaded', function () {
    const skillBars = document.querySelectorAll('.skill-progress');

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.classList.add('animated');
            }
        });
    };

    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);

    // Animate on page load if skills section is visible
    animateSkillBars();
});

// ===== TYPING ANIMATION FOR HERO =====
document.addEventListener('DOMContentLoaded', function () {
    const typingElement = document.querySelector('.code-animation');
    if (!typingElement) return;

    const codeLines = [
        'const developer = "Bioinformático"',
        'function createPortfolio() {',
        '    return "Innovación"',
        '}'
    ];

    let currentLine = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeCode() {
        const lineElement = typingElement.children[currentLine];
        if (!lineElement) return;

        const currentText = codeLines[currentLine];

        if (isDeleting) {
            lineElement.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
        } else {
            lineElement.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
        }

        if (!isDeleting && currentChar === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
                typeCode();
            }, 2000);
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentLine = (currentLine + 1) % codeLines.length;
            setTimeout(typeCode, 500);
        } else {
            setTimeout(typeCode, isDeleting ? 50 : 100);
        }
    }

    // Start typing animation after a delay
    setTimeout(typeCode, 1000);
});

// ===== PARALLAX EFFECT FOR HERO =====
document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        if (heroContent) {
            heroContent.style.transform = `translateY(${parallax}px)`;
        }
    });
});

// ===== PARTICLE ANIMATION =====
document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
    `;
    hero.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(135deg, #8b5cf6, #3b82f6);
            border-radius: 50%;
            opacity: 0.6;
            animation: float ${5 + Math.random() * 10}s infinite linear;
        `;

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 10 + 's';

        container.appendChild(particle);

        // Remove and recreate particle after animation
        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, (5 + Math.random() * 10) * 1000);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===== FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('¡Mensaje enviado correctamente!', 'success');

                // Reset form
                this.reset();

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .project-card, .skill-category, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// ===== NAVBAR SCROLL EFFECT =====
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add scrolled styles
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            background: rgba(10, 10, 10, 0.95) !important;
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 20px rgba(139, 92, 246, 0.1);
        }
        
        [data-theme="light"] .navbar.scrolled {
            background: rgba(224, 242, 254, 0.95) !important;
        }
    `;
    document.head.appendChild(style);
});

// ===== CURSOR EFFECT =====
document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #8b5cf6, #3b82f6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-category');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function (e) {
    console.error('Error:', e.error);
    // You can add error reporting here if needed
});

// ===== CERTIFICATES MODAL LOGIC =====
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('certificateModal');
    const viewPdfBtn = document.getElementById('viewPdfBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalLogoImg = modal?.querySelector('.modal-logo img');

    function openModal(options) {
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        if (options?.title) modalTitle.textContent = options.title;
        if (options?.logoSrc) {
            if (modalLogoImg) modalLogoImg.src = options.logoSrc;
        }
        if (options?.pdf) {
            viewPdfBtn.style.display = '';
            viewPdfBtn.href = options.pdf;
        } else {
            viewPdfBtn.style.display = 'none';
        }
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Open from certificate cards (ignore clicks on links inside)
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('click', () => {
            const isInsideLink = window.event && (window.event.target.closest('a') !== null);
            if (isInsideLink) return;
            const title = card.getAttribute('data-title') || 'Certificado';
            const pdf = card.getAttribute('data-pdf') || '';
            const img = card.querySelector('img');
            openModal({ title, pdf, logoSrc: img ? img.src : undefined });
        });
    });

    // Close handlers
    modal?.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.dataset.close === 'modal') closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function () {
    // Scroll-based animations are handled above
}, 16)); // ~60fps
