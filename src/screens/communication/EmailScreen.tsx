import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Mail, Star, Paperclip } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const EmailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const EMAILS = [
    { id: '1', sender: 'HR Operations', subject: 'Updated Workplace & Remote Work Policy 2024', preview: 'Please review the updated guidelines for hybrid working schedules...', time: '11:20 AM', unread: true },
    { id: '2', sender: 'Finance & Payroll', subject: 'August 2024 Payslip Generated & Disbursed', preview: 'Your salary for the month of August has been credited to your bank...', time: 'Aug 31', unread: false },
    { id: '3', sender: 'CEO Alexander Wright', subject: 'Quarterly Town Hall Meeting Highlights', preview: 'Thank you all for attending the all-hands meeting. Key takeaways...', time: 'Aug 28', unread: false },
  ];

  return (
    <AppLayout
      title="Company Inbox"
      currentScreen="Email"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Corporate Mailbox</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Internal communications & notifications
        </Text>

        <View style={styles.list}>
          {EMAILS.map(mail => (
            <Card key={mail.id} style={mail.unread ? { borderColor: colors.primary } : undefined}>
              <View style={styles.mailHeader}>
                <Text style={[styles.sender, { color: mail.unread ? colors.primary : theme.text }]}>
                  {mail.sender}
                </Text>
                <Text style={[styles.time, { color: theme.textMuted }]}>{mail.time}</Text>
              </View>
              <Text style={[styles.subject, { color: theme.text }]}>{mail.subject}</Text>
              <Text style={[styles.preview, { color: theme.textSecondary }]} numberOfLines={2}>
                {mail.preview}
              </Text>
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
  list: { gap: spacing.sm },
  mailHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  sender: { fontSize: 13, fontWeight: '700' },
  time: { fontSize: 11 },
  subject: { fontSize: 13, fontWeight: '700', marginBottom: 3 },
  preview: { fontSize: 12, lineHeight: 16 },
});
