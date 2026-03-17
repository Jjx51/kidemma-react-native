import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { CompleteRegistrationStackParamList } from '@navigation/types';
import { ParentRole } from '@features/auth/enums';
import {
  CompleteRegistrationForm,
  CompleteRegistrationFormData,
} from '../components/CompleteRegistrationForm';
import { useCompleteRegistration } from '../hooks/useCompleteRegistration';

type NavigationProp =
  NativeStackNavigationProp<CompleteRegistrationStackParamList>;

export function CompleteRegistrationFormScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { setProfileData } = useCompleteRegistration();

  const [form, setForm] = useState<CompleteRegistrationFormData>({
    parentRole: ParentRole.Mom,
    fullName: '',
    phone: '',
    phoneAdditional: '',
  });

  const handleChange = (
    field: keyof CompleteRegistrationFormData,
    value: string,
  ) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    setProfileData(form);
    navigation.navigate('ConfirmChildren');
  };

  return (
    <CompleteRegistrationForm
      form={form}
      onChange={handleChange}
      onContinue={handleContinue}
    />
  );
}
