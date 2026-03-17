import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';

import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '@theme';
import { AdminStackParamList } from '@navigation/types';
import type { Child, Family, FamilyMember } from '@types';
import { QueryDocumentSnapshot } from '@react-native-firebase/app/dist/module/internal/web/firebaseFirestore';

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

const db = getFirestore();

export function FamiliesListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [families, setFamilies] = useState<Family[]>([]);
  const [filtered, setFiltered] = useState<Family[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFamilies();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(families);
    } else {
      setFiltered(
        families.filter(
          f =>
            f.name.toLowerCase().includes(search.toLowerCase()) ||
            f.alias?.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search, families]);

  const fetchFamilies = async () => {
    try {
      const snap = await getDocs(collection(db, 'FAMILIES'));
      const data = snap.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      })) as Family[];
      setFamilies(data);
      setFiltered(data);
    } catch (e) {
      console.error('fetchFamilies error:', e);
    } finally {
      setLoading(false);
    }
  };

  const renderAvatars = (members: FamilyMember[], children: Child[]) => {
    const all = [...(members ?? []), ...(children ?? [])].slice(0, 4);
    return (
      <View style={styles.avatarRow}>
        {all.map((item, index) => (
          <View key={index} style={styles.avatar}>
            <Text style={styles.avatarText}>
              {'email' in item
                ? item.displayName?.charAt(0).toUpperCase()
                : item.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderFamily = ({ item }: { item: Family }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FamilyDetail', { familyId: item.id })}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={styles.familyName}>Familia: {item.name}</Text>
          {item.alias ? (
            <Text style={styles.familyAlias}>Alias: {item.alias}</Text>
          ) : null}
          {renderAvatars(item.members, item.children)}
        </View>
        <IonIcon name="arrow-forward" size={20} color={COLORS.title} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Escribe algo"
            placeholderTextColor={COLORS.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          <IonIcon name="search-outline" size={20} color={COLORS.textMuted} />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <IonIcon name="options-outline" size={20} color={COLORS.textMuted} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          navigation
            .getParent()
            ?.navigate('Families', { screen: 'NewFamilyForm' })
        }
        activeOpacity={0.8}
      >
        <Text style={styles.createButtonText}>Crear familia</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          color={COLORS.primary}
          style={{ marginTop: SPACING.xl }}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={renderFamily}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
  },
  searchRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  createButtonText: {
    ...TYPOGRAPHY.buttonPrimary,
    color: COLORS.white,
  },
  list: {
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1,
  },
  familyName: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: 2,
  },
  familyAlias: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: SPACING.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundCard,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    fontWeight: '600',
  },
});
