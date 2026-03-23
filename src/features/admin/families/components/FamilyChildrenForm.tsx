import {
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import { Gender, type Child } from '@kdTypes';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  ScreenContainer,
  ScreenFooter,
  ScreenHeader,
} from '@components';

interface FamilyChildrenFormProps {
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
}: FamilyChildrenFormProps) {
  const hasChildren = children.length > 0;

  const renderChild = ({ item }: { item: Child }) => (
    <Card style={styles.childCard}>
      <Avatar
        name={item.fullName}
        source={
          item.gender === Gender.Female
            ? require('@assets/images/girl.png')
            : require('@assets/images/boy.png')
        }
      />
      <Text style={styles.childName}>{item.fullName}</Text>
      <Pressable
        onPress={() => onRemoveChild(item.fullName)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <IonIcon name="trash-outline" size={20} color={COLORS.textMuted} />
      </Pressable>
    </Card>
  );

  return (
    <ScreenContainer disableTopInset>
      <ScreenHeader
        title="Agregar Hijos"
        subtitle="Agrega a los hijos pertenecientes a la familia que estas creando."
      />

      <Text style={styles.sectionLabel}>Hijos</Text>
      {!hasChildren ? (
        <EmptyState
          message={`Agrega al menos un hijo o hija\npara crear una familia`}
        />
      ) : (
        <FlatList
          data={children}
          keyExtractor={item => item.fullName}
          contentContainerStyle={styles.list}
          renderItem={renderChild}
        />
      )}
      <ScreenFooter>
        <Button
          label="Agregar hijo"
          variant={hasChildren ? 'outline' : 'primary'}
          onPress={onAddChild}
        />
        <Button
          label="Continuar"
          onPress={onContinue}
          disabled={!hasChildren}
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
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  childName: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontWeight: '600',
    flex: 1,
  },
});
