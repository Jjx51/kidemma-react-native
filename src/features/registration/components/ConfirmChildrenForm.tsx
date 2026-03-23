import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { TYPOGRAPHY, SPACING } from '@theme';
import { Gender, type Child } from '@kdTypes';
import {
  Avatar,
  Button,
  ScreenContainer,
  ScreenFooter,
  ScreenHeader,
  ScreenLoader,
} from '@components';

interface ConfirmChildrenFormProps {
  children: Child[];
  loading: boolean;
  isChildComplete: (childId: string) => boolean;
  onChildPress: (childId: string) => void;
  onContinue: () => void;
  allComplete: boolean;
}

export function ConfirmChildrenForm({
  children,
  loading,
  isChildComplete,
  onChildPress,
  onContinue,
  allComplete,
}: ConfirmChildrenFormProps) {
  if (loading) {
    return <ScreenLoader />;
  }
  
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ScreenHeader
          title="Registro de hijos"
          subtitle="Tenemos los siguientes hijos vinculados a tu cuenta."
        />

        <View style={styles.childrenRow}>
          {children.map(child => (
            <TouchableOpacity
              key={child.id}
              style={styles.childOption}
              onPress={() => onChildPress(child.id!)}
              activeOpacity={0.8}
            >
              <Avatar
                name={child.fullName}
                source={
                  child.gender === Gender.Female
                    ? require('@assets/images/girl.png')
                    : require('@assets/images/boy.png')
                }
                size="xl"
                badge={isChildComplete(child.id!)}
              />
              <Text style={styles.childName}>{child.fullName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScreenFooter>
        <Button
          onPress={onContinue}
          label="Continuar"
          disabled={!allComplete}
        />
      </ScreenFooter>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  childrenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  childOption: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  childName: {
    ...TYPOGRAPHY.body,
  },
});
