import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Calendar, Shield, Clock, Heart } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LeaveBalanceScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <AppLayout
      title="Leave Balance"
      currentScreen="LeaveBalance"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Entitled Leave Quota</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Annual allocated quotas and accrued balances
        </Text>

        <Card>
          <View style={styles.quotaRow}>
            <View style={[styles.iconPill, { backgroundColor: `${colors.primary}15` }]}>
              <Calendar size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.quotaName, { color: theme.text }]}>Annual Paid Leave</Text>
              <Text style={[styles.quotaSub, { color: theme.textSecondary }]}>Total: 18 • Used: 6 • Remaining: 12</Text>
            </View>
            <Badge label="12 Left" status="active" />
          </View>
        </Card>

        <Card>
          <View style={styles.quotaRow}>
            <View style={[styles.iconPill, { backgroundColor: `${colors.warning}15` }]}>
              <Clock size={20} color={colors.warning} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.quotaName, { color: theme.text }]}>Casual Leave</Text>
              <Text style={[styles.quotaSub, { color: theme.textSecondary }]}>Total: 8 • Used: 3 • Remaining: 5</Text>
            </View>
            <Badge label="5 Left" status="warning" />
          </View>
        </Card>

        <Card>
          <View style={styles.quotaRow}>
            <View style={[styles.iconPill, { backgroundColor: `${colors.danger}15` }]}>
              <Heart size={20} color={colors.danger} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.quotaName, { color: theme.text }]}>Medical / Sick Leave</Text>
              <Text style={[styles.quotaSub, { color: theme.textSecondary }]}>Total: 10 • Used: 2 • Remaining: 8</Text>
            </View>
            <Badge label="8 Left" status="active" />
          </View>
        </Card>
      </View>
    </AppLayout>
  );
};

export const HolidaysScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const HOLIDAYS = [
    { date: '2024-01-26', name: 'Republic Day', type: 'National', day: 'Friday' },
    { date: '2024-03-25', name: 'Holi Festival', type: 'Festival', day: 'Monday' },
    { date: '2024-08-15', name: 'Independence Day', type: 'National', day: 'Thursday' },
    { date: '2024-10-02', name: 'Gandhi Jayanti', type: 'National', day: 'Wednesday' },
    { date: '2024-11-01', name: 'Diwali', type: 'Festival', day: 'Friday' },
    { date: '2024-12-25', name: 'Christmas Day', type: 'Gazetted', day: 'Wednesday' },
  ];

  return (
    <AppLayout
      title="Company Holidays"
      currentScreen="Holidays"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Official Holidays 2024</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Scheduled company and gazetted holidays
        </Text>

        <View style={styles.list}>
          {HOLIDAYS.map(h => (
            <Card key={h.name}>
              <View style={styles.holidayRow}>
                <View style={[styles.dateBadge, { backgroundColor: `${colors.primary}15` }]}>
                  <Text style={styles.dateBadgeText}>{h.date.substring(5)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.holidayName, { color: theme.text }]}>{h.name}</Text>
                  <Text style={[styles.holidayDetails, { color: theme.textSecondary }]}>
                    {h.day} • {h.type} Holiday
                  </Text>
                </View>
                <Badge label="Off Duty" status="active" />
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
  list: { gap: spacing.xs },
  quotaRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconPill: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quotaName: { fontSize: 14, fontWeight: '700' },
  quotaSub: { fontSize: 11, marginTop: 2 },
  holidayRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dateBadge: {
    width: 48,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBadgeText: { fontSize: 13, fontWeight: '800', color: colors.primary },
  holidayName: { fontSize: 14, fontWeight: '700' },
  holidayDetails: { fontSize: 12, marginTop: 2 },
});
