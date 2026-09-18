import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
  SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, X, ChevronRight, Building, Grid, Layers, Sparkles, Shield } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { getNavigationForRole } from '../../config/navigation';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { Avatar } from '../../components/ui/Avatar';

interface SidebarProps {
  currentScreen?: string;
  onNavigate: (screenName: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    currentRole,
    switchRole,
    currentUser,
    currentOrg,
    isDarkMode,
    logout,
  } = useAppStore();

  const [showAllModules, setShowAllModules] = useState(false);
  const theme = isDarkMode ? colors.dark : colors.light;

  const navSections = showAllModules
    ? [...getNavigationForRole('hr_admin'), ...getNavigationForRole('saas_owner')]
    : getNavigationForRole(currentRole);

  const handleSelectScreen = (screenName: string) => {
    setMobileMenuOpen(false);
    onNavigate(screenName);
  };

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
    onNavigate('Login');
  };

  return (
    <Modal
      visible={mobileMenuOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setMobileMenuOpen(false)}
    >
      <View style={[styles.overlay, { backgroundColor: theme.backdrop }]}>
        {/* Backdrop dismiss touchable on left */}
        <TouchableOpacity
          style={styles.backdropTouch}
          activeOpacity={1}
          onPress={() => setMobileMenuOpen(false)}
        />

        {/* Drawer container on right */}
        <SafeAreaView
          edges={['top', 'bottom', 'right']}
          style={[styles.drawerContainer, { backgroundColor: theme.surface }]}
        >
          {/* Drawer Top Bar */}
          <View style={[styles.drawerHeader, { borderBottomColor: theme.border }]}>
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoSymbol}>◆</Text>
              </View>
              <View>
                <Text style={[styles.brandTitle, { color: theme.text }]}>HRM</Text>
                <View style={styles.orgRow}>
                  <Building size={11} color={theme.textMuted} />
                  <Text style={[styles.orgName, { color: theme.textSecondary }]}>
                    {currentRole === 'saas_owner' ? 'Global Platform' : currentOrg?.name || 'Enterprise'}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setMobileMenuOpen(false)}
              style={[styles.closeBtn, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}
            >
              <X size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* User Profile Card */}
          <View style={[styles.userCard, { backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC' }]}>
            <Avatar uri={currentUser?.avatar} name={currentUser?.name} size={42} online />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: theme.text }]}>
                {currentUser?.name || 'HR Admin'}
              </Text>
              <Text style={[styles.userRole, { color: colors.primary }]}>
                {currentUser?.designation || currentRole}
              </Text>
            </View>
          </View>



          {/* Quick Persona Switcher Chips */}
          <View style={styles.personaBar}>
            <Text style={[styles.personaBarLabel, { color: theme.textMuted }]}>SWITCH PERSONA:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.personaChipsScroll}>
              {[
                { role: 'hr_admin', label: 'HR Admin' },
                { role: 'employee', label: 'Employee' },
                { role: 'manager', label: 'Manager' },
                { role: 'payroll_admin', label: 'Payroll' },
                { role: 'recruiter', label: 'Recruiter' },
                { role: 'saas_owner', label: 'SaaS Owner' },
              ].map(r => {
                const isSelected = currentRole === r.role;
                return (
                  <TouchableOpacity
                    key={r.role}
                    onPress={async () => {
                      await switchRole(r.role as any);
                    }}
                    style={[
                      styles.personaChip,
                      isSelected && { backgroundColor: colors.primary },
                      !isSelected && { backgroundColor: isDarkMode ? '#1E293B' : '#E2E8F0' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.personaChipText,
                        isSelected ? { color: '#FFF', fontWeight: '700' } : { color: theme.textSecondary },
                      ]}
                    >
                      {r.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* All Screens Toggle */}
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleText, { color: theme.textSecondary }]}>
              {showAllModules ? 'Showing All 35+ Screens' : 'Showing Current Role Screens'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowAllModules(!showAllModules)}
              style={[
                styles.toggleBtn,
                { backgroundColor: showAllModules ? colors.primary : (isDarkMode ? '#334155' : '#CBD5E1') },
              ]}
            >
              <Text style={[styles.toggleBtnText, { color: showAllModules ? '#FFF' : theme.text }]}>
                {showAllModules ? 'Role View' : 'Show All'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nav Sections */}
          <SectionList
            style={styles.navScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: spacing.xxl }}
            sections={navSections.map(s => ({ title: s.sectionTitle, data: s.items }))}
            keyExtractor={(item, index) => item.screen + index}
            renderSectionHeader={({ section: { title } }) => 
              title ? (
                <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
                  {title}
                </Text>
              ) : null
            }
            renderItem={({ item }) => {
              const IconComponent = item.icon;
              const isActive = currentScreen === item.screen;
              return (
                <TouchableOpacity
                  onPress={() => handleSelectScreen(item.screen)}
                  style={[
                    styles.navItem,
                    isActive && {
                      backgroundColor: isDarkMode ? 'rgba(37,99,235,0.2)' : '#EFF6FF',
                    },
                  ]}
                >
                  <View style={styles.navItemLeft}>
                    {isActive && <View style={styles.activePill} />}
                    <IconComponent
                      size={18}
                      color={isActive ? colors.primary : theme.textSecondary}
                    />
                    <Text
                      style={[
                        styles.navItemText,
                        {
                          color: isActive ? colors.primary : theme.text,
                          fontWeight: isActive ? '700' : '500',
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </View>

                  {item.badge ? (
                    <View style={styles.itemBadge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  ) : (
                    <ChevronRight size={14} color={theme.textMuted} />
                  )}
                </TouchableOpacity>
              );
            }}
          />

          {/* Bottom Drawer Footer: Logout */}
          <View style={[styles.drawerFooter, { borderTopColor: theme.border }]}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
              <LogOut size={16} color={colors.danger} />
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdropTouch: {
    flex: 1,
  },
  drawerContainer: {
    width: '80%',
    maxWidth: 320,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSymbol: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  brandTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  orgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orgName: {
    fontSize: 11,
    fontWeight: '500',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: borderRadius.xl,
    gap: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
  },
  userRole: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  navScroll: {
    flex: 1,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  sectionGroup: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.sm,
    marginBottom: 6,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: 2,
    position: 'relative',
  },
  navItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  activePill: {
    position: 'absolute',
    left: -spacing.md,
    top: 6,
    bottom: 6,
    width: 4,
    backgroundColor: colors.primary,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  navItemText: {
    fontSize: 13,
  },
  itemBadge: {
    backgroundColor: `${colors.primary}20`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  drawerFooter: {
    padding: spacing.md,
    borderTopWidth: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.danger,
  },
  allModulesBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    gap: 10,
  },
  allModulesIconBox: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allModulesTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  allModulesSub: {
    fontSize: 10,
    marginTop: 1,
  },
  personaBar: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  personaBarLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  personaChipsScroll: {
    gap: 6,
    paddingBottom: 2,
  },
  personaChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  personaChipText: {
    fontSize: 11,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '600',
  },
  toggleBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  toggleBtnText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
