import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Building,
  CreditCard,
  FileText,
  Shield,
} from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_EMPLOYEES } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Tabs, TabItem } from '../../components/ui/Tabs';
import { formatCurrency, formatDate } from '../../utils';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const EmployeeDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<any>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const employeeId = route.params?.employeeId || 'emp-1';
  const employee = INITIAL_EMPLOYEES.find(e => e.id === employeeId || e.employeeId === employeeId) || INITIAL_EMPLOYEES[0];

  const [activeTab, setActiveTab] = useState('overview');

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'salary', label: 'Salary & Compensation' },
    { id: 'bank', label: 'Bank & Emergency' },
  ];

  const handleNavigate = (screenName: string) => {
    navigation.navigate(screenName as any);
  };

  return (
    <AppLayout
      title="Employee Profile"
      currentScreen="EmployeeDetail"
      onNavigate={handleNavigate}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <ArrowLeft size={16} color={theme.text} />
          <Text style={[styles.backText, { color: theme.text }]}>Back to Directory</Text>
        </TouchableOpacity>

        {/* Profile Card Header */}
        <Card style={styles.profileHeaderCard}>
          <View style={styles.profileTopRow}>
            <Avatar uri={employee?.avatar} name={employee?.fullName} size={64} online />
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={[styles.empName, { color: theme.text }]}>
                  {employee?.fullName}
                </Text>
                <Badge label={employee?.status || 'Active'} status={employee?.status} />
              </View>
              <Text style={[styles.empRole, { color: colors.primary }]}>
                {employee?.designation}
              </Text>
              <Text style={[styles.empId, { color: theme.textSecondary }]}>
                ID: {employee?.employeeId} • {employee?.department}
              </Text>
            </View>
          </View>
        </Card>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <View style={styles.tabContent}>
            <Card>
              <Text style={[styles.cardSectionTitle, { color: theme.text }]}>
                Employment Information
              </Text>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Department</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.department}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Reporting Manager</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.managerName || 'Sarah Jenkins'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Employment Type</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.employmentType}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Work Setup</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.workLocation}</Text>
              </View>
              <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Joining Date</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{formatDate(employee?.joiningDate)}</Text>
              </View>
            </Card>

            <Card>
              <Text style={[styles.cardSectionTitle, { color: theme.text }]}>
                Contact & Personal
              </Text>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Work Email</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Personal Email</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.personalEmail}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Phone</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Location</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.officeLocation}</Text>
              </View>
              <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Blood Group</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.bloodGroup}</Text>
              </View>
            </Card>
          </View>
        )}

        {/* Tab 2: Salary & Compensation */}
        {activeTab === 'salary' && (
          <View style={styles.tabContent}>
            <Card>
              <Text style={[styles.cardSectionTitle, { color: theme.text }]}>
                Earnings Breakdown
              </Text>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Basic Salary</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>
                  {formatCurrency(employee?.salary?.basic || 50000)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>House Rent Allowance (HRA)</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>
                  {formatCurrency(employee?.salary?.hra || 20000)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Special Allowances</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>
                  {formatCurrency(employee?.salary?.allowances || 15000)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.primary, fontWeight: '700' }]}>Gross Total</Text>
                <Text style={[styles.infoVal, { color: colors.primary, fontWeight: '800' }]}>
                  {formatCurrency(employee?.salary?.gross || 85000)}
                </Text>
              </View>
              <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                <Text style={[styles.infoLabel, { color: colors.success, fontWeight: '700' }]}>Monthly Net Take-Home</Text>
                <Text style={[styles.infoVal, { color: colors.success, fontWeight: '800', fontSize: 16 }]}>
                  {formatCurrency(employee?.salary?.net || 76500)}
                </Text>
              </View>
            </Card>
          </View>
        )}

        {/* Tab 3: Bank Details */}
        {activeTab === 'bank' && (
          <View style={styles.tabContent}>
            <Card>
              <Text style={[styles.cardSectionTitle, { color: theme.text }]}>
                Disbursement Bank Account
              </Text>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Account Holder</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.bankDetails?.accountHolderName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Bank Name</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.bankDetails?.bankName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Account Number</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.bankDetails?.accountNumber}</Text>
              </View>
              <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>IFSC / Routing Code</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.bankDetails?.ifscCode}</Text>
              </View>
            </Card>

            <Card>
              <Text style={[styles.cardSectionTitle, { color: theme.text }]}>
                Emergency Contact
              </Text>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Contact Person</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.emergencyContact?.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Relationship</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.emergencyContact?.relationship}</Text>
              </View>
              <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Phone Number</Text>
                <Text style={[styles.infoVal, { color: theme.text }]}>{employee?.emergencyContact?.phone}</Text>
              </View>
            </Card>
          </View>
        )}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  backText: {
    fontSize: 13,
    fontWeight: '600',
  },
  profileHeaderCard: {
    marginBottom: spacing.md,
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empName: {
    fontSize: 18,
    fontWeight: '800',
  },
  empRole: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  empId: {
    fontSize: 11,
    marginTop: 2,
  },
  tabContent: {
    marginTop: spacing.xs,
  },
  cardSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  infoLabel: {
    fontSize: 12,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '600',
  },
});
