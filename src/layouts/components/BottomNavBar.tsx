import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  Grid,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { useAppStore } from '../../store/useAppStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomNavBarProps {
  currentScreen?: string;
  onNavigate: (screenName: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen = 'Dashboard',
  onNavigate,
}) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;
  const insets = useSafeAreaInsets();

  const tabs = [
    {
      id: 'Dashboard',
      label: 'Home',
      icon: LayoutDashboard,
      activeMatches: ['Dashboard'],
    },
    {
      id: 'EmployeesList',
      label: 'Employees',
      icon: Users,
      activeMatches: ['EmployeesList', 'EmployeeDetail', 'Departments', 'Designations', 'Teams', 'OrgStructure'],
    },
    {
      id: 'Attendance',
      label: 'Attendance',
      icon: Clock,
      activeMatches: ['Attendance', 'ClockIn', 'ShiftSchedule', 'Timesheets'],
    },
    {
      id: 'LeaveManagement',
      label: 'Leaves',
      icon: CalendarDays,
      activeMatches: ['LeaveManagement', 'LeaveRequests', 'LeaveBalance', 'Holidays'],
    },
    {
      id: 'AllModules',
      label: 'Modules',
      icon: Grid,
      activeMatches: ['AllModules', 'PayrollDashboard', 'CandidatesPipeline', 'Goals', 'Expenses', 'Reports', 'SaasDashboard', 'Settings'],
    },
  ];

  return (
    <View style={{ backgroundColor: '#1E293B', paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 22 : 10) }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
          },
        ]}
      >
      <View style={styles.tabRow}>
        {tabs.map(tab => {
          const IconComp = tab.icon;
          const isActive =
            tab.id === currentScreen || tab.activeMatches.includes(currentScreen);

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              activeOpacity={0.7}
              onPress={() => onNavigate(tab.id)}
            >
              <View
                style={[
                  styles.iconBox,
                  isActive && {
                    backgroundColor: isDarkMode
                      ? 'rgba(37,99,235,0.2)'
                      : '#EFF6FF',
                  },
                ]}
              >
                <IconComp
                  size={20}
                  color={isActive ? colors.primary : theme.textSecondary}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? colors.primary : theme.textSecondary,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    paddingTop: 6,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    position: 'relative',
  },
  iconBox: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10,
    letterSpacing: 0.2,
  },
  activeIndicator: {
    position: 'absolute',
    top: -6,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
