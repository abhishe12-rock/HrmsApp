import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { UserRole } from '../../types';
import { colors } from '../../theme/colors';
import {
  Users,
  Clock,
  CalendarDays,
  DollarSign,
  Briefcase,
  Target,
  BarChart3,
  ShieldCheck,
  Zap,
  Headphones,
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle2,
  Receipt,
  GraduationCap,
  Package,
  FolderLock,
  Star,
  Sun,
  Moon,
  Building2,
  ChevronRight,
  CheckCircle,
} from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Hrm3dLogo } from '../../components/common/Hrm3dLogo';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LandingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { switchRole, isDarkMode, toggleDarkMode } = useAppStore();

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoCompany, setDemoCompany] = useState('');

  const handleLaunchDemo = async (role: UserRole = 'hr_admin') => {
    await switchRole(role);
    if (role === 'saas_owner') {
      navigation.navigate('SaasDashboard');
    } else {
      navigation.navigate('Dashboard');
    }
  };

  const handleDemoSubmit = () => {
    if (!demoName || !demoEmail) {
      Alert.alert('Missing Details', 'Please provide your name and work email.');
      return;
    }
    setDemoSubmitted(true);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoSubmitted(false);
      setDemoName('');
      setDemoEmail('');
      setDemoCompany('');
      handleLaunchDemo('hr_admin');
    }, 1200);
  };

  const demoRoles: { label: string; role: UserRole; desc: string }[] = [
    { label: 'HR Admin', role: 'hr_admin', desc: 'Manage org, staff & policies' },
    { label: 'Employee', role: 'employee', desc: 'Punch in, leaves, payslips' },
    { label: 'Manager', role: 'manager', desc: 'Team timesheets & approvals' },
    { label: 'Payroll Admin', role: 'payroll_admin', desc: 'Salaries & tax runs' },
    { label: 'Recruiter', role: 'recruiter', desc: 'Jobs & candidate pipeline' },
    { label: 'SaaS Owner', role: 'saas_owner', desc: 'Tenants, MRR & plans' },
  ];

  const whyChooseCards = [
    {
      title: 'All-in-One Solution',
      desc: 'Manage your entire workforce operations in a unified mobile platform.',
      icon: Zap,
      color: '#0284C7',
      bg: '#E0F2FE',
    },
    {
      title: 'Enterprise Security',
      desc: 'Role-based access control, encrypted data, and ISO-ready audit logs.',
      icon: ShieldCheck,
      color: colors.primary,
      bg: '#DBEAFE',
    },
    {
      title: 'Intuitive Experience',
      desc: 'Engineered for simplicity with micro-interactions and zero training needed.',
      icon: Sparkles,
      color: '#9333EA',
      bg: '#F3E8FF',
    },
    {
      title: '24/7 Dedicated Support',
      desc: 'Always-available live support desk, HR guides and onboarding assistance.',
      icon: Headphones,
      color: colors.success,
      bg: '#D1FAE5',
    },
    {
      title: 'Automated Workflows',
      desc: 'Save 15+ hours weekly with instant leave approvals and payroll runs.',
      icon: Clock,
      color: '#4F46E5',
      bg: '#EEF2FF',
    },
    {
      title: 'Real-time Analytics',
      desc: 'Actionable workforce insights, attrition trends, and headcount metrics.',
      icon: BarChart3,
      color: '#D97706',
      bg: '#FEF3C7',
    },
  ];

  const powerfulModules = [
    {
      title: 'Employee Directory',
      desc: 'Full profiles, emergency contacts, documents and hierarchy.',
      icon: Users,
      route: 'EmployeesList' as const,
      color: colors.primary,
    },
    {
      title: 'Attendance & Geofencing',
      desc: 'GPS geofenced mobile clock in/out, shift timesheets & overtime.',
      icon: Clock,
      route: 'Attendance' as const,
      color: '#4F46E5',
    },
    {
      title: 'Leave Management',
      desc: 'Track annual, sick and casual balances with 1-tap approvals.',
      icon: CalendarDays,
      route: 'LeaveManagement' as const,
      color: '#D97706',
    },
    {
      title: 'Automated Payroll',
      desc: 'Salary structure calculations, tax deductions & digital payslips.',
      icon: DollarSign,
      route: 'PayrollDashboard' as const,
      color: colors.success,
    },
    {
      title: 'Recruitment & ATS',
      desc: 'Job board, Kanban candidate pipeline and interview scheduling.',
      icon: Briefcase,
      route: 'CandidatesPipeline' as const,
      color: '#9333EA',
    },
    {
      title: 'Performance & OKRs',
      desc: 'Set quarterly goals, milestones and 360 performance reviews.',
      icon: Target,
      route: 'Goals' as const,
      color: '#E11D48',
    },
    {
      title: 'Expense Reimbursements',
      desc: 'Submit receipts, mileage tracking and manager expense signoffs.',
      icon: Receipt,
      route: 'Expenses' as const,
      color: '#0D9488',
    },
    {
      title: 'Hardware & Assets',
      desc: 'Track laptops, monitors, accessories and warranty assignments.',
      icon: Package,
      route: 'Assets' as const,
      color: '#DB2777',
    },
    {
      title: 'Document Vault',
      desc: 'Secure contracts, offer letters, NDAs and policies.',
      icon: FolderLock,
      route: 'Documents' as const,
      color: '#0284C7',
    },
    {
      title: 'Training & LMS',
      desc: 'Mandatory compliance courses, skill tracks and certificates.',
      icon: GraduationCap,
      route: 'Training' as const,
      color: '#B45309',
    },
    {
      title: 'Workforce Reports',
      desc: 'Attendance logs, salary spend and department distribution.',
      icon: BarChart3,
      route: 'Reports' as const,
      color: colors.primary,
    },
    {
      title: 'SaaS Multi-Tenant',
      desc: 'Manage organizations, subscription tiers, MRR and audit logs.',
      icon: Building2,
      route: 'SaasDashboard' as const,
      color: '#4F46E5',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49',
      cadence: '/month',
      desc: 'For small growing teams up to 25 employees.',
      popular: false,
      features: [
        'Up to 25 Employees',
        'Attendance & Shift Scheduling',
        'Leave Management & Approvals',
        'Basic Payroll & Payslips',
        'Standard Email Support',
      ],
    },
    {
      name: 'Professional',
      price: '$129',
      cadence: '/month',
      desc: 'Ideal for scaling businesses up to 150 members.',
      popular: true,
      features: [
        'Up to 150 Employees',
        'Everything in Starter',
        'GPS Geofenced Clock In/Out',
        'Recruitment ATS & Pipeline',
        'Performance Goals & OKRs',
        'Expense Claims & Asset Tracking',
        'Priority 24/7 Support',
      ],
    },
    {
      name: 'Enterprise',
      price: '$299',
      cadence: '/month',
      desc: 'Dedicated multi-tenant features with custom SLA.',
      popular: false,
      features: [
        'Unlimited Employees',
        'Everything in Professional',
        'Multi-Tenant SaaS Console',
        'Custom Roles & Permissions',
        'Dedicated Account Manager',
        '99.99% Uptime SLA',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'HR Director @ Techcorp',
      comment:
        'HRM Pro transformed our onboarding and leave management. The mobile experience is fast, clean and loved by our 400+ employees.',
      rating: 5,
    },
    {
      name: 'Amit Verma',
      role: 'Founder & CEO @ GrowthHub',
      comment:
        'The automated payroll processing alone saved our finance team 3 days every month. The multi-role switcher makes testing effortless!',
      rating: 5,
    },
    {
      name: 'Neha Gupta',
      role: 'Operations Head @ BizSolutions',
      comment:
        'Cleanest design we have ever seen in HR software. Tracking attendance and equipment across 3 branch offices has never been easier.',
      rating: 5,
    },
  ];

  const bgStyle = { backgroundColor: isDarkMode ? colors.dark.background : colors.light.background };
  const cardBgStyle = { backgroundColor: isDarkMode ? colors.dark.card : colors.light.card };
  const textPrimary = { color: isDarkMode ? colors.dark.text : colors.light.text };
  const textMuted = { color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary };
  const borderCol = { borderColor: isDarkMode ? colors.dark.border : colors.light.border };

  return (
    <SafeAreaView style={[styles.container, bgStyle]} edges={['top', 'left', 'right']}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? colors.dark.background : '#FFFFFF'}
      />

      {/* TOP FLOATING APP BAR */}
      <View style={[styles.navbar, cardBgStyle, borderCol]}>
        <View style={styles.brandRow}>
          <Hrm3dLogo size={32} />
          <View style={{ marginLeft: 8 }}>
            <Text style={[styles.brandTitle, textPrimary]}>
              HRM <Text style={{ color: colors.primary }}>Pro</Text>
            </Text>
          </View>
        </View>

        <View style={styles.navActions}>
          <TouchableOpacity
            style={[styles.themeBtn, borderCol]}
            onPress={toggleDarkMode}
            activeOpacity={0.7}
          >
            {isDarkMode ? (
              <Sun size={16} color="#FBBF24" />
            ) : (
              <Moon size={16} color={colors.light.textSecondary} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginBtn, borderCol]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={[styles.loginBtnText, textPrimary]}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ctaHeaderBtn}
            onPress={() => handleLaunchDemo('hr_admin')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaHeaderBtnText}>Live Demo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.badgePill}>
            <Sparkles size={14} color={colors.primary} />
            <Text style={styles.badgePillText}>Next-Gen Multi-Tenant HR Platform</Text>
          </View>

          <Text style={[styles.heroHeading, textPrimary]}>
            Complete HR Management{'\n'}
            <Text style={{ color: colors.primary }}>for Modern Teams</Text>
          </Text>

          <Text style={[styles.heroDescription, textMuted]}>
            Streamline your people, attendance, payroll, recruitment and performance from one unified, mobile-first platform.
          </Text>

          {/* HERO ACTIONS */}
          <View style={styles.heroActions}>
            <TouchableOpacity
              style={styles.primaryHeroBtn}
              onPress={() => handleLaunchDemo('manager')}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryHeroBtnText}>Explore Live App</Text>
              <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.outlineHeroBtn, borderCol, cardBgStyle]}
              onPress={() => setIsDemoModalOpen(true)}
              activeOpacity={0.85}
            >
              <View style={styles.playIconCircle}>
                <Play size={11} color={colors.primary} style={{ marginLeft: 2 }} />
              </View>
              <Text style={[styles.outlineHeroBtnText, textPrimary]}>Book a Demo</Text>
            </TouchableOpacity>
          </View>

          {/* TRUST STATS ROW */}
          <View style={[styles.statsRow, cardBgStyle, borderCol]}>
            <View style={styles.statItem}>
              <View style={styles.statIconBadge}>
                <Users size={16} color={colors.primary} />
              </View>
              <Text style={[styles.statValue, textPrimary]}>100+</Text>
              <Text style={[styles.statLabel, textMuted]}>Organizations</Text>
            </View>

            <View style={[styles.statDivider, borderCol]} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBadge, { backgroundColor: '#EEF2FF' }]}>
                <Briefcase size={16} color="#4F46E5" />
              </View>
              <Text style={[styles.statValue, textPrimary]}>50K+</Text>
              <Text style={[styles.statLabel, textMuted]}>Active Staff</Text>
            </View>

            <View style={[styles.statDivider, borderCol]} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBadge, { backgroundColor: '#D1FAE5' }]}>
                <ShieldCheck size={16} color={colors.success} />
              </View>
              <Text style={[styles.statValue, textPrimary]}>99.9%</Text>
              <Text style={[styles.statLabel, textMuted]}>Uptime SLA</Text>
            </View>
          </View>
        </View>

        {/* ONE-TAP PERSONA SELECTOR (LIVE TEST) */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <Zap size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, textPrimary]}>
              Instant Persona Switcher
            </Text>
          </View>
          <Text style={[styles.sectionSubtitle, textMuted]}>
            Experience the full app as any user role with one tap. Zero signup required.
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rolesRow}
          >
            {demoRoles.map((item) => (
              <TouchableOpacity
                key={item.role}
                style={[styles.roleCard, cardBgStyle, borderCol]}
                onPress={() => handleLaunchDemo(item.role)}
                activeOpacity={0.85}
              >
                <View style={styles.roleCardTop}>
                  <Badge variant="primary" label={item.label} />
                  <ArrowRight size={14} color={colors.primary} />
                </View>
                <Text style={[styles.roleDesc, textMuted]}>{item.desc}</Text>
                <View style={styles.roleActionRow}>
                  <Text style={styles.roleActionText}>Launch View →</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* WHY CHOOSE HRM PRO */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, textPrimary]}>Why Modern Teams Choose Us</Text>
          <Text style={[styles.sectionSubtitle, textMuted]}>
            Built specifically for high-velocity teams needing fast, compliant and automated operations.
          </Text>

          <View style={styles.whyGrid}>
            {whyChooseCards.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <View key={idx} style={[styles.whyCard, cardBgStyle, borderCol]}>
                  <View style={[styles.whyIconBadge, { backgroundColor: item.bg }]}>
                    <IconComponent size={20} color={item.color} />
                  </View>
                  <Text style={[styles.whyCardTitle, textPrimary]}>{item.title}</Text>
                  <Text style={[styles.whyCardDesc, textMuted]}>{item.desc}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* ENTERPRISE MODULES SHOWCASE */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <Building2 size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, textPrimary]}>All 12 Core Modules</Text>
          </View>
          <Text style={[styles.sectionSubtitle, textMuted]}>
            Every module from the web platform is converted into native mobile workflows.
          </Text>

          <View style={styles.modulesGrid}>
            {powerfulModules.map((mod, idx) => {
              const IconComp = mod.icon;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.modCard, cardBgStyle, borderCol]}
                  onPress={async () => {
                    await switchRole('hr_admin');
                    navigation.navigate(mod.route as any);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.modTopRow}>
                    <View
                      style={[
                        styles.modIconBox,
                        { backgroundColor: `${mod.color}18` },
                      ]}
                    >
                      <IconComp size={20} color={mod.color} />
                    </View>
                    <ChevronRight size={16} color={colors.light.textMuted} />
                  </View>
                  <Text style={[styles.modTitle, textPrimary]}>{mod.title}</Text>
                  <Text style={[styles.modDesc, textMuted]} numberOfLines={2}>
                    {mod.desc}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* PRICING PLANS */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, textPrimary]}>Transparent Pricing Plans</Text>
          <Text style={[styles.sectionSubtitle, textMuted]}>
            Start free, then scale smoothly as your headcount grows.
          </Text>

          <View style={styles.pricingList}>
            {pricingPlans.map((plan, idx) => (
              <View
                key={idx}
                style={[
                  styles.pricingCard,
                  cardBgStyle,
                  borderCol,
                  plan.popular && styles.popularPricingCard,
                ]}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                  </View>
                )}

                <Text style={[styles.planName, textPrimary]}>{plan.name}</Text>
                <Text style={[styles.planDesc, textMuted]}>{plan.desc}</Text>

                <View style={styles.priceRow}>
                  <Text style={[styles.planPrice, textPrimary]}>{plan.price}</Text>
                  <Text style={[styles.planCadence, textMuted]}>{plan.cadence}</Text>
                </View>

                <View style={styles.planDivider} />

                <View style={styles.featuresList}>
                  {plan.features.map((feat, fIdx) => (
                    <View key={fIdx} style={styles.featureItem}>
                      <CheckCircle2 size={16} color={colors.success} />
                      <Text style={[styles.featureItemText, textPrimary]}>{feat}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[
                    styles.planActionBtn,
                    plan.popular ? styles.popularBtn : styles.regularBtn,
                  ]}
                  onPress={() => handleLaunchDemo('hr_admin')}
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.planActionBtnText,
                      plan.popular ? { color: '#FFFFFF' } : { color: colors.primary },
                    ]}
                  >
                    Get Started Free
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* TESTIMONIALS */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, textPrimary]}>Loved by HR Leaders</Text>
          <Text style={[styles.sectionSubtitle, textMuted]}>
            Real feedback from growing startups and enterprise companies.
          </Text>

          <View style={styles.testimonialsList}>
            {testimonials.map((test, idx) => (
              <View key={idx} style={[styles.testimonialCard, cardBgStyle, borderCol]}>
                <View style={styles.starsRow}>
                  {[...Array(test.rating)].map((_, sIdx) => (
                    <Star key={sIdx} size={15} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </View>
                <Text style={[styles.testComment, textPrimary]}>"{test.comment}"</Text>
                <View style={styles.testAuthorRow}>
                  <View style={styles.authorAvatarPlaceholder}>
                    <Text style={styles.authorAvatarText}>{test.name[0]}</Text>
                  </View>
                  <View>
                    <Text style={[styles.authorName, textPrimary]}>{test.name}</Text>
                    <Text style={[styles.authorRole, textMuted]}>{test.role}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* BOTTOM CTA BANNER */}
        <View style={styles.ctaBanner}>
          <Hrm3dLogo size={48} />
          <Text style={styles.ctaBannerHeading}>Ready to Transform Your Workplace?</Text>
          <Text style={styles.ctaBannerSub}>
            Join over 50,000 employees using HRM Pro daily for attendance, payroll and self-service.
          </Text>
          <TouchableOpacity
            style={styles.ctaWhiteBtn}
            onPress={() => handleLaunchDemo('hr_admin')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaWhiteBtnText}>Launch HRM Mobile App</Text>
            <ArrowRight size={18} color={colors.primary} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BOOK DEMO MODAL */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Schedule a Live Demo"
      >
        <View style={styles.modalBody}>
          {demoSubmitted ? (
            <View style={styles.demoSuccessBox}>
              <CheckCircle size={48} color={colors.success} />
              <Text style={[styles.demoSuccessTitle, textPrimary]}>Demo Request Sent!</Text>
              <Text style={[styles.demoSuccessDesc, textMuted]}>
                Thank you, {demoName}! Redirecting you into the HR Admin experience now...
              </Text>
            </View>
          ) : (
            <View>
              <Text style={[styles.modalDesc, textMuted]}>
                Fill out the quick form below and our team will get in touch, or test directly with one tap.
              </Text>

              <Input
                label="Your Full Name"
                placeholder="e.g. Alex Morgan"
                value={demoName}
                onChangeText={setDemoName}
              />

              <Input
                label="Work Email Address"
                placeholder="alex@company.com"
                keyboardType="email-address"
                value={demoEmail}
                onChangeText={setDemoEmail}
              />

              <Input
                label="Company Name"
                placeholder="Acme Technologies"
                value={demoCompany}
                onChangeText={setDemoCompany}
              />

              <View style={styles.modalActionRow}>
                <Button
                  title="Submit & Launch Demo"
                  variant="primary"
                  size="lg"
                  onPress={handleDemoSubmit}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  themeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  loginBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ctaHeaderBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ctaHeaderBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 16,
    alignItems: 'center',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  heroHeading: {
    fontSize: 27,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 22,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    width: '100%',
    justifyContent: 'center',
  },
  primaryHeroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryHeroBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  outlineHeroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  playIconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  outlineHeroBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 32,
    borderLeftWidth: 1,
  },
  sectionBlock: {
    paddingHorizontal: 16,
    marginTop: 28,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 16,
  },
  rolesRow: {
    gap: 12,
    paddingBottom: 4,
  },
  roleCard: {
    width: 170,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  roleCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  roleDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  roleActionRow: {
    marginTop: 'auto',
  },
  roleActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  whyGrid: {
    gap: 12,
  },
  whyCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  whyIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  whyCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  whyCardDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modCard: {
    width: '48%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  modTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  modDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  pricingList: {
    gap: 16,
  },
  pricingCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    position: 'relative',
  },
  popularPricingCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -11,
    right: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  planDesc: {
    fontSize: 12,
    marginBottom: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 14,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '900',
  },
  planCadence: {
    fontSize: 13,
    marginLeft: 4,
  },
  planDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 14,
  },
  featuresList: {
    gap: 10,
    marginBottom: 18,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureItemText: {
    fontSize: 13,
    fontWeight: '500',
  },
  planActionBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  popularBtn: {
    backgroundColor: colors.primary,
  },
  regularBtn: {
    backgroundColor: '#EFF6FF',
  },
  planActionBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  testimonialsList: {
    gap: 12,
  },
  testimonialCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 8,
  },
  testComment: {
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: 12,
  },
  testAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  authorAvatarPlaceholder: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorAvatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '700',
  },
  authorRole: {
    fontSize: 11,
  },
  ctaBanner: {
    marginHorizontal: 16,
    marginTop: 32,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  ctaBannerHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  ctaBannerSub: {
    color: '#DBEAFE',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  ctaWhiteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  ctaWhiteBtnText: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '800',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  footerLink: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerDot: {
    fontSize: 12,
  },
  footerCopy: {
    fontSize: 11,
    textAlign: 'center',
  },
  modalBody: {
    paddingVertical: 8,
  },
  modalDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  modalActionRow: {
    marginTop: 16,
  },
  demoSuccessBox: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  demoSuccessTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 6,
  },
  demoSuccessDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
