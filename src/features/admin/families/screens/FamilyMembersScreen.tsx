import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { AdminStackParamList } from '@navigation/types';
import { FamilyMembersForm } from '../components';
import { useCreateFamily } from '../hooks/useCreateFamily';

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

export function FamilyMembersScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { members, removeMember } = useCreateFamily();

  return (
    <FamilyMembersForm
      members={members}
      onAddMember={() => navigation.navigate('AddMember')}
      onRemoveMember={removeMember}
      onContinue={() => navigation.navigate('FamilyChildren')}
    />
  );
}
