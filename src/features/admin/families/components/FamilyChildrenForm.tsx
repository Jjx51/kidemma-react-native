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
import type { Child } from '@types';

interface Props {
  children: Child[];
  onAddChild: () => void;
  onRemoveChild: (name: string) => void;
  onContinue: () => void;
}

export function FamilyChildrenForm({
  children,
  onAddChild,
  onRemoveChild,
  onContinue,
}: Props) {
  const insets = useSafeAreaInsets();
  const hasChildren = children.length > 0;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Agregar hijos</Text>
        <Text style={styles.subtitle}>
          Agrega a los hijos pertenecientes a la familia que estas creando.
        </Text>
      </View>

      <Text style={styles.sectionLabel}>Hijos</Text>

      {/* Empty state or list */}
      {!hasChildren ? (
        <View style={styles.emptyState}>
          <Image
            source={require('@assets/images/toys_alt.png')}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>
            Agrega al menos un hijo o hija{'\n'}para crear una familia
          </Text>
        </View>
      ) : (
        <FlatList
          data={children}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.childCard}>
              <View style={styles.childAvatar}>
                <Image
                  source={
                    item.gender === 'female'
                      ? require('@assets/images/girl.png')
                      : require('@assets/images/boy.png')
                  }
                  style={styles.childAvatarImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.childName}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => onRemoveChild(item.name)}
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
          style={[styles.addButton, hasChildren && styles.addButtonOutline]}
          onPress={onAddChild}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.addButtonText,
              hasChildren && styles.addButtonTextOutline,
            ]}
          >
            Agregar hijo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton, !hasChildren && styles.disabled]}
          onPress={() => hasChildren && onContinue()}
          activeOpacity={hasChildren ? 0.8 : 1}
        >
          <Text
            style={[styles.continueButtonText, !hasChildren && styles.disabledText]}
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
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  childAvatarImage: {
    width: 36,
    height: 36,
  },
  childName: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontWeight: '600',
    flex: 1,
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
