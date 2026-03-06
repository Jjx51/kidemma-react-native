import { Platform } from 'react-native';
import { COLORS } from './colors';

// Cross-platform shadows
// iOS uses shadow* props, Android uses elevation

export const SHADOWS = {
  sm: Platform.select({
    ios: {
      shadowColor: COLORS.kdBlack,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 2,
    },
    android: { elevation: 2 },
  }),
  md: Platform.select({
    ios: {
      shadowColor: COLORS.kdBlack,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: { elevation: 4 },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: COLORS.kdBlack,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: { elevation: 8 },
  }),
} as const;
