// Kidemma Typography System
// Title font:  Ginger Biscuit (decorative — used for screen titles, brand name)
// Body font:   Poppins (used for all body text, labels, buttons)

import { COLORS } from './colors';

export const FONTS = {
  title: 'ginger_biscuit_regular',
  body: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-Semibold',
  bold: 'Poppins-Bold',
} as const;

// ─── Font sizes ───────────────────────────────────────────────────────────────
export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  hero: 34,
} as const;

// ─── Line heights ─────────────────────────────────────────────────────────────
export const LINE_HEIGHT = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

// ─── Ready-to-use text style presets ─────────────────────────────────────────
export const TYPOGRAPHY = {
  screenTitle: {
    fontFamily: FONTS.title,
    fontSize: FONT_SIZE.xxxl,
    color: COLORS.title,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.title,
  },
  bodyLarge: {
    fontFamily: FONTS.body,
    fontSize: FONT_SIZE.lg,
    color: COLORS.text,
  },
  body: {
    fontFamily: FONTS.body,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  bodySmall: {
    fontFamily: FONTS.body,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
  },
  buttonPrimary: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.primaryButtonText,
  },
  buttonSecondary: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.md,
    color: COLORS.secondaryButtonText,
  },
  caption: {
    fontFamily: FONTS.body,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
  },
  link: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.links,
  },
} as const;
