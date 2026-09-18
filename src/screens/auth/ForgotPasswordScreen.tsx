import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Mail, ArrowLeft, Send } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <ArrowLeft size={18} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>Reset Password</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Enter your registered work email to receive password recovery instructions.
        </Text>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          {sent ? (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>Recovery Link Sent!</Text>
              <Text style={[styles.successDesc, { color: theme.textSecondary }]}>
                Please check your inbox for instructions to reset your password.
              </Text>
              <Button
                title="Back to Sign In"
                onPress={() => navigation.navigate('Login')}
                fullWidth
                style={{ marginTop: spacing.md }}
              />
            </View>
          ) : (
            <>
              <Input
                label="Registered Work Email"
                value={email}
                onChangeText={setEmail}
                placeholder="name@company.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Mail size={18} color={theme.textMuted} />}
              />
              <Button
                title="Send Recovery Link"
                onPress={() => setSent(true)}
                icon={<Send size={16} color="#FFF" />}
                fullWidth
                style={{ marginTop: spacing.sm }}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: spacing.xl,
    lineHeight: 18,
  },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.lg,
  },
  successBox: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.success,
    marginBottom: 6,
  },
  successDesc: {
    fontSize: 13,
    textAlign: 'center',
  },
});
