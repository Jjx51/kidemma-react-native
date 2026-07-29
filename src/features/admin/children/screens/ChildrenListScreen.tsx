import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '@theme';

import { GridChildItem } from '../components/GridChildItem';
import { ListChildItem } from '../components/ListChildItem';
import { FilterModal } from '../components/FilterModal';

import {
  AgeRangeFilter,
  GenderFilter,
} from '../types/Filters';

const children = [
  {
    id: '1',
    name: 'Alejandro Ávila',
    gender: 'BOY' as GenderFilter,
    age: '3 años',
    ageRange: '2_TO_3_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_boy.png'),
    classDays: ['L', 'M'],
  },
  {
    id: '2',
    name: 'Brenda Barrera',
    gender: 'GIRL' as GenderFilter,
    age: '1 año 4 meses',
    ageRange: '1_TO_2_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_girl.png'),
    classDays: ['M', 'J'],
  },
  {
    id: '3',
    name: 'Carlos Camacho',
    gender: 'BOY' as GenderFilter,
    age: '1 año 2 meses',
    ageRange: '1_TO_2_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_boy.png'),
    classDays: ['L', 'M'],
  },
  {
    id: '4',
    name: 'Emilio Escobar',
    gender: 'BOY' as GenderFilter,
    age: '2 años',
    ageRange: '2_TO_3_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_boy.png'),
    classDays: ['L', 'V'],
  },
  {
    id: '5',
    name: 'Fernanda Flores',
    gender: 'GIRL' as GenderFilter,
    age: '2 años',
    ageRange: '2_TO_3_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_girl.png'),
    classDays: ['M', 'J'],
  },
  {
    id: '6',
    name: 'Gael Gallardo',
    gender: 'BOY' as GenderFilter,
    age: '3 años',
    ageRange: '3_TO_4_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_boy.png'),
    classDays: ['L', 'M'],
  },
  {
    id: '7',
    name: 'Helena Hernández',
    gender: 'GIRL' as GenderFilter,
    age: '3 años',
    ageRange: '3_TO_4_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_girl.png'),
    classDays: ['L', 'M'],
  },
  {
    id: '8',
    name: 'Iván Ibarra',
    gender: 'BOY' as GenderFilter,
    age: '1 año',
    ageRange: '1_TO_2_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_boy.png'),
    classDays: ['L', 'M'],
  },
  {
    id: '9',
    name: 'Jimena Juarez',
    gender: 'GIRL' as GenderFilter,
    age: '2 años',
    ageRange: '2_TO_3_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_girl.png'),
    classDays: ['M', 'M', 'J'],
  },
  {
    id: '10',
    name: 'Kevin Ku',
    gender: 'BOY' as GenderFilter,
    age: '2 años',
    ageRange: '2_TO_3_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_boy.png'),
    classDays: ['M'],
  },
  {
    id: '11',
    name: 'Lucia Luna',
    gender: 'GIRL' as GenderFilter,
    age: '3 años',
    ageRange: '3_TO_4_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_girl.png'),
    classDays: ['M', 'M', 'J'],
  },
  {
    id: '12',
    name: 'Mateo Mendoza',
    gender: 'BOY' as GenderFilter,
    age: '2 años',
    ageRange: '2_TO_3_YEARS' as AgeRangeFilter,
    image: require('@assets/images/KidsTab/ic_boy.png'),
    classDays: ['J', 'V'],
  },
];

export function ChildrenListScreen() {
  const [gridView, setGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [genderFilter, setGenderFilter] =
    useState<GenderFilter>('ALL');

  const [ageRangeFilter, setAgeRangeFilter] =
    useState<AgeRangeFilter>('ALL');

  const filteredChildren = useMemo(() => {
    return children.filter(child => {

      const matchesName =
        child.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesGender =
        genderFilter === 'ALL'
          ? true
          : child.gender === genderFilter;

      const matchesAge =
        ageRangeFilter === 'ALL'
          ? true
          : child.ageRange === ageRangeFilter;

      return (
        matchesName &&
        matchesGender &&
        matchesAge
      );
    });
  }, [
    searchTerm,
    genderFilter,
    ageRangeFilter,
  ]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          key={gridView ? 'GRID' : 'LIST'}
          data={filteredChildren}
          keyExtractor={(item) => item.id}
          numColumns={gridView ? 3 : 1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          columnWrapperStyle={
            gridView
              ? styles.columnWrapper
              : undefined
          }
          ListHeaderComponent={
            <>
              <View style={styles.searchRow}>

                <View style={styles.searchContainer}>
                  <TextInput
                    value={searchTerm}
                    placeholder="Buscar niño..."
                    onChangeText={setSearchTerm}
                    style={styles.input}
                  />

                  <Ionicons
                    name="search"
                    size={22}
                    color={COLORS.disabledButton}
                  />
                </View>

                <Pressable
                  style={styles.filterButton}
                  onPress={() => setShowFilters(true)}
                >
                  <Ionicons
                    name="options-outline"
                    size={22}
                    color={COLORS.disabledButton}
                  />
                </Pressable>

              </View>

              <View style={styles.viewButtonContainer}>
                <Pressable
                  style={styles.viewButton}
                  onPress={() => setGridView(prev => !prev)}
                >
                  <Ionicons
                    name={gridView ? 'list' : 'grid'}
                    size={20}
                    color={COLORS.disabledButton}
                  />
                </Pressable>
              </View>
            </>
          }
          renderItem={({ item }) =>
            gridView ? (
              <GridChildItem child={item} />
            ) : (
              <ListChildItem child={item} />
            )
          }
        />
      </View>

      <FilterModal
        visible={showFilters}
        selectedGender={genderFilter}
        selectedAgeRange={ageRangeFilter}
        onClose={() => setShowFilters(false)}
        onApply={(gender, ageRange) => {
          setGenderFilter(gender);
          setAgeRangeFilter(ageRange);
          setShowFilters(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },

  filterButton: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

  viewButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 18,
    marginBottom: 24,
  },

  viewButton: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

});