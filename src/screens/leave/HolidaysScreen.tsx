import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Calendar } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
