import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FamilyChildrenForm } from '../components/FamilyChildrenForm';
import { useCreateFamily } from '../hooks/useCreateFamily';
import type { AdminStackParamList } from '@navigation/types';

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

export function FamilyChildrenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { children, removeChild } = useCreateFamily();

  return (
    <FamilyChildrenForm
      children={children}
      onAddChild={() => navigation.navigate('AddChild')}
      onRemoveChild={removeChild}
      onContinue={() => navigation.navigate('CreateFamilySummary')}
    />
  );
}
