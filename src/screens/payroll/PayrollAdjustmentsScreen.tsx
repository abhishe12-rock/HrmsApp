import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Receipt } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PayrollAdjustmentsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const ADJUSTMENTS = [
    { name: 'Sarah Jenkins', type: 'Bonus', amount: '+$1,500', reason: 'Q3 Performance Incentive', status: 'Approved' },
    { name: 'David Miller', type: 'Deduction', amount: '-$120', reason: 'Unpaid Leave (1 Day)', status: 'Approved' },
    { name: 'Michael Chang', type: 'Reimbursement', amount: '+$340', reason: 'Conference Travel', status: 'Pending' },
  ];

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
          {ADJUSTMENTS.map(item => (
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
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  list: { gap: spacing.sm },
  structHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  structTitle: { fontSize: 14, fontWeight: '700' },
  structSub: { fontSize: 12, marginTop: 2 },
  amountText: { fontSize: 14, fontWeight: '800' },
});
