/**
 * Design system chart tokens
 * These tokens are specifically for styling chart components and MetricCards.
 */

import { colors } from './colors';
import { typography } from './typography';
import { shadows } from './shadows';

export const chartTokens = {
  status: {
    // Maps to dataViz colors for semantic status indicators
    error: colors.colors.error[500],
    warning: colors.colors.warning[500],
    success: colors.colors.success[500],
    neutral: colors.colors.neutral[500],
    primary: colors.colors.primary[600],
  },
  series: [
    // Data visualization color palette for consistent charting
    colors.colors.dataViz.primary,    // Main data series
    colors.colors.dataViz.secondary,  // Comparison data series
    colors.colors.dataViz.highlight,  // Highlighting specific metrics
    colors.colors.dataViz.alt,        // Alternative data categories
    colors.colors.dataViz.positive,   // Positive trends
    colors.colors.dataViz.negative,   // Negative trends
  ],
  axis: {
    // Maps to colors.colors.neutral[500]
    stroke: colors.colors.neutral[500],
    strokeWidth: 1,
    // Maps to typography.fontFamily.openSans
    fontFamily: typography.fontFamily.openSans,
    // Maps to typography.fontSize.xs
    fontSize: typography.fontSize.xs,
    // Maps to colors.colors.neutral[700]
    color: colors.colors.neutral[700],
  },
  grid: {
    // Maps to colors.colors.neutral[200] (light grid line)
    stroke: colors.colors.neutral[200],
    dashArray: '3 3', // Example dash array for lighter grid
  },
  tooltip: {
    // Maps to colors.colors.neutral[800] (dark background for tooltip)
    bg: colors.colors.neutral[800],
    // Maps to colors.colors.neutral[50] (light text color)
    color: colors.colors.neutral[50],
    // Example padding, can be a string or number if your system supports it
    padding: '8px 12px',
    // Example border radius
    borderRadius: '4px',
    // Maps to typography.fontSize.sm
    fontSize: typography.fontSize.sm,
  },
  card: {
    // Example padding values
    padding: '1rem',
    gap: '0.5rem',
    // Maps to shadows.md
    shadow: shadows.md,
  },
};

export default chartTokens; 