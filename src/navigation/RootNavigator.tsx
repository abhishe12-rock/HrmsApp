import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Public & Landing
import { LandingScreen } from '../screens/landing/LandingScreen';

// Auth Screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { TwoFactorScreen } from '../screens/auth/TwoFactorScreen';

// Core Dashboard
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { AllModulesScreen } from '../screens/dashboard/AllModulesScreen';

// Employees
import { EmployeesListScreen } from '../screens/employees/EmployeesListScreen';
import { EmployeeDetailScreen } from '../screens/employees/EmployeeDetailScreen';
import { DepartmentsScreen } from '../screens/employees/DepartmentsScreen';
import { DesignationsScreen } from '../screens/employees/DesignationsScreen';
import { TeamsScreen } from '../screens/employees/TeamsScreen';
import { OrgStructureScreen } from '../screens/employees/OrgStructureScreen';

// Attendance
import { AttendanceScreen } from '../screens/attendance/AttendanceScreen';
import { ClockInScreen } from '../screens/attendance/ClockInScreen';
import { ShiftScheduleScreen } from '../screens/attendance/ShiftScheduleScreen';
import { TimesheetsScreen } from '../screens/attendance/TimesheetsScreen';

// Leave
import { LeaveManagementScreen } from '../screens/leave/LeaveManagementScreen';
import { LeaveRequestsScreen } from '../screens/leave/LeaveRequestsScreen';
import { LeaveBalanceScreen } from '../screens/leave/LeaveBalanceScreen';
import { HolidaysScreen } from '../screens/leave/HolidaysScreen';

// Payroll
import { PayrollDashboardScreen } from '../screens/payroll/PayrollDashboardScreen';
import { SalaryStructureScreen } from '../screens/payroll/SalaryStructureScreen';
import { PayslipsScreen } from '../screens/payroll/PayslipsScreen';
import { PayrollAdjustmentsScreen } from '../screens/payroll/PayrollAdjustmentsScreen';

// Recruitment
import { JobOpeningsScreen } from '../screens/recruitment/JobOpeningsScreen';
import { CandidatesPipelineScreen } from '../screens/recruitment/CandidatesPipelineScreen';
import { InterviewsScreen } from '../screens/recruitment/InterviewsScreen';

// Performance
import { GoalsScreen } from '../screens/performance/GoalsScreen';
import { PerformanceReviewsScreen } from '../screens/performance/PerformanceReviewsScreen';

// Operations
import { ExpensesScreen } from '../screens/operations/ExpensesScreen';
import { AssetsScreen } from '../screens/operations/AssetsScreen';
import { DocumentsScreen } from '../screens/operations/DocumentsScreen';
import { TrainingScreen } from '../screens/operations/TrainingScreen';

// Communication
import { TasksScreen } from '../screens/communication/TasksScreen';
import { ChatScreen } from '../screens/communication/ChatScreen';
import { EmailScreen } from '../screens/communication/EmailScreen';
import { RequestsScreen } from '../screens/communication/RequestsScreen';
import { AnnouncementsScreen } from '../screens/communication/AnnouncementsScreen';

// Calendar, Reports, Settings, Support
import { CalendarScreen } from '../screens/calendar/CalendarScreen';
import { ReportsScreen } from '../screens/reports/ReportsScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { NotificationsScreen } from '../screens/settings/NotificationsScreen';
import { HelpSupportScreen } from '../screens/support/HelpSupportScreen';

// SaaS
import { SaasDashboardScreen } from '../screens/saas/SaasDashboardScreen';
import { SaasOrganizationsScreen } from '../screens/saas/SaasOrganizationsScreen';
import { SaasSubscriptionsScreen } from '../screens/saas/SaasSubscriptionsScreen';
import { SaasPlansScreen } from '../screens/saas/SaasPlansScreen';
import { SaasBillingScreen } from '../screens/saas/SaasBillingScreen';
import { SaasRevenueScreen } from '../screens/saas/SaasRevenueScreen';
import { SaasSystemScreen } from '../screens/saas/SaasSystemScreen';
import { SaasAuditLogsScreen } from '../screens/saas/SaasAuditLogsScreen';
import { SaasSettingsScreen } from '../screens/saas/SaasSettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {/* Public & Landing */}
      <Stack.Screen name="Landing" component={LandingScreen} />

      {/* Auth */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="TwoFactor" component={TwoFactorScreen} />

      {/* Core */}
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="AllModules" component={AllModulesScreen} />

      {/* Employees */}
      <Stack.Screen name="EmployeesList" component={EmployeesListScreen} />
      <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
      <Stack.Screen name="Departments" component={DepartmentsScreen} />
      <Stack.Screen name="Designations" component={DesignationsScreen} />
      <Stack.Screen name="Teams" component={TeamsScreen} />
      <Stack.Screen name="OrgStructure" component={OrgStructureScreen} />

      {/* Attendance */}
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="ClockIn" component={ClockInScreen} />
      <Stack.Screen name="ShiftSchedule" component={ShiftScheduleScreen} />
      <Stack.Screen name="Timesheets" component={TimesheetsScreen} />

      {/* Leave */}
      <Stack.Screen name="LeaveManagement" component={LeaveManagementScreen} />
      <Stack.Screen name="LeaveRequests" component={LeaveRequestsScreen} />
      <Stack.Screen name="LeaveBalance" component={LeaveBalanceScreen} />
      <Stack.Screen name="Holidays" component={HolidaysScreen} />

      {/* Payroll */}
      <Stack.Screen name="PayrollDashboard" component={PayrollDashboardScreen} />
      <Stack.Screen name="SalaryStructure" component={SalaryStructureScreen} />
      <Stack.Screen name="Payslips" component={PayslipsScreen} />
      <Stack.Screen name="PayrollAdjustments" component={PayrollAdjustmentsScreen} />

      {/* Recruitment */}
      <Stack.Screen name="JobOpenings" component={JobOpeningsScreen} />
      <Stack.Screen name="CandidatesPipeline" component={CandidatesPipelineScreen} />
      <Stack.Screen name="Interviews" component={InterviewsScreen} />

      {/* Performance */}
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="PerformanceReviews" component={PerformanceReviewsScreen} />

      {/* Operations */}
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
      <Stack.Screen name="Assets" component={AssetsScreen} />
      <Stack.Screen name="Documents" component={DocumentsScreen} />
      <Stack.Screen name="Training" component={TrainingScreen} />

      {/* Communication */}
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Requests" component={RequestsScreen} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />

      {/* Calendar, Reports, Settings */}
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />

      {/* SaaS */}
      <Stack.Screen name="SaasDashboard" component={SaasDashboardScreen} />
      <Stack.Screen name="SaasOrganizations" component={SaasOrganizationsScreen} />
      <Stack.Screen name="SaasSubscriptions" component={SaasSubscriptionsScreen} />
      <Stack.Screen name="SaasPlans" component={SaasPlansScreen} />
      <Stack.Screen name="SaasBilling" component={SaasBillingScreen} />
      <Stack.Screen name="SaasRevenue" component={SaasRevenueScreen} />
      <Stack.Screen name="SaasSystem" component={SaasSystemScreen} />
      <Stack.Screen name="SaasAuditLogs" component={SaasAuditLogsScreen} />
      <Stack.Screen name="SaasSettings" component={SaasSettingsScreen} />
    </Stack.Navigator>
  );
};
