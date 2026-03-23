import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuthStore } from '@features/auth';
import { useChildrenStore } from '@store';
import type { CompleteRegistrationStackParamList } from '@navigation/types';
import { ConfirmChildrenForm } from '../components';
import { useRegistrationStore } from '../store';
import { useChildrenWithDraft } from '../store/selectors';

type NavigationProp =
  NativeStackNavigationProp<CompleteRegistrationStackParamList>;

export function ConfirmChildrenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuthStore();
  const { loading, fetchChildren } = useChildrenStore();
  const children = useChildrenWithDraft();
  const { isChildComplete, areAllComplete } = useRegistrationStore();

  useEffect(() => {
    if (user?.familyId) {
      fetchChildren(user.familyId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const childIds = children.map(c => c.id!).filter(Boolean);
  const allComplete = areAllComplete(childIds);

  console.log('children (merged):', children);
  console.log('childIds:', childIds);
  console.log('allComplete:', allComplete);

  return (
    <ConfirmChildrenForm
      children={children}
      isChildComplete={isChildComplete}
      onChildPress={(childId: string) =>
        navigation.navigate('CompleteChildForm', { childId })
      }
      onContinue={() => navigation.navigate('RegistrationSuccess')}
      allComplete={allComplete}
      loading={loading}
    />
  );
}
