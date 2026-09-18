import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Building2, Plus, MapPin } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SaasOrganizationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { allOrgs, isDarkMode } = useAppStore();
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <AppLayout
      title="Tenants"
      currentScreen="SaasOrganizations"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Tenant Organizations</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              {allOrgs.length} active enterprise company accounts
            </Text>
          </View>
          <Button title="Provision" size="sm" icon={<Plus size={14} color="#FFF" />} onPress={() => {}} />
        </View>

        <View style={styles.list}>
          {allOrgs.map(org => (
            <Card key={org.id}>
              <View style={styles.orgHeader}>
                <View style={[styles.iconBox, { backgroundColor: `${colors.primary}15` }]}>
                  <Building2 size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.orgName, { color: theme.text }]}>{org.name}</Text>
                  <Text style={[styles.orgSub, { color: theme.textSecondary }]}>
                    {org.industry} • {org.location}
                  </Text>
                </View>
                <Badge label={org.plan} status="active" />
              </View>

              <View style={[styles.statsRow, { borderTopColor: theme.border }]}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                  Employees: {org.totalEmployees} / {org.maxEmployees}
                </Text>
                <Text style={[styles.statLabel, { color: colors.primary, fontWeight: '700' }]}>
                  ${org.monthlyFee}/mo
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
  orgHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orgName: { fontSize: 15, fontWeight: '700' },
  orgSub: { fontSize: 12, marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
  },
  statLabel: { fontSize: 12 },
});
