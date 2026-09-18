import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Calendar } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_CANDIDATES } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Interview } from '../../types';
import { formatDate } from '../../utils';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const InterviewsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [interviews] = useState<Interview[]>(() =>
    INITIAL_CANDIDATES.flatMap(c => c.interviews || [])
  );

  return (
    <AppLayout
      title="Interviews"
      currentScreen="Interviews"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Interview Schedule</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Scheduled technical, behavioral & leadership rounds
        </Text>

        <View style={styles.list}>
          {interviews.map(int => (
            <Card key={int.id}>
              <View style={styles.candHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.candName, { color: theme.text }]}>{int.candidateName}</Text>
                  <Text style={[styles.candRole, { color: colors.primary }]}>
                    {int.jobTitle} • {int.stage}
                  </Text>
                  <Text style={[styles.candMeta, { color: theme.textSecondary }]}>
                    Interviewer: {int.interviewerName}
                  </Text>
                </View>
                <Badge label={int.status} status="active" />
              </View>

              <View style={[styles.contactRow, { borderTopColor: theme.border }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Calendar size={13} color={colors.primary} />
                  <Text style={[styles.contactText, { color: theme.text, fontWeight: '700' }]}>
                    {formatDate(int.date)} at {int.time}
                  </Text>
                </View>
              </View>
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
  candHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  candName: { fontSize: 15, fontWeight: '700' },
  candRole: { fontSize: 13, fontWeight: '600', marginTop: 1 },
  candMeta: { fontSize: 11, marginTop: 3 },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
  },
  contactText: { fontSize: 11 },
});
