import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from '@react-native-firebase/firestore';

import { ConfirmChildrenForm } from '../components/ConfirmChildrenForm';
import { useAuthStore } from '@auth/store/auth.store';
import { COLORS } from '@theme';
import type { CompleteRegistrationStackParamList } from '@navigation/types';
import type { Child } from '@admin/families/types/family.types';

type NavigationProp =
  NativeStackNavigationProp<CompleteRegistrationStackParamList>;

const db = getFirestore();

export function ConfirmChildrenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuthStore();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildren();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchChildren = async () => {
    try {
      const q = query(
        collection(db, 'CHILDREN'),
        where('familyId', '==', user?.familyId),
      );
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Child[];
      setChildren(data);
    } catch (e) {
      console.error('fetchChildren error:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <ConfirmChildrenForm
      children={children}
      onContinue={() => navigation.navigate('RegistrationSuccess')}
    />
  );
}
