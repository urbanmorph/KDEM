/**
 * Shared formatting utilities for the KDEM Dashboard
 */

/**
 * Format large numbers into human-readable format (B/M/K)
 */
export function formatNumber(value) {
    if (value == null || value === 0) return '0'
    if (typeof value === 'string') return value

    if (value >= 1000000000) {
        return (value / 1000000000).toFixed(2) + 'B'
    } else if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M'
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + 'K'
    } else {
        return value.toFixed(2)
    }
}

/**
 * Format currency values with $ prefix
 */
export function formatCurrency(value, unit = 'B') {
    if (!value || value === 0) return '$0'
    return `$${formatNumber(value)}`
}

/**
 * Initialize animated counters on elements with data-target attribute
 * Uses IntersectionObserver + requestAnimationFrame for smooth animation
 */
export function initAnimatedCounters(container) {
    const counters = container.querySelectorAll('.animated-counter')
    if (!counters.length) return

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true'
                animateCounter(entry.target)
            }
        })
    }, { threshold: 0.3 })

    counters.forEach(counter => observer.observe(counter))
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target)
    const suffix = element.dataset.suffix || ''
    const prefix = element.dataset.prefix || ''
    const decimals = parseInt(element.dataset.decimals || '0')
    const duration = 1500

    let startTime = null

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3)
    }

    function update(timestamp) {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)
        const current = target * easedProgress

        element.textContent = prefix + current.toFixed(decimals) + suffix

        if (progress < 1) {
            requestAnimationFrame(update)
        }
    }

    requestAnimationFrame(update)
}
