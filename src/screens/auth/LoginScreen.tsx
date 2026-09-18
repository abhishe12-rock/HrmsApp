import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path, Rect } from 'react-native-svg';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { authService } from '../../services/authService';
import { Hrm3dLogo } from '../../components/common/Hrm3dLogo';
import { UserRole } from '../../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode, switchRole } = useAppStore();

  const [email, setEmail] = useState('hr.admin@acmecorp.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('hr_admin');

  const DEMO_ROLES: { label: string; role: UserRole; email: string }[] = [
    { label: 'HR Admin', role: 'hr_admin', email: 'hr.admin@acmecorp.com' },
    { label: 'Manager', role: 'manager', email: 'engineering.lead@acmecorp.com' },
    { label: 'Employee', role: 'employee', email: 'employee@acmecorp.com' },
    { label: 'Payroll', role: 'payroll_admin', email: 'payroll.specialist@acmecorp.com' },
    { label: 'SaaS Owner', role: 'saas_owner', email: 'saas.owner@hrmplatform.com' },
  ];

  const handleSelectRole = (item: typeof DEMO_ROLES[0]) => {
    setSelectedRole(item.role);
    setEmail(item.email);
    setPassword('password123');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please provide email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const user = await authService.login(email.trim(), password.trim());
      await switchRole(user.role);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'microsoft' | 'apple') => {
    setLoading(true);
    setError('');
    try {
      let mockEmail = 'hr.admin@acmecorp.com';
      if (provider === 'apple') mockEmail = 'saas.owner@hrmplatform.com';
      if (provider === 'microsoft') mockEmail = 'admin@acmecorp.com';

      const user = await authService.login(mockEmail, 'social_auth');
      await switchRole(user.role);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (err: any) {
      setError(err.message || 'Social sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/headerbanner.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Brand Header */}
          <View style={styles.topHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Landing')}
              activeOpacity={0.8}
            >
              <ArrowLeft size={16} color="#FFFFFF" />
              <Text style={styles.backButtonText}>Home</Text>
            </TouchableOpacity>

            <View style={styles.logoRow}>
              <Hrm3dLogo size={36} />
              <View style={styles.logoTextGroup}>
                <Text style={styles.brandTitle}>HRM</Text>
                <Text style={styles.brandSubtitle}>Human Resource Management</Text>
              </View>
            </View>
          </View>

          {/* Hero Headline Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroHeadlineNavy}>Build a Better</Text>
            <Text style={styles.heroHeadlineBlue}>Workplace Together</Text>
            <Text style={styles.heroTagline}>
              Streamline your HR processes, manage your team, and create a better work environment all in one place.
            </Text>
          </View>

          {/* Quick Demo Persona Chips */}
          <View style={styles.rolesSection}>
            <View style={styles.rolesHeaderRow}>
              <Sparkles size={12} color="#1D68FE" />
              <Text style={styles.rolesHeaderTitle}>DEMO QUICK SWITCH</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsScroll}
            >
              {DEMO_ROLES.map(item => {
                const isActive = selectedRole === item.role;
                return (
                  <TouchableOpacity
                    key={item.role}
                    onPress={() => handleSelectRole(item)}
                    style={[styles.roleChip, isActive && styles.roleChipActive]}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.roleChipText, isActive && styles.roleChipTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Floating White Login Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome Back!</Text>
            <Text style={styles.cardSubtitle}>Sign in to your HRM account to continue</Text>

            {error ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Email Address Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail size={16} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="hr.admin@acmecorp.com"
                  placeholderTextColor="#94A3B8"
                  style={styles.textInput}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={16} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••••"
                  placeholderTextColor="#94A3B8"
                  style={[styles.textInput, { paddingRight: 40 }]}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <EyeOff size={16} color="#94A3B8" />
                  ) : (
                    <Eye size={16} color="#94A3B8" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.rememberGroup}
                activeOpacity={0.8}
              >
                <View style={[styles.checkboxBox, rememberMe && styles.checkboxBoxChecked]}>
                  {rememberMe && <Check size={11} color="#FFFFFF" strokeWidth={3} />}
                </View>
                <Text style={styles.rememberLabel}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                activeOpacity={0.8}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Primary Sign In Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={[styles.signInButton, loading && styles.signInButtonDisabled]}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <View style={styles.btnContent}>
                  <Text style={styles.signInButtonText}>Sign In</Text>
                  <ArrowRight size={15} color="#FFFFFF" strokeWidth={2.5} style={{ marginLeft: 6 }} />
                </View>
              )}
            </TouchableOpacity>

            {/* Or continue with divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* 3 Social SSO Buttons (Google, Microsoft, Apple) */}
            <View style={styles.socialRow}>
              {/* Google Button */}
              <TouchableOpacity
                onPress={() => handleSocialLogin('google')}
                style={styles.socialBtn}
                activeOpacity={0.75}
              >
                <Svg width={14} height={14} viewBox="0 0 24 24">
                  <Path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <Path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <Path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <Path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </Svg>
                <Text style={styles.socialBtnText}>Google</Text>
              </TouchableOpacity>

              {/* Microsoft Button */}
              <TouchableOpacity
                onPress={() => handleSocialLogin('microsoft')}
                style={styles.socialBtn}
                activeOpacity={0.75}
              >
                <Svg width={13} height={13} viewBox="0 0 21 21">
                  <Rect x="1" y="1" width="9" height="9" fill="#f25022" />
                  <Rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                  <Rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                  <Rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                </Svg>
                <Text style={styles.socialBtnText}>Microsoft</Text>
              </TouchableOpacity>

              {/* Apple Button */}
              <TouchableOpacity
                onPress={() => handleSocialLogin('apple')}
                style={styles.socialBtn}
                activeOpacity={0.75}
              >
                <Svg width={13} height={13} viewBox="0 0 170 170">
                  <Path
                    fill="#0F172A"
                    d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-5.19.12-10.08-2-14.67-6.35-3.08-2.74-6.99-7.46-11.73-14.15-6.84-9.67-12.18-20.91-16.02-33.72-3.84-12.81-5.76-24.81-5.76-36 0-14.75 3.8-27.18 11.4-37.3 7.6-10.12 17.29-15.28 29.07-15.48 4.81 0 10.08 1.18 15.82 3.54 5.74 2.36 9.61 3.54 11.62 3.54 1.79 0 5.86-1.29 12.22-3.87 6.36-2.58 11.83-3.68 16.42-3.3 12.26.96 22.18 5.63 29.76 14.02-10.69 6.47-15.93 15.35-15.72 26.63.21 8.84 3.57 16.32 10.08 22.44 6.51 6.12 14.16 9.54 22.95 10.26-2.02 5.99-4.43 12.06-7.23 18.21zM119.22 31.02c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.95-10.35 19.95-11.88.35 1.58.53 3.05.53 4.41 0 7.39-2.83 14.44-8.49 21.15-5.66 6.71-12.59 10.63-20.79 11.76-.23-1.63-.35-3.04-.35-4.24z"
                  />
                </Svg>
                <Text style={styles.socialBtnText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Security Pill Badge */}
            <View style={styles.securityBadge}>
              <View style={styles.shieldCircle}>
                <ShieldCheck size={11} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <Text style={styles.securityTitle}>Secure & Encrypted</Text>
              <Text style={styles.securitySubtitle}>Your data is safe with us</Text>
            </View>

            {/* Register Link */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                activeOpacity={0.8}
              >
                <Text style={styles.registerLink}>Register here</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              © 2026 <Text style={styles.footerBold}>HRM</Text>. All rights reserved.  |  Privacy Policy  |  Terms of Service
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 48 : 36,
    paddingBottom: 28,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoTextGroup: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  brandSubtitle: {
    fontSize: 10.5,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.92)',
    marginTop: 1,
  },
  heroSection: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  heroHeadlineNavy: {
    fontSize: 30,
    fontWeight: '900',
    color: '#0A2540',
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  heroHeadlineBlue: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1D68FE',
    letterSpacing: -0.8,
    lineHeight: 36,
    marginBottom: 8,
  },
  heroTagline: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
    maxWidth: 320,
  },
  rolesSection: {
    marginBottom: 16,
  },
  rolesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  rolesHeaderTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1D68FE',
    letterSpacing: 0.8,
  },
  chipsScroll: {
    gap: 8,
    paddingRight: 12,
  },
  roleChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(29, 104, 254, 0.2)',
  },
  roleChipActive: {
    backgroundColor: '#1D68FE',
    borderColor: '#1D68FE',
  },
  roleChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  roleChipTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0A2540',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 13,
  },
  inputLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
    paddingVertical: 0,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 18,
  },
  rememberGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  checkboxBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: '#1D68FE',
    borderColor: '#1D68FE',
  },
  rememberLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D68FE',
  },
  signInButton: {
    backgroundColor: '#1D68FE',
    borderRadius: 12,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1D68FE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  signInButtonDisabled: {
    opacity: 0.65,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  dividerText: {
    fontSize: 11,
    color: '#94A3B8',
    paddingHorizontal: 10,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  socialBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(239, 246, 255, 0.85)',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  shieldCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1D68FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityTitle: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  securitySubtitle: {
    fontSize: 9.5,
    color: '#64748B',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 12,
    color: '#64748B',
  },
  registerLink: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1D68FE',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  footerBold: {
    fontWeight: '800',
    color: '#1D68FE',
  },
});
