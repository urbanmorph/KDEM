/**
 * Shared UI components for the KDEM Dashboard
 * Annotated metric cards, progress bars, and badge renderers
 */

import { formatNumber } from './formatting.js'
import { getScaleContext, getDataTypeBadge } from './citations.js'

/**
 * Render an annotated metric card with data type badge, confidence, source, and optional formula
 */
export function annotatedMetricCard({
    label,
    value,
    unit,
    icon = '',
    type = 'computed',
    confidence = 3,
    source = '',
    formula = '',
    target = '',
    animateFrom = true
}) {
    const formattedValue = formatNumber(value)
    const scaleWarning = getScaleContext(value, unit)
    const badge = getDataTypeBadge(type)

    const animAttrs = animateFrom && value
        ? `class="metric-value animated-counter" data-target="${value}" data-suffix="" data-prefix="" data-decimals="2"`
        : `class="metric-value"`

    return `
        <div class="metric-card annotated-metric">
            ${icon ? `<div class="metric-icon">${icon}</div>` : ''}
            <div class="metric-content">
                <div class="metric-label">${label}</div>
                <div class="metric-value">${formattedValue}</div>
                <div class="metric-unit">${unit}</div>
                ${target ? `<div class="metric-target">${target}</div>` : ''}
                <div class="metric-footer">
                    <span class="data-type-badge ${badge.className}">${badge.label}</span>
                    ${renderConfidenceStars(confidence)}
                    ${formula ? `<span class="formula-tooltip" title="${formula}">f(x)</span>` : ''}
                </div>
                ${source ? `<div class="source-inline">${source}</div>` : ''}
                ${scaleWarning ? `<div class="scale-context-badge">${scaleWarning.message}</div>` : ''}
            </div>
        </div>
    `
}

/**
 * Render confidence stars (filled/empty)
 */
export function renderConfidenceStars(rating) {
    const filled = Math.min(Math.max(Math.round(rating), 0), 5)
    const empty = 5 - filled
    return `<span class="confidence-stars">${'&#9733;'.repeat(filled)}${'&#9734;'.repeat(empty)}</span>`
}

/**
 * Render a data type badge
 */
export function renderDataTypeBadge(type) {
    const badge = getDataTypeBadge(type)
    return `<span class="data-type-badge ${badge.className}">${badge.label}</span>`
}

/**
 * Render a scale context warning badge
 */
export function renderScaleWarning(value, unit) {
    const warning = getScaleContext(value, unit)
    if (!warning) return ''
    return `<div class="scale-context-badge">${warning.message}</div>`
}

/**
 * Render a progress bar that handles overflow (>100%)
 */
export function annotatedProgressBar({
    label,
    current,
    target,
    unit = '',
    formatFn = formatNumber
}) {
    const percentage = target > 0 ? (current / target) * 100 : 0
    const isOverflow = percentage > 100
    const clampedWidth = Math.min(percentage, 100)

    return `
        <div class="progress-item">
            <div class="progress-header">
                <span class="progress-label">${label}</span>
                <span class="progress-percentage ${isOverflow ? 'progress-overflow' : ''}">${percentage.toFixed(1)}%</span>
            </div>
            <div class="progress-bar ${isOverflow ? 'progress-bar-overflow' : ''}">
                <div class="progress-fill" style="width: ${clampedWidth}%"></div>
            </div>
            <div class="progress-details">
                <span>${formatFn(current)} ${unit}</span>
                <span>of ${formatFn(target)} ${unit} target</span>
            </div>
            ${isOverflow ? `
                <div class="progress-overflow-note">
                    Sum of vertical targets (${formatFn(current)}) exceeds stated mission target (${formatFn(target)}). Verticals may have overlapping revenue streams.
                </div>
            ` : ''}
        </div>
    `
}
