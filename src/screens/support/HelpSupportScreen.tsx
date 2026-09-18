import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HelpCircle, MessageSquare, Mail, Phone, ExternalLink } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HelpSupportScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const FAQS = [
    { q: 'How do I clock in with mobile geofencing?', a: 'Tap "Clock In" on the dashboard or menu. Ensure location services are enabled.' },
    { q: 'When is payroll disbursed each month?', a: 'Salaries are processed on the final working day of each calendar month.' },
    { q: 'How do I submit an expense receipt?', a: 'Go to Operations -> Expenses and tap "Claim" to submit your invoice.' },
  ];

  return (
    <AppLayout
      title="Help & Support"
      currentScreen="HelpSupport"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Support Center</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Frequently asked questions & 24/7 internal HR helpdesk
        </Text>

        <Card>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Contact HR Helpdesk</Text>
          <View style={styles.contactRow}>
            <Mail size={16} color={colors.primary} />
            <Text style={[styles.contactText, { color: theme.text }]}>support@acmecorp.hrm.com</Text>
          </View>
          <View style={[styles.contactRow, { borderBottomWidth: 0 }]}>
            <Phone size={16} color={colors.primary} />
            <Text style={[styles.contactText, { color: theme.text }]}>+1 (800) 555-HRMS (Ext 401)</Text>
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.text, marginVertical: spacing.md }]}>
          Frequently Asked Questions
        </Text>
        <View style={styles.list}>
          {FAQS.map(faq => (
            <Card key={faq.q}>
              <Text style={[styles.faqQ, { color: theme.text }]}>{faq.q}</Text>
              <Text style={[styles.faqA, { color: theme.textSecondary }]}>{faq.a}</Text>
            </Card>
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: spacing.sm },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  contactText: { fontSize: 13, fontWeight: '600' },
  list: { gap: spacing.xs },
  faqQ: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  faqA: { fontSize: 12, lineHeight: 18 },
});
