/**
 * ECharts factory functions for KDEM Dashboard
 * Speedometer gauges, sankey diagrams, treemaps
 */

import { initEChart, getBaseOptions, ECHART_COLORS } from './echartsSetup.js'

/**
 * Create a speedometer gauge with needle, colored zones, and target marker
 * @param {string} containerId - DOM element ID (must be a div, not canvas)
 * @param {number} value - Current value
 * @param {number} max - Maximum/target value
 * @param {string} label - Label text
 * @param {object} opts - Optional overrides { unit, zones, color }
 */
export function createSpeedometerGauge(containerId, value, max, label, opts = {}) {
    const container = document.getElementById(containerId)
    if (!container) return null

    // Ensure container has explicit dimensions before ECharts init
    if (!container.offsetWidth) {
        container.style.width = '100%'
    }

    const chart = initEChart(containerId)
    if (!chart) return null

    const percentage = Math.min((value / max) * 100, 120)

    // Color zones: 0-25% danger, 25-50% warning, 50-75% ok, 75-100% good
    const zones = opts.zones || [
        { start: 0, end: 25, color: ECHART_COLORS.gaugeZones.danger },
        { start: 25, end: 50, color: ECHART_COLORS.gaugeZones.warning },
        { start: 50, end: 75, color: ECHART_COLORS.gaugeZones.ok },
        { start: 75, end: 100, color: ECHART_COLORS.gaugeZones.good }
    ]

    const axisLineColors = zones.map(z => [z.end / 100, z.color])

    const option = {
        ...getBaseOptions(),
        series: [{
            type: 'gauge',
            center: ['50%', '55%'],
            radius: '90%',
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 4,
            pointer: {
                length: '55%',
                width: 5,
                itemStyle: {
                    color: ECHART_COLORS.textPrimary
                }
            },
            axisLine: {
                lineStyle: {
                    width: 18,
                    color: axisLineColors
                }
            },
            axisTick: {
                distance: -18,
                length: 5,
                lineStyle: {
                    color: '#999',
                    width: 1
                }
            },
            splitLine: {
                distance: -22,
                length: 12,
                lineStyle: {
                    color: '#999',
                    width: 2
                }
            },
            axisLabel: {
                distance: 25,
                color: ECHART_COLORS.textSecondary,
                fontSize: 11,
                formatter: (v) => `${v}%`
            },
            anchor: {
                show: true,
                size: 10,
                itemStyle: {
                    borderColor: ECHART_COLORS.primary,
                    borderWidth: 2,
                    color: '#fff'
                }
            },
            detail: {
                valueAnimation: true,
                fontSize: 18,
                fontWeight: '700',
                color: ECHART_COLORS.textPrimary,
                offsetCenter: [0, '75%'],
                formatter: () => `${percentage.toFixed(0)}%`
            },
            title: {
                offsetCenter: [0, '95%'],
                fontSize: 12,
                color: ECHART_COLORS.textSecondary,
                fontWeight: '500'
            },
            data: [{
                value: Math.min(percentage, 100),
                name: label
            }]
        }]
    }

    chart.setOption(option)

    // Resize after a brief delay to ensure container is laid out
    setTimeout(() => chart.resize(), 50)

    const resizeHandler = () => chart.resize()
    window.addEventListener('resize', resizeHandler)
    chart._kdem_resizeHandler = resizeHandler

    return chart
}

/**
 * Create a sankey diagram showing flows between nodes
 * @param {string} containerId - DOM element ID
 * @param {Array} nodes - [{name: 'IT Exports'}, ...]
 * @param {Array} links - [{source: 'Total', target: 'IT Exports', value: 229}, ...]
 * @param {object} opts - Optional overrides
 */
export function createSankeyChart(containerId, nodes, links, opts = {}) {
    const container = document.getElementById(containerId)
    if (!container) return null

    // Ensure container has explicit dimensions before ECharts init
    if (!container.offsetWidth) {
        container.style.width = '100%'
    }

    const chart = initEChart(containerId)
    if (!chart) return null

    // Clean nodes — only pass name + itemStyle, no extra fields
    const cleanNodes = nodes.map(node => ({
        name: node.name,
        itemStyle: {
            color: ECHART_COLORS.verticalMap[node.id] || node.color || ECHART_COLORS.primary
        }
    }))

    const cleanLinks = links.map(l => ({
        source: l.source,
        target: l.target,
        value: l.value
    }))

    const option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [{
            type: 'sankey',
            layoutIterations: 32,
            nodeAlign: 'justify',
            nodeWidth: 20,
            nodeGap: 14,
            left: 50,
            right: 150,
            top: 10,
            bottom: 10,
            emphasis: {
                focus: 'adjacency'
            },
            lineStyle: {
                color: 'gradient',
                opacity: 0.4,
                curveness: 0.5
            },
            label: {
                show: true,
                fontSize: 12,
                color: ECHART_COLORS.textPrimary
            },
            data: cleanNodes,
            links: cleanLinks
        }]
    }

    chart.setOption(option)

    // Resize after a brief delay to ensure container is laid out
    setTimeout(() => chart.resize(), 50)

    const resizeHandler = () => chart.resize()
    window.addEventListener('resize', resizeHandler)
    chart._kdem_resizeHandler = resizeHandler

    return chart
}

/**
 * Create a treemap showing hierarchical composition
 * @param {string} containerId - DOM element ID
 * @param {Array} data - Hierarchical data [{name, value, children: [...]}]
 * @param {object} opts - Optional overrides
 */
export function createTreemapChart(containerId, data, opts = {}) {
    const chart = initEChart(containerId)
    if (!chart) return null

    const option = {
        ...getBaseOptions(),
        tooltip: {
            formatter: (params) => {
                const value = params.value
                const treePathInfo = params.treePathInfo || []
                const path = treePathInfo.map(n => n.name).filter(Boolean).join(' > ')
                return `${path}<br/><strong>$${value}B</strong>`
            }
        },
        series: [{
            type: 'treemap',
            roam: false,
            left: 0,
            right: 0,
            top: 0,
            bottom: 30,
            nodeClick: false,
            squareRatio: 0.5 * (1 + Math.sqrt(5)),
            breadcrumb: {
                show: true,
                left: 'center',
                bottom: 0,
                itemStyle: {
                    color: ECHART_COLORS.primary,
                    textStyle: { color: '#fff' }
                }
            },
            label: {
                show: true,
                formatter: (params) => `${params.name}\n$${params.value}B`,
                fontSize: 12,
                fontWeight: '600',
                color: '#fff',
                lineHeight: 18,
                overflow: 'truncate',
                ellipsis: '..'
            },
            upperLabel: {
                show: true,
                height: 26,
                formatter: (params) => `${params.name}  ($${params.value}B)`,
                color: '#fff',
                fontWeight: '600',
                fontSize: 12,
                padding: [4, 8],
                overflow: 'truncate',
                ellipsis: '..'
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 2,
                gapWidth: 2
            },
            levels: [
                {
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 3,
                        gapWidth: 3
                    },
                    upperLabel: { show: false }
                },
                {
                    colorSaturation: [0.35, 0.6],
                    itemStyle: {
                        borderColorSaturation: 0.7,
                        borderWidth: 1,
                        gapWidth: 1
                    }
                }
            ],
            data: data.map((item, i) => ({
                ...item,
                itemStyle: {
                    color: item.color || ECHART_COLORS.verticals[i % ECHART_COLORS.verticals.length]
                }
            }))
        }]
    }

    chart.setOption(option)
    setTimeout(() => chart.resize(), 50)

    const resizeHandler = () => chart.resize()
    window.addEventListener('resize', resizeHandler)
    chart._kdem_resizeHandler = resizeHandler

    return chart
}

/**
 * Create a waterfall-style chart using ECharts custom series
 * Shows how components add up to a total
 * @param {string} containerId - DOM element ID
 * @param {Array} items - [{name, value, isTotal}]
 * @param {object} opts - Optional overrides
 */
export function createWaterfallChart(containerId, items, opts = {}) {
    const chart = initEChart(containerId)
    if (!chart) return null

    // Calculate running totals
    let runningTotal = 0
    const processedItems = items.map(item => {
        if (item.isTotal) {
            return { ...item, start: 0, end: runningTotal }
        }
        const start = runningTotal
        runningTotal += item.value
        return { ...item, start, end: runningTotal }
    })

    const categories = processedItems.map(d => d.name)
    // Invisible base (support bar)
    const baseData = processedItems.map(d => d.isTotal ? 0 : d.start)
    // Visible bar
    const valueData = processedItems.map(d => d.isTotal ? d.end : d.value)

    const option = {
        ...getBaseOptions(),
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params) => {
                const idx = params[0].dataIndex
                const item = processedItems[idx]
                if (item.isTotal) {
                    return `<strong>${item.name}</strong><br/>Total: $${item.end}B`
                }
                return `<strong>${item.name}</strong><br/>$${item.value}B<br/>Running: $${item.end}B`
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: categories,
            axisLabel: {
                fontSize: 11,
                color: ECHART_COLORS.textSecondary,
                interval: 0,
                rotate: categories.length > 5 ? 25 : 0
            },
            axisLine: { lineStyle: { color: ECHART_COLORS.border } }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 11,
                color: ECHART_COLORS.textSecondary,
                formatter: (v) => `$${v}B`
            },
            splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)' } }
        },
        series: [
            {
                name: 'Base',
                type: 'bar',
                stack: 'waterfall',
                itemStyle: { borderColor: 'transparent', color: 'transparent' },
                emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
                data: baseData
            },
            {
                name: 'Value',
                type: 'bar',
                stack: 'waterfall',
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 11,
                    fontWeight: '600',
                    color: ECHART_COLORS.textPrimary,
                    formatter: (params) => {
                        const item = processedItems[params.dataIndex]
                        return item.isTotal ? `$${item.end}B` : `$${item.value}B`
                    }
                },
                itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                },
                data: valueData.map((v, i) => ({
                    value: v,
                    itemStyle: {
                        color: processedItems[i].isTotal
                            ? ECHART_COLORS.primary
                            : processedItems[i].color || ECHART_COLORS.verticals[i % ECHART_COLORS.verticals.length]
                    }
                }))
            }
        ]
    }

    chart.setOption(option)
    setTimeout(() => chart.resize(), 50)

    const resizeHandler = () => chart.resize()
    window.addEventListener('resize', resizeHandler)
    chart._kdem_resizeHandler = resizeHandler

    return chart
}
