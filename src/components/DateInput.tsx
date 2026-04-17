import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerChangeEvent,
} from '@react-native-community/datetimepicker';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';

interface DateInputProps {
  label?: string;
  required?: boolean;
  value?: Date;
  onChange: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
}

export function DateInput({
  label,
  required,
  value,
  onChange,
  maximumDate,
  minimumDate,
}: DateInputProps) {
  const [show, setShow] = useState(false);

  const [internalDate, setInternalDate] = useState(value ?? new Date());

  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const handleChange = (_: DateTimePickerChangeEvent, date: Date) => {
    console.log(date);
    if (Platform.OS === 'android') {
      setShow(false);
    }
    onChange(date);
  };

  const handleConfirm = () => setShow(false);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value ? formatDate(value) : 'Seleccionar fecha'}
        </Text>
      </TouchableOpacity>

      {/* iOS — modal with confirm button */}
      {Platform.OS === 'ios' ? (
        <Modal visible={show} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={styles.confirmText}>Listo</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={internalDate}
                mode="date"
                display="spinner"
                onValueChange={handleChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale="es-MX"
              />
            </View>
          </View>
        </Modal>
      ) : (
        show && (
          <DateTimePicker
            value={internalDate}
            mode="date"
            display="default"
            onValueChange={handleChange}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.primary,
  },
  button: {
    height: 52,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  placeholder: {
    color: COLORS.textMuted,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: SPACING.xl,
  },
  modalHeader: {
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
  },
  confirmText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
