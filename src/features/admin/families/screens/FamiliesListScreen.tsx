import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '@theme';
import { AdminStackParamList } from '@navigation/types';
import type { Child, Family, FamilyMember } from '@kdTypes';
import { Button, Card, SearchBar } from '@components';
import { useFamilies, useFamiliesSearch } from '../hooks';

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;

export function FamiliesListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { families, loading } = useFamilies();
  const { search, setSearch, filtered } = useFamiliesSearch(families);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleFilter = () => {
    // TODO: implement filter logic
  };

  function goToNewFamily() {
    navigation.getParent()?.navigate('Families', { screen: 'NewFamilyForm' });
  }

  const renderAvatars = (members: FamilyMember[], children: Child[]) => {
    const all = [...(members ?? []), ...(children ?? [])].slice(0, 4);
    return (
      <View style={styles.avatarRow}>
        {all.map((item, index) => (
          <View key={index} style={styles.avatar}>
            <Text style={styles.avatarText}>
              {'email' in item
                ? item.displayName?.charAt(0).toUpperCase()
                : item.fullName?.charAt(0).toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderFamily = ({ item }: { item: Family }) => (
    <Card
      onPress={() => navigation.navigate('FamilyDetail', { familyId: item.id })}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={styles.familyName}>Familia: {item.name}</Text>
          {item.alias && (
            <Text style={styles.familyAlias}>Alias: {item.alias}</Text>
          )}
          {renderAvatars(item.members, item.children)}
        </View>
        <IonIcon name="arrow-forward" size={20} color={COLORS.title} />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Escribe algo"
        value={search}
        onChangeText={setSearch}
        onFilterPress={handleFilter}
        filterActive={isFilterActive}
      />

      <Button
        label="Crear familia"
        onPress={goToNewFamily}
        style={{ marginBottom: SPACING.md }}
      />

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
  list: {
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
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
