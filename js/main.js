// ===== MAIN JAVASCRIPT FILE =====
// Photography Portfolio - Enhanced Interactive Features
// Author: Vidhan Rajvi
// Version: 2.0

// ===== GLOBAL VARIABLES =====
let typingIndex = 0;
let typingTimer;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== WEBSITE INITIALIZATION =====
function initializeWebsite() {
    setupNavbar();
    setupScrollAnimations();
    setupTypingAnimation();
    setupCounters();
    setupScrollToTop();
    setupModalEnhancements();
    setupMicroInteractions();
    setupParallaxEffects();
    setupImageLightbox();
    setupFormEnhancements();
    
    // New features
    setupHeroEffects();
    setupWhatsAppButton();
    setupOfferModal();
    setupProgressTracker();
    setupAchievementSystem();
    setupAboutEnhancements();
    setupImageComparisonSlider();
    setupCinemagraphEffect();
    setup3DEffects();
    setupLayeredParallax();
    setupVoiceInput();
    setupPersonalizedGreeting();
    setupUserPreferences();
    setupAIChatbot();
    setupAIPreview();
    setupAchievementDashboard();
}



// ===== NAVBAR ENHANCEMENTS =====
function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu animations
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            navbarCollapse.classList.toggle('show');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('counter-section')) {
                    startCounters(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all sections and elements for animation
    document.querySelectorAll('section, .animate-on-scroll, .service-card, .gallery-section').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ===== TYPING ANIMATION =====
function setupTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;

    const words = ['Creative', 'Modern', 'Responsive', 'Professional', 'Artistic'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ===== ANIMATED COUNTERS =====
function setupCounters() {
    const counterElements = document.querySelectorAll('.counter');
    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        function updateCounter() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        // Start counter when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

function startCounters(section) {
    const counters = section.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
    });
}

function animateCounter(counter, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        counter.textContent = Math.floor(current);
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// ===== SCROLL TO TOP BUTTON =====
function setupScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top-btn';
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== MODAL ENHANCEMENTS =====
function setupModalEnhancements() {
    // Enhanced modal animations
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            this.querySelector('.modal-content').style.transform = 'scale(0.7)';
            this.querySelector('.modal-content').style.opacity = '0';
        });

        modal.addEventListener('shown.bs.modal', function() {
            this.querySelector('.modal-content').style.transform = 'scale(1)';
            this.querySelector('.modal-content').style.opacity = '1';
        });
    });
}

// ===== MICRO-INTERACTIONS =====
function setupMicroInteractions() {
    // Ripple effect on buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Hover effects for cards
    document.querySelectorAll('.service-card, .gallery-section img').forEach(card => {
        card.addEventListener('mouseenter', addHoverEffect);
        card.addEventListener('mouseleave', removeHoverEffect);
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addHoverEffect(event) {
    const element = event.currentTarget;
    element.style.transform = 'translateY(-10px) scale(1.02)';
    element.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
}

function removeHoverEffect(event) {
    const element = event.currentTarget;
    element.style.transform = 'translateY(0) scale(1)';
    element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
}

// ===== PARALLAX EFFECTS =====
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== IMAGE LIGHTBOX =====
function setupImageLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-section img, .masonry img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', openLightbox);
    });
}

function openLightbox(event) {
    const img = event.target;
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${img.src}" alt="${img.alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.remove();
        }
    });
}

// ===== FORM ENHANCEMENTS =====
function setupFormEnhancements() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', addFocusEffect);
            input.addEventListener('blur', removeFocusEffect);
        });
        
        form.addEventListener('submit', handleFormSubmit);
    });
}

function addFocusEffect(event) {
    const input = event.target;
    input.parentElement.classList.add('focused');
}

function removeFocusEffect(event) {
    const input = event.target;
    if (!input.value) {
        input.parentElement.classList.remove('focused');
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Add loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Sent!';
        submitBtn.classList.add('btn-success');
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-success');
        }, 2000);
    }, 1500);
}

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
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATION =====
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-based animations efficiently
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====
function setupAccessibility() {
    // Add keyboard navigation for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const closeBtn = openModal.querySelector('.btn-close');
                if (closeBtn) closeBtn.click();
            }
        }
    });
}

// Initialize accessibility features
setupAccessibility();

// ===== HERO SECTION ENHANCEMENTS =====
function setupHeroEffects() {
    // Apply gradient text effect to main headings
    const heroHeadings = document.querySelectorAll('.carousel-caption h1, .carousel-caption h2, .hero-heading');
    heroHeadings.forEach(heading => {
        heading.classList.add('hero-gradient-text', 'hero-heading');
    });
    
    // Setup SVG path drawing for logo/title if it exists
    const logo = document.querySelector('.navbar-brand');
    if (logo && logo.textContent.trim()) {
        setupSVGDrawing(logo);
    }
}

function setupSVGDrawing(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${text.length * 20} 40`);
    svg.classList.add('animated-logo');
    
    // Create text element
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', '10');
    textElement.setAttribute('y', '25');
    textElement.setAttribute('font-size', '16');
    textElement.setAttribute('font-weight', 'bold');
    textElement.textContent = text;
    
    svg.appendChild(textElement);
    element.appendChild(svg);
}

// ===== WHATSAPP BUTTON SETUP =====
function setupWhatsAppButton() {
    // Create WhatsApp floating button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/919876543210?text=Hi! I\'m interested in your photography services. Can you tell me more?';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '💬';
    whatsappBtn.title = 'Chat on WhatsApp';
    
    document.body.appendChild(whatsappBtn);
}

// ===== OFFER MODAL SETUP =====
function setupOfferModal() {
    // Create offer modal
    const offerModal = document.createElement('div');
    offerModal.className = 'offer-modal';
    offerModal.id = 'offerModal';
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // 7 days from now
    
    offerModal.innerHTML = `
        <div class="offer-modal-content">
            <span class="offer-close">&times;</span>
            <h3>🎉 Special Limited Time Offer!</h3>
            <p>Book your photography session today and get <strong>20% OFF</strong>!</p>
            <div class="countdown-timer">
                <div class="countdown-item">
                    <span class="countdown-number" id="days">00</span>
                    <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number" id="hours">00</span>
                    <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number" id="minutes">00</span>
                    <div class="countdown-label">Minutes</div>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number" id="seconds">00</span>
                    <div class="countdown-label">Seconds</div>
                </div>
            </div>
            <button class="offer-cta" onclick="bookNow()">Book Now & Save!</button>
        </div>
    `;
    
    document.body.appendChild(offerModal);
    
    // Show modal after 5 seconds
    setTimeout(() => {
        if (!localStorage.getItem('offerShown')) {
            showOfferModal();
            localStorage.setItem('offerShown', 'true');
        }
    }, 5000);
    
    // Close modal functionality
    const closeBtn = offerModal.querySelector('.offer-close');
    closeBtn.addEventListener('click', hideOfferModal);
    
    // Start countdown
    startCountdown(endDate);
}

function showOfferModal() {
    const modal = document.getElementById('offerModal');
    modal.classList.add('show');
}

function hideOfferModal() {
    const modal = document.getElementById('offerModal');
    modal.classList.remove('show');
}

function startCountdown(endDate) {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        if (distance < 0) {
            clearInterval(timer);
            hideOfferModal();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

function bookNow() {
    hideOfferModal();
    // Redirect to contact page or open booking form
    window.location.href = 'contact.html';
}

// ===== PROGRESS TRACKER SETUP =====
function setupProgressTracker() {
    // Create progress tracker
    const progressTracker = document.createElement('div');
    progressTracker.className = 'progress-tracker';
    progressTracker.innerHTML = '<div class="progress-bar"></div>';
    
    document.body.appendChild(progressTracker);
    
    // Update progress on scroll
    window.addEventListener('scroll', updateProgress);
}

function updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
    
    // Check if user reached bottom for achievement
    if (scrollPercent >= 95) {
        unlockAchievement('explorer');
    }
}

// ===== ACHIEVEMENT SYSTEM =====
function setupAchievementSystem() {
    // Load achievements from localStorage
    const achievements = JSON.parse(localStorage.getItem('achievements') || '{}');
    const streaks = parseInt(localStorage.getItem('streaks') || '0');
    
    // Update streak counter if needed
    updateStreak();
}

function unlockAchievement(type) {
    const achievements = JSON.parse(localStorage.getItem('achievements') || '{}');
    
    if (achievements[type]) return; // Already unlocked
    
    achievements[type] = {
        unlocked: true,
        date: new Date().toISOString(),
        type: type
    };
    
    localStorage.setItem('achievements', JSON.stringify(achievements));
    
    // Show achievement badge
    showAchievementBadge(type);
}

function showAchievementBadge(type) {
    const badgeData = getBadgeData(type);
    
    const badge = document.createElement('div');
    badge.className = 'achievement-badge';
    badge.innerHTML = `
        <div class="badge-icon">${badgeData.icon}</div>
        <div class="badge-title">${badgeData.title}</div>
        <div class="badge-description">${badgeData.description}</div>
        <div class="badge-progress">
            <div class="progress-text">Achievement Unlocked!</div>
            <div class="streak-counter">
                <span class="streak-icon">🔥</span>
                <span class="streak-number">${getStreakCount()}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(badge);
    
    // Remove badge after 5 seconds
    setTimeout(() => {
        badge.remove();
    }, 5000);
}

function getBadgeData(type) {
    const badges = {
        explorer: {
            icon: '🏆',
            title: 'Explorer Badge',
            description: 'You\'ve reached the end of the page!'
        },
        scroller: {
            icon: '📜',
            title: 'Scroller Badge',
            description: 'You\'ve scrolled through the entire page!'
        },
        visitor: {
            icon: '👋',
            title: 'First Visitor Badge',
            description: 'Welcome to our photography portfolio!'
        }
    };
    
    return badges[type] || badges.visitor;
}

function updateStreak() {
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
        const streaks = parseInt(localStorage.getItem('streaks') || '0');
        localStorage.setItem('streaks', streaks + 1);
        localStorage.setItem('lastVisit', today);
    }
}

function getStreakCount() {
    return parseInt(localStorage.getItem('streaks') || '0');
}

// ===== ABOUT SECTION ENHANCEMENTS =====
function setupAboutEnhancements() {
    // Check if we're on the about page
    if (window.location.pathname.includes('about.html')) {
        setupTimeline();
        setupStoryCards();
    }
}

function setupTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;
    
    const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
    
    // Observe timeline items for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

function setupStoryCards() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    // Create story container for mobile
    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';
    storyContainer.innerHTML = createStoryHTML();
    
    aboutSection.appendChild(storyContainer);
    
    // Initialize story functionality
    initializeStories();
}

function createStoryHTML() {
    return `
        <div class="story-header">
            <div class="story-progress">
                <div class="story-progress-bar"></div>
            </div>
            <h3 class="story-title">About RV Photography</h3>
        </div>
        <div class="story-content">
            <div class="story-slide" data-slide="0">
                <img src="About Page/About.jpg" alt="About" class="story-image">
                <p class="story-text">Welcome to RV Photography! I'm Vidhan Rajvi, a passionate photographer based in Ahmedabad, Gujarat.</p>
            </div>
            <div class="story-slide" data-slide="1" style="display: none;">
                <img src="About Page/BTS.jpg" alt="Behind the Scenes" class="story-image">
                <p class="story-text">With years of experience, I specialize in capturing life's precious moments through my lens.</p>
            </div>
            <div class="story-slide" data-slide="2" style="display: none;">
                <img src="About Page/About Hero.jpg" alt="Hero" class="story-image">
                <p class="story-text">From portraits to nature, urban to wildlife, I bring creativity and professionalism to every shot.</p>
            </div>
        </div>
        <div class="story-navigation">
            <button class="story-nav-btn" id="prevBtn" onclick="previousStory()">‹</button>
            <div class="story-indicator">
                <div class="story-dot active"></div>
                <div class="story-dot"></div>
                <div class="story-dot"></div>
            </div>
            <button class="story-nav-btn" id="nextBtn" onclick="nextStory()">›</button>
        </div>
    `;
}

function initializeStories() {
    let currentSlide = 0;
    const totalSlides = 3;
    
    // Show first slide
    showStorySlide(0);
    
    // Auto-advance stories every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showStorySlide(currentSlide);
    }, 5000);
}

function showStorySlide(slideIndex) {
    const slides = document.querySelectorAll('.story-slide');
    const dots = document.querySelectorAll('.story-dot');
    const progressBar = document.querySelector('.story-progress-bar');
    
    // Hide all slides
    slides.forEach(slide => slide.style.display = 'none');
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[slideIndex].style.display = 'block';
    
    // Activate current dot
    dots[slideIndex].classList.add('active');
    
    // Update progress bar
    const progress = ((slideIndex + 1) / slides.length) * 100;
    progressBar.style.width = progress + '%';
    
    // Update navigation buttons
    updateStoryNavigation(slideIndex, slides.length);
}

function updateStoryNavigation(currentSlide, totalSlides) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Global functions for story navigation
window.previousStory = function() {
    const currentSlide = parseInt(document.querySelector('.story-slide[style*="display: block"]').dataset.slide);
    const newSlide = currentSlide > 0 ? currentSlide - 1 : 2;
    showStorySlide(newSlide);
};

window.nextStory = function() {
    const currentSlide = parseInt(document.querySelector('.story-slide[style*="display: block"]').dataset.slide);
    const newSlide = (currentSlide + 1) % 3;
    showStorySlide(newSlide);
};

// ===== NEW ADVANCED FEATURES =====



// ===== IMAGE COMPARISON SLIDER =====
function setupImageComparisonSlider() {
    // Add comparison slider to gallery
    const gallerySections = document.querySelectorAll('.gallery-section');
    if (gallerySections.length > 0) {
        const firstSection = gallerySections[0];
        const comparisonSlider = createComparisonSlider();
        firstSection.insertBefore(comparisonSlider, firstSection.firstChild);
    }
}

function createComparisonSlider() {
    const slider = document.createElement('div');
    slider.className = 'comparison-slider-container';
    slider.innerHTML = `
        <h3 class="text-gradient mb-4">Before & After Comparison</h3>
        <div class="comparison-slider">
            <div class="comparison-before">
                <img src="Gallery/Nature/Mountains.jpg" alt="Before" class="comparison-img">
                <span class="comparison-label">Before</span>
            </div>
            <div class="comparison-after">
                <img src="Gallery/Nature/Mountains.jpg" alt="After" class="comparison-img">
                <span class="comparison-label">After</span>
            </div>
            <div class="comparison-handle"></div>
            <div class="comparison-line"></div>
        </div>
    `;
    
    // Initialize slider functionality
    setTimeout(() => initializeComparisonSlider(slider), 100);
    return slider;
}

function initializeComparisonSlider(container) {
    const slider = container.querySelector('.comparison-slider');
    const handle = container.querySelector('.comparison-handle');
    const line = container.querySelector('.comparison-line');
    const after = container.querySelector('.comparison-after');
    
    let isDragging = false;
    
    // Mouse events
    handle.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
    
    // Touch events
    handle.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDragging);
    
    // Click to move
    slider.addEventListener('click', (e) => {
        if (!isDragging) {
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            updateSlider(percentage);
        }
    });
    
    function startDragging(e) {
        isDragging = true;
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const rect = slider.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        updateSlider(percentage);
    }
    
    function stopDragging() {
        isDragging = false;
    }
    
    function updateSlider(percentage) {
        handle.style.left = percentage + '%';
        line.style.left = percentage + '%';
        after.style.width = percentage + '%';
    }
    
    // Initialize at 50%
    updateSlider(50);
}

// ===== CINEMAGRAPH EFFECT =====
function setupCinemagraphEffect() {
    const heroSections = document.querySelectorAll('.carousel, .gallery-hero, .services-hero, .contact-hero');
    
    heroSections.forEach(hero => {
        // Add subtle floating animation to hero elements
        const captions = hero.querySelectorAll('.carousel-caption, .hero-content');
        captions.forEach(caption => {
            caption.classList.add('cinemagraph-float');
        });
        
        // Add particle effect overlay
        const particleOverlay = createParticleOverlay();
        hero.appendChild(particleOverlay);
    });
}

function createParticleOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'particle-overlay';
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.setProperty('--delay', `${Math.random() * 10}s`);
        particle.style.setProperty('--duration', `${5 + Math.random() * 10}s`);
        overlay.appendChild(particle);
    }
    
    return overlay;
}

// ===== 3D EFFECTS SYSTEM =====
function setup3DEffects() {
    // Add 3D tilt effect to cards
    const cards = document.querySelectorAll('.card, .service-card, .hover-card');
    cards.forEach(card => {
        card.classList.add('card-3d');
        card.addEventListener('mousemove', handle3DTilt);
        card.addEventListener('mouseleave', reset3DTilt);
    });
    
    // Add 3D flip effect to specific elements
    const flipCards = document.querySelectorAll('.service-card');
    flipCards.forEach(card => {
        card.addEventListener('click', handle3DFlip);
    });
}

function handle3DTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
}

function reset3DTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
}

function handle3DFlip(e) {
    const card = e.currentTarget;
    card.classList.toggle('flipped');
}

// ===== LAYERED PARALLAX SYSTEM =====
function setupLayeredParallax() {
    const parallaxLayers = document.querySelectorAll('[data-parallax-layer]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.dataset.parallaxLayer || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== VOICE INPUT SYSTEM =====
function setupVoiceInput() {
    // Add voice input to search bars and contact forms
    const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search"]');
    const contactForms = document.querySelectorAll('#contactForm, form');
    
    // Add voice button to search inputs
    searchInputs.forEach(input => {
        const voiceBtn = createVoiceButton(input);
        input.parentNode.insertBefore(voiceBtn, input.nextSibling);
    });
    
    // Add voice input to contact forms
    contactForms.forEach(form => {
        const nameInput = form.querySelector('input[placeholder*="Name"], input[name*="name"]');
        if (nameInput) {
            const voiceBtn = createVoiceButton(nameInput);
            nameInput.parentNode.insertBefore(voiceBtn, nameInput.nextSibling);
        }
    });
}

function createVoiceButton(input) {
    const voiceBtn = document.createElement('button');
    voiceBtn.type = 'button';
    voiceBtn.className = 'voice-input-btn';
    voiceBtn.innerHTML = '<i class="bi bi-mic"></i>';
    voiceBtn.title = 'Voice Input';
    
    voiceBtn.addEventListener('click', () => startVoiceInput(input));
    return voiceBtn;
}

function startVoiceInput(input) {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
            input.placeholder = 'Listening...';
            input.style.borderColor = '#28a745';
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
            input.placeholder = 'Voice input complete';
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            input.placeholder = 'Voice input failed';
        };
        
        recognition.onend = () => {
            input.style.borderColor = '';
            input.placeholder = input.dataset.originalPlaceholder || 'Enter text...';
        };
        
        recognition.start();
    } else {
        alert('Speech recognition not supported in this browser');
    }
}

// ===== PERSONALIZED GREETING SYSTEM =====
function setupPersonalizedGreeting() {
    const greetings = document.querySelectorAll('.intro-section h1, .hero-content h1');
    
    greetings.forEach(greeting => {
        const timeBasedGreeting = getTimeBasedGreeting();
        const visitorName = localStorage.getItem('visitorName') || 'Visitor';
        
        if (greeting.textContent.includes('Welcome')) {
            greeting.innerHTML = `${timeBasedGreeting}, ${visitorName}!`;
        }
    });
    
    // Add name input prompt if first visit
    if (!localStorage.getItem('visitorName')) {
        setTimeout(() => showNamePrompt(), 3000);
    }
}

function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
}

function showNamePrompt() {
    const name = prompt('Welcome! What should we call you?');
    if (name && name.trim()) {
        localStorage.setItem('visitorName', name.trim());
        setupPersonalizedGreeting(); // Refresh greeting
    }
}

// ===== USER PREFERENCES SYSTEM =====
function setupUserPreferences() {
    // Save last visited page
    const currentPage = window.location.pathname;
    localStorage.setItem('lastVisitedPage', currentPage);
    
    // Save visit count
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
    localStorage.setItem('visitCount', visitCount.toString());
    
    // Save last visit date
    localStorage.setItem('lastVisitDate', new Date().toISOString());
    
    // Show welcome back message
    if (visitCount > 1) {
        showWelcomeBackMessage(visitCount);
    }
}

function showWelcomeBackMessage(visitCount) {
    const message = document.createElement('div');
    message.className = 'welcome-back-message';
    message.innerHTML = `
        <div class="welcome-back-content">
            <i class="bi bi-heart-fill text-danger"></i>
            <span>Welcome back! This is your ${visitCount}${getOrdinalSuffix(visitCount)} visit.</span>
            <button class="welcome-close-btn">&times;</button>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        message.classList.add('fade-out');
        setTimeout(() => message.remove(), 500);
    }, 5000);
    
    // Manual close
    message.querySelector('.welcome-close-btn').addEventListener('click', () => {
        message.classList.add('fade-out');
        setTimeout(() => message.remove(), 500);
    });
}

function getOrdinalSuffix(num) {
    if (num > 3 && num < 21) return 'th';
    switch (num % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// ===== AI CHATBOT SYSTEM =====
function setupAIChatbot() {
    // Create floating chatbot button
    const chatbotBtn = document.createElement('button');
    chatbotBtn.id = 'ai-chatbot-btn';
    chatbotBtn.className = 'ai-chatbot-btn';
    chatbotBtn.innerHTML = '<i class="bi bi-robot"></i>';
    chatbotBtn.title = 'AI Assistant';
    
    document.body.appendChild(chatbotBtn);
    
    // Create chatbot modal
    const chatbotModal = createChatbotModal();
    document.body.appendChild(chatbotModal);
    
    // Event listeners
    chatbotBtn.addEventListener('click', () => toggleChatbot());
}

function createChatbotModal() {
    const modal = document.createElement('div');
    modal.id = 'ai-chatbot-modal';
    modal.className = 'ai-chatbot-modal';
    modal.innerHTML = `
        <div class="chatbot-header">
            <h4><i class="bi bi-robot text-primary"></i> AI Photography Assistant</h4>
            <button class="chatbot-close-btn">&times;</button>
        </div>
        <div class="chatbot-messages" id="chatbot-messages">
            <div class="chatbot-message bot">
                <i class="bi bi-robot"></i>
                <div class="message-content">
                    Hello! I'm your AI photography assistant. How can I help you today?
                </div>
            </div>
        </div>
        <div class="chatbot-input">
            <input type="text" id="chatbot-input" placeholder="Ask me anything about photography...">
            <button id="chatbot-send"><i class="bi bi-send"></i></button>
        </div>
    `;
    
    // Add event listeners
    const closeBtn = modal.querySelector('.chatbot-close-btn');
    const sendBtn = modal.querySelector('#chatbot-send');
    const input = modal.querySelector('#chatbot-input');
    
    closeBtn.addEventListener('click', () => toggleChatbot());
    sendBtn.addEventListener('click', () => sendChatbotMessage());
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatbotMessage();
    });
    
    return modal;
}

function toggleChatbot() {
    const modal = document.getElementById('ai-chatbot-modal');
    modal.classList.toggle('show');
    
    if (modal.classList.contains('show')) {
        document.getElementById('chatbot-input').focus();
    }
}

function sendChatbotMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatbotMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatbotMessage(response, 'bot');
    }, 1000);
}

function addChatbotMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    
    const icon = sender === 'bot' ? 'bi-robot' : 'bi-person';
    messageDiv.innerHTML = `
        <i class="bi ${icon}"></i>
        <div class="message-content">${text}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(message) {
    const responses = {
        'hello': 'Hi there! How can I help you with photography today?',
        'camera': 'For photography, I recommend considering factors like sensor size, megapixels, and lens compatibility. What type of photography interests you?',
        'lighting': 'Natural light is often best for photography. Golden hour (sunrise/sunset) provides beautiful warm lighting. For indoor shots, try positioning subjects near windows.',
        'portrait': 'For portraits, focus on the eyes, use a wide aperture (low f-number) for background blur, and ensure good lighting on the face.',
        'landscape': 'Use a narrow aperture (high f-number) for sharp focus throughout, include foreground elements for depth, and consider using a tripod.',
        'editing': 'Start with basic adjustments like exposure, contrast, and white balance. Less is often more - subtle edits look more natural.',
        'help': 'I can help with camera settings, composition tips, lighting advice, editing techniques, and more. Just ask!'
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return "That's an interesting question! I'd be happy to help you learn more about photography. Could you be more specific about what you'd like to know?";
}

// ===== AI PREVIEW SYSTEM =====
function setupAIPreview() {
    // Add AI preview button to gallery sections
    const gallerySections = document.querySelectorAll('.gallery-section');
    
    gallerySections.forEach(section => {
        const previewBtn = document.createElement('button');
        previewBtn.className = 'ai-preview-btn';
        previewBtn.innerHTML = '<i class="bi bi-magic"></i> AI Preview';
        previewBtn.title = 'See AI-Enhanced Version';
        
        const sectionHeader = section.querySelector('h2');
        if (sectionHeader) {
            sectionHeader.parentNode.insertBefore(previewBtn, sectionHeader.nextSibling);
        }
        
        previewBtn.addEventListener('click', () => showAIPreview(section));
    });
}

function showAIPreview(section) {
    const sectionTitle = section.querySelector('h2').textContent;
    const images = section.querySelectorAll('img');
    
    if (images.length === 0) return;
    
    // Create AI preview modal
    const modal = document.createElement('div');
    modal.className = 'ai-preview-modal';
    modal.innerHTML = `
        <div class="ai-preview-content">
            <div class="ai-preview-header">
                <h3><i class="bi bi-magic text-primary"></i> AI-Enhanced ${sectionTitle}</h3>
                <button class="ai-preview-close">&times;</button>
            </div>
            <div class="ai-preview-body">
                <div class="ai-preview-comparison">
                    <div class="ai-preview-before">
                        <h4>Original</h4>
                        <img src="${images[0].src}" alt="Original" class="ai-preview-img">
                    </div>
                    <div class="ai-preview-after">
                        <h4>AI Enhanced</h4>
                        <img src="${images[0].src}" alt="AI Enhanced" class="ai-preview-img ai-enhanced">
                        <div class="ai-enhancement-overlay">
                            <div class="ai-enhancement-badge">AI Enhanced</div>
                        </div>
                    </div>
                </div>
                <div class="ai-preview-info">
                    <h5>Enhancements Applied:</h5>
                    <ul>
                        <li>✨ Enhanced color vibrancy</li>
                        <li>🌟 Improved lighting balance</li>
                        <li>🎨 Optimized contrast</li>
                        <li>🔍 Sharpened details</li>
                        <li>🌈 Enhanced saturation</li>
                    </ul>
                    <p class="text-muted">This is a preview of AI-enhanced photography. Contact us to learn more about our AI editing services!</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.ai-preview-close');
    closeBtn.addEventListener('click', () => modal.remove());
    
    // Auto-close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Add AI enhancement animation
    setTimeout(() => {
        const enhancedImg = modal.querySelector('.ai-enhanced');
        enhancedImg.classList.add('ai-enhancement-active');
    }, 500);
}

// ===== ACHIEVEMENT DASHBOARD SYSTEM =====
function setupAchievementDashboard() {
    // Create achievement dashboard button
    const dashboardBtn = document.createElement('button');
    dashboardBtn.id = 'achievement-dashboard-btn';
    dashboardBtn.className = 'achievement-dashboard-btn';
    dashboardBtn.innerHTML = '<i class="bi bi-trophy"></i>';
    dashboardBtn.title = 'Achievement Dashboard';
    
    document.body.appendChild(dashboardBtn);
    
    // Create achievement dashboard modal
    const dashboardModal = createAchievementDashboard();
    document.body.appendChild(dashboardModal);
    
    // Event listeners
    dashboardBtn.addEventListener('click', () => toggleAchievementDashboard());
}

function createAchievementDashboard() {
    const modal = document.createElement('div');
    modal.id = 'achievement-dashboard-modal';
    modal.className = 'achievement-dashboard-modal';
    modal.innerHTML = `
        <div class="dashboard-content">
            <div class="dashboard-header">
                <h3><i class="bi bi-trophy text-warning"></i> Achievement Dashboard</h3>
                <button class="dashboard-close-btn">&times;</button>
            </div>
            <div class="dashboard-body">
                <div class="dashboard-stats">
                    <div class="stat-item">
                        <div class="stat-number" id="total-achievements">0</div>
                        <div class="stat-label">Achievements</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" id="current-streak">0</div>
                        <div class="stat-label">Day Streak</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" id="visit-count">0</div>
                        <div class="stat-label">Total Visits</div>
                    </div>
                </div>
                <div class="dashboard-achievements" id="dashboard-achievements">
                    <h4>Your Achievements</h4>
                    <div class="achievements-list">
                        <!-- Achievements will be populated here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const closeBtn = modal.querySelector('.dashboard-close-btn');
    closeBtn.addEventListener('click', () => toggleAchievementDashboard());
    
    return modal;
}

function toggleAchievementDashboard() {
    const modal = document.getElementById('achievement-dashboard-modal');
    modal.classList.toggle('show');
    
    if (modal.classList.contains('show')) {
        updateDashboardStats();
        populateAchievements();
    }
}

function updateDashboardStats() {
    const totalAchievements = document.getElementById('total-achievements');
    const currentStreak = document.getElementById('current-streak');
    const visitCount = document.getElementById('visit-count');
    
    const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    const streak = localStorage.getItem('currentStreak') || '0';
    const visits = localStorage.getItem('visitCount') || '0';
    
    totalAchievements.textContent = achievements.length;
    currentStreak.textContent = streak;
    visitCount.textContent = visits;
}

function populateAchievements() {
    const achievementsList = document.querySelector('.achievements-list');
    const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    
    if (achievements.length === 0) {
        achievementsList.innerHTML = '<p class="text-muted">No achievements yet. Keep exploring to unlock badges!</p>';
        return;
    }
    
    achievementsList.innerHTML = achievements.map(achievement => `
        <div class="achievement-item">
            <div class="achievement-icon">${getBadgeData(achievement.type).icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">${getBadgeData(achievement.type).title}</div>
                <div class="achievement-description">${getBadgeData(achievement.type).description}</div>
                <div class="achievement-date">Unlocked: ${new Date(achievement.date).toLocaleDateString()}</div>
            </div>
        </div>
    `).join('');
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

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

// ===== DEBUG MODE =====
if (localStorage.getItem('debugMode') === 'true') {
    console.log('🎯 Debug Mode Active');
    console.log('🎵 Music System:', { isMusicPlaying, backgroundMusic });
    console.log('🤖 AI Features:', { chatbot: true, preview: true, dashboard: true });
    console.log('🎤 Voice Input:', { supported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window });
    console.log('👤 User Preferences:', {
        theme: localStorage.getItem('theme'),
        visitCount: localStorage.getItem('visitCount'),
        lastVisit: localStorage.getItem('lastVisitDate')
    });
}
