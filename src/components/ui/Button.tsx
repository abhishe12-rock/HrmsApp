import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const getVariantStyles = (): { btn: ViewStyle; txt: TextStyle } => {
    switch (variant) {
      case 'secondary':
        return {
          btn: {
            backgroundColor: isDarkMode ? theme.surfaceSecondary : '#F1F5F9',
            borderWidth: 1,
            borderColor: theme.border,
          },
          txt: { color: theme.text },
        };
      case 'outline':
        return {
          btn: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: theme.border,
          },
          txt: { color: theme.text },
        };
      case 'ghost':
        return {
          btn: {
            backgroundColor: 'transparent',
          },
          txt: { color: theme.textSecondary },
        };
      case 'danger':
        return {
          btn: {
            backgroundColor: colors.danger,
          },
          txt: { color: '#FFFFFF' },
        };
      case 'success':
        return {
          btn: {
            backgroundColor: colors.success,
          },
          txt: { color: '#FFFFFF' },
        };
      case 'primary':
      default:
        return {
          btn: {
            backgroundColor: colors.primary,
          },
          txt: { color: '#FFFFFF' },
        };
    }
  };

  const getSizeStyles = (): { btn: ViewStyle; txt: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          btn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: borderRadius.md },
          txt: { fontSize: 12, fontWeight: '600' },
        };
      case 'lg':
        return {
          btn: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: borderRadius.xl },
          txt: { fontSize: 16, fontWeight: '700' },
        };
      case 'md':
      default:
        return {
          btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: borderRadius.lg },
          txt: { fontSize: 14, fontWeight: '600' },
        };
    }
  };

  const vStyle = getVariantStyles();
  const sStyle = getSizeStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.baseButton,
        vStyle.btn,
        sStyle.btn,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={vStyle.txt.color || '#FFFFFF'}
        />
      ) : (
        <>
          {icon}
          <Text style={[styles.baseText, vStyle.txt, sStyle.txt, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  baseText: {
    letterSpacing: -0.2,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
