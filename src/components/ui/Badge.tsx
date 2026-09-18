import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { getStatusColors } from '../../utils';
import { borderRadius } from '../../theme/spacing';

interface BadgeProps {
  label: string;
  variant?: 'status' | 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  status?: string;
  style?: StyleProp<ViewStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'status',
  status,
  style,
}) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const colorScheme = getStatusColors(status || label, isDarkMode);

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colorScheme.bg,
          borderColor: colorScheme.border,
        },
        style,
      ]}
    >
      <Text style={[styles.badgeText, { color: colorScheme.text }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
