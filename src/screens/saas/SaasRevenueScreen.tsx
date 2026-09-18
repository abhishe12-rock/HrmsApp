import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DollarSign, TrendingUp } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SaasRevenueScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <AppLayout
      title="Revenue Analytics"
      currentScreen="SaasRevenue"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.statsRow}>
          <StatCard
            title="Annual Run Rate (ARR)"
            value="$1.13M"
            change="+18.4%"
            isPositive
            icon={<DollarSign size={16} color={colors.primary} />}
          />
          <StatCard
            title="Avg Revenue Per Org"
            value="$785/mo"
            change="+4.2%"
            isPositive
            icon={<TrendingUp size={16} color={colors.success} />}
            iconColor={colors.success}
          />
        </View>

        <Card>
          <Text style={[styles.title, { color: theme.text }]}>Revenue Sources</Text>
          <View style={styles.item}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Enterprise Plan Subscriptions</Text>
            <Text style={[styles.val, { color: theme.text }]}>$64,950 (68.9%)</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Business Tier Subscriptions</Text>
            <Text style={[styles.val, { color: theme.text }]}>$24,950 (26.5%)</Text>
          </View>
          <View style={[styles.item, { borderBottomWidth: 0 }]}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Starter Plan Subscriptions</Text>
            <Text style={[styles.val, { color: theme.text }]}>$4,350 (4.6%)</Text>
          </View>
        </Card>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  title: { fontSize: 15, fontWeight: '700', marginBottom: spacing.md },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  label: { fontSize: 12 },
  val: { fontSize: 13, fontWeight: '700' },
});
