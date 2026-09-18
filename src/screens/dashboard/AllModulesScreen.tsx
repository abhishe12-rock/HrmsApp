import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import {
  Users,
  Building2,
  Clock,
  CalendarDays,
  CreditCard,
  Briefcase,
  Target,
  FileSpreadsheet,
  Package,
  FileText,
  GraduationCap,
  Calendar,
  BarChart3,
  Settings,
  ShieldCheck,
  DollarSign,
  UserCheck,
  Compass,
  Layers,
  Sparkles,
  Award,
  Receipt,
  HelpCircle,
  MessageSquare,
  Mail,
  ListTodo,
  Megaphone,
  Network,
  FolderLock,
  Search,
} from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ModuleItem {
  title: string;
  desc: string;
  screen: keyof RootStackParamList;
  icon: any;
  color: string;
  bg: string;
  badge?: string;
}

interface ModuleCategory {
  category: string;
  items: ModuleItem[];
}

const MASTER_MODULES: ModuleCategory[] = [
  {
    category: 'Core HR & Workforce',
    items: [
      {
        title: 'Employee Directory',
        desc: 'Workforce profiles & records',
        screen: 'EmployeesList',
        icon: Users,
        color: '#2563EB',
        bg: '#EFF6FF',
        badge: '14 Active',
      },
      {
        title: 'Org Structure',
        desc: 'Visual hierarchy tree',
        screen: 'OrgStructure',
        icon: Network,
        color: '#4F46E5',
        bg: '#EEF2FF',
      },
      {
        title: 'Departments',
        desc: 'Divisions & business units',
        screen: 'Departments',
        icon: Building2,
        color: '#0284C7',
        bg: '#E0F2FE',
      },
      {
        title: 'Designations',
        desc: 'Job titles & levels',
        screen: 'Designations',
        icon: Layers,
        color: '#059669',
        bg: '#ECFDF5',
      },
      {
        title: 'Teams',
        desc: 'Cross-functional squads',
        screen: 'Teams',
        icon: Users,
        color: '#D97706',
        bg: '#FFFBEB',
      },
    ],
  },
  {
    category: 'Time & Attendance',
    items: [
      {
        title: 'Clock In / Out',
        desc: 'GPS & Wi-Fi verified punch',
        screen: 'ClockIn',
        icon: UserCheck,
        color: '#10B981',
        bg: '#ECFDF5',
        badge: 'Live',
      },
      {
        title: 'Daily Attendance',
        desc: 'Logs, status & overtime',
        screen: 'Attendance',
        icon: Clock,
        color: '#2563EB',
        bg: '#EFF6FF',
      },
      {
        title: 'Shift Schedules',
        desc: 'Roster & shift assignments',
        screen: 'ShiftSchedule',
        icon: Calendar,
        color: '#8B5CF6',
        bg: '#F5F3FF',
      },
      {
        title: 'Timesheets',
        desc: 'Weekly hours & sign-offs',
        screen: 'Timesheets',
        icon: FileSpreadsheet,
        color: '#06B6D4',
        bg: '#ECFEFF',
      },
    ],
  },
  {
    category: 'Leave Management',
    items: [
      {
        title: 'Leave Overview',
        desc: 'Balances & time-off summary',
        screen: 'LeaveManagement',
        icon: CalendarDays,
        color: '#F59E0B',
        bg: '#FFFBEB',
      },
      {
        title: 'Leave Requests',
        desc: 'Approvals & pending requests',
        screen: 'LeaveRequests',
        icon: CalendarDays,
        color: '#EA580C',
        bg: '#FFF7ED',
        badge: 'Approvals',
      },
      {
        title: 'Leave Balances',
        desc: 'Annual, casual, sick quotas',
        screen: 'LeaveBalance',
        icon: ShieldCheck,
        color: '#10B981',
        bg: '#ECFDF5',
      },
      {
        title: 'Holidays Calendar',
        desc: 'Statutory & company days off',
        screen: 'Holidays',
        icon: Calendar,
        color: '#6366F1',
        bg: '#EEF2FF',
      },
    ],
  },
  {
    category: 'Payroll & Compensation',
    items: [
      {
        title: 'Payroll Dashboard',
        desc: 'Disbursement runs & totals',
        screen: 'PayrollDashboard',
        icon: DollarSign,
        color: '#10B981',
        bg: '#ECFDF5',
        badge: '$148.5K',
      },
      {
        title: 'Payslips',
        desc: 'Digital PDF salary slips',
        screen: 'Payslips',
        icon: FileText,
        color: '#2563EB',
        bg: '#EFF6FF',
      },
      {
        title: 'Salary Structures',
        desc: 'Bands, grades & allowances',
        screen: 'SalaryStructure',
        icon: CreditCard,
        color: '#7C3AED',
        bg: '#F5F3FF',
      },
      {
        title: 'Salary Adjustments',
        desc: 'Bonuses, deductions & incentives',
        screen: 'PayrollAdjustments',
        icon: Sparkles,
        color: '#D97706',
        bg: '#FFFBEB',
      },
    ],
  },
  {
    category: 'Recruitment & Performance',
    items: [
      {
        title: 'Job Openings',
        desc: 'Active job requisitions',
        screen: 'JobOpenings',
        icon: Briefcase,
        color: '#0284C7',
        bg: '#E0F2FE',
        badge: '4 Open',
      },
      {
        title: 'Candidate Pipeline',
        desc: 'Kanban ATS stage tracker',
        screen: 'CandidatesPipeline',
        icon: Users,
        color: '#9333EA',
        bg: '#F3E8FF',
      },
      {
        title: 'Interviews',
        desc: 'Scheduled rounds & feedback',
        screen: 'Interviews',
        icon: Calendar,
        color: '#DB2777',
        bg: '#FDF2F8',
      },
      {
        title: 'Goals & OKRs',
        desc: 'Quarterly targets & milestones',
        screen: 'Goals',
        icon: Target,
        color: '#EF4444',
        bg: '#FEF2F2',
      },
      {
        title: 'Performance Reviews',
        desc: '360 review evaluations',
        screen: 'PerformanceReviews',
        icon: Award,
        color: '#D97706',
        bg: '#FFFBEB',
      },
    ],
  },
  {
    category: 'Operations & Assets',
    items: [
      {
        title: 'Expense Claims',
        desc: 'Receipts & reimbursements',
        screen: 'Expenses',
        icon: Receipt,
        color: '#0D9488',
        bg: '#F0FDFA',
      },
      {
        title: 'Hardware & Assets',
        desc: 'Laptops, screens & equipment',
        screen: 'Assets',
        icon: Package,
        color: '#E11D48',
        bg: '#FFF1F2',
      },
      {
        title: 'Document Vault',
        desc: 'Contracts, policies & IDs',
        screen: 'Documents',
        icon: FolderLock,
        color: '#2563EB',
        bg: '#EFF6FF',
      },
      {
        title: 'Training & LMS',
        desc: 'Compliance & growth courses',
        screen: 'Training',
        icon: GraduationCap,
        color: '#7C3AED',
        bg: '#F5F3FF',
      },
    ],
  },
  {
    category: 'Collaboration & Comms',
    items: [
      {
        title: 'Team Tasks',
        desc: 'Checklists & assignments',
        screen: 'Tasks',
        icon: ListTodo,
        color: '#2563EB',
        bg: '#EFF6FF',
      },
      {
        title: 'Team Chat',
        desc: 'Direct & channel discussions',
        screen: 'Chat',
        icon: MessageSquare,
        color: '#10B981',
        bg: '#ECFDF5',
      },
      {
        title: 'Mailbox',
        desc: 'HR email announcements',
        screen: 'Email',
        icon: Mail,
        color: '#0284C7',
        bg: '#E0F2FE',
      },
      {
        title: 'Announcements',
        desc: 'Company-wide broadcasts',
        screen: 'Announcements',
        icon: Megaphone,
        color: '#F59E0B',
        bg: '#FFFBEB',
      },
      {
        title: 'Service Requests',
        desc: 'IT & HR tickets',
        screen: 'Requests',
        icon: HelpCircle,
        color: '#6366F1',
        bg: '#EEF2FF',
      },
      {
        title: 'Company Calendar',
        desc: 'Meetings & holidays',
        screen: 'Calendar',
        icon: Calendar,
        color: '#8B5CF6',
        bg: '#F5F3FF',
      },
    ],
  },
  {
    category: 'SaaS Platform & Settings',
    items: [
      {
        title: 'Super Admin Overview',
        desc: 'Platform health & MRR',
        screen: 'SaasDashboard',
        icon: Compass,
        color: '#2563EB',
        bg: '#EFF6FF',
        badge: 'SaaS',
      },
      {
        title: 'Organizations',
        desc: 'Tenant companies management',
        screen: 'SaasOrganizations',
        icon: Building2,
        color: '#4F46E5',
        bg: '#EEF2FF',
      },
      {
        title: 'Plans & Pricing',
        desc: 'Tier limits & packages',
        screen: 'SaasPlans',
        icon: Layers,
        color: '#059669',
        bg: '#ECFDF5',
      },
      {
        title: 'Billing & Invoices',
        desc: 'Stripe & subscription receipts',
        screen: 'SaasBilling',
        icon: CreditCard,
        color: '#D97706',
        bg: '#FFFBEB',
      },
      {
        title: 'Revenue Analytics',
        desc: 'ARR & growth trends',
        screen: 'SaasRevenue',
        icon: BarChart3,
        color: '#10B981',
        bg: '#ECFDF5',
      },
      {
        title: 'Workforce Reports',
        desc: 'Headcount & attrition reports',
        screen: 'Reports',
        icon: BarChart3,
        color: '#0284C7',
        bg: '#E0F2FE',
      },
      {
        title: 'Audit Logs',
        desc: 'Security event logs',
        screen: 'SaasAuditLogs',
        icon: ShieldCheck,
        color: '#64748B',
        bg: '#F1F5F9',
      },
      {
        title: 'Settings',
        desc: 'Profile, theme & preferences',
        screen: 'Settings',
        icon: Settings,
        color: '#475569',
        bg: '#F8FAFC',
      },
      {
        title: 'Help & Support',
        desc: 'FAQs & ticket submission',
        screen: 'HelpSupport',
        icon: HelpCircle,
        color: '#2563EB',
        bg: '#EFF6FF',
      },
    ],
  },
];

export const AllModulesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [search, setSearch] = useState('');

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return MASTER_MODULES;
    const query = search.toLowerCase();
    return MASTER_MODULES.map(cat => ({
      ...cat,
      items: cat.items.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query)
      ),
    })).filter(cat => cat.items.length > 0);
  }, [search]);

  const handleNavigate = (screenName: string) => {
    navigation.navigate(screenName as any);
  };

  return (
    <AppLayout
      title="All Modules"
      currentScreen="AllModules"
      onNavigate={handleNavigate}
    >
      <View style={styles.container}>
        {/* Header Intro */}
        <View style={styles.topInfo}>
          <Text style={[styles.mainHeading, { color: theme.text }]}>
            Master Modules Directory
          </Text>
          <Text style={[styles.mainSub, { color: theme.textSecondary }]}>
            Browse and jump into any of the 35+ mobile HRMS workflows directly.
          </Text>
        </View>

        {/* Search Bar */}
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search any module or screen..."
          leftIcon={<Search size={18} color={theme.textMuted} />}
          containerStyle={{ marginBottom: spacing.lg }}
        />

        {filteredCategories.map((cat, cIdx) => (
          <View key={cIdx} style={styles.categoryBlock}>
            <View style={styles.catHeader}>
              <View style={[styles.catPillDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.categoryTitle, { color: theme.text }]}>
                {cat.category}
              </Text>
              <Text style={[styles.catCount, { color: theme.textMuted }]}>
                ({cat.items.length})
              </Text>
            </View>

            <View style={styles.grid}>
              {cat.items.map((item, iIdx) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={iIdx}
                    onPress={() => handleNavigate(item.screen)}
                    style={[
                      styles.moduleCard,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                    activeOpacity={0.75}
                  >
                    <View style={[styles.iconWrapper, { backgroundColor: item.bg }]}>
                      <IconComponent size={22} color={item.color} />
                    </View>

                    <Text
                      style={[styles.moduleTitle, { color: theme.text }]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={[styles.moduleDesc, { color: theme.textSecondary }]}
                      numberOfLines={2}
                    >
                      {item.desc}
                    </Text>

                    {item.badge && (
                      <View style={[styles.badgePill, { backgroundColor: `${item.color}20` }]}>
                        <Text style={[styles.badgeText, { color: item.color }]}>
                          {item.badge}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  topInfo: {
    marginBottom: spacing.md,
  },
  mainHeading: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  mainSub: {
    fontSize: 13,
    lineHeight: 18,
  },
  categoryBlock: {
    marginBottom: spacing.xl,
  },
  catHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.md,
  },
  catPillDot: {
    width: 6,
    height: 14,
    borderRadius: 3,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  catCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  moduleCard: {
    width: '48.5%',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    minHeight: 125,
    justifyContent: 'space-between',
    position: 'relative',
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  moduleDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  badgePill: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
});
