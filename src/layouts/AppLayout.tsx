import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { CommandPalette } from './components/CommandPalette';
import { BottomNavBar } from './components/BottomNavBar';
import { RoleSwitcherModal } from '../components/common/RoleSwitcherModal';
import { useAppStore } from '../store/useAppStore';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';

interface AppLayoutProps {
  title?: string;
  children: React.ReactNode;
  currentScreen?: string;
  onNavigate: (screenName: string) => void;
  scrollable?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  children,
  currentScreen,
  onNavigate,
  scrollable = true,
}) => {
  const { isDarkMode, isClockedIn, tickClockTimer } = useAppStore();
  const theme = isDarkMode ? colors.dark : colors.light;

  useEffect(() => {
    let interval: any = null;
    if (isClockedIn) {
      interval = setInterval(() => {
        tickClockTimer();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClockedIn, tickClockTimer]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <Header
        title={title}
        currentScreen={currentScreen}
        onBack={() => onNavigate('Dashboard')}
      />

      {/* Main Body */}
      {scrollable ? (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.flexContainer}>{children}</View>
      )}

      {/* Persistent Bottom Tab Navigation Bar */}
      <BottomNavBar currentScreen={currentScreen} onNavigate={onNavigate} />

      {/* Global Modals and Slide-Over Drawers */}
      <Sidebar currentScreen={currentScreen} onNavigate={onNavigate} />
      <NotificationsDrawer />
      <CommandPalette onNavigate={onNavigate} />
      <RoleSwitcherModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  flexContainer: {
    flex: 1,
    padding: spacing.md,
  },
});
