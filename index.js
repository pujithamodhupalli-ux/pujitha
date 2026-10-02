/**
 * Portfolio JavaScript - Modhupalli Pujitha
 * GitHub Pages Compatible Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Header Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavOnScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navTarget = document.querySelector(`.nav-list a[href*="#${sectionId}"]`);

            if (navTarget) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navTarget.classList.add('active');
                } else {
                    navTarget.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);

    // 4. Back to Top Button Control
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Scroll Reveal Intersection Observer (Subtle Entry Animations)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.about-card, .timeline-content, .skill-category-card, .cert-card, .strength-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(card);
    });
});