/**
 * ECharts Setup - Tree-shaken imports with KDEM theme
 * Only imports the chart types and components we actually use
 */

import * as echarts from 'echarts/core'
import { GaugeChart, SankeyChart, TreemapChart, CustomChart, BarChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// Register only what we need
echarts.use([
    GaugeChart,
    SankeyChart,
    TreemapChart,
    CustomChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    CanvasRenderer
])

export { echarts }

/**
 * KDEM ECharts theme colors (mirrors CHART_COLORS from chartSetup.js)
 */
export const ECHART_COLORS = {
    primary: '#E96337',
    secondary: '#E68634',
    tertiary: '#5BB9EC',
    purple: '#8B5CF6',
    green: '#10B981',
    verticals: ['#E96337', '#E68634', '#5BB9EC', '#8B5CF6', '#10B981'],
    verticalMap: {
        'it-exports': '#E96337',
        'it-domestic': '#E68634',
        'esdm': '#5BB9EC',
        'startups': '#8B5CF6',
        'digitizing-sectors': '#10B981'
    },
    gaugeZones: {
        danger: '#ef4444',
        warning: '#f59e0b',
        ok: '#E96337',
        good: '#10B981'
    },
    bg: '#ffffff',
    textPrimary: '#202124',
    textSecondary: '#5f6368',
    border: '#dadce0'
}

/**
 * Base ECharts options with KDEM font and styling
 */
export function getBaseOptions() {
    return {
        textStyle: {
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        },
        animationDuration: 1200,
        animationEasing: 'cubicOut'
    }
}

/**
 * Initialize an ECharts instance on a DOM element
 * Handles disposal of existing instances
 */
export function initEChart(containerId) {
    const container = document.getElementById(containerId)
    if (!container) return null

    // Dispose existing instance if any
    const existing = echarts.getInstanceByDom(container)
    if (existing) existing.dispose()

    // If container has no computed dimensions, provide explicit fallbacks
    // This happens when the DOM hasn't fully laid out yet
    const w = container.clientWidth
    const h = container.clientHeight
    const opts = {}
    if (!w || !h) {
        opts.width = w || container.parentElement?.clientWidth || 600
        opts.height = h || parseInt(container.style.height) || 300
    }

    return echarts.init(container, null, Object.keys(opts).length ? opts : undefined)
}

/**
 * Dispose an ECharts instance by container ID
 */
export function disposeEChart(containerId) {
    const container = document.getElementById(containerId)
    if (!container) return
    const instance = echarts.getInstanceByDom(container)
    if (instance) instance.dispose()
}
