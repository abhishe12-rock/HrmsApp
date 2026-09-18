import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Settings, Shield, Globe, Lock } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SaasSettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <AppLayout
      title="Platform Settings"
      currentScreen="SaasSettings"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Global SaaS Configuration</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Master tenant environment variables, white-labeling & API keys
        </Text>

        <Card>
          <Text style={[styles.title, { color: theme.text }]}>Platform Parameters</Text>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>SaaS Domain</Text>
            <Text style={[styles.val, { color: theme.text }]}>app.hrmcloud.io</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>API Gateway Endpoint</Text>
            <Text style={[styles.val, { color: theme.text }]}>https://api.hrmcloud.io/v1</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Default Tenant Region</Text>
            <Text style={[styles.val, { color: theme.text }]}>us-east-1 (N. Virginia)</Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Stripe Production Mode</Text>
            <Text style={[styles.val, { color: colors.success, fontWeight: '700' }]}>Connected (Live)</Text>
          </View>
        </Card>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  title: { fontSize: 15, fontWeight: '700', marginBottom: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  label: { fontSize: 13 },
  val: { fontSize: 13, fontWeight: '600' },
});
