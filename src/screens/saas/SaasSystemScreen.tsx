import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Activity, Server, Cpu, Database, ShieldCheck } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SaasSystemScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <AppLayout
      title="System Health"
      currentScreen="SaasSystem"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.statsRow}>
          <StatCard
            title="Cluster CPU"
            value="34.2%"
            change="Normal load"
            isPositive
            icon={<Cpu size={16} color={colors.primary} />}
          />
          <StatCard
            title="Memory Usage"
            value="48.6%"
            change="Optimal"
            isPositive
            icon={<Server size={16} color={colors.success} />}
            iconColor={colors.success}
          />
        </View>

        <Card>
          <Text style={[styles.title, { color: theme.text }]}>Active Services & Microservices</Text>
          <View style={styles.serviceRow}>
            <Text style={[styles.serviceName, { color: theme.text }]}>PostgreSQL Primary DB Cluster</Text>
            <Badge label="Healthy" status="active" />
          </View>
          <View style={styles.serviceRow}>
            <Text style={[styles.serviceName, { color: theme.text }]}>Redis Cache & Session Broker</Text>
            <Badge label="Healthy" status="active" />
          </View>
          <View style={styles.serviceRow}>
            <Text style={[styles.serviceName, { color: theme.text }]}>Stripe Webhook Gateway</Text>
            <Badge label="Operational" status="active" />
          </View>
          <View style={[styles.serviceRow, { borderBottomWidth: 0 }]}>
            <Text style={[styles.serviceName, { color: theme.text }]}>Notification & FCM Service</Text>
            <Badge label="Operational" status="active" />
          </View>
        </Card>
      </View>
    </AppLayout>
  );
};

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
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  title: { fontSize: 15, fontWeight: '700', marginBottom: spacing.md },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  serviceName: { fontSize: 13, fontWeight: '600' },
  list: { gap: spacing.sm },
  logHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logAction: { fontSize: 14, fontWeight: '700' },
  logTime: { fontSize: 11 },
  logMeta: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  logIp: { fontSize: 11, marginTop: 2 },
});
