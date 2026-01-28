/**
 * VenueFY Ecosystem - JavaScript
 * Handles interactivity for the static website
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile menu toggle
    initMobileMenu();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Scroll animations (Intersection Observer)
    initScrollAnimations();

    // Navbar background on scroll
    initNavbarScroll();

    // Close mobile menu when clicking nav links
    initMobileNavClose();

    // Initialize Coffee Modal
    initCoffeeModal();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn.querySelector('.menu-icon');
    const closeIcon = menuBtn.querySelector('.close-icon');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            const isOpen = !mobileMenu.classList.contains('hidden');

            if (isOpen) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });
    }
}

/**
 * Close mobile menu when clicking nav links
 */
function initMobileNavClose() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuIcon = menuBtn?.querySelector('.menu-icon');
    const closeIcon = menuBtn?.querySelector('.close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                if (menuIcon) menuIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            }
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navbarHeight = 64; // Height of fixed navbar
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.problem-card, .product-card, .benefit-item, .action-card, .fade-in-view'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Navbar Background Change on Scroll
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    if (navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.style.background = 'hsla(222, 30%, 8%, 0.95)';
            } else {
                navbar.style.background = '';
            }

            lastScroll = currentScroll;
        });
    }
}

/**
 * Utility: Add class with delay
 */
function addClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

/**
 * Button ripple effect (optional enhancement)
 */
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation keyframes dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Initialize ripple effect
initButtonRipple();

/**
 * Parallax effect for hero orbs (optional)
 */
function initParallax() {
    const orbs = document.querySelectorAll('.hero-orb');

    if (orbs.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 10;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
}

// Initialize parallax (uncomment to enable)
// initParallax();

/**
 * Counter animation for stats
 */
function animateCounters() {
    const stats = document.querySelectorAll('.stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stats are gradient text, so we just add the animation class
                entry.target.classList.add('animate-fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Initialize counter animation
animateCounters();

/**
 * Coffee Donation Modal Logic
 */
function initCoffeeModal() {
    const modal = document.getElementById('coffee-modal');
    const openBtn = document.getElementById('buy-coffee-btn');
    const closeBtn = document.getElementById('close-modal');
    const overlay = modal?.querySelector('.modal-overlay');
    const phoneInput = document.getElementById('phone-number');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const sendBtn = document.getElementById('send-stk-btn');
    const statusDiv = document.getElementById('stk-status');
    const statusText = statusDiv?.querySelector('.status-text');

    let selectedAmount = 600;

    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        resetSTKStatus();
    };

    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedAmount = parseInt(btn.dataset.amount);
            customAmountInput.value = '';
        });
    });

    customAmountInput?.addEventListener('input', (e) => {
        if (e.target.value) {
            presetBtns.forEach(b => b.classList.remove('active'));
            selectedAmount = parseInt(e.target.value);
        }
    });

    sendBtn?.addEventListener('click', async () => {
        const phone = phoneInput.value.trim();
        const amount = customAmountInput.value ? parseInt(customAmountInput.value) : selectedAmount;

        if (!validatePhone(phone)) {
            showStatus('Please enter a valid Safaricom number', 'error');
            return;
        }

        if (!amount || amount <= 0) {
            showStatus('Please enter a valid amount', 'error');
            return;
        }

        const formattedPhone = formatPhoneNumber(phone);

        try {
            showStatus('Initiating STK Push...', 'loading');
            sendBtn.disabled = true;

            const response = await fetch('https://coffee.venuefy.top/initiate-stk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: formattedPhone, amount: amount })
            });

            const data = await response.json();

            if (data.success) {
                showStatus('STK Push sent! Check your phone.', 'success');
                setTimeout(closeModal, 5000);
            } else {
                showStatus(data.error || 'STK Push failed.', 'error');
                sendBtn.disabled = false;
            }
        } catch (error) {
            showStatus('Network error.', 'error');
            sendBtn.disabled = false;
        }
    });

    function validatePhone(phone) {
        const regex = /^(?:254|\+254|0)?([71][0-9]{8})$/;
        return regex.test(phone);
    }

    function formatPhoneNumber(phone) {
        const regex = /^(?:254|\+254|0)?([71][0-9]{8})$/;
        const match = phone.match(regex);
        return match ? '254' + match[1] : phone;
    }

    function showStatus(message, type) {
        if (!statusDiv || !statusText) return;
        statusDiv.classList.remove('hidden');
        statusText.textContent = message;
        const spinner = statusDiv.querySelector('.status-spinner');
        if (spinner) spinner.classList.toggle('hidden', type !== 'loading');
        statusText.classList.remove('status-success', 'status-error');
        if (type === 'success') statusText.classList.add('status-success');
        if (type === 'error') statusText.classList.add('status-error');
    }

    function resetSTKStatus() {
        if (statusDiv) statusDiv.classList.add('hidden');
        if (sendBtn) sendBtn.disabled = false;
        if (phoneInput) phoneInput.value = '';
        if (customAmountInput) customAmountInput.value = '';
    }
}

console.log('VenueFY Ecosystem - Website Loaded Successfully! 🎓');

console.log('VenueFY Ecosystem - Website Loaded Successfully! 🎓');