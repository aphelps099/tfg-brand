/**
 * TFG Impact Report 2025 - WordPress JavaScript
 *
 * INSTALLATION:
 * 1. Upload this file to: /wp-content/themes/YOUR-THEME/assets/js/
 * 2. Enqueue in functions.php or add via plugin
 * 3. Wrap impact report content with class "tfg-impact-report"
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initImpactReport();
    });

    function initImpactReport() {
        const container = document.querySelector('.tfg-impact-report');
        if (!container) return;

        // Initialize components
        initScrollArrow();
        initSectionObserver();
        initNavDots();
        initProgressBar();
        initParallax();
    }

    // Scroll Arrow Animation
    function initScrollArrow() {
        const scrollArrow = document.querySelector('.tfg-scroll-arrow');
        if (!scrollArrow) return;

        let hasHovered = false;

        scrollArrow.addEventListener('mouseenter', function() {
            if (!hasHovered) {
                hasHovered = true;
                scrollArrow.classList.add('first-hover');
                setTimeout(function() {
                    scrollArrow.classList.remove('first-hover');
                }, 1200);
            }
        });
    }

    // Section Observer for Snap Animations
    function initSectionObserver() {
        const sections = document.querySelectorAll('.tfg-section');
        const navDots = document.querySelectorAll('.tfg-nav-dot');

        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Add in-view class for snap animation
                    entry.target.classList.add('in-view');

                    // Update nav dots
                    const index = Array.from(sections).indexOf(entry.target);
                    navDots.forEach(function(dot, i) {
                        dot.classList.toggle('active', i === index);
                    });

                    // Animate bars
                    entry.target.querySelectorAll('.tfg-grant-bar-fill').forEach(function(bar) {
                        const width = bar.dataset.width;
                        setTimeout(function() {
                            bar.style.width = width + '%';
                        }, 400);
                    });

                    // Animate counters
                    entry.target.querySelectorAll('.tfg-counter').forEach(function(counter) {
                        animateCounter(counter);
                    });
                }
            });
        }, { threshold: 0.4 });

        sections.forEach(function(section) {
            sectionObserver.observe(section);
        });
    }

    // Counter Animation
    function animateCounter(el) {
        if (el.dataset.animated) return;
        el.dataset.animated = 'true';

        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        const isDecimal = target % 1 !== 0;

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            if (isDecimal) {
                el.textContent = prefix + current.toFixed(1) + suffix;
            } else {
                el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Navigation Dots
    function initNavDots() {
        const navDots = document.querySelectorAll('.tfg-nav-dot');
        const sections = document.querySelectorAll('.tfg-section');

        navDots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                const index = dot.dataset.section;
                if (sections[index]) {
                    sections[index].scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Progress Bar
    function initProgressBar() {
        const progressBar = document.querySelector('.tfg-progress-bar');
        if (!progressBar) return;

        window.addEventListener('scroll', function() {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    // Parallax Effects
    function initParallax() {
        const parallaxArcs = document.querySelectorAll('.tfg-pattern-arc[data-speed]');
        const parallaxStarbursts = document.querySelectorAll('.tfg-parallax-starburst');

        if (parallaxArcs.length === 0 && parallaxStarbursts.length === 0) return;

        let ticking = false;
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;
        const starburstRotations = new Map();

        // Initialize rotation tracking
        parallaxStarbursts.forEach(function(el) {
            starburstRotations.set(el, 0);
        });

        function updateParallax() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            scrollVelocity = Math.abs(scrollY - lastScrollY);
            lastScrollY = scrollY;

            // Update arcs
            parallaxArcs.forEach(function(el) {
                const speed = parseFloat(el.dataset.speed) || 0.3;
                const section = el.closest('.tfg-section');
                if (!section) return;

                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const relativeScroll = scrollY - sectionTop + windowHeight;
                const scrollPercent = relativeScroll / (sectionHeight + windowHeight);
                const yOffset = (scrollPercent - 0.5) * speed * 150;

                el.style.transform = 'translateY(' + yOffset + 'px)';
            });

            // Update starbursts
            parallaxStarbursts.forEach(function(el) {
                const speed = parseFloat(el.dataset.speed) || 0.3;
                const section = el.closest('.tfg-section');
                if (!section) return;

                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const relativeScroll = scrollY - sectionTop + windowHeight;
                const scrollPercent = relativeScroll / (sectionHeight + windowHeight);
                const yOffset = (scrollPercent - 0.5) * speed * 150;

                let currentRotation = starburstRotations.get(el) || 0;
                const rotationSpeed = 0.5 + (scrollVelocity * 0.8);
                currentRotation += rotationSpeed;
                starburstRotations.set(el, currentRotation);

                el.style.transform = 'translateY(' + yOffset + 'px) rotate(' + currentRotation + 'deg)';
                el.style.animation = 'none';
            });

            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Idle rotation
        function idleRotation() {
            if (scrollVelocity < 1) {
                parallaxStarbursts.forEach(function(el) {
                    let currentRotation = starburstRotations.get(el) || 0;
                    currentRotation += 0.15;
                    starburstRotations.set(el, currentRotation);

                    const currentTransform = el.style.transform;
                    const yMatch = currentTransform.match(/translateY\(([^)]+)\)/);
                    const yOffset = yMatch ? yMatch[1] : '0px';

                    el.style.transform = 'translateY(' + yOffset + ') rotate(' + currentRotation + 'deg)';
                });
            }
            scrollVelocity *= 0.95;
            requestAnimationFrame(idleRotation);
        }

        idleRotation();
        updateParallax();
    }

})();
