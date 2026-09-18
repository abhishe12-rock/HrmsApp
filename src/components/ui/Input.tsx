import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  containerStyle,
  isPassword = false,
  style,
  ...props
}) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.inputBg,
            borderColor: error ? colors.danger : theme.border,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIconWrapper}>{leftIcon}</View>}
        <TextInput
          placeholderTextColor={theme.textMuted}
          secureTextEntry={isPassword && !showPassword}
          style={[
            styles.input,
            { color: theme.text },
            style,
          ]}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}
          >
            {showPassword ? (
              <EyeOff size={18} color={theme.textMuted} />
            ) : (
              <Eye size={18} color={theme.textMuted} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  leftIconWrapper: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  eyeBtn: {
    padding: 6,
  },
  errorText: {
    fontSize: 11,
    color: colors.danger,
    marginTop: 4,
    fontWeight: '500',
  },
});
