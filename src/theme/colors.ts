export const COLORS = {
  // ─── Main Colors ────────────────────────────────────────────────────────────
  background: '#FDF9ED',
  backgroundCard: '#F9EDC8',
  toolbarBackground: '#FFFFFF',
  text: '#4A4A4A',
  title: '#AD5645',
  links: '#003366',
  divisor: '#D3D3D3',
  focus: '#4682B4',
  iconColor: '#AD5645',
  placeholderForms: '#D3D3D3',

  // ─── Status Colors ──────────────────────────────────────────────────────────
  success: '#4CAF50',
  warning: '#FF8C00',
  error: '#D32F2F',
  informative: '#4682B4',

  // ─── Button Colors ──────────────────────────────────────────────────────────
  primaryButton: '#FFA07A',
  primaryButtonText: '#FFFFFF',

  secondaryButton: '#FFFFFF',
  secondaryButtonText: '#FFA07A',
  secondaryButtonBorder: '#FFA07A',

  ghostButton: '#858A8E',
  disabledButton: '#D3D6E1',
  disabledButtonText: '#858A8E',

  // ─── Aliases (used across components) ───────────────────────────────────────
  primary: '#FFA07A',
  white: '#FFFFFF',
  inputBorder: '#C86F5F',
  inputBorderAlt: '#D3D3D3',
  textDark: '#4A4A4A',
  textMuted: '#858A8E',
  tabActive: '#C86F5F',
  tabInactive: '#858A8E',
  border: '#D3D3D3',
  placeholder: '#D3D3D3',
  iconBackground: '#EAEAEA',

  // ---- Common colors ----------------------------------------------------------
  kdBlack: '#000',
} as const;

export type ColorKey = keyof typeof COLORS;
