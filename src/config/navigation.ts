import {
  LayoutDashboard,
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
  User,
  FileQuestion,
  Megaphone,
} from 'lucide-react-native';
import { UserRole } from '../types';

export interface NavItem {
  title: string;
  screen: string;
  icon: any;
  badge?: string;
}

export interface NavSection {
  sectionTitle?: string;
  items: NavItem[];
}

export function getNavigationForRole(role: UserRole): NavSection[] {
  switch (role) {
    case 'saas_owner':
      return [
        {
          sectionTitle: 'PLATFORM MANAGEMENT',
          items: [
            { title: 'Super Admin Overview', screen: 'SaasDashboard', icon: LayoutDashboard },
            { title: 'Organizations', screen: 'SaasOrganizations', icon: Building2, badge: 'Active' },
            { title: 'Subscriptions', screen: 'SaasSubscriptions', icon: CreditCard },
            { title: 'Plans & Pricing', screen: 'SaasPlans', icon: Layers },
            { title: 'Billing & Invoices', screen: 'SaasBilling', icon: DollarSign },
            { title: 'Revenue Analytics', screen: 'SaasRevenue', icon: BarChart3 },
            { title: 'System Analytics', screen: 'SaasSystem', icon: Compass },
            { title: 'Audit Logs', screen: 'SaasAuditLogs', icon: ShieldCheck },
            { title: 'System Settings', screen: 'SaasSettings', icon: Settings },
          ]
        }
      ];

    case 'manager':
      return [
        {
          sectionTitle: 'MANAGEMENT',
          items: [
            { title: 'Team Dashboard', screen: 'Dashboard', icon: LayoutDashboard },
            { title: 'Team Members', screen: 'EmployeesList', icon: Users, badge: '14' },
            { title: 'Team Attendance', screen: 'Attendance', icon: Clock },
            { title: 'Clock In / Out', screen: 'ClockIn', icon: UserCheck },
            { title: 'Leave Approvals', screen: 'LeaveRequests', icon: CalendarDays, badge: '3' },
            { title: 'Team Performance', screen: 'Goals', icon: Target },
            { title: 'Expense Approvals', screen: 'Expenses', icon: Receipt },
            { title: 'Company Calendar', screen: 'Calendar', icon: Calendar },
            { title: 'Settings', screen: 'Settings', icon: Settings },
          ]
        }
      ];

    case 'recruiter':
      return [
        {
          sectionTitle: 'TALENT ACQUISITION',
          items: [
            { title: 'ATS Dashboard', screen: 'Dashboard', icon: LayoutDashboard },
            { title: 'Job Openings', screen: 'JobOpenings', icon: Briefcase, badge: '4' },
            { title: 'Candidates Kanban', screen: 'CandidatesPipeline', icon: Users },
            { title: 'Interviews Schedule', screen: 'Interviews', icon: Calendar },
            { title: 'Talent Reports', screen: 'Reports', icon: BarChart3 },
            { title: 'Clock In / Out', screen: 'ClockIn', icon: Clock },
          ]
        }
      ];

    case 'payroll_admin':
      return [
        {
          sectionTitle: 'FINANCE & PAYROLL',
          items: [
            { title: 'Payroll Dashboard', screen: 'Dashboard', icon: LayoutDashboard },
            { title: 'Process Payroll', screen: 'PayrollDashboard', icon: DollarSign },
            { title: 'Salary Structures', screen: 'SalaryStructure', icon: CreditCard },
            { title: 'Employee Payslips', screen: 'Payslips', icon: FileSpreadsheet },
            { title: 'Expenses & Claims', screen: 'Expenses', icon: Receipt },
            { title: 'Payroll Reports', screen: 'Reports', icon: BarChart3 },
            { title: 'Clock In / Out', screen: 'ClockIn', icon: Clock },
            { title: 'Settings', screen: 'Settings', icon: Settings },
          ]
        }
      ];

    case 'employee':
      return [
        {
          sectionTitle: 'WORK',
          items: [
            { title: 'Dashboard', screen: 'Dashboard', icon: LayoutDashboard },
            { title: 'Tasks', screen: 'Tasks', icon: ListTodo, badge: '4' },
            { title: 'Timesheet', screen: 'Timesheets', icon: Clock },
            { title: 'Calendar', screen: 'Calendar', icon: CalendarDays },
          ]
        },
        {
          sectionTitle: 'PEOPLE',
          items: [
            { title: 'Profile', screen: 'EmployeeDetail', icon: User },
            { title: 'Chat', screen: 'Chat', icon: MessageSquare, badge: '3' },
            { title: 'Email', screen: 'Email', icon: Mail, badge: 'New' },
          ]
        },
        {
          sectionTitle: 'HR',
          items: [
            { title: 'Attendance', screen: 'Attendance', icon: UserCheck },
            { title: 'Leave', screen: 'LeaveManagement', icon: CalendarDays },
            { title: 'Documents', screen: 'Documents', icon: FileText },
            { title: 'Assets', screen: 'Assets', icon: Package },
          ]
        },
        {
          sectionTitle: 'COMPANY',
          items: [
            { title: 'Announcements', screen: 'Announcements', icon: Megaphone },
            { title: 'Holidays', screen: 'Holidays', icon: Calendar },
            { title: 'Requests', screen: 'Requests', icon: FileQuestion },
          ]
        },
        {
          sectionTitle: 'SUPPORT',
          items: [
            { title: 'Help & Support', screen: 'HelpSupport', icon: HelpCircle },
          ]
        }
      ];

    case 'hr_admin':
    case 'org_admin':
    case 'org_owner':
    case 'hr_executive':
    default:
      return [
        {
          sectionTitle: 'MAIN',
          items: [
            { title: 'Dashboard', screen: 'Dashboard', icon: LayoutDashboard },
            { title: 'Analytics', screen: 'Reports', icon: BarChart3 },
          ]
        },
        {
          sectionTitle: 'PEOPLE',
          items: [
            { title: 'Employees', screen: 'EmployeesList', icon: Users, badge: '248' },
            { title: 'Departments', screen: 'Departments', icon: Building2 },
            { title: 'Designations', screen: 'Designations', icon: Award },
            { title: 'Teams', screen: 'Teams', icon: Users },
            { title: 'Organization Structure', screen: 'OrgStructure', icon: Layers },
          ]
        },
        {
          sectionTitle: 'ATTENDANCE',
          items: [
            { title: 'Attendance', screen: 'Attendance', icon: Clock },
            { title: 'Timesheets', screen: 'Timesheets', icon: UserCheck },
            { title: 'Shifts', screen: 'ShiftSchedule', icon: Sparkles },
            { title: 'Clock In / Out', screen: 'ClockIn', icon: Clock, badge: 'Live' },
          ]
        },
        {
          sectionTitle: 'LEAVE',
          items: [
            { title: 'Leave Management', screen: 'LeaveManagement', icon: CalendarDays, badge: '12' },
            { title: 'Leave Requests', screen: 'LeaveRequests', icon: FileSpreadsheet },
            { title: 'Leave Balance', screen: 'LeaveBalance', icon: ShieldCheck },
            { title: 'Holidays', screen: 'Holidays', icon: Calendar },
          ]
        },
        {
          sectionTitle: 'PAYROLL',
          items: [
            { title: 'Payroll Dashboard', screen: 'PayrollDashboard', icon: DollarSign },
            { title: 'Salary Structure', screen: 'SalaryStructure', icon: CreditCard },
            { title: 'Payslips', screen: 'Payslips', icon: FileSpreadsheet },
            { title: 'Adjustments & Claims', screen: 'PayrollAdjustments', icon: Receipt },
          ]
        },
        {
          sectionTitle: 'RECRUITMENT',
          items: [
            { title: 'Job Openings', screen: 'JobOpenings', icon: Briefcase, badge: '5' },
            { title: 'Candidates', screen: 'CandidatesPipeline', icon: Users },
            { title: 'Interviews', screen: 'Interviews', icon: Calendar },
          ]
        },
        {
          sectionTitle: 'PERFORMANCE',
          items: [
            { title: 'Goals & OKRs', screen: 'Goals', icon: Target },
            { title: 'Performance Reviews', screen: 'PerformanceReviews', icon: BarChart3 },
          ]
        },
        {
          sectionTitle: 'OPERATIONS',
          items: [
            { title: 'Expenses', screen: 'Expenses', icon: Receipt },
            { title: 'Assets', screen: 'Assets', icon: Package },
            { title: 'Documents', screen: 'Documents', icon: FileText },
            { title: 'Training', screen: 'Training', icon: GraduationCap },
          ]
        },
        {
          sectionTitle: 'REPORTS',
          items: [
            { title: 'Reports & Analytics', screen: 'Reports', icon: BarChart3 },
          ]
        },
        {
          sectionTitle: 'SETTINGS',
          items: [
            { title: 'Roles & Permissions', screen: 'Settings', icon: Settings },
          ]
        }
      ];
  }
}
