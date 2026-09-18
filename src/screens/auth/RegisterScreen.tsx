import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Mail, Lock, Building, User, Phone, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Hrm3dLogo } from '../../components/common/Hrm3dLogo';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
          >
            <ArrowLeft size={18} color={theme.text} />
          </TouchableOpacity>

          <View style={styles.brandHeader}>
            <Hrm3dLogo size={44} />
            <Text style={[styles.title, { color: theme.text }]}>
              Start 14-Day Free Trial
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Setup your organization workspace in seconds
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Input
              label="Organization / Company Name"
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="e.g. Acme Innovations Corp"
              leftIcon={<Building size={18} color={theme.textMuted} />}
            />

            <Input
              label="Admin Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="e.g. Johnathan Doe"
              leftIcon={<User size={18} color={theme.textMuted} />}
            />

            <Input
              label="Business Email"
              value={email}
              onChangeText={setEmail}
              placeholder="admin@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={18} color={theme.textMuted} />}
            />

            <Input
              label="Contact Phone"
              value={phone}
              onChangeText={setPhone}
              placeholder="+1 (555) 000-0000"
              keyboardType="phone-pad"
              leftIcon={<Phone size={18} color={theme.textMuted} />}
            />

            <Input
              label="Create Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              isPassword
              leftIcon={<Lock size={18} color={theme.textMuted} />}
            />

            <Button
              title="Create Company Account"
              onPress={handleRegister}
              loading={loading}
              icon={<ArrowRight size={18} color="#FFF" />}
              fullWidth
              style={{ marginTop: spacing.md }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.lg,
  },
});
