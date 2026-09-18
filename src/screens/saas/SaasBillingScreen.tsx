import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DollarSign, Download } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SaasBillingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const INVOICES = [
    { id: 'INV-2024-001', org: 'Acme Corporation', amount: '$499.00', date: 'Sep 01, 2024', status: 'Paid' },
    { id: 'INV-2024-002', org: 'Nexus Global Tech', amount: '$1,299.00', date: 'Sep 01, 2024', status: 'Paid' },
    { id: 'INV-2024-003', org: 'Starlight Biotech', amount: '$199.00', date: 'Aug 15, 2024', status: 'Paid' },
  ];

  return (
    <AppLayout
      title="Platform Invoices"
      currentScreen="SaasBilling"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Tenant Billing & Invoices</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Automated Stripe / payment gateway recurring billing logs
        </Text>

        <View style={styles.list}>
          {INVOICES.map(inv => (
            <Card key={inv.id}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{inv.org}</Text>
                  <Text style={[styles.sub, { color: theme.textSecondary }]}>
                    Invoice: {inv.id} • {inv.date}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <Text style={[styles.amount, { color: colors.primary }]}>{inv.amount}</Text>
                  <Badge label={inv.status} status="active" />
                </View>
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
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 14, fontWeight: '700' },
  sub: { fontSize: 12, marginTop: 2 },
  amount: { fontSize: 15, fontWeight: '800' },
});
