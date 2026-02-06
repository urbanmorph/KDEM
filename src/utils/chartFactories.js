/**
 * Reusable chart builder functions for the KDEM Dashboard
 */

import { Chart, CHART_COLORS, destroyChart, createGradient, getResponsiveOptions } from './chartSetup.js'

/**
 * Create a doughnut chart with center text
 */
export function createDoughnutChart(canvasId, labels, data, colors, centerText = '') {
    const ctx = document.getElementById(canvasId)
    if (!ctx) return null
    destroyChart(canvasId)

    const responsive = getResponsiveOptions()
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors || CHART_COLORS.verticals.slice(0, data.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            ...responsive,
            cutout: '60%',
            plugins: {
                ...responsive.plugins,
                datalabels: {
                    display: window.innerWidth >= 768,
                    color: '#fff',
                    font: { size: 11, weight: '600' },
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0)
                        const pct = total > 0 ? ((value / total) * 100).toFixed(0) + '%' : ''
                        return pct
                    },
                    anchor: 'center'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0)
                            const pct = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0
                            return `${context.label}: $${context.parsed}B (${pct}%)`
                        }
                    }
                }
            }
        },
        plugins: centerText ? [{
            id: 'centerText',
            afterDraw(chart) {
                const { width, height, ctx: c } = chart
                c.save()
                c.font = '700 18px Inter, sans-serif'
                c.fillStyle = '#202124'
                c.textAlign = 'center'
                c.textBaseline = 'middle'
                c.fillText(centerText, width / 2, height / 2)
                c.restore()
            }
        }] : []
    })
}

/**
 * Create a radar chart for multi-dimensional comparison
 */
export function createRadarChart(canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId)
    if (!ctx) return null
    destroyChart(canvasId)

    const responsive = getResponsiveOptions()
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels,
            datasets: datasets.map((ds, i) => ({
                label: ds.label,
                data: ds.data,
                borderColor: CHART_COLORS.verticals[i % CHART_COLORS.verticals.length],
                backgroundColor: CHART_COLORS.alpha(CHART_COLORS.verticals[i % CHART_COLORS.verticals.length], 0.15),
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: CHART_COLORS.verticals[i % CHART_COLORS.verticals.length]
            }))
        },
        options: {
            ...responsive,
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: { display: false },
                    pointLabels: { font: { size: 11 } }
                }
            },
            plugins: {
                ...responsive.plugins,
                datalabels: { display: false }
            }
        }
    })
}

/**
 * Create a gauge chart (semi-circular doughnut)
 */
export function createGaugeChart(canvasId, value, max, label) {
    const ctx = document.getElementById(canvasId)
    if (!ctx) return null
    destroyChart(canvasId)

    const percentage = Math.min((value / max) * 100, 100)
    const isOverflow = value > max
    const fillColor = isOverflow ? '#f59e0b' : '#E96337'
    const remaining = Math.max(100 - percentage, 0)

    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [percentage, remaining],
                backgroundColor: [fillColor, '#e8eaed'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            cutout: '75%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                datalabels: { display: false }
            }
        },
        plugins: [{
            id: 'gaugeText',
            afterDraw(chart) {
                const { width, height, ctx: c } = chart
                c.save()
                c.font = '700 20px Inter, sans-serif'
                c.fillStyle = isOverflow ? '#f59e0b' : '#E96337'
                c.textAlign = 'center'
                c.textBaseline = 'middle'
                c.fillText(`${(value / max * 100).toFixed(0)}%`, width / 2, height * 0.65)
                c.font = '500 11px Inter, sans-serif'
                c.fillStyle = '#5f6368'
                c.fillText(label, width / 2, height * 0.65 + 22)
                c.restore()
            }
        }]
    })
}

/**
 * Create a gradient-filled area chart
 */
export function createAreaChart(canvasId, labels, datasets) {
    const canvas = document.getElementById(canvasId)
    if (!canvas) return null
    destroyChart(canvasId)

    const responsive = getResponsiveOptions()
    const chartCtx = canvas.getContext('2d')

    return new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: datasets.map((ds, i) => {
                const color = ds.color || CHART_COLORS.verticals[i % CHART_COLORS.verticals.length]
                return {
                    label: ds.label,
                    data: ds.data,
                    borderColor: color,
                    backgroundColor: createGradient(chartCtx, color),
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: color
                }
            })
        },
        options: {
            ...responsive,
            plugins: {
                ...responsive.plugins,
                datalabels: {
                    display: window.innerWidth >= 768,
                    color: '#202124',
                    font: { size: 10, weight: '600' },
                    anchor: 'end',
                    align: 'top',
                    formatter: (value) => `$${value}B`
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { callback: (v) => `$${v}B` },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: { grid: { display: false } }
            }
        }
    })
}

/**
 * Create a horizontal bar chart (for rankings/comparisons)
 */
export function createHorizontalBarChart(canvasId, labels, data, colors) {
    const ctx = document.getElementById(canvasId)
    if (!ctx) return null
    destroyChart(canvasId)

    const responsive = getResponsiveOptions()
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors || CHART_COLORS.verticals.slice(0, data.length),
                borderRadius: 4,
                barThickness: 24
            }]
        },
        options: {
            ...responsive,
            indexAxis: 'y',
            plugins: {
                ...responsive.plugins,
                legend: { display: false },
                datalabels: {
                    display: window.innerWidth >= 768,
                    color: '#202124',
                    font: { size: 11, weight: '600' },
                    anchor: 'end',
                    align: 'right',
                    formatter: (value) => `$${value}B`
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { callback: (v) => `$${v}B` },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                y: { grid: { display: false } }
            }
        }
    })
}

/**
 * Create a stacked bar chart
 */
export function createStackedBarChart(canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId)
    if (!ctx) return null
    destroyChart(canvasId)

    const responsive = getResponsiveOptions()
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: datasets.map((ds, i) => ({
                label: ds.label,
                data: ds.data,
                backgroundColor: ds.color || CHART_COLORS.verticals[i % CHART_COLORS.verticals.length],
                borderRadius: 2
            }))
        },
        options: {
            ...responsive,
            plugins: {
                ...responsive.plugins,
                datalabels: { display: false }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: { callback: (v) => `$${v}B` },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                }
            }
        }
    })
}

/**
 * Create a standard bar chart (vertical)
 */
export function createBarChart(canvasId, labels, data, color, options = {}) {
    const ctx = document.getElementById(canvasId)
    if (!ctx) return null
    destroyChart(canvasId)

    const responsive = getResponsiveOptions()
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: color || CHART_COLORS.verticals[0],
                borderRadius: 4,
                barThickness: options.barThickness || 40
            }]
        },
        options: {
            ...responsive,
            plugins: {
                ...responsive.plugins,
                legend: { display: false },
                datalabels: {
                    display: window.innerWidth >= 768,
                    color: '#202124',
                    font: { size: 10, weight: '600' },
                    anchor: 'end',
                    align: 'top',
                    formatter: options.formatter || ((v) => `$${v}B`)
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { callback: options.yTickCallback || ((v) => `$${v}B`) },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: { grid: { display: false } }
            }
        }
    })
}

/**
 * Create a combined bar + line chart
 */
export function createComboChart(canvasId, labels, barDatasets, lineDatasets) {
    const ctx = document.getElementById(canvasId)
    if (!ctx) return null
    destroyChart(canvasId)

    const responsive = getResponsiveOptions()
    const allDatasets = [
        ...barDatasets.map(ds => ({
            type: 'bar',
            label: ds.label,
            data: ds.data,
            backgroundColor: ds.color,
            borderRadius: 4,
            yAxisID: ds.yAxisID || 'y',
            order: 2
        })),
        ...lineDatasets.map(ds => ({
            type: 'line',
            label: ds.label,
            data: ds.data,
            borderColor: ds.color,
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: ds.color,
            yAxisID: ds.yAxisID || 'y1',
            borderDash: ds.dashed ? [5, 5] : [],
            order: 1
        }))
    ]

    return new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: allDatasets },
        options: {
            ...responsive,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                ...responsive.plugins,
                datalabels: { display: false }
            },
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    title: { display: true, text: barDatasets[0]?.axisLabel || '' },
                    ticks: { callback: (v) => `$${v}B` },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    title: { display: true, text: lineDatasets[0]?.axisLabel || '' },
                    ticks: { callback: (v) => `$${v}B` },
                    grid: { drawOnChartArea: false }
                },
                x: { grid: { display: false } }
            }
        }
    })
}
