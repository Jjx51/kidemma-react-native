import { useState } from 'react';
import { Alert } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  writeBatch,
} from '@react-native-firebase/firestore';
import {
  getAuth,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';

import { useAuthStore } from '@auth/store/auth.store';
import type { AdminStackParamList } from '@navigation/types';
import type { FamilyFormData } from '@kdTypes';
import { getSecondaryAuth } from '@services/secondaryAuth';
import { CreateFamilySummaryForm } from '../components/CreateFamilySummaryForm';
import { useCreateFamily } from '../hooks/useCreateFamily';

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

const auth = getAuth();
const db = getFirestore();

export function CreateFamilySummaryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { familyData, members, children, setFamilyData, reset } =
    useCreateFamily();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFamilyDataChange = (
    field: keyof FamilyFormData,
    value: string,
  ) => {
    setFamilyData({ ...familyData, [field]: value });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const batch = writeBatch(db);

      // 1. Create family document
      const familyRef = doc(collection(db, 'FAMILIES'));
      batch.set(familyRef, {
        ...familyData,
        createdAt: new Date(),
        createdBy: user?.id,
      });

      // 2. Create children documents
      for (const child of children) {
        const childRef = doc(collection(db, 'CHILDREN'));
        batch.set(childRef, {
          ...child,
          familyId: familyRef.id,
          guardianIds: members.map(m => m.id).filter(Boolean),
          createdAt: new Date(),
        });
      }

      await batch.commit();

      // 3. Create Firebase Auth users + Firestore docs via secondary auth
      const secondaryAuth = await getSecondaryAuth();

      for (const member of members) {
        const { user: newUser } = await createUserWithEmailAndPassword(
          secondaryAuth,
          member.email,
          Math.random().toString(36).slice(-12),
        );

        await setDoc(doc(db, 'USERS', newUser.uid), {
          email: member.email,
          fullName: member.displayName,
          phone: '',
          role: 'parent',
          familyId: familyRef.id,
          isActive: false,
          isProfileComplete: false,
          createdAt: new Date(),
          createdBy: user?.id,
          inviteSentAt: null,
        });

        await sendPasswordResetEmail(auth, member.email);
      }

      await secondaryAuth.signOut();

      reset();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'AdminTabs',
              state: {
                routes: [{ name: 'FamiliesTab' }],
              },
            },
          ],
        }),
      );
      Alert.alert(
        '¡Familia creada!',
        'Se han enviado las invitaciones a los miembros de la familia.',
        [{ text: 'OK' }],
      );
    } catch (e: any) {
      Alert.alert(
        'Error',
        e.message ?? 'Ocurrió un error al guardar la familia.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CreateFamilySummaryForm
      familyData={familyData}
      members={members}
      children={children}
      isLoading={isLoading}
      onFamilyDataChange={handleFamilyDataChange}
      onSave={handleSave}
    />
  );
}
