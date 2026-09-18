import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Calendar as CalendarIcon, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CalendarScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const EVENTS = [
    { title: 'Sprint Review & Demo', time: '10:00 AM - 11:30 AM', category: 'Team Meeting', attendees: '8 attendees' },
    { title: 'Quarterly HR Compliance Audit', time: '02:00 PM - 03:00 PM', category: 'Compliance', attendees: '4 attendees' },
    { title: 'Tech Interview: Backend Senior', time: '04:30 PM - 05:30 PM', category: 'Recruitment', attendees: '2 attendees' },
  ];

  return (
    <AppLayout
      title="Calendar"
      currentScreen="Calendar"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        {/* Month Selector Card */}
        <Card style={styles.monthCard}>
          <View style={styles.monthRow}>
            <TouchableOpacity style={styles.navArrow}>
              <ChevronLeft size={18} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.monthTitle, { color: theme.text }]}>September 2024</Text>
            <TouchableOpacity style={styles.navArrow}>
              <ChevronRight size={18} color={theme.text} />
            </TouchableOpacity>
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Today's Schedule & Events</Text>
        <View style={styles.list}>
          {EVENTS.map(ev => (
            <Card key={ev.title}>
              <View style={styles.eventRow}>
                <View style={[styles.colorBar, { backgroundColor: colors.primary }]} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.eventTitle, { color: theme.text }]}>{ev.title}</Text>
                  <Text style={[styles.eventTime, { color: colors.primary }]}>{ev.time}</Text>
                  <Text style={[styles.eventAtt, { color: theme.textSecondary }]}>
                    {ev.category} • {ev.attendees}
                  </Text>
                </View>
                <Badge label="Scheduled" status="active" />
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
  monthCard: { marginBottom: spacing.md },
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  monthTitle: { fontSize: 16, fontWeight: '800' },
  navArrow: { padding: 8 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: spacing.md },
  list: { gap: spacing.sm },
  eventRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  colorBar: { width: 4, height: 48, borderRadius: 2 },
  eventTitle: { fontSize: 14, fontWeight: '700' },
  eventTime: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  eventAtt: { fontSize: 11, marginTop: 2 },
});
