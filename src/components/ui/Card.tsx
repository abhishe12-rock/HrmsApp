import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, noPadding = false }) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          padding: noPadding ? 0 : spacing.lg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: spacing.md,
  },
});
