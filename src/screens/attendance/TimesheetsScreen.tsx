import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Clock, Calendar, CheckCircle } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_ATTENDANCE } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { DataTable, Column } from '../../components/ui/DataTable';
import { AttendanceRecord } from '../../types';
import { formatDate } from '../../utils';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TimesheetsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [records] = useState<AttendanceRecord[]>(() => INITIAL_ATTENDANCE);

  const columns: Column<AttendanceRecord>[] = [
    {
      key: 'date',
      title: 'Date',
      render: item => <Text style={{ fontSize: 13, fontWeight: '700', color: theme.text }}>{formatDate(item.date)}</Text>,
    },
    {
      key: 'workingHours',
      title: 'Logged Hours',
      render: item => (
        <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary }}>
          {item.workingHours} hrs
        </Text>
      ),
    },
    {
      key: 'overtimeHours',
      title: 'Overtime',
      render: item => (
        <Text style={{ fontSize: 12, color: theme.textSecondary }}>
          {item.overtimeHours > 0 ? `${item.overtimeHours} hrs` : '--'}
        </Text>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: item => <Badge label={item.status} status={item.status} />,
    },
  ];

  return (
    <AppLayout
      title="Timesheets"
      currentScreen="Timesheets"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Employee Timesheets</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Weekly hours logged and productivity records
        </Text>

        <DataTable
          columns={columns}
          data={records}
          searchPlaceholder="Search timesheet records..."
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
});
