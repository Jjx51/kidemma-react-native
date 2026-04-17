import { ActivityIndicator } from 'react-native';
import { COLORS } from '@theme';
import { ScreenContainer } from './ScreenContainer';

export function ScreenLoader() {
  return (
    <ScreenContainer>
      <ActivityIndicator
        color={COLORS.primary}
        size="large"
        style={{ flex: 1 }}
      />
    </ScreenContainer>
  );
}
