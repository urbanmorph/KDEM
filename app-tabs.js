/**
 * KDEM Dashboard - Tabbed Layout JavaScript
 * Handles tab switching, progress bar animations, and interactions
 */

// ============================================
// TAB SWITCHING
// ============================================

/**
 * Initialize tab navigation functionality
 */
function initializeTabs() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchToTab(tabId);
        });
    });

    // Load first tab by default
    if (navButtons.length > 0) {
        const firstTab = navButtons[0].getAttribute('data-tab');
        switchToTab(firstTab);
    }
}

/**
 * Switch to a specific tab
 * @param {string} tabId - The ID of the tab to switch to
 */
function switchToTab(tabId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Remove active class from all buttons and contents
    navButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    const activeButton = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(tabId);

    if (activeButton && activeContent) {
        activeButton.classList.add('active');
        activeContent.classList.add('active');

        // Scroll to top when switching tabs
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Animate progress bars when tab becomes visible
        setTimeout(() => animateProgressBars(), 100);
    }
}

// ============================================
// PROGRESS BAR ANIMATIONS
// ============================================

/**
 * Animate all progress bars in the current visible tab
 */
function animateProgressBars() {
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;

    // Animate all progress bar types
    const progressBars = activeTab.querySelectorAll(
        '.progress-bar-fill, .inline-progress-fill, .mega-progress-fill, ' +
        '.milestone-progress-fill, .target-mini-fill, .budget-fill, .metric-fill'
    );

    progressBars.forEach(bar => {
        const targetWidth = bar.style.width || bar.getAttribute('style')?.match(/width:\s*([^;]+)/)?.[1];
        if (targetWidth) {
            // Reset width
            bar.style.width = '0%';
            // Animate to target width
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 50);
        }
    });
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

/**
 * Animate number counters
 * @param {HTMLElement} element - The element to animate
 * @param {number} target - The target number
 * @param {string} suffix - Suffix to append (e.g., '%', '+')
 * @param {number} duration - Animation duration in milliseconds
 */
function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current)) + suffix;
        }
    }, 16);
}

/**
 * Format number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    return num.toLocaleString('en-IN');
}

/**
 * Initialize counter animations for hero stats
 */
function initializeCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const text = stat.textContent.trim();
        const suffix = text.match(/[%+]/)?.[0] || '';
        const numericValue = parseFloat(text.replace(/[,%+]/g, ''));

        if (!isNaN(numericValue)) {
            // Animate only when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(stat, numericValue, suffix);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(stat);
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// TABLE ENHANCEMENTS
// ============================================

/**
 * Add hover effects and interactivity to tables
 */
function enhanceTables() {
    const tables = document.querySelectorAll('table');

    tables.forEach(table => {
        // Make tables responsive by wrapping in a scrollable container
        if (!table.parentElement.classList.contains('table-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
}

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================

/**
 * Animate elements as they enter viewport
 */
function initializeFadeInAnimations() {
    const animatedElements = document.querySelectorAll(
        '.hero-stat-card, .progress-card, .program-card, .cluster-card-detailed, ' +
        '.metric-card, .exit-card, .gap-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50); // Stagger animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// ============================================
// URL HASH HANDLING
// ============================================

/**
 * Handle URL hash for direct tab linking
 */
function handleUrlHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const tabExists = document.getElementById(hash);
        if (tabExists) {
            switchToTab(hash);
        }
    }
}

/**
 * Update URL hash when tab changes
 */
function updateUrlHash(tabId) {
    if (history.pushState) {
        history.pushState(null, null, `#${tabId}`);
    } else {
        window.location.hash = tabId;
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

/**
 * Enable keyboard navigation for tabs
 */
function initializeKeyboardNavigation() {
    const navButtons = Array.from(document.querySelectorAll('.nav-btn'));

    navButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            let targetIndex;

            switch(e.key) {
                case 'ArrowLeft':
                    targetIndex = index > 0 ? index - 1 : navButtons.length - 1;
                    break;
                case 'ArrowRight':
                    targetIndex = index < navButtons.length - 1 ? index + 1 : 0;
                    break;
                case 'Home':
                    targetIndex = 0;
                    break;
                case 'End':
                    targetIndex = navButtons.length - 1;
                    break;
                default:
                    return;
            }

            e.preventDefault();
            navButtons[targetIndex].focus();
            navButtons[targetIndex].click();
        });
    });
}

// ============================================
// SEARCH FUNCTIONALITY (Optional Enhancement)
// ============================================

/**
 * Add simple search functionality across tabs
 */
function initializeSearch() {
    // This can be enhanced to add a search bar that filters content
    // For now, it's a placeholder for future enhancement
    const searchInput = document.getElementById('dashboard-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            // Implement search logic here if needed
        });
    }
}

// ============================================
// PRINT FUNCTIONALITY
// ============================================

/**
 * Prepare dashboard for printing
 */
function preparePrint() {
    const printButton = document.getElementById('print-dashboard');
    if (printButton) {
        printButton.addEventListener('click', () => {
            // Show all tabs for printing
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(tab => tab.classList.add('active'));

            window.print();

            // Restore tab state after print
            setTimeout(() => {
                const activeButton = document.querySelector('.nav-btn.active');
                if (activeButton) {
                    const tabId = activeButton.getAttribute('data-tab');
                    switchToTab(tabId);
                }
            }, 100);
        });
    }
}

// ============================================
// RESPONSIVE MENU TOGGLE (Mobile)
// ============================================

/**
 * Add mobile menu toggle functionality
 */
function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const tabNav = document.querySelector('.tab-navigation');

    if (menuToggle && tabNav) {
        menuToggle.addEventListener('click', () => {
            tabNav.classList.toggle('mobile-open');
        });

        // Close menu when tab is selected on mobile
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    tabNav.classList.remove('mobile-open');
                }
            });
        });
    }
}

// ============================================
// TOOLTIP INITIALIZATION
// ============================================

/**
 * Initialize tooltips for confidence ratings and other elements
 */
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');

        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);

            const rect = element.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;

            element._tooltip = tooltip;
        });

        element.addEventListener('mouseleave', () => {
            if (element._tooltip) {
                element._tooltip.remove();
                delete element._tooltip;
            }
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all dashboard functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('KDEM Dashboard initializing...');

    // Core functionality
    initializeTabs();
    handleUrlHash();

    // Enhancements
    initializeCounters();
    initializeSmoothScrolling();
    enhanceTables();
    initializeFadeInAnimations();
    initializeKeyboardNavigation();
    initializeMobileMenu();
    initializeTooltips();
    preparePrint();

    // Handle browser back/forward
    window.addEventListener('hashchange', handleUrlHash);

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            animateProgressBars();
        }, 250);
    });

    console.log('KDEM Dashboard initialized successfully!');
});

// ============================================
// EXPORT FUNCTIONS (for potential external use)
// ============================================

window.KDEMDashboard = {
    switchToTab,
    animateCounter,
    formatNumber,
    animateProgressBars
};
