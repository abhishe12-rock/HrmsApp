import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CreditCard, Plus, Receipt } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SalaryStructureScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [structures, setStructures] = useState([
    { title: 'Executive Level (L1 - L2)', basic: '50%', hra: '30%', allowances: '20%', employees: 12 },
    { title: 'Engineering & Tech (L3 - L5)', basic: '45%', hra: '25%', allowances: '30%', employees: 145 },
    { title: 'Sales & Growth Tier', basic: '40%', hra: '20%', allowances: '40%', employees: 58 },
    { title: 'Operations & Support', basic: '50%', hra: '30%', allowances: '20%', employees: 33 },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [gradeTitle, setGradeTitle] = useState('');
  const [basicPct, setBasicPct] = useState('50%');
  const [hraPct, setHraPct] = useState('30%');
  const [allowancePct, setAllowancePct] = useState('20%');

  const handleAddGrade = () => {
    if (!gradeTitle.trim()) {
      Alert.alert('Validation Error', 'Please enter a grade title.');
      return;
    }
    const newGrade = {
      title: gradeTitle.trim(),
      basic: basicPct.trim() || '50%',
      hra: hraPct.trim() || '30%',
      allowances: allowancePct.trim() || '20%',
      employees: 0,
    };
    setStructures([newGrade, ...structures]);
    setModalOpen(false);
    setGradeTitle('');
    Alert.alert('Success', `Salary grade "${newGrade.title}" created!`);
  };

  return (
    <AppLayout
      title="Salary Structure"
      currentScreen="SalaryStructure"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Salary Structures</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Standard grade-based compensation formulas
            </Text>
          </View>
          <Button
            title="New Grade"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {structures.map(st => (
            <Card key={st.title}>
              <View style={styles.structHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.structTitle, { color: theme.text }]}>{st.title}</Text>
                  <Text style={[styles.structSub, { color: theme.textSecondary }]}>
                    Basic: {st.basic} • HRA: {st.hra} • Special: {st.allowances}
                  </Text>
                </View>
                <Badge label={`${st.employees} Assigned`} status="active" />
              </View>
            </Card>
          ))}
        </View>

        {/* Create Salary Grade Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create New Salary Band"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Grade / Band Title *"
              placeholder="e.g. Senior Leadership (L6 - L7)"
              value={gradeTitle}
              onChangeText={setGradeTitle}
            />
            <Input
              label="Basic Pay Allocation"
              placeholder="50%"
              value={basicPct}
              onChangeText={setBasicPct}
            />
            <Input
              label="HRA Allocation"
              placeholder="30%"
              value={hraPct}
              onChangeText={setHraPct}
            />
            <Input
              label="Special Allowances Allocation"
              placeholder="20%"
              value={allowancePct}
              onChangeText={setAllowancePct}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Save Salary Formula"
                variant="primary"
                size="lg"
                onPress={handleAddGrade}
              />
            </View>
          </View>
        </Modal>
      </View>
    </AppLayout>
  );
};

export const PayrollAdjustmentsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [adjustments, setAdjustments] = useState([
    { name: 'Sarah Jenkins', type: 'Bonus', amount: '+$1,500', reason: 'Q3 Performance Incentive', status: 'Approved' },
    { name: 'David Miller', type: 'Deduction', amount: '-$120', reason: 'Unpaid Leave (1 Day)', status: 'Approved' },
    { name: 'Michael Chang', type: 'Reimbursement', amount: '+$340', reason: 'Conference Travel', status: 'Pending' },
  ]);

  return (
    <AppLayout
      title="Adjustments"
      currentScreen="PayrollAdjustments"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Payroll Adjustments</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          One-time bonuses, deductions & employee reimbursement claims
        </Text>

        <View style={styles.list}>
          {adjustments.map(item => (
            <Card key={item.name + item.reason}>
              <View style={styles.structHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.structTitle, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.structSub, { color: theme.textSecondary }]}>
                    {item.type} • {item.reason}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.amountText,
                    { color: item.amount.startsWith('+') ? colors.success : colors.danger },
                  ]}
                >
                  {item.amount}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2 },
  list: { gap: spacing.sm },
  structHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  structTitle: { fontSize: 14, fontWeight: '700' },
  structSub: { fontSize: 12, marginTop: 2 },
  amountText: { fontSize: 15, fontWeight: '800' },
});
