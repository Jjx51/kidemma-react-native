import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '@theme';
import type { FamilyFormData, FamilyMember, Child } from '@types';

interface Props {
  familyData: FamilyFormData;
  members: FamilyMember[];
  children: Child[];
  isLoading: boolean;
  onFamilyDataChange: (field: keyof FamilyFormData, value: string) => void;
  onSave: () => void;
}

export function CreateFamilySummaryForm({
  familyData,
  members,
  children,
  isLoading,
  onFamilyDataChange,
  onSave,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Resumen</Text>
        <Text style={styles.subtitle}>
          Verifica si toda la información es correcta.
        </Text>

        {/* Family data */}
        <Text style={styles.label}>Nombre Familia*</Text>
        <TextInput
          style={styles.input}
          value={familyData.name}
          onChangeText={v => onFamilyDataChange('name', v)}
        />

        <Text style={styles.label}>Alias</Text>
        <TextInput
          style={styles.input}
          value={familyData.alias}
          onChangeText={v => onFamilyDataChange('alias', v)}
        />

        {/* Members */}
        <Text style={styles.sectionLabel}>Padres de familia</Text>
        {members.map(member => (
          <View key={member.email} style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {member.displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{member.displayName}</Text>
              <Text style={styles.cardSubtitle}>{member.email}</Text>
            </View>
          </View>
        ))}

        {/* Children */}
        <Text style={styles.sectionLabel}>Hijos</Text>
        {children.map(child => (
          <View key={child.name} style={styles.card}>
            <View style={styles.childAvatarWrapper}>
              <Image
                source={
                  child.gender === 'female'
                    ? require('@assets/images/girl.png')
                    : require('@assets/images/boy.png')
                }
                style={styles.childAvatarImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.cardName}>{child.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View
        style={[styles.footer, { paddingBottom: insets.bottom + SPACING.md }]}
      >
        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.disabled]}
          onPress={() => !isLoading && onSave()}
          activeOpacity={isLoading ? 1 : 0.8}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Guardando...' : 'Crear familia'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.md
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  headerTitle: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.title,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.title,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    fontWeight: '600',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontWeight: '700',
  },
  cardSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  childAvatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  childAvatarImage: {
    width: 40,
    height: 40,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: COLORS.disabledButton,
  },
  saveButtonText: {
    ...TYPOGRAPHY.buttonPrimary,
    color: COLORS.white,
  },
});
