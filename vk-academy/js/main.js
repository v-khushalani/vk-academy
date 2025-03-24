// main.js

// Mobile Menu Functionality
const initMobileMenu = () => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mainNav = document.getElementById('mainNav');
    const closeMenu = document.getElementById('closeMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenuState = (shouldOpen) => {
        mobileMenu.classList.toggle('active', shouldOpen);
        mainNav.classList.toggle('active', shouldOpen);
    };

    const handleMenuToggle = (e) => {
        const isOutsideClick = !mainNav.contains(e.target) && 
                             !mobileMenu.contains(e.target);
        
        if (e.currentTarget === mobileMenu) toggleMenuState(true);
        if (e.currentTarget === closeMenu || isOutsideClick) toggleMenuState(false);
    };

    // Event Listeners
    mobileMenu.addEventListener('click', handleMenuToggle);
    closeMenu.addEventListener('click', handleMenuToggle);
    navLinks.forEach(link => link.addEventListener('click', () => toggleMenuState(false)));
    document.addEventListener('click', handleMenuToggle);
};

// Counter Animation
const initCounters = () => {
    const animateCounter = (element, target) => {
        let count = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            count < target ? 
                (count += increment, element.textContent = Math.ceil(count), requestAnimationFrame(updateCounter)) :
                (element.textContent = target);
        };
        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) {
                const counter = target.querySelector('.number');
                animateCounter(counter, +counter.dataset.count);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(observer.observe);
};

// Smooth Scroll
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCounters();
    initSmoothScroll();
});