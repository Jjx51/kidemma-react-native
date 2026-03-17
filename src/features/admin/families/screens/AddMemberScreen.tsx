import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddMemberForm, MemberFormData } from '../components';
import { useCreateFamily } from '../hooks/useCreateFamily';
import type { AdminStackParamList } from '@navigation/types';

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

export function AddMemberScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addMember } = useCreateFamily();

  const [form, setForm] = useState<MemberFormData>({
    email: '',
    displayName: '',
  });

  const handleChange = (field: keyof MemberFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    addMember({
      email: form.email.trim().toLowerCase(),
      displayName: form.displayName.trim(),
      role: 'parent',
      isActive: false,
    });
    navigation.goBack();
  };

  return (
    <AddMemberForm
      form={form}
      onChange={handleChange}
      onContinue={handleContinue}
    />
  );
}
