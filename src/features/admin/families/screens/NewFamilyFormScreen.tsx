import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { AdminStackParamList } from '@navigation/types';
import type { FamilyFormData } from '@kdTypes';
import { HeaderBackButton } from '@components';
import { NewFamilyForm } from '../components';
import { useCreateFamily } from '../hooks';

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

export function NewFamilyFormScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { setFamilyData } = useCreateFamily();

  const [form, setForm] = useState<FamilyFormData>({
    name: '',
    alias: '',
    nationality: '',
    religion: '',
  });

  const handleChange = (field: keyof FamilyFormData, value: string) => {
    setForm((prev: FamilyFormData) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    setFamilyData(form);
    navigation.navigate('FamilyMembers');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.getParent()?.goBack()} />
      ),
    });
  }, [navigation]);

  return (
    <NewFamilyForm
      form={form}
      onChange={handleChange}
      onContinue={handleContinue}
    />
  );
}
