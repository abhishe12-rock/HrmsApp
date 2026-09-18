import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Building2, DollarSign, Users, Activity, Crown } from 'lucide-react-native';
import { useAppStore } from '../../../store/useAppStore';
import { Card } from '../../../components/ui/Card';
import { StatCard } from '../../../components/ui/StatCard';
import { Badge } from '../../../components/ui/Badge';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

interface Props {
  onNavigate: (screen: string) => void;
}

export const SaasOwnerDashboardView: React.FC<Props> = ({ onNavigate }) => {
  const { allOrgs, isDarkMode } = useAppStore();
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <StatCard
          title="Monthly Recurring (MRR)"
          value="$94,250"
          change="+14.2% MoM"
          isPositive
          icon={<DollarSign size={16} color={colors.primary} />}
        />
        <StatCard
          title="Active Organizations"
          value={allOrgs.length.toString()}
          subtitle="Enterprise Tenants"
          icon={<Building2 size={16} color={colors.purple} />}
          iconColor={colors.purple}
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="Total Managed Users"
          value="4,820"
          change="+340 this month"
          isPositive
          icon={<Users size={16} color={colors.success} />}
          iconColor={colors.success}
        />
        <StatCard
          title="System Uptime"
          value="99.98%"
          subtitle="All pods operational"
          icon={<Activity size={16} color={colors.info} />}
          iconColor={colors.info}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Top Tenant Organizations
      </Text>
      <Card>
        {allOrgs.slice(0, 4).map(org => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginVertical: spacing.md,
  },
  orgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  orgName: {
    fontSize: 14,
    fontWeight: '700',
  },
  orgSub: {
    fontSize: 12,
    marginTop: 2,
  },
});
