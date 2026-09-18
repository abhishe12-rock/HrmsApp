import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Receipt, Plus } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_EXPENSES } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { ExpenseClaim } from '../../types';
import { formatCurrency, formatDate } from '../../utils';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ExpensesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [expenses, setExpenses] = useState<ExpenseClaim[]>(INITIAL_EXPENSES);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState('Travel');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddClaim = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid expense amount.');
      return;
    }
    const newClaim: ExpenseClaim = {
      id: `exp_${Date.now()}`,
      organizationId: 'org-1',
      employeeId: 'emp-1',
      employeeName: 'Current User',
      employeeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      project: 'General',
      category: category as any,
      amount: numAmount,
      currency: 'USD',
      date: new Date().toISOString().split('T')[0],
      description: description.trim() || `${category} business expense`,
      receiptUrl: '',
      status: 'Pending',
    };
    setExpenses([newClaim, ...expenses]);
    setModalOpen(false);
    setAmount('');
    setDescription('');
    Alert.alert('Success', 'Expense claim submitted for approval!');
  };

  return (
    <AppLayout
      title="Expenses"
      currentScreen="Expenses"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Expense Claims</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Reimbursement requests and business claims
            </Text>
          </View>
          <Button
            title="New Claim"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {expenses.map(exp => (
            <Card key={exp.id}>
              <View style={styles.header}>
                <View style={[styles.iconBox, { backgroundColor: `${colors.primary}15` }]}>
                  <Receipt size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{exp.description || exp.category}</Text>
                  <Text style={[styles.sub, { color: theme.textSecondary }]}>
                    {exp.category} • {exp.employeeName} • {formatDate(exp.date)}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <Text style={[styles.amount, { color: colors.primary }]}>{formatCurrency(exp.amount)}</Text>
                  <Badge label={exp.status} status={exp.status} />
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* New Claim Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Submit Expense Claim"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Expense Category"
              placeholder="e.g. Travel, Meals, Hardware, Software"
              value={category}
              onChangeText={setCategory}
            />
            <Input
              label="Amount ($ USD) *"
              placeholder="e.g. 120.50"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Input
              label="Description / Purpose *"
              placeholder="e.g. Client lunch meeting in downtown"
              value={description}
              onChangeText={setDescription}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Submit for Approval"
                variant="primary"
                size="lg"
                onPress={handleAddClaim}
              />
            </View>
          </View>
        </Modal>
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
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 14, fontWeight: '700' },
  sub: { fontSize: 11, marginTop: 2 },
  amount: { fontSize: 15, fontWeight: '800' },
});
