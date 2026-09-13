/* ==========================================================================
   D Art Graphic JavaScript - Interactive Engine (Page Transition Version)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Custom Cursor
       ========================================== */
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    // Only activate custom cursor on desktop devices (width > 992px)
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: 'power2.out'
            });
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.05,
                ease: 'power2.out'
            });
        });

        // Expand cursor on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .filter-btn, .service-card, .portfolio-item, .faq-question, input, textarea, select, .lightbox-trigger');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                gsap.to(cursor, {
                    scale: 1.2,
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(59, 130, 246, 0.12)',
                    duration: 0.3
                });
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                gsap.to(cursor, {
                    scale: 1,
                    borderColor: 'rgba(59, 130, 246, 0.4)',
                    backgroundColor: 'transparent',
                    duration: 0.3
                });
            });
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
            cursorDot.style.display = 'none';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
            cursorDot.style.display = 'block';
        });
    } else {
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }


    /* ==========================================
       2. Sticky Header Toggle
       ========================================== */
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    /* ==========================================
       3. Mobile Navigation Menu Toggle
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('overflow-hidden');
    });

    // Close menu when nav link clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('overflow-hidden');
        });
    });


    /* ==========================================
       3.5 Accessibility Settings Panel
       ========================================== */
    const accessibilityToggle = document.getElementById('accessibility-toggle');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const accessibilityClose = document.getElementById('accessibility-close');
    const accessibilityButtons = document.querySelectorAll('.accessibility-option');
    const accessibilityReset = document.getElementById('accessibility-reset');
    const STORAGE_KEY = 'dartgraphicAccessibilitySettings';

    const accessibilityState = {
        text: 'default',
        contrast: '',
        focus: false,
        links: false,
        reduceMotion: false,
        calm: false
    };

    const saveAccessibilityState = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(accessibilityState));
    };

    const applyAccessibilityClasses = () => {
        body.classList.remove(
            'accessibility-text-small',
            'accessibility-text-large',
            'accessibility-high-contrast',
            'accessibility-negative-contrast',
            'accessibility-grayscale',
            'accessibility-focus-highlight',
            'accessibility-link-visibility',
            'accessibility-reduced-motion',
            'accessibility-calm'
        );

        if (accessibilityState.text === 'small') {
            body.classList.add('accessibility-text-small');
        } else if (accessibilityState.text === 'large') {
            body.classList.add('accessibility-text-large');
        }

        if (accessibilityState.contrast === 'high') {
            body.classList.add('accessibility-high-contrast');
        } else if (accessibilityState.contrast === 'negative') {
            body.classList.add('accessibility-negative-contrast');
        } else if (accessibilityState.contrast === 'grayscale') {
            body.classList.add('accessibility-grayscale');
        }

        if (accessibilityState.focus) {
            body.classList.add('accessibility-focus-highlight');
        }

        if (accessibilityState.links) {
            body.classList.add('accessibility-link-visibility');
        }

        if (accessibilityState.reduceMotion) {
            body.classList.add('accessibility-reduced-motion');
        }

        if (accessibilityState.calm) {
            body.classList.add('accessibility-calm');
        }
    };

    const updateAccessibilityButtons = () => {
        accessibilityButtons.forEach(button => {
            const group = button.dataset.group;
            const value = button.dataset.value;
            let isActive = false;

            if (group === 'text') {
                isActive = accessibilityState.text === value;
            } else if (group === 'contrast') {
                isActive = accessibilityState.contrast === value;
            } else if (group === 'highlight') {
                isActive = value === 'focus' ? accessibilityState.focus : accessibilityState.links;
            } else if (group === 'motion') {
                isActive = value === 'reduce' ? accessibilityState.reduceMotion : accessibilityState.calm;
            }

            button.classList.toggle('active', isActive);
        });
    };

    const loadAccessibilitySettings = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                Object.assign(accessibilityState, parsed);
            } catch (error) {
                console.warn('Unable to load accessibility settings:', error);
            }
        }

        applyAccessibilityClasses();
        updateAccessibilityButtons();
    };

    const setAccessibilityOption = (group, value) => {
        if (group === 'text') {
            accessibilityState.text = value;
        } else if (group === 'contrast') {
            accessibilityState.contrast = accessibilityState.contrast === value ? '' : value;
        } else if (group === 'highlight') {
            if (value === 'focus') {
                accessibilityState.focus = !accessibilityState.focus;
            } else if (value === 'link') {
                accessibilityState.links = !accessibilityState.links;
            }
        } else if (group === 'motion') {
            if (value === 'reduce') {
                accessibilityState.reduceMotion = !accessibilityState.reduceMotion;
            } else if (value === 'calm') {
                accessibilityState.calm = !accessibilityState.calm;
            }
        }

        saveAccessibilityState();
        applyAccessibilityClasses();
        updateAccessibilityButtons();
    };

    const resetAccessibilityOptions = () => {
        accessibilityState.text = 'default';
        accessibilityState.contrast = '';
        accessibilityState.focus = false;
        accessibilityState.links = false;
        accessibilityState.reduceMotion = false;
        accessibilityState.calm = false;
        saveAccessibilityState();
        applyAccessibilityClasses();
        updateAccessibilityButtons();
    };

    const closeAccessibilityPanel = () => {
        if (accessibilityPanel) {
            accessibilityPanel.classList.remove('active');
            accessibilityPanel.setAttribute('aria-hidden', 'true');
            body.classList.remove('overflow-hidden');
        }
    };

    if (accessibilityToggle && accessibilityPanel) {
        accessibilityToggle.addEventListener('click', () => {
            accessibilityPanel.classList.add('active');
            accessibilityPanel.setAttribute('aria-hidden', 'false');
            body.classList.add('overflow-hidden');
        });
    }

    if (accessibilityClose) {
        accessibilityClose.addEventListener('click', closeAccessibilityPanel);
    }

    if (accessibilityPanel) {
        accessibilityPanel.addEventListener('click', (event) => {
            if (event.target === accessibilityPanel) {
                closeAccessibilityPanel();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && accessibilityPanel && accessibilityPanel.classList.contains('active')) {
            closeAccessibilityPanel();
        }
    });

    accessibilityButtons.forEach(button => {
        button.addEventListener('click', () => {
            setAccessibilityOption(button.dataset.group, button.dataset.value);
        });
    });

    if (accessibilityReset) {
        accessibilityReset.addEventListener('click', resetAccessibilityOptions);
    }

    loadAccessibilitySettings();


    /* ==========================================
       4. Stagger Animations on Page Entry
       ========================================== */
    const animateSectionContent = (targetId) => {
        // Clear existing GSAP tweens on content to prevent overlap glitches
        gsap.killTweensOf(`${targetId} *`);

        if (targetId === '#home') {
            gsap.fromTo('#home .badge', { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' });
            gsap.fromTo('#home .hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
            gsap.fromTo('#home .hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
            gsap.fromTo('#home .hero-actions-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 });
            gsap.fromTo('#home .hero-image-wrapper', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.2 });
        }
        
        else if (targetId === '#about') {
            gsap.fromTo('#about .about-visual', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
            gsap.fromTo('#about .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
            gsap.fromTo('#about .about-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.1 });
            gsap.fromTo('#about .counter-card', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.3 });
        }
        
        else if (targetId === '#services') {
            gsap.fromTo('#services .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
            gsap.fromTo('#services .service-card', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.05, delay: 0.1 });
        }
        
        else if (targetId === '#portfolio') {
            gsap.fromTo('#portfolio .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
            gsap.fromTo('#portfolio .portfolio-filters', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 });
            gsap.fromTo('#portfolio .portfolio-item', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08, delay: 0.2 });
            gsap.fromTo('#portfolio .showcase-banner', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 });
        }
        
        else if (targetId === '#testimonials') {
            gsap.fromTo('#testimonials .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
            gsap.fromTo('#testimonials .testimonials-slider', { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 });
        }
        
        else if (targetId === '#faq') {
            gsap.fromTo('#faq .section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
            gsap.fromTo('#faq .faq-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08, delay: 0.1 });
        }
        
        else if (targetId === '#contact') {
            gsap.fromTo('#contact .contact-info-panel', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
            gsap.fromTo('#contact .contact-form-card', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
        }
    };


    /* ==========================================
       5. Counter Numbers Animation (About Section)
       ========================================== */
    const counterCards = document.querySelectorAll('.counter-card');
    
    const runCounters = () => {
        counterCards.forEach(card => {
            const countVal = card.querySelector('.count-value');
            const target = parseInt(card.getAttribute('data-target'), 10);
            const duration = 1500;
            const stepTime = Math.abs(Math.floor(duration / target));
            
            let current = 0;
            const increment = target > 100 ? Math.ceil(target / 80) : 1;
            
            // Set initial state
            countVal.textContent = "0";

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    countVal.textContent = target;
                    clearInterval(timer);
                } else {
                    countVal.textContent = current;
                }
            }, stepTime);
        });
    };


    /* ==========================================
       6. GSAP Page Transition Engine
       ========================================== */
    const pageSections = document.querySelectorAll('.page-section');
    const headerLinks = document.querySelectorAll('.main-header .nav-link, .main-header .logo, .main-header .btn-nav');
    
    const switchPage = (targetId) => {
        const currentActive = document.querySelector('.page-section.active');
        const targetSection = document.querySelector(targetId);
        
        if (!targetSection) return;
        
        // If clicking the link of the page we are already on, just scroll to top smoothly
        if (currentActive === targetSection) {
            gsap.to(window, { scrollTo: 0, duration: 0.5 });
            return;
        }

        body.classList.add('transitioning');

        // Update Nav Active States immediately
        headerLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });

        // 1. Transition Out Current Section
        if (currentActive) {
            gsap.to(currentActive, {
                opacity: 0,
                y: -30,
                scale: 0.97,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    currentActive.classList.remove('active');
                    currentActive.style.display = 'none';
                    
                    // 2. Setup Target Section
                    targetSection.style.display = 'block';
                    window.scrollTo(0, 0); // Reset scroll to top instantly

                    // 3. Transition In Target Section
                    gsap.fromTo(targetSection, 
                        { opacity: 0, y: 30, scale: 0.97 },
                        { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1, 
                            duration: 0.5, 
                            ease: 'power2.out',
                            onComplete: () => {
                                targetSection.classList.add('active');
                                body.classList.remove('transitioning');
                                
                                // Refresh AOS elements inside the target page
                                AOS.refresh();
                            }
                        }
                    );

                    // Re-run counters if entering About page
                    if (targetId === '#about') {
                        setTimeout(runCounters, 200);
                    }

                    // Trigger target section's inner animations
                    animateSectionContent(targetId);
                }
            });
        } else {
            // Fallback for direct loads
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            gsap.fromTo(targetSection, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5, 
                    onComplete: () => {
                        body.classList.remove('transitioning');
                        AOS.refresh();
                    }
                }
            );
            if (targetId === '#about') runCounters();
            animateSectionContent(targetId);
        }

        // Sync browser history hash silently without triggering default scroll
        history.pushState(null, null, targetId);
    };

    // Bind navigation trigger clicks
    const bindNavActions = () => {
        const navActions = document.querySelectorAll('.nav-action');
        navActions.forEach(action => {
            action.addEventListener('click', (e) => {
                const href = action.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    switchPage(href);
                }
            });
        });
    };

    bindNavActions();

    // Handle initial loading with Hash (e.g. index.html#portfolio)
    const loadHashPage = () => {
        const hash = window.location.hash;
        
        // Hide all page sections first
        pageSections.forEach(sec => {
            sec.style.display = 'none';
            sec.classList.remove('active');
        });

        if (hash && document.querySelector(hash)) {
            switchPage(hash);
        } else {
            switchPage('#home');
        }
    };

    // Listen to browser Back/Forward navigation
    window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#home';
        const targetSection = document.querySelector(hash);
        if (targetSection && !targetSection.classList.contains('active')) {
            switchPage(hash);
        }
    });

    // Run hash router on start
    loadHashPage();


    /* ==========================================
       7. Portfolio Filtering System
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    gsap.fromTo(item, 
                        { opacity: 0, scale: 0.85 }, 
                        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', clearProps: 'transform' }
                    );
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.85,
                        duration: 0.25,
                        ease: 'power2.in',
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });


    /* ==========================================
       8. Lightbox Modal Popup
       ========================================== */
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    const openLightbox = (element) => {
        const imageSrc = element.getAttribute('data-image');
        const title = element.getAttribute('data-title');
        const desc = element.getAttribute('data-desc');

        lightboxImg.setAttribute('src', imageSrc);
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;

        lightboxModal.classList.add('active');
        body.classList.add('overflow-hidden');
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(trigger);
        });
    });

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const trigger = item.querySelector('.lightbox-trigger');
            if (trigger) {
                openLightbox(trigger);
            }
        });
    });

    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
        body.classList.remove('overflow-hidden');
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });


    /* ==========================================
       9. Parallax Showcase Banner
       ========================================== */
    const parallaxImg = document.querySelector('.parallax-bg-img');
    const showcaseSection = document.querySelector('.gallery-showcase-section');

    if (parallaxImg && showcaseSection) {
        window.addEventListener('scroll', () => {
            // Parallax active within visible wrapper bounds
            const rect = showcaseSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrolled = window.scrollY - showcaseSection.offsetTop;
                parallaxImg.style.transform = `translateY(${scrolled * 0.12}px)`;
            }
        });
    }


    /* ==========================================
       10. Testimonial Swiper Slider Initialization
       ========================================== */
    const testimonialSwiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });


    /* ==========================================
       11. FAQ Accordions
       ========================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answerDiv.style.maxHeight = null;
            }
        });
    });


    /* ==========================================
       12. GSAP Animations & AOS Scroll Reveals
       ========================================== */
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });


    /* ==========================================
       13. Contact Form Validation
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    const socialLinks = {
        facebook: 'https://web.facebook.com/profile.php?id=100094623741153',
        instagram: 'https://instagram.com/your-page',
        linkedin: 'https://linkedin.com/in/your-profile',
        tiktok: 'https://tiktok.com/@your-username'
    };

    const bindSocialLinks = () => {
        document.querySelectorAll('[data-social]').forEach(anchor => {
            const socialKey = anchor.dataset.social;
            const url = socialLinks[socialKey];
            if (url) {
                anchor.setAttribute('href', url);
                anchor.setAttribute('target', '_blank');
                anchor.setAttribute('rel', 'noreferrer noopener');
            } else {
                anchor.remove();
            }
        });
    };

    bindSocialLinks();

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameField = document.getElementById('form-name');
            const emailField = document.getElementById('form-email');
            const phoneField = document.getElementById('form-phone');
            const serviceField = document.getElementById('form-service');
            const detailsField = document.getElementById('form-details');
            
            let isValid = true;

            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));

            if (nameField.value.trim() === '') {
                nameField.parentElement.classList.add('error');
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value.trim())) {
                emailField.parentElement.classList.add('error');
                isValid = false;
            }

            if (phoneField.value.trim() === '') {
                phoneField.parentElement.classList.add('error');
                isValid = false;
            }

            if (serviceField.value === '') {
                serviceField.parentElement.classList.add('error');
                isValid = false;
            }

            if (detailsField.value.trim() === '') {
                detailsField.parentElement.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    formStatus.className = 'form-status-alert success';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                    
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    
                    setTimeout(() => {
                        gsap.to(formStatus, {
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => {
                                formStatus.style.display = 'none';
                                formStatus.style.opacity = 1;
                            }
                        });
                    }, 5000);
                }, 1500);
            } else {
                formStatus.className = 'form-status-alert error';
                formStatus.textContent = 'Please fill out all required fields with valid details.';
                formStatus.style.display = 'block';
            }
        });
    }
});

