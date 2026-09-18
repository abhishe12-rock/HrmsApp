import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  iconColor?: string;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  iconColor = colors.primary,
  subtitle,
}) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: theme.textSecondary }]}>{title}</Text>
        {icon && (
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: `${iconColor}15` },
            ]}
          >
            {icon}
          </View>
        )}
      </View>

      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>

      {(change || subtitle) && (
        <View style={styles.bottomRow}>
          {change && (
            <View style={styles.trendRow}>
              {isPositive ? (
                <TrendingUp size={13} color={colors.success} />
              ) : (
                <TrendingDown size={13} color={colors.danger} />
              )}
              <Text
                style={[
                  styles.changeText,
                  { color: isPositive ? colors.success : colors.danger },
                ]}
              >
                {change}
              </Text>
            </View>
          )}
          {subtitle && (
            <Text style={[styles.subtitle, { color: theme.textMuted }]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    flex: 1,
    minWidth: 140,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
  },
});
