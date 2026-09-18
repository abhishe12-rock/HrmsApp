import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CreditCard, Layers, Check } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SaasSubscriptionsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { allOrgs, isDarkMode } = useAppStore();
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <AppLayout
      title="Subscriptions"
      currentScreen="SaasSubscriptions"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Tenant Subscriptions</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Billing tier status, active tiers & seat allocation
        </Text>

        <View style={styles.list}>
          {allOrgs.map(org => (
            <Card key={org.id}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{org.name}</Text>
                  <Text style={[styles.sub, { color: theme.textSecondary }]}>
                    Plan: {org.plan} • Cycle: {org.billingCycle}
                  </Text>
                </View>
                <Badge label={`$${org.monthlyFee}/mo`} status="active" />
              </View>
            </Card>
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

export const SaasPlansScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const PLANS = [
    { name: 'Starter Plan', price: '$199/mo', seats: 'Up to 50 employees', features: ['Core HR', 'Attendance', 'Leave Management'] },
    { name: 'Business Tier', price: '$499/mo', seats: 'Up to 250 employees', features: ['Full HR Suite', 'Payroll Engine', 'Recruitment ATS', 'Expenses'] },
    { name: 'Enterprise Cloud', price: '$1,299/mo', seats: 'Unlimited employees', features: ['Custom Geofencing', 'Dedicated Server', 'Custom Integrations', 'SLA 99.99%'] },
  ];

  return (
    <AppLayout
      title="Plans & Pricing"
      currentScreen="SaasPlans"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>SaaS Product Tiers</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Configured subscription packages & feature tiers
        </Text>

        <View style={styles.list}>
          {PLANS.map(plan => (
            <Card key={plan.name}>
              <View style={styles.row}>
                <View>
                  <Text style={[styles.title, { color: theme.text }]}>{plan.name}</Text>
                  <Text style={[styles.sub, { color: theme.textSecondary }]}>{plan.seats}</Text>
                </View>
                <Text style={[styles.priceText, { color: colors.primary }]}>{plan.price}</Text>
              </View>

              <View style={[styles.featuresBox, { borderTopColor: theme.border }]}>
                {plan.features.map(f => (
                  <View key={f} style={styles.featureItem}>
                    <Check size={14} color={colors.success} />
                    <Text style={[styles.featureText, { color: theme.textSecondary }]}>{f}</Text>
                  </View>
                ))}
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
  title: { fontSize: 15, fontWeight: '700' },
  sub: { fontSize: 12, marginTop: 2 },
  priceText: { fontSize: 16, fontWeight: '800' },
  featuresBox: { marginTop: spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, gap: 4 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  featureText: { fontSize: 12 },
});
