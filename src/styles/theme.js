export const theme = {
  colors: {
    background: '#0B0F19',
    backgroundSecondary: '#111827',
    surface: '#151D30',
    surfaceBorder: 'rgba(255, 255, 255, 0.08)',
    surfaceActive: '#1E293B',
    
    // Status colors
    levelSuccess: '#00FFA3',        // Neon green when perfectly aligned
    levelSuccessGlow: 'rgba(0, 255, 163, 0.35)',
    levelNear: '#00E5FF',           // Cyan when close
    levelNearGlow: 'rgba(0, 229, 255, 0.25)',
    levelOff: '#FFB800',            // Amber when misaligned
    levelOffGlow: 'rgba(255, 184, 0, 0.25)',
    danger: '#FF3366',              // Pink-red for big deviations
    
    // Bubble & Vial liquid
    vialGlass: 'rgba(15, 23, 42, 0.85)',
    vialBorder: 'rgba(255, 255, 255, 0.15)',
    liquidBase: '#0F2B48',
    bubbleBody: '#00F0FF',
    bubbleGlow: '#00F0FF',
    bubbleHighlight: 'rgba(255, 255, 255, 0.8)',
    
    // Typography
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#38BDF8',
    
    // Grid and markers
    markerTick: 'rgba(255, 255, 255, 0.25)',
    markerTarget: '#00FFA3',
    crosshair: 'rgba(255, 255, 255, 0.18)',
  },
  
  shadows: {
    neonGlow: (color) => ({
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 12,
      elevation: 8,
    }),
  }
};
