import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { COLORS, TYPOGRAPHY, SPACING } from '@theme';
import {
  type FamilyFormData,
  type FamilyMember,
  type BaseChild,
  Gender,
} from '@kdTypes';
import {
  Avatar,
  Button,
  Card,
  Input,
  ScreenContainer,
  ScreenFooter,
  ScreenHeader,
} from '@components';

interface CreateFamilySummaryFormProps {
  familyData: FamilyFormData;
  members: FamilyMember[];
  children: BaseChild[];
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
}: CreateFamilySummaryFormProps) {
  return (
    <ScreenContainer disableTopInset>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Resumen"
          subtitle="Verifica si toda la información es correcta."
        />

        <Input
          label="Nombre Familia"
          required
          value={familyData.name}
          onChangeText={v => onFamilyDataChange('name', v)}
          variant="minimal"
        />

        <Input
          label="Alias"
          value={familyData.alias}
          onChangeText={v => onFamilyDataChange('alias', v)}
          variant="minimal"
        />

        <Text style={styles.sectionLabel}>Padres de familia</Text>
        {members.map(member => (
          <Card key={member.email} style={styles.card}>
            <Avatar name={member.displayName} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{member.displayName}</Text>
              <Text style={styles.cardSubtitle}>{member.email}</Text>
            </View>
          </Card>
        ))}

        <Text style={styles.sectionLabel}>Hijos</Text>
        {children.map(child => (
          <Card key={child.fullName} style={styles.card}>
            <Avatar
              name={child.fullName}
              source={
                child.gender === Gender.Female
                  ? require('@assets/images/girl.png')
                  : require('@assets/images/boy.png')
              }
            />
            <Text style={styles.cardName}>{child.fullName}</Text>
          </Card>
        ))}
      </ScrollView>
      <ScreenFooter>
        <Button label="Crear familia" onPress={onSave} loading={isLoading} />
      </ScreenFooter>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
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
    gap: SPACING.md,
    marginBottom: SPACING.sm,
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
    color: COLORS.textMuted,
  },
});
