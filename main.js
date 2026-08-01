/**
 * Portfolio Main JavaScript
 * Follows SWE best practices: Modularity, Event Delegation, Debouncing
 */

document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = menuToggle.querySelector('i');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const contactForm = document.getElementById('contactForm');
    const projectsContainer = document.getElementById('projects-container');
    const currentYearSpan = document.getElementById('currentYear');

    // Set current year in footer
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    /* =========================================
       1. UTILITY FUNCTIONS
       ========================================= */
    // Debounce function to limit scroll event firing (Performance)
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

    /* =========================================
       2. NAVIGATION & MOBILE MENU
       ========================================= */
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Toggle icon
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.remove('uil-bars');
            menuIcon.classList.add('uil-times');
        } else {
            menuIcon.classList.remove('uil-times');
            menuIcon.classList.add('uil-bars');
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link (mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900 && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* =========================================
       3. SCROLL EFFECTS (Debounced)
       ========================================= */
    function handleScroll() {
        const scrollY = window.scrollY;

        // Header shadow
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button visibility
        if (scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // Active link highlighting
        updateActiveLink(scrollY);
    }

    function updateActiveLink(scrollY) {
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', debounce(handleScroll, 15));

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* =========================================
       4. TYPING EFFECT
       ========================================= */
    if (typeof Typed !== 'undefined') {
        new Typed('.typedText', {
            strings: ['Software Engineer', 'Web Developer', 'Problem Solver', 'CS Student'],
            loop: true,
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            showCursor: true,
            cursorChar: '|'
        });
    }

    /* =========================================
       5. SCROLL REVEAL ANIMATIONS
       ========================================= */
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            delay: 100,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false // Better performance, only animate once
        });

        sr.reveal('.featured-text-card', { delay: 0 });
        sr.reveal('.featured-name', { delay: 100 });
        sr.reveal('.featured-text-info', { delay: 200 });
        sr.reveal('.featured-text-btn', { delay: 300 });
        sr.reveal('.social-icons', { delay: 400 });
        sr.reveal('.featured-image', { delay: 200, origin: 'right' });
        sr.reveal('.top-header', { delay: 100 });
        sr.reveal('.about-info', { origin: 'left', delay: 100 });
        sr.reveal('.skills-box', { interval: 150, origin: 'right' });
        sr.reveal('.contact-info', { origin: 'left', delay: 100 });
        sr.reveal('.contact-form', { origin: 'right', delay: 200 });
    }

    /* =========================================
       6. INTERACTIVE FEATURES
       ========================================= */
    // Collaborate button scroll
    document.getElementById('collaborateBtn')?.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Skill copy-to-clipboard
    document.querySelectorAll('.skills-list span').forEach(skill => {
        skill.addEventListener('click', async function() {
            const text = this.textContent;
            try {
                await navigator.clipboard.writeText(text);
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.background = '#4CAF50';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
                }, 1500);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });

    // Resume Download Handler
    function handleResumeDownload(e) {
        e.preventDefault();
        const btn = e.currentTarget;
        const icon = btn.querySelector('i');
        const originalIconClass = icon.className;
        
        // Loading state
        icon.className = 'uil uil-spinner uil-spin';
        btn.disabled = true;

        // Note: Direct Google Drive downloads often face CORS/blocking. 
        // Opening in a new tab is the most reliable cross-browser method.
        const driveUrl = 'https://drive.google.com/file/d/1YmnNNmMzOeMHk9B8oHHWg8wJ4MyNlPqI/view?usp=sharing';
        
        setTimeout(() => {
            window.open(driveUrl, '_blank');
            // Reset state
            icon.className = originalIconClass;
            btn.disabled = false;
        }, 800);
    }

    document.querySelectorAll('#downloadResumeBtn, #downloadResumeBtnAbout').forEach(btn => {
        btn.addEventListener('click', handleResumeDownload);
    });

    /* =========================================
       7. CONTACT FORM HANDLING
       ========================================= */
    if (contactForm) {
        // Real-time validation styling
        const inputs = contactForm.querySelectorAll('.input-field');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                } else {
                    input.classList.remove('valid');
                    input.classList.add('invalid');
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnLoader = document.getElementById('btnLoader');
            const formStatus = document.getElementById('formStatus');
            
            // UI Loading State
            btnText.textContent = 'Sending...';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                // FormSubmit AJAX endpoint returns a JSON response with a 'success' field
                const data = await response.json();
                const isSuccess = data.success === 'true' || data.success === true;

                if (response.ok && isSuccess) {
                    formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                    formStatus.classList.add('success');
                    contactForm.reset();
                    inputs.forEach(input => input.classList.remove('valid'));
                } else {
                    const err = new Error(data.message || 'Form submission failed');
                    err.userMessage = data.message;
                    throw err;
                }
            } catch (error) {
                console.error('Form error:', error);
                // Show the real reason from FormSubmit (e.g., activation required)
                formStatus.textContent = error.userMessage
                    ? `⚠️ ${error.userMessage}`
                    : '❌ Error sending message. Please email me directly.';
                formStatus.classList.add('error');
            } finally {
                btnText.textContent = 'Send Message';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                formStatus.style.display = 'block';
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 6000);
            }
        });
    }

    /* =========================================
       8. GITHUB PROJECTS FETCH
       ========================================= */
    async function fetchGitHubRepos() {
        try {
            const response = await fetch('https://api.github.com/users/Amena15/repos?sort=updated&direction=desc&per_page=6');
            if (!response.ok) throw new Error('GitHub API limit or error');
            
            const repos = await response.json();
            const filteredRepos = repos.filter(repo => !repo.fork && repo.name); // Exclude forks
            
            projectsContainer.innerHTML = ''; // Clear loader
            
            if (filteredRepos.length === 0) {
                projectsContainer.innerHTML = '<p class="loader">No public projects found.</p>';
                return;
            }

            filteredRepos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'A software engineering project showcasing clean code and scalable architecture.'}</p>
                    <div class="project-meta">
                        <span><i class="uil uil-brackets-curly"></i> ${repo.language || 'Code'}</span>
                        <span><i class="uil uil-star"></i> ${repo.stargazers_count}</span>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                            View Code <i class="uil uil-github-alt"></i>
                        </a>
                    </div>
                `;
                projectsContainer.appendChild(card);
            });
            
            // Reveal newly added elements
            if (typeof ScrollReveal !== 'undefined') {
                ScrollReveal().reveal('.project-card', { interval: 150, origin: 'bottom' });
            }
            
        } catch (error) {
            console.error('Failed to load projects:', error);
            projectsContainer.innerHTML = `
                <div class="loader" style="flex-direction: column; align-items: center; gap: 1rem;">
                    <p>⚠️ Failed to load projects. Please check my <a href="https://github.com/Amena15" target="_blank" style="color: var(--primary-color);">GitHub directly</a>.</p>
                </div>
            `;
        }
    }

    fetchGitHubRepos();
});