import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Briefcase, Users, Plus } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_JOBS } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { JobOpening } from '../../types';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const JobOpeningsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [jobs, setJobs] = useState<JobOpening[]>(INITIAL_JOBS);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('Remote');
  const [type, setType] = useState('Full-time');

  const handlePostJob = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a job title.');
      return;
    }
    const newJob: JobOpening = {
      id: `job_${Date.now()}`,
      organizationId: 'org-1',
      title: title.trim(),
      department: department.trim() || 'Engineering',
      location: location.trim() || 'Remote',
      type: type as any,
      status: 'Active',
      experienceRequired: 'Mid-Senior (3+ yrs)',
      positions: 1,
      applicationsCount: 0,
      salaryRange: '$90k - $130k',
      postedDate: new Date().toISOString().split('T')[0],
      deadline: '2026-12-31',
      description: `Opportunity for ${title.trim()} to join our growing ${department} team.`,
      requirements: ['Proven experience', 'Strong team communication'],
    };
    setJobs([newJob, ...jobs]);
    setModalOpen(false);
    setTitle('');
    Alert.alert('Success', `Job posting "${newJob.title}" published!`);
  };

  return (
    <AppLayout
      title="Job Openings"
      currentScreen="JobOpenings"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Active Job Postings</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              {jobs.length} open headcount positions
            </Text>
          </View>
          <Button
            title="Post Job"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {jobs.map(job => (
            <Card key={job.id}>
              <View style={styles.jobHeader}>
                <View style={[styles.iconBox, { backgroundColor: `${colors.primary}15` }]}>
                  <Briefcase size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.jobTitle, { color: theme.text }]}>{job.title}</Text>
                  <Text style={[styles.jobMeta, { color: theme.textSecondary }]}>
                    {job.department} • {job.type} • {job.location}
                  </Text>
                </View>
                <Badge label={job.status} status={job.status === 'Active' ? 'active' : 'pending'} />
              </View>

              <View style={[styles.footerRow, { borderTopColor: theme.border }]}>
                <View style={styles.applicantsBox}>
                  <Users size={14} color={colors.primary} />
                  <Text style={[styles.applicantsText, { color: colors.primary }]}>
                    {job.applicationsCount} Candidates in Pipeline
                  </Text>
                </View>
                <Button
                  title="View Pipeline"
                  variant="outline"
                  size="sm"
                  onPress={() => navigation.navigate('CandidatesPipeline')}
                />
              </View>
            </Card>
          ))}
        </View>

        {/* Post Job Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Post New Job Opening"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Job Title *"
              placeholder="e.g. Senior Product Designer"
              value={title}
              onChangeText={setTitle}
            />
            <Input
              label="Department"
              placeholder="e.g. Engineering, Design, Marketing"
              value={department}
              onChangeText={setDepartment}
            />
            <Input
              label="Location"
              placeholder="e.g. Remote, New York, London"
              value={location}
              onChangeText={setLocation}
            />
            <Input
              label="Job Type"
              placeholder="Full-time, Part-time, Contract"
              value={type}
              onChangeText={setType}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Publish Job Requisition"
                variant="primary"
                size="lg"
                onPress={handlePostJob}
              />
            </View>
          </View>
        </Modal>
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
  jobHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobTitle: { fontSize: 15, fontWeight: '700' },
  jobMeta: { fontSize: 11, marginTop: 2 },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
  },
  applicantsBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  applicantsText: { fontSize: 12, fontWeight: '600' },
});
