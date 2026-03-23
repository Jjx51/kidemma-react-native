import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import type { FamilyMember } from '@kdTypes';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  ScreenContainer,
  ScreenFooter,
  ScreenHeader,
} from '@components';

interface FamilyMembersFormProps {
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
}: FamilyMembersFormProps) {
  const hasMembers = members.length > 0;

  const renderMember = ({ item }: { item: FamilyMember }) => (
    <Card style={styles.memberCard}>
      <Avatar name={item.displayName} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.displayName}</Text>
        <Text style={styles.memberEmail}>{item.email}</Text>
      </View>
      <Pressable
        onPress={() => onRemoveMember(item.email)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <IonIcon name="trash-outline" size={20} color={COLORS.textMuted} />
      </Pressable>
    </Card>
  );

  return (
    <ScreenContainer disableTopInset>
      <ScreenHeader
        title="Familia"
        subtitle="Agrega los padres de familia o familiares que tendrán acceso a la aplicación."
      />

      <Text style={styles.sectionLabel}>Miembros</Text>

      {!hasMembers ? (
        <EmptyState
          message={`Agrega al menos a un miembro\npara crear una familia`}
        />
      ) : (
        <FlatList
          data={members}
          keyExtractor={item => item.email}
          contentContainerStyle={styles.list}
          renderItem={renderMember}
        />
      )}
      <ScreenFooter>
        <Button
          label="Agregar miembro"
          variant={hasMembers ? 'outline' : 'primary'}
          onPress={onAddMember}
        />
        <Button
          label="Continuar"
          onPress={onContinue}
          disabled={!hasMembers}
          style={{ marginTop: SPACING.md }}
        />
      </ScreenFooter>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
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
});
