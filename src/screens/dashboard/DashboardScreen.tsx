import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { EmployeeDashboardView } from './views/EmployeeDashboardView';
import { HrAdminDashboardView } from './views/HrAdminDashboardView';
import { ManagerDashboardView } from './views/ManagerDashboardView';
import { PayrollAdminDashboardView } from './views/PayrollAdminDashboardView';
import { RecruiterDashboardView } from './views/RecruiterDashboardView';
import { SaasOwnerDashboardView } from './views/SaasOwnerDashboardView';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const currentRole = useAppStore(state => state.currentRole);

  const handleNavigate = (screenName: string) => {
    navigation.navigate(screenName as any);
  };

  const renderRoleDashboard = () => {
    switch (currentRole) {
      case 'saas_owner':
        return <SaasOwnerDashboardView onNavigate={handleNavigate} />;
      case 'manager':
        return <ManagerDashboardView onNavigate={handleNavigate} />;
      case 'payroll_admin':
        return <PayrollAdminDashboardView onNavigate={handleNavigate} />;
      case 'recruiter':
        return <RecruiterDashboardView onNavigate={handleNavigate} />;
      case 'employee':
        return <EmployeeDashboardView onNavigate={handleNavigate} />;
      case 'hr_admin':
      case 'org_admin':
      case 'org_owner':
      case 'hr_executive':
      default:
        return <HrAdminDashboardView onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppLayout
      title="Dashboard"
      currentScreen="Dashboard"
      onNavigate={handleNavigate}
    >
      <View style={styles.content}>
        {renderRoleDashboard()}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
});
