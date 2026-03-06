import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { SPACING } from '@theme';

export function BrandHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/Kidemma_logo_name.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logo: {
    width: 250,
    height: 250,
  }
});
