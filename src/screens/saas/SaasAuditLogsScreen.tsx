import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SaasAuditLogsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const LOGS = [
    { action: 'Admin Role Switch', user: 'Rachel Green', target: 'hr_admin', ip: '192.168.1.104', time: '10:45 AM' },
    { action: 'Tenant Provisioned', user: 'Marcus Sterling', target: 'Apex Global Ltd', ip: '10.0.0.1', time: '09:20 AM' },
    { action: 'Payroll Batch Executed', user: 'Finance Lead', target: 'August Batch #204', ip: '192.168.2.45', time: 'Yesterday' },
    { action: '2FA Verification Enabled', user: 'David Miller', target: 'User Profile', ip: '172.16.0.8', time: 'Sep 08' },
  ];

  return (
    <AppLayout
      title="Audit Logs"
      currentScreen="SaasAuditLogs"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Platform Audit Trail</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Immutable security logs of administrative changes and system events
        </Text>

        <View style={styles.list}>
          {LOGS.map((log, idx) => (
            <Card key={idx}>
              <View style={styles.logHeader}>
                <Text style={[styles.logAction, { color: theme.text }]}>{log.action}</Text>
                <Text style={[styles.logTime, { color: theme.textMuted }]}>{log.time}</Text>
              </View>
              <Text style={[styles.logMeta, { color: colors.primary }]}>
                Actor: {log.user} • Target: {log.target}
              </Text>
              <Text style={[styles.logIp, { color: theme.textSecondary }]}>
                IP Address: {log.ip}
              </Text>
            </Card>
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  list: { gap: spacing.sm },
  logHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logAction: { fontSize: 14, fontWeight: '700' },
  logTime: { fontSize: 11 },
  logMeta: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  logIp: { fontSize: 11, marginTop: 2 },
});
