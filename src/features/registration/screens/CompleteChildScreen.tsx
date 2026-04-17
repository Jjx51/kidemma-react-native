import { useEffect } from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { CompleteRegistrationStackParamList } from '@navigation/types';
import { Child } from '@kdTypes';
import { ScreenLoader } from '@components';
import { useChildrenStore } from '@store';
import { CompleteChildForm } from '../components';
import { useRegistrationStore } from '../store';
import { useChildWithDraft } from '../store/selectors';

type NavigationProp =
  NativeStackNavigationProp<CompleteRegistrationStackParamList>;

type RoutePropType = RouteProp<
  CompleteRegistrationStackParamList,
  'CompleteChildForm'
>;

export function CompleteChildScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<RoutePropType>();
  const { setChildData } = useRegistrationStore();
  const { loading, fetchChild } = useChildrenStore();
  const child = useChildWithDraft(params.childId);

  useEffect(() => {
    fetchChild(params.childId);
  }, [params.childId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (data: Partial<Child>) => {
    console.log('setting child data:', params.childId, data);
    setChildData(params.childId, data);
    navigation.goBack();
  };

  if (loading || !child) return <ScreenLoader />;

  return <CompleteChildForm child={child!} onSubmit={handleSubmit} />;
}
