import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_CANDIDATES } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs, TabItem } from '../../components/ui/Tabs';
import { Candidate } from '../../types';
import { formatDate } from '../../utils';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CandidatesPipelineScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [candidates] = useState<Candidate[]>(() => INITIAL_CANDIDATES);
  const [activeStage, setActiveStage] = useState('All');

  const STAGES: TabItem[] = [
    { id: 'All', label: 'All' },
    { id: 'Applied', label: 'Applied' },
    { id: 'Screening', label: 'Screening' },
    { id: 'Technical Round', label: 'Technical' },
    { id: 'Managerial Round', label: 'Managerial' },
    { id: 'HR Round', label: 'HR' },
    { id: 'Offered', label: 'Offered' },
  ];

  const filtered = candidates.filter(
    c => activeStage === 'All' || c.stage === activeStage
  );

  return (
    <AppLayout
      title="Candidate Pipeline"
      currentScreen="CandidatesPipeline"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Applicant Tracking (ATS)</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Candidates moving through evaluation stages
        </Text>

        <Tabs tabs={STAGES} activeTab={activeStage} onChange={setActiveStage} />

        <View style={styles.list}>
          {filtered.map(cand => (
            <Card key={cand.id}>
              <View style={styles.candHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.candName, { color: theme.text }]}>{cand.name}</Text>
                  <Text style={[styles.candRole, { color: colors.primary }]}>
                    {cand.jobTitle || cand.currentRole || 'Applicant'}
                  </Text>
                  <Text style={[styles.candMeta, { color: theme.textSecondary }]}>
                    Experience: {cand.experienceYears} yrs • Applied: {formatDate(cand.appliedDate)}
                  </Text>
                </View>
                <Badge label={cand.stage} status="pending" />
              </View>

              <View style={[styles.contactRow, { borderTopColor: theme.border }]}>
                <Text style={[styles.contactText, { color: theme.textSecondary }]}>{cand.email}</Text>
                <Text style={[styles.contactText, { color: theme.textSecondary }]}>{cand.phone}</Text>
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
