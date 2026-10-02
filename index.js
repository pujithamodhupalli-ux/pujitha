/**
 * Modhupalli Pujitha - Portfolio Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Current Year in Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            
            // Animate hamburger bars
            hamburgerBtn.classList.toggle('open');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Scroll Progress Indicator & Back-to-Top Button
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active Navbar Link Detection
        highlightActiveSection();
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Highlight Active Navigation Section on Scroll
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navAnchor = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navAnchor) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navAnchor.classList.add('active');
                } else {
                    navAnchor.classList.remove('active');
                }
            }
        });
    }

    // 5. Contact Form Handling
    window.handleFormSubmit = function() {
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const messageInput = document.getElementById('form-message');
        const statusMsg = document.getElementById('form-status');

        if (nameInput && emailInput && messageInput && statusMsg) {
            statusMsg.style.color = '#14f195';
            statusMsg.textContent = `Thank you, ${nameInput.value}! Your message has been sent successfully.`;

            // Clear inputs
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';

            setTimeout(() => {
                statusMsg.textContent = '';
            }, 5000);
        }
    };
});