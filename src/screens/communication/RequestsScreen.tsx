import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FileQuestion, Megaphone, Plus } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RequestsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [requests, setRequests] = useState([
    { id: '1', title: 'Employment Verification Letter', category: 'HR Request', date: 'Sep 05, 2026', status: 'Completed' },
    { id: '2', title: 'Monitor & Keyboard Hardware Replacement', category: 'IT Support', date: 'Aug 28, 2026', status: 'In Progress' },
    { id: '3', title: 'Address & Tax Profile Update', category: 'Compliance', date: 'Aug 14, 2026', status: 'Approved' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('HR Request');

  const handleCreateRequest = () => {
    if (!subject.trim()) {
      Alert.alert('Validation Error', 'Please enter a request description or title.');
      return;
    }
    const newReq = {
      id: `req_${Date.now()}`,
      title: subject.trim(),
      category: category.trim() || 'General',
      date: 'Today',
      status: 'Submitted',
    };
    setRequests([newReq, ...requests]);
    setModalOpen(false);
    setSubject('');
    Alert.alert('Success', 'Your service request has been logged!');
  };

  return (
    <AppLayout
      title="Employee Requests"
      currentScreen="Requests"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Service Requests</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Letters, asset requests & HR inquiries
            </Text>
          </View>
          <Button
            title="New Request"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {requests.map(req => (
            <Card key={req.id}>
              <View style={styles.header}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{req.title}</Text>
                  <Text style={[styles.sub, { color: theme.textSecondary }]}>
                    {req.category} • Submitted on {req.date}
                  </Text>
                </View>
                <Badge label={req.status} status={req.status === 'Completed' ? 'active' : 'pending'} />
              </View>
            </Card>
          ))}
        </View>

        {/* New Request Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Submit Service Request"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Request Category"
              placeholder="e.g. HR Request, IT Support, Letter, Payroll Inquiry"
              value={category}
              onChangeText={setCategory}
            />
            <Input
              label="Subject / Request Details *"
              placeholder="e.g. Need salary certificate for bank loan"
              value={subject}
              onChangeText={setSubject}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Submit Ticket"
                variant="primary"
                size="lg"
                onPress={handleCreateRequest}
              />
            </View>
          </View>
        </Modal>
      </View>
    </AppLayout>
  );
};

export const AnnouncementsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const POSTS = [
    { title: 'Annual Employee Appreciation Week', date: 'Sep 02, 2026', author: 'Rachel Green', content: 'Join us next week for celebration events, games, and surprise awards across all campuses!' },
    { title: 'Q3 Product Roadmap All-Hands', date: 'Aug 24, 2026', author: 'Alex Wright (CEO)', content: 'Join the CEO address covering our new mobile product launch and customer growth milestones.' },
  ];

  return (
    <AppLayout
      title="Announcements"
      currentScreen="Announcements"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Company Announcements</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Official organizational news & circulars
        </Text>

        <View style={styles.list}>
          {POSTS.map(p => (
            <Card key={p.title}>
              <Text style={[styles.title, { color: theme.text }]}>{p.title}</Text>
              <Text style={[styles.sub, { color: colors.primary }]}>
                {p.author} • {p.date}
              </Text>
              <Text style={[styles.body, { color: theme.textSecondary }]}>
                {p.content}
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2 },
  list: { gap: spacing.sm },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 14, fontWeight: '700' },
  sub: { fontSize: 11, marginTop: 2 },
  body: { fontSize: 13, lineHeight: 18, marginTop: 6 },
});
