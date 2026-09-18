import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Shield, Check, X } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { UserRole } from '../../types';

interface RoleOption {
  role: UserRole;
  title: string;
  desc: string;
}

const ROLES_LIST: RoleOption[] = [
  { role: 'saas_owner', title: 'SaaS Platform Owner', desc: 'Manage tenants, MRR, subscriptions' },
  { role: 'org_admin', title: 'Organization Admin', desc: 'Full tenant admin capabilities' },
  { role: 'hr_admin', title: 'HR Admin', desc: 'Complete HR suite & employee records' },
  { role: 'hr_executive', title: 'HR Executive', desc: 'Daily attendance, leaves & onboarding' },
  { role: 'recruiter', title: 'Talent Recruiter', desc: 'ATS pipeline & interview scheduling' },
  { role: 'payroll_admin', title: 'Payroll Admin', desc: 'Salary batches & tax compliance' },
  { role: 'manager', title: 'Engineering Manager', desc: 'Team approvals & performance reviews' },
  { role: 'employee', title: 'Employee Self-Service', desc: 'Clock-in, leaves, payslips & assets' },
];

export const RoleSwitcherModal: React.FC = () => {
  const {
    roleSwitcherOpen,
    setRoleSwitcherOpen,
    currentRole,
    switchRole,
    isDarkMode,
  } = useAppStore();

  const theme = isDarkMode ? colors.dark : colors.light;

  const handleSelect = async (role: UserRole) => {
    await switchRole(role);
    setRoleSwitcherOpen(false);
  };

  return (
    <Modal
      visible={roleSwitcherOpen}
      transparent
      animationType="slide"
      onRequestClose={() => setRoleSwitcherOpen(false)}
    >
      <View style={[styles.backdrop, { backgroundColor: theme.backdrop }]}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={[styles.iconPill, { backgroundColor: `${colors.primary}15` }]}>
                <Shield size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.title, { color: theme.text }]}>
                  Switch Role Persona
                </Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                  Instantly preview access and UI views
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setRoleSwitcherOpen(false)}
              style={[styles.closeBtn, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}
            >
              <X size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Role Options */}
          <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
            {ROLES_LIST.map(item => {
              const isSelected = item.role === currentRole;
              return (
                <TouchableOpacity
                  key={item.role}
                  onPress={() => handleSelect(item.role)}
                  style={[
                    styles.roleItem,
                    {
                      borderColor: isSelected ? colors.primary : theme.border,
                      backgroundColor: isSelected
                        ? isDarkMode
                          ? 'rgba(37, 99, 235, 0.15)'
                          : '#EFF6FF'
                        : theme.surface,
                    },
                  ]}
                >
                  <View style={styles.roleInfo}>
                    <Text
                      style={[
                        styles.roleTitle,
                        {
                          color: isSelected ? colors.primary : theme.text,
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.roleDesc,
                        { color: theme.textSecondary },
                      ]}
                    >
                      {item.desc}
                    </Text>
                  </View>

                  {isSelected && (
                    <View style={styles.checkPill}>
                      <Check size={16} color={colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    maxHeight: '80%',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconPill: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollList: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    marginBottom: spacing.sm,
  },
  roleInfo: {
    flex: 1,
    paddingRight: 10,
  },
  roleTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  roleDesc: {
    fontSize: 12,
  },
  checkPill: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
