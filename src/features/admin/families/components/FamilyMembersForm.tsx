import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '@theme';
import type { FamilyMember } from '../types/admin.types';

interface Props {
  members: FamilyMember[];
  onAddMember: () => void;
  onRemoveMember: (email: string) => void;
  onContinue: () => void;
}

export function FamilyMembersForm({
  members,
  onAddMember,
  onRemoveMember,
  onContinue,
}: Props) {
  const insets = useSafeAreaInsets();
  const hasMembers = members.length > 0;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Familia</Text>
        <Text style={styles.subtitle}>
          Agrega los padres de familia o familiares que tendrán acceso a la
          aplicación.
        </Text>
      </View>

      <Text style={styles.sectionLabel}>Miembros</Text>

      {/* Empty state or list */}
      {!hasMembers ? (
        <View style={styles.emptyState}>
          <Image
            source={require('@assets/images/toys_alt.png')}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>
            Agrega al menos a un miembro{'\n'}para crear una familia
          </Text>
        </View>
      ) : (
        <FlatList
          data={members}
          keyExtractor={item => item.email}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.memberCard}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>
                  {item.displayName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{item.displayName}</Text>
                <Text style={styles.memberEmail}>{item.email}</Text>
              </View>
              <TouchableOpacity
                onPress={() => onRemoveMember(item.email)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <IonIcon
                  name="trash-outline"
                  size={20}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Footer */}
      <View
        style={[styles.footer, { paddingBottom: insets.bottom + SPACING.md }]}
      >
        <TouchableOpacity
          style={[styles.addButton, hasMembers && styles.addButtonOutline]}
          onPress={onAddMember}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.addButtonText,
              hasMembers && styles.addButtonTextOutline,
            ]}
          >
            Agregar miembro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton, !hasMembers && styles.disabled]}
          onPress={() => hasMembers && onContinue()}
          activeOpacity={hasMembers ? 0.8 : 1}
        >
          <Text
            style={[
              styles.continueButtonText,
              !hasMembers && styles.disabledText,
            ]}
          >
            Continuar
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
    paddingTop: SPACING.md,
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
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.title,
    fontSize: 28,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    textAlign: 'center',
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  emptyImage: {
    width: 80,
    height: 80,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAvatarText: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    fontWeight: '600',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontWeight: '600',
  },
  memberEmail: {
    ...TYPOGRAPHY.label,
    color: COLORS.textMuted,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    gap: SPACING.sm,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  addButtonText: {
    ...TYPOGRAPHY.buttonPrimary,
    color: COLORS.white,
  },
  addButtonTextOutline: {
    color: COLORS.primary,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: COLORS.disabledButton,
  },
  continueButtonText: {
    ...TYPOGRAPHY.buttonPrimary,
    color: COLORS.white,
  },
  disabledText: {
    color: COLORS.textMuted,
  },
});
