import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '@theme';

import {
  AgeRangeFilter,
  GenderFilter,
} from '../types/Filters';
import { RadioOption } from './RadioOption';
import { GENDER_OPTIONS } from '../types/Filters';
import { AGE_RANGE_OPTIONS } from '../types/Filters';

type Props = {
  visible: boolean;
  selectedGender: GenderFilter;
  selectedAgeRange: AgeRangeFilter;
  onClose: () => void;
  onApply: (
    gender: GenderFilter,
    ageRange: AgeRangeFilter,
  ) => void;
};

export function FilterModal({
  visible,
  selectedGender,
  selectedAgeRange,
  onClose,
  onApply,
}: Props) {
  const [gender, setGender] =
    useState<GenderFilter>('ALL');

  const [ageRange, setAgeRange] =
    useState<AgeRangeFilter>('ALL');

  useEffect(() => {
    if (visible) {
      setGender(selectedGender);
      setAgeRange(selectedAgeRange);
    }
  }, [visible, selectedGender, selectedAgeRange]);

  const handleClear = () => {
    setGender('ALL');
    setAgeRange('ALL');
  };

  const handleApply = () => {
    onApply(gender, ageRange);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.handle} />

              <View style={styles.header}>
                <Text style={styles.title}>
                  Filtros
                </Text>

                <Pressable onPress={onClose}>
                  <Ionicons
                    name="close"
                    size={26}
                    color={COLORS.textDark}
                  />
                </Pressable>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Género
                </Text>

                {GENDER_OPTIONS.map((option: { value: any; label: any; }) => (
                    <RadioOption
                        key={option.value}
                        label={option.label}
                        selected={gender === option.value}
                        onPress={() => setGender(option.value)}
                    />
                ))}
              </View>

              <View style={styles.divider} />

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Edad
                </Text>

                {AGE_RANGE_OPTIONS.map((option: { value: any; label: any; }) => (
                    <RadioOption
                        key={option.value}
                        label={option.label}
                        selected={ageRange === option.value}
                        onPress={() => setAgeRange(option.value)}
                    />
                ))}
              </View>

              <View style={styles.buttonsContainer}>
                <Pressable
                  style={styles.clearButton}
                  onPress={handleClear}
                >
                  <Text
                    style={
                      styles.clearButtonText
                    }
                  >
                    Limpiar
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.applyButton}
                  onPress={handleApply}
                >
                  <Text
                    style={
                      styles.applyButtonText
                    }
                  >
                    Aplicar
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 16,
  },

  handle: {
    alignSelf: 'center',
    width: 45,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D7D7D7',
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark,
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    color: COLORS.textDark,
  },

  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginBottom: 22,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  clearButton: {
    flex: 1,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    marginRight: 10,
  },

  clearButtonText: {
    fontWeight: '700',
    fontSize: 16,
    color: COLORS.primary,
  },

  applyButton: {
    flex: 1,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },

  applyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});