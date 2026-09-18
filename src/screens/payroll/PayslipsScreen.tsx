import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Download, FileText, CheckCircle2 } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_PAYROLL } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { PayrollRecord } from '../../types';
import { formatCurrency } from '../../utils';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PayslipsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [payslips] = useState<PayrollRecord[]>(INITIAL_PAYROLL);
  const [selectedSlip, setSelectedSlip] = useState<PayrollRecord | null>(null);

  const handleDownloadPdf = (slip: PayrollRecord) => {
    Alert.alert(
      'Download Complete',
      `Payslip for ${slip.employeeName} (${slip.month}) has been downloaded successfully in PDF format.`,
      [{ text: 'OK' }]
    );
  };

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
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedSlip(slip)}
              >
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
              </TouchableOpacity>

              <Button
                title="View & Download PDF"
                variant="outline"
                size="sm"
                icon={<Download size={14} color={theme.text} />}
                onPress={() => handleDownloadPdf(slip)}
                style={{ marginTop: spacing.sm }}
              />
            </Card>
          ))}
        </View>

        {/* Detailed Payslip Modal */}
        {selectedSlip && (
          <Modal
            isOpen={!!selectedSlip}
            onClose={() => setSelectedSlip(null)}
            title={`Payslip - ${selectedSlip.month}`}
          >
            <View style={{ gap: spacing.md, paddingVertical: spacing.xs }}>
              <View style={styles.modalMetaBox}>
                <Text style={[styles.modalMetaName, { color: theme.text }]}>
                  {selectedSlip.employeeName}
                </Text>
                <Text style={[styles.modalMetaSub, { color: theme.textSecondary }]}>
                  ID: {selectedSlip.employeeCode} • Disbursement: {selectedSlip.paymentDate || 'End of Month'}
                </Text>
              </View>

              <View style={[styles.detailsSection, { borderColor: theme.border }]}>
                <Text style={[styles.sectionHeading, { color: theme.text }]}>Earnings & Allowances</Text>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailKey, { color: theme.textSecondary }]}>Base Salary</Text>
                  <Text style={[styles.detailVal, { color: theme.text }]}>{formatCurrency(selectedSlip.basicSalary)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailKey, { color: theme.textSecondary }]}>Allowances</Text>
                  <Text style={[styles.detailVal, { color: theme.text }]}>{formatCurrency(selectedSlip.allowances)}</Text>
                </View>
                <View style={[styles.detailRow, styles.subtotalRow, { borderTopColor: theme.border }]}>
                  <Text style={[styles.detailKeyBold, { color: theme.text }]}>Gross Earnings</Text>
                  <Text style={[styles.detailValBold, { color: theme.text }]}>{formatCurrency(selectedSlip.grossSalary)}</Text>
                </View>
              </View>

              <View style={[styles.detailsSection, { borderColor: theme.border }]}>
                <Text style={[styles.sectionHeading, { color: theme.text }]}>Taxes & Deductions</Text>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailKey, { color: theme.textSecondary }]}>Statutory Tax</Text>
                  <Text style={[styles.detailVal, { color: colors.danger }]}>-{formatCurrency(selectedSlip.taxDeduction)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailKey, { color: theme.textSecondary }]}>PF / Social Security</Text>
                  <Text style={[styles.detailVal, { color: colors.danger }]}>-{formatCurrency(selectedSlip.otherDeductions)}</Text>
                </View>
                <View style={[styles.detailRow, styles.subtotalRow, { borderTopColor: theme.border }]}>
                  <Text style={[styles.detailKeyBold, { color: theme.text }]}>Total Deductions</Text>
                  <Text style={[styles.detailValBold, { color: colors.danger }]}>-{formatCurrency(selectedSlip.totalDeductions)}</Text>
                </View>
              </View>

              <View style={[styles.netTotalBox, { backgroundColor: isDarkMode ? '#1E293B' : '#ECFDF5' }]}>
                <Text style={[styles.netLabel, { color: theme.textSecondary }]}>Take Home Net Salary</Text>
                <Text style={[styles.netAmount, { color: colors.success }]}>
                  {formatCurrency(selectedSlip.netSalary)}
                </Text>
              </View>

              <Button
                title="Download Official PDF"
                variant="primary"
                size="lg"
                icon={<Download size={16} color="#FFFFFF" />}
                onPress={() => {
                  const slip = selectedSlip;
                  setSelectedSlip(null);
                  handleDownloadPdf(slip);
                }}
              />
            </View>
          </Modal>
        )}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
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
  miniLabel: { fontSize: 11 },
  miniVal: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  modalMetaBox: {
    paddingBottom: spacing.xs,
  },
  modalMetaName: {
    fontSize: 16,
    fontWeight: '800',
  },
  modalMetaSub: {
    fontSize: 12,
    marginTop: 2,
  },
  detailsSection: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    gap: 6,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtotalRow: {
    borderTopWidth: 1,
    paddingTop: 4,
    marginTop: 2,
  },
  detailKey: {
    fontSize: 12,
  },
  detailVal: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailKeyBold: {
    fontSize: 12,
    fontWeight: '800',
  },
  detailValBold: {
    fontSize: 12,
    fontWeight: '800',
  },
  netTotalBox: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  netLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  netAmount: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },
});
