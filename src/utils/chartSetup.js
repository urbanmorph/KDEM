/**
 * Centralized Chart.js setup and registration
 * All chart controllers, elements, and plugins registered here
 */

import {
    Chart,
    BarController,
    LineController,
    DoughnutController,
    RadarController,
    PolarAreaController,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels'

// Register all components
Chart.register(
    BarController,
    LineController,
    DoughnutController,
    RadarController,
    PolarAreaController,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartDataLabels
)

// Set global defaults
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
Chart.defaults.animation.duration = 1200
Chart.defaults.animation.easing = 'easeOutQuart'
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(32, 33, 36, 0.9)'
Chart.defaults.plugins.tooltip.padding = 12
Chart.defaults.plugins.tooltip.titleFont = { size: 14, weight: '600' }
Chart.defaults.plugins.tooltip.bodyFont = { size: 13 }
Chart.defaults.plugins.tooltip.cornerRadius = 8
Chart.defaults.plugins.datalabels.display = false // Off by default, opt-in per chart

export { Chart }

/**
 * KDEM brand colors for charts
 */
export const CHART_COLORS = {
    verticals: ['#E96337', '#E68634', '#5BB9EC', '#8B5CF6', '#10B981'],
    verticalNames: {
        'it-exports': '#E96337',
        'it-domestic': '#E68634',
        'esdm': '#5BB9EC',
        'startups': '#8B5CF6',
        'digitizing-sectors': '#10B981'
    },
    tiers: ['#E96337', '#E68634', '#5BB9EC'],
    sequential: ['#E96337', '#E8734D', '#EA8363', '#EC9379', '#EEA38F', '#F0B3A5', '#F2C3BB'],
    alpha: (color, alpha) => {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
}

/**
 * Destroy existing chart on a canvas to prevent reuse errors
 */
export function destroyChart(canvasId) {
    const existing = Chart.getChart(canvasId)
    if (existing) existing.destroy()
}

/**
 * Create a gradient fill for area charts
 */
export function createGradient(ctx, color, height = 300) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, CHART_COLORS.alpha(color, 0.4))
    gradient.addColorStop(1, CHART_COLORS.alpha(color, 0.02))
    return gradient
}

/**
 * Get responsive chart options (adjusts for mobile)
 */
export function getResponsiveOptions(isMobile = window.innerWidth < 768) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: isMobile ? 'bottom' : 'top',
                labels: {
                    padding: isMobile ? 8 : 16,
                    font: { size: isMobile ? 10 : 12 }
                }
            },
            datalabels: {
                display: !isMobile
            }
        }
    }
}
