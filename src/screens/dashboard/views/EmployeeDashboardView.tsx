import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Clock,
  Calendar,
  CreditCard,
  CheckCircle2,
  CalendarDays,
  ListTodo,
  TrendingUp,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react-native';
import { useAppStore } from '../../../store/useAppStore';
import { Card } from '../../../components/ui/Card';
import { StatCard } from '../../../components/ui/StatCard';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { colors } from '../../../theme/colors';
import { borderRadius, spacing } from '../../../theme/spacing';
import { WorkTimerAndGreetingHero } from '../../../components/dashboard/WorkTimerAndGreetingHero';

interface Props {
  onNavigate: (screen: string) => void;
}

export const EmployeeDashboardView: React.FC<Props> = ({ onNavigate }) => {
  const {
    currentUser,
    isClockedIn,
    setClockInState,
    secondsElapsed,
    isDarkMode,
  } = useAppStore();

  const theme = isDarkMode ? colors.dark : colors.light;

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePunch = () => {
    setClockInState(!isClockedIn);
  };

  return (
    <View style={styles.container}>
      {/* Hero: Wishing Banner & Work Timer */}
      <WorkTimerAndGreetingHero onNavigate={onNavigate} />

      {/* KPI Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Attendance"
          value="95.5%"
          change="+2.4%"
          isPositive
          icon={<Clock size={16} color={colors.primary} />}
        />
        <StatCard
          title="Leave Balance"
          value="18 Days"
          subtitle="Remaining"
          icon={<CalendarDays size={16} color={colors.info} />}
          iconColor={colors.info}
        />
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Pending Tasks"
          value="4"
          subtitle="2 due today"
          icon={<ListTodo size={16} color={colors.warning} />}
          iconColor={colors.warning}
        />
        <StatCard
          title="Latest Net Pay"
          value="$5,420"
          subtitle="Aug 2024"
          icon={<CreditCard size={16} color={colors.success} />}
          iconColor={colors.success}
        />
      </View>

      {/* Quick Access Tiles */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
      <View style={styles.quickGrid}>
        <TouchableOpacity
          onPress={() => onNavigate('LeaveManagement')}
          style={[styles.actionTile, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <View style={[styles.tileIcon, { backgroundColor: `${colors.info}15` }]}>
            <CalendarDays size={20} color={colors.info} />
          </View>
          <Text style={[styles.tileTitle, { color: theme.text }]}>Apply Leave</Text>
          <Text style={[styles.tileSub, { color: theme.textSecondary }]}>Request time off</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('ClockIn')}
          style={[styles.actionTile, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <View style={[styles.tileIcon, { backgroundColor: `${colors.primary}15` }]}>
            <Clock size={20} color={colors.primary} />
          </View>
          <Text style={[styles.tileTitle, { color: theme.text }]}>Attendance</Text>
          <Text style={[styles.tileSub, { color: theme.textSecondary }]}>View check-ins</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('Payslips')}
          style={[styles.actionTile, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <View style={[styles.tileIcon, { backgroundColor: `${colors.success}15` }]}>
            <CreditCard size={20} color={colors.success} />
          </View>
          <Text style={[styles.tileTitle, { color: theme.text }]}>My Payslips</Text>
          <Text style={[styles.tileSub, { color: theme.textSecondary }]}>Salary & receipts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('Tasks')}
          style={[styles.actionTile, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <View style={[styles.tileIcon, { backgroundColor: `${colors.warning}15` }]}>
            <ListTodo size={20} color={colors.warning} />
          </View>
          <Text style={[styles.tileTitle, { color: theme.text }]}>My Tasks</Text>
          <Text style={[styles.tileSub, { color: theme.textSecondary }]}>4 active tasks</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Holidays */}
      <Text style={[styles.sectionTitle, { color: theme.text, marginTop: spacing.lg }]}>
        Upcoming Holidays
      </Text>
      <Card>
        <View style={styles.holidayRow}>
          <View style={styles.holidayDateBadge}>
            <Text style={styles.holidayMonth}>OCT</Text>
            <Text style={styles.holidayDay}>02</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.holidayName, { color: theme.text }]}>Gandhi Jayanti</Text>
            <Text style={[styles.holidayType, { color: theme.textSecondary }]}>National Holiday • Wednesday</Text>
          </View>
          <Badge label="Confirmed" status="active" />
        </View>

        <View style={[styles.holidayRow, { borderBottomWidth: 0 }]}>
          <View style={styles.holidayDateBadge}>
            <Text style={styles.holidayMonth}>NOV</Text>
            <Text style={styles.holidayDay}>01</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.holidayName, { color: theme.text }]}>Diwali Festival</Text>
            <Text style={[styles.holidayType, { color: theme.textSecondary }]}>Festival Holiday • Friday</Text>
          </View>
          <Badge label="Confirmed" status="active" />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  heroCard: {
    borderWidth: 1.5,
    marginBottom: spacing.md,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  welcomeSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  deptText: {
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(37,99,235,0.15)',
  },
  timerDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerDigits: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginVertical: spacing.md,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionTile: {
    flex: 1,
    minWidth: '45%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  tileIcon: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  tileTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  tileSub: {
    fontSize: 11,
    marginTop: 2,
  },
  holidayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  holidayDateBadge: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  holidayMonth: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
  },
  holidayDay: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  holidayName: {
    fontSize: 13,
    fontWeight: '700',
  },
  holidayType: {
    fontSize: 11,
    marginTop: 1,
  },
});
