import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DollarSign, FileSpreadsheet, Download } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_PAYROLL } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PayrollRecord } from '../../types';
import { formatCurrency } from '../../utils';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PayrollDashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <AppLayout
      title="Payroll Overview"
      currentScreen="PayrollDashboard"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.statsRow}>
          <StatCard
            title="Total Payroll"
            value="$1.24M"
            change="Disbursed"
            isPositive
            icon={<DollarSign size={16} color={colors.primary} />}
          />
          <StatCard
            title="Processed Slips"
            value="248 / 248"
            subtitle="August 2024"
            icon={<FileSpreadsheet size={16} color={colors.success} />}
            iconColor={colors.success}
          />
        </View>

        <Card>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Active Pay Cycle: August 2024</Text>
          <View style={styles.cycleRow}>
            <Text style={[styles.cycleLabel, { color: theme.textSecondary }]}>Disbursement Date</Text>
            <Text style={[styles.cycleVal, { color: theme.text }]}>August 31, 2024</Text>
          </View>
          <View style={styles.cycleRow}>
            <Text style={[styles.cycleLabel, { color: theme.textSecondary }]}>Gross Compensation</Text>
            <Text style={[styles.cycleVal, { color: theme.text }]}>$1,420,000</Text>
          </View>
          <View style={styles.cycleRow}>
            <Text style={[styles.cycleLabel, { color: theme.textSecondary }]}>Total Deductions (Tax/PF)</Text>
            <Text style={[styles.cycleVal, { color: colors.danger }]}>-$171,500</Text>
          </View>
          <View style={[styles.cycleRow, { borderBottomWidth: 0 }]}>
            <Text style={[styles.cycleLabel, { color: colors.success, fontWeight: '700' }]}>Total Net Paid</Text>
            <Text style={[styles.cycleVal, { color: colors.success, fontWeight: '800' }]}>$1,248,500</Text>
          </View>

          <Button
            title="View All Payslips"
            onPress={() => navigation.navigate('Payslips')}
            fullWidth
            style={{ marginTop: spacing.md }}
          />
        </Card>
      </View>
    </AppLayout>
  );
};

export const PayslipsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [payslips] = useState<PayrollRecord[]>(INITIAL_PAYROLL);

  return (
    <AppLayout
      title="Payslips"
      currentScreen="Payslips"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Salary Slips & Receipts</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Monthly compensation breakdown and downloadable payslips
        </Text>

        <View style={styles.list}>
          {payslips.map(slip => (
            <Card key={slip.id}>
              <View style={styles.slipHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.slipMonth, { color: theme.text }]}>
                    {slip.month}
                  </Text>
                  <Text style={[styles.slipEmp, { color: theme.textSecondary }]}>
                    {slip.employeeName} • Net: {formatCurrency(slip.netSalary)}
                  </Text>
                </View>
                <Badge label={slip.status} status="active" />
              </View>

              <View style={[styles.slipBreakdown, { borderTopColor: theme.border }]}>
                <View style={styles.miniItem}>
                  <Text style={[styles.miniLabel, { color: theme.textMuted }]}>Gross</Text>
                  <Text style={[styles.miniVal, { color: theme.text }]}>{formatCurrency(slip.grossSalary)}</Text>
                </View>
                <View style={styles.miniItem}>
                  <Text style={[styles.miniLabel, { color: theme.textMuted }]}>Deductions</Text>
                  <Text style={[styles.miniVal, { color: colors.danger }]}>-{formatCurrency(slip.totalDeductions)}</Text>
                </View>
                <View style={styles.miniItem}>
                  <Text style={[styles.miniLabel, { color: theme.textMuted }]}>Net Salary</Text>
                  <Text style={[styles.miniVal, { color: colors.success, fontWeight: '800' }]}>
                    {formatCurrency(slip.netSalary)}
                  </Text>
                </View>
              </View>

              <Button
                title="Download PDF"
                variant="outline"
                size="sm"
                icon={<Download size={14} color={theme.text} />}
                onPress={() => {
                  Alert.alert(
                    'Payslip Download',
                    `Downloading official payslip statement for ${slip.employeeName} (${slip.month}). Saved to Downloads.`,
                    [{ text: 'View All Payslips', onPress: () => navigation.navigate('Payslips') }, { text: 'OK' }]
                  );
                }}
                style={{ marginTop: spacing.sm }}
              />
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
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: spacing.md },
  cycleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  cycleLabel: { fontSize: 13 },
  cycleVal: { fontSize: 13, fontWeight: '700' },
  list: { gap: spacing.sm },
  slipHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  slipMonth: { fontSize: 15, fontWeight: '700' },
  slipEmp: { fontSize: 12, marginTop: 2 },
  slipBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
  },
  miniItem: { alignItems: 'center' },
  miniLabel: { fontSize: 10 },
  miniVal: { fontSize: 13, fontWeight: '700', marginTop: 1 },
});
