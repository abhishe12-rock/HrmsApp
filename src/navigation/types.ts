export type RootStackParamList = {
  // Public & Landing
  Landing: undefined;

  // Auth
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  TwoFactor: undefined;

  // Dashboard
  Dashboard: undefined;
  AllModules: undefined;

  // Employees
  EmployeesList: undefined;
  EmployeeDetail: { employeeId?: string } | undefined;
  Departments: undefined;
  Designations: undefined;
  Teams: undefined;
  OrgStructure: undefined;

  // Attendance
  Attendance: undefined;
  ClockIn: undefined;
  ShiftSchedule: undefined;
  Timesheets: undefined;

  // Leave
  LeaveManagement: undefined;
  LeaveRequests: undefined;
  LeaveBalance: undefined;
  Holidays: undefined;

  // Payroll
  PayrollDashboard: undefined;
  SalaryStructure: undefined;
  Payslips: undefined;
  PayrollAdjustments: undefined;

  // Recruitment
  JobOpenings: undefined;
  CandidatesPipeline: undefined;
  Interviews: undefined;

  // Performance
  Goals: undefined;
  PerformanceReviews: undefined;

  // Operations
  Expenses: undefined;
  Assets: undefined;
  Documents: undefined;
  Training: undefined;

  // Communication
  Tasks: undefined;
  Chat: undefined;
  Email: undefined;
  Requests: undefined;
  Announcements: undefined;

  // Calendar & Reports
  Calendar: undefined;
  Reports: undefined;

  // Settings & Support
  Settings: undefined;
  Notifications: undefined;
  HelpSupport: undefined;

  // SaaS
  SaasDashboard: undefined;
  SaasOrganizations: undefined;
  SaasSubscriptions: undefined;
  SaasPlans: undefined;
  SaasBilling: undefined;
  SaasRevenue: undefined;
  SaasSystem: undefined;
  SaasAuditLogs: undefined;
  SaasSettings: undefined;
};
