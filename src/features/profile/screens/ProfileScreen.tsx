import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@features/auth';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '@theme';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <IonIcon name="arrow-back" size={18} color={COLORS.title} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi perfil</Text>
      </View>

      <TouchableOpacity style={styles.userCard}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>
            {user?.fullName?.charAt(0).toUpperCase() ?? 'U'}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.fullName ?? 'Usuario'}</Text>
          <Text style={styles.userPhone}>{user?.phone ?? ''}</Text>
        </View>
        <IonIcon name="arrow-forward" size={20} color={COLORS.title} />
      </TouchableOpacity>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.row}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View style={styles.rowLeft}>
            <View style={styles.iconWrapper}>
              <IonIcon name="log-out-outline" size={20} color={COLORS.title} />
            </View>
            <Text style={styles.rowLabel}>Cerrar sesión</Text>
          </View>
          <IonIcon name="arrow-forward" size={18} color={COLORS.title} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
    backgroundColor: COLORS.white
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.title,
    fontWeight: 600
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.backgroundCard,
    ...SHADOWS.md,
    gap: SPACING.md,
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.backgroundCard,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.text,
    fontWeight: '600',
  },
  userPhone: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  section: {
    marginHorizontal: SPACING.lg,
    overflow: 'hidden',
    borderBottomColor: COLORS.inputBorderAlt,
    borderBottomWidth: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.iconBackground,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
});
