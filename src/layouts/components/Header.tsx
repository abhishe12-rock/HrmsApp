import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  Menu,
  ArrowLeft,
} from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

interface HeaderProps {
  title?: string;
  currentScreen?: string;
  onBack?: () => void;
  onSearchPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  currentScreen,
  onBack,
}) => {
  const {
    isDarkMode,
    setMobileMenuOpen,
    isClockedIn,
    secondsElapsed,
  } = useAppStore();

  const theme = isDarkMode ? colors.dark : colors.light;

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.surface }]}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.surface,
            borderBottomColor: theme.border,
          },
        ]}
      >
        {/* Left Section: Back + Brand */}
        <View style={styles.leftSection}>
          {currentScreen && currentScreen !== 'Dashboard' && (
            <TouchableOpacity
              onPress={onBack}
              style={[styles.iconButton, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ArrowLeft size={18} color={theme.text} />
            </TouchableOpacity>
          )}

          <View style={styles.brandContainer}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoSymbol}>◆</Text>
            </View>
            <Text style={[styles.brandTitle, { color: theme.text }]} numberOfLines={1}>
              HRM
            </Text>
          </View>
        </View>

        {/* Right Section: Timer (if active) + 3-lines Menu */}
        <View style={styles.rightSection}>
          {/* Working Timer pill if Clocked in */}
          {isClockedIn && (
            <View style={styles.clockPill}>
              <View style={styles.liveDot} />
              <Text style={styles.clockText}>{formatTimer(secondsElapsed)}</Text>
            </View>
          )}

          {/* 3 lines Menu (Hamburger) on the Right side */}
          <TouchableOpacity
            onPress={() => setMobileMenuOpen(true)}
            style={[styles.iconButton, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Menu size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: 130,
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSymbol: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clockPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  clockText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});
