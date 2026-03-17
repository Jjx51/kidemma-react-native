import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { COLORS } from '@theme';
import { ParentRole } from '@auth/enums';

interface RoleOption {
  value: ParentRole;
  label: string;
  icon: any;
}

const ROLES: RoleOption[] = [
  {
    value: ParentRole.Mom,
    label: 'Mamá',
    icon: require('@assets/images/mother.png'),
  },
  {
    value: ParentRole.Dad,
    label: 'Papá',
    icon: require('@assets/images/father.png'),
  },
  {
    value: ParentRole.Other,
    label: 'Otro',
    icon: require('@assets/images/other.png'),
  },
];

interface RoleSelectorProps {
  selected: ParentRole;
  onChange: (role: ParentRole) => void;
}

export function RoleSelector({ selected, onChange }: RoleSelectorProps) {
  return (
    <View style={styles.container}>
      {ROLES.map(role => {
        const isActive = selected === role.value;
        return (
          <TouchableOpacity
            key={role.value}
            style={styles.item}
            onPress={() => onChange(role.value)}
            activeOpacity={0.8}
          >
            <View
              style={[styles.iconCircle, isActive && styles.iconCircleActive]}
            >
              <Image
                source={role.icon}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {role.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 8,
  },
  item: {
    alignItems: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircleActive: {
    borderColor: COLORS.primary,
  },
  icon: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
