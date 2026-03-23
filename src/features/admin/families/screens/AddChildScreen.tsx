import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { AdminStackParamList } from '@navigation/types';
import { AddChildForm } from '../components';
import { useCreateFamily } from '../hooks/useCreateFamily';
import { Gender, type BaseChild } from '@kdTypes';

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

export function AddChildScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addChild } = useCreateFamily();

  const [form, setForm] = useState<BaseChild>({
    fullName: '',
    gender: Gender.Male,
  });

  const handleChange = (field: keyof BaseChild, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    addChild({ fullName: form.fullName!.trim(), gender: form.gender! });
    navigation.goBack();
  };

  return (
    <AddChildForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
  );
}
