// IMPORTANT: The following token files are assumed to exist at ../../components/design-system/tokens/
// - colors.ts
// - typography.ts
// - shadows.ts
// Please ensure they export the necessary tokens with the expected structure.

import { colors as designSystemColors } from './colors';
import { typography as designSystemTypography } from './typography';
import { shadows as designSystemShadows } from './shadows';

export const tableTokens = {
  header: {
    bg: designSystemColors.colors.neutral[100],      // Using neutral[100] as an example header background
    color: designSystemColors.colors.neutral[900],    // Using neutral[900] for header text
    fontFamily: designSystemTypography.fontFamily.openSans,
    fontSize: designSystemTypography.fontSize.sm,
    fontWeight: designSystemTypography.fontWeight.semibold,
    lineHeight: designSystemTypography.lineHeight.tight,
    letterSpacing: designSystemTypography.letterSpacing.normal,
    height: '40px',
    border: `1px solid ${designSystemColors.colors.neutral[300]}`, // Using neutral[300] for borders
  },
  row: {
    height: '36px',    // Placeholder: typography.ts does not have explicit sizing tokens like 'rowHeight'
    zebraBg: designSystemColors.colors.neutral[50],    // Using neutral[50] for zebra striping
    hoverBg: designSystemColors.colors.primary[50],    // Using primary[50] for hover background
    fontFamily: designSystemTypography.fontFamily.openSans,
    fontSize: designSystemTypography.fontSize.sm,
    fontWeight: designSystemTypography.fontWeight.normal,
    lineHeight: designSystemTypography.lineHeight.normal,
    color: designSystemColors.colors.neutral[800],    // Using neutral[800] for row text
    borderBottom: `1px solid ${designSystemColors.colors.neutral[200]}`, // Using neutral[200] for a slightly lighter border
  },
  scrollbar: {
    thumb: designSystemColors.colors.neutral[500],  // Using neutral[500] for scrollbar thumb
    track: designSystemColors.colors.neutral[200],  // Using neutral[200] for scrollbar track
    width: '8px',   // Placeholder: typography.ts does not have explicit sizing like 'scrollbarWidth'
  },
  container: {
    border: `1px solid ${designSystemColors.colors.neutral[400]}`, // Using neutral[400] for container border
    borderRadius: '4px', // Placeholder: typography.ts does not have explicit radii tokens like 'medium' - using a common value
    shadow: designSystemShadows.md,                   // Using md from shadows
  },
}; 