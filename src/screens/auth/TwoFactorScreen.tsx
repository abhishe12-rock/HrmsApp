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
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TwoFactorScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [otp, setOtp] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <ArrowLeft size={18} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.centerIcon}>
          <View style={[styles.iconCircle, { backgroundColor: `${colors.primary}15` }]}>
            <ShieldCheck size={36} color={colors.primary} />
          </View>
        </View>

        <Text style={[styles.title, { color: theme.text }]}>2-Factor Authentication</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Enter the 6-digit verification code sent to your registered authenticator app or email.
        </Text>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Input
            label="Verification Code"
            value={otp}
            onChangeText={setOtp}
            placeholder="000 000"
            keyboardType="number-pad"
            maxLength={6}
            style={{ textAlign: 'center', letterSpacing: 8, fontSize: 18, fontWeight: '700' }}
          />

          <Button
            title="Verify & Continue"
            onPress={() => navigation.navigate('Dashboard')}
            icon={<CheckCircle2 size={18} color="#FFF" />}
            fullWidth
            style={{ marginTop: spacing.sm }}
          />
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
  centerIcon: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 18,
  },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.lg,
  },
});
