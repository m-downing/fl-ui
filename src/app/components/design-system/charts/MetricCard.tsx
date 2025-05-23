'use client';

// src/app/components-design-system/charts/MetricCard.tsx
import React from 'react';
import { chartTokens } from '../tokens/charts';
import { typography } from '../tokens/typography';
import { colors } from '../tokens/colors';

/**
 * @typedef MetricCardProps
 * @property {string} label - The label or title for the metric.
 * @property {number | string} value - The main value of the metric.
 * @property {number} [delta] - The change in value, can be percentage or absolute.
 * @property {'up' | 'down'} [trend] - Indicates the direction of the trend if delta is present.
 * @property {'success' | 'warning' | 'error' | 'neutral'} [status] - The status of the metric, influences accent colors. Defaults to 'neutral'.
 * @property {() => void} [onClick] - Optional click handler for the card.
 */

/**
 * MetricCard component displays a key metric, optionally with a delta and trend.
 * It uses chartTokens for styling.
 *
 * @param {MetricCardProps} props - The properties for the MetricCard.
 * @returns {JSX.Element} The rendered MetricCard component.
 */
interface MetricCardProps {
  label: string;
  value: number | string;
  delta?: number;
  trend?: 'up' | 'down';
  status?: 'success' | 'warning' | 'error' | 'neutral' | 'primary';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  delta,
  trend,
  status = 'neutral', // Default status
  onClick,
}) => {
  // Get status color from chart tokens
  const statusColor = chartTokens.status[status];
  
  const cardStyle: React.CSSProperties = {
    padding: chartTokens.card.padding,
    boxShadow: chartTokens.card.shadow,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: chartTokens.card.gap,
    fontFamily: typography.fontFamily.openSans,
    backgroundColor: colors.colors.neutral[50], // Light background
    borderLeft: `4px solid ${statusColor}`,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'box-shadow 0.3s ease-in-out',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    color: colors.colors.neutral[600],
    fontWeight: typography.fontWeight.medium,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.colors.neutral[800],
  };

  // Set delta color based on trend
  let deltaColor = colors.colors.neutral[500]; // Default neutral
  if (trend === 'up' && status === 'success') {
    deltaColor = chartTokens.status.success;
  } else if (trend === 'up' && status === 'error') {
    deltaColor = chartTokens.status.error; // Up is bad for errors
  } else if (trend === 'down' && status === 'success') {
    deltaColor = chartTokens.status.success; // Down is good for success
  } else if (trend === 'down' && status === 'error') {
    deltaColor = chartTokens.status.error;
  } else if (trend === 'up') {
    deltaColor = chartTokens.status.success; // Default up is good
  } else if (trend === 'down') {
    deltaColor = chartTokens.status.error; // Default down is bad
  }

  const deltaStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: deltaColor,
  };

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) (e.currentTarget.style.boxShadow = chartTokens.card.shadow.replace('0.1)', '0.2)')); // Slightly enhance shadow on hover
      }}
      onMouseLeave={(e) => {
        if (onClick) (e.currentTarget.style.boxShadow = chartTokens.card.shadow);
      }}
    >
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
      {delta !== undefined && (
        <div style={deltaStyle}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {delta}
          {typeof delta === 'number' ? '%' : ''}
        </div>
      )}
    </div>
  );
};

export default MetricCard; 