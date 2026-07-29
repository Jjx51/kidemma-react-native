import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '@theme';

type Child = {
  id: string;
  name: string;
  age: string;
  image: ImageSourcePropType;
  classDays: string[];
};

type Props = {
  child: Child;
  onPress?: () => void;
};

const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function ListChildItem({ child, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={child.image}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>
            {child.name}
          </Text>
        <View style={styles.ageRow}>
          <Text style={[styles.age, styles.ageBold]}>
            Edad:
          </Text>
          <Text style={styles.age}>{child.age}</Text>
        </View>
          
        </View>
        <Ionicons
          name="chevron-forward"
          size={26}
          color="#A66A56"
        />
      </View>

      <View style={styles.separator} />

      <View style={styles.classesContainer}>
        <Text style={styles.classesTitle}>
          Clases
        </Text>
        <View style={styles.daysRow}>

          {DAYS.map((day, index) => {
            const active = child.classDays.includes(day);

            return (
              <View
                key={`${day}-${index}`}
                style={[
                  styles.dayCircle,
                  active && styles.dayCircleActive,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    active && styles.dayTextActive,
                  ]}
                >
                  {day}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden',
  },

  pressed: {
    opacity: 0.8,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 36,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B56A56',
  },

  avatar: {
    width: 40,
    height: 40,
  },

  info: {
    flex: 1,
    marginLeft: 18,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
  },

  age: {
    marginTop: 6,
    fontSize: 15,
    color: '#6F6F6F',
  },

  ageRow: {
    flexDirection: 'row', 
    alignItems: 'center', gap: 5
  },

  ageBold: {
    fontWeight: 'bold'
  },

  separator: {
    height: 1,
    backgroundColor: '#ECECEC',
  },

  classesContainer: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  classesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 14,
  },

  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayCircleActive: {
    backgroundColor: '#B56A56',
  },

  dayText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7A7A7A',
  },

  dayTextActive: {
    color: COLORS.white,
  },
});