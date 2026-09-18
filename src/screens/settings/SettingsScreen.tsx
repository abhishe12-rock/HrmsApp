import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Settings, Shield, Bell, Moon, Sun, Lock, LogOut } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    isDarkMode,
    toggleDarkMode,
    currentRole,
    setRoleSwitcherOpen,
    logout,
  } = useAppStore();

  const theme = isDarkMode ? colors.dark : colors.light;

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <AppLayout
      title="Settings"
      currentScreen="Settings"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Platform Preferences</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Manage workspace settings, theme, role persona & security
        </Text>

        {/* Theme Settings */}
        <Card>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Mode</Text>
              <Text style={[styles.settingSub, { color: theme.textSecondary }]}>
                Switch between light and dark UI themes
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor="#FFFFFF"
              trackColor={{ false: '#E2E8F0', true: colors.primary }}
            />
          </View>
        </Card>

        {/* Role Persona Switcher */}
        <Card>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Role Persona</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Active Role: {currentRole}</Text>
              <Text style={[styles.settingSub, { color: theme.textSecondary }]}>
                Preview HRM UI for any of the 8 user personas
              </Text>
            </View>
            <Button
              title="Change"
              size="sm"
              onPress={() => setRoleSwitcherOpen(true)}
            />
          </View>
        </Card>

        {/* Security & Authentication */}
        <Card>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Security & Privacy</Text>
          <TouchableOpacity style={styles.navRow} onPress={() => navigation.navigate('TwoFactor')}>
            <View>
              <Text style={[styles.settingLabel, { color: theme.text }]}>2-Factor Authentication (2FA)</Text>
              <Text style={[styles.settingSub, { color: theme.textSecondary }]}>Enabled for your account</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {/* Logout */}
        <Button
          title="Sign Out of Session"
          variant="danger"
          icon={<LogOut size={16} color="#FFF" />}
          onPress={handleLogout}
          fullWidth
          style={{ marginTop: spacing.md }}
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: spacing.sm },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  settingInfo: { flex: 1, paddingRight: spacing.md },
  settingLabel: { fontSize: 14, fontWeight: '600' },
  settingSub: { fontSize: 12, marginTop: 2 },
  navRow: { paddingVertical: spacing.xs },
});
