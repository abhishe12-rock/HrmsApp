import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DollarSign, Building2, Users, Activity, Crown, Shield } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SaasDashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { allOrgs, isDarkMode } = useAppStore();
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <AppLayout
      title="SaaS Overview"
      currentScreen="SaasDashboard"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.statsRow}>
          <StatCard
            title="Monthly Recurring (MRR)"
            value="$94,250"
            change="+14.2%"
            isPositive
            icon={<DollarSign size={16} color={colors.primary} />}
          />
          <StatCard
            title="Active Tenants"
            value={allOrgs.length.toString()}
            subtitle="Organizations"
            icon={<Building2 size={16} color={colors.purple} />}
            iconColor={colors.purple}
          />
        </View>

        <View style={styles.statsRow}>
          <StatCard
            title="Total Users"
            value="4,820"
            change="+340"
            isPositive
            icon={<Users size={16} color={colors.success} />}
            iconColor={colors.success}
          />
          <StatCard
            title="System Uptime"
            value="99.98%"
            subtitle="Global Cluster"
            icon={<Activity size={16} color={colors.info} />}
            iconColor={colors.info}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Platform Tenant Organizations</Text>
        <Card>
          {allOrgs.map(org => (
            <View key={org.id} style={styles.orgRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.orgName, { color: theme.text }]}>{org.name}</Text>
                <Text style={[styles.orgSub, { color: theme.textSecondary }]}>
                  {org.totalEmployees} employees • {org.industry}
                </Text>
              </View>
              <Badge label={org.plan} status="active" />
            </View>
          ))}
        </Card>

        <View style={styles.btnRow}>
          <Button
            title="Manage Subscriptions"
            variant="outline"
            onPress={() => navigation.navigate('SaasSubscriptions')}
            style={{ flex: 1 }}
          />
          <Button
            title="Audit Logs"
            variant="outline"
            onPress={() => navigation.navigate('SaasAuditLogs')}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: spacing.md },
  orgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  orgName: { fontSize: 14, fontWeight: '700' },
  orgSub: { fontSize: 12, marginTop: 2 },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: spacing.md },
});
