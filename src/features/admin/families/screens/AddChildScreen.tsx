import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { AdminStackParamList } from '@navigation/types';
import { AddChildForm } from '../components';
import { useCreateFamily } from '../hooks/useCreateFamily';
import type { Child } from '@types';

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

export function AddChildScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addChild } = useCreateFamily();

  const [form, setForm] = useState<Partial<Child>>({
    name: '',
    gender: 'male',
  });

  const handleChange = (field: keyof Partial<Child>, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    addChild({ name: form.name.trim(), gender: form.gender });
    navigation.goBack();
  };

  return (
    <AddChildForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
  );
}
