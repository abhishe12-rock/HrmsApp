import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DollarSign, CreditCard, FileSpreadsheet, AlertCircle } from 'lucide-react-native';
import { useAppStore } from '../../../store/useAppStore';
import { Card } from '../../../components/ui/Card';
import { StatCard } from '../../../components/ui/StatCard';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

interface Props {
  onNavigate: (screen: string) => void;
}

export const PayrollAdminDashboardView: React.FC<Props> = ({ onNavigate }) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <StatCard
          title="Total Monthly Payroll"
          value="$1,248,500"
          subtitle="August 2024 Cycle"
          icon={<DollarSign size={16} color={colors.primary} />}
        />
        <StatCard
          title="Processed Payslips"
          value="248 / 248"
          subtitle="100% completed"
          icon={<FileSpreadsheet size={16} color={colors.success} />}
          iconColor={colors.success}
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="Tax Deductions (TDS)"
          value="$184,200"
          subtitle="Compliant"
          icon={<CreditCard size={16} color={colors.warning} />}
          iconColor={colors.warning}
        />
        <StatCard
          title="Pending Reimbursements"
          value="$4,320"
          subtitle="6 claims"
          icon={<AlertCircle size={16} color={colors.purple} />}
          iconColor={colors.purple}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Upcoming Payroll Batches
      </Text>
      <Card>
        <View style={styles.batchRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.batchTitle, { color: theme.text }]}>September 2024 Salary</Text>
            <Text style={[styles.batchSub, { color: theme.textSecondary }]}>Disbursement Date: Sep 30, 2024</Text>
          </View>
          <Badge label="Scheduled" status="pending" />
        </View>
        <Button
          title="Review & Process Payroll"
          onPress={() => onNavigate('PayrollDashboard')}
          fullWidth
          style={{ marginTop: spacing.md }}
        />
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
  batchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
  },
  batchTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  batchSub: {
    fontSize: 12,
    marginTop: 2,
  },
});
