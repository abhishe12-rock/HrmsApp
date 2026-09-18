import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Target, Plus } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_GOALS } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { GoalOKR } from '../../types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const GoalsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [goals, setGoals] = useState<GoalOKR[]>(INITIAL_GOALS);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetProgress, setTargetProgress] = useState('25');

  const handleAddGoal = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a goal objective title.');
      return;
    }
    const prog = parseInt(targetProgress, 10) || 0;
    const newGoal: GoalOKR = {
      id: `goal_${Date.now()}`,
      organizationId: 'org-1',
      title: title.trim(),
      description: description.trim() || 'Quarterly strategic performance target',
      category: 'Company',
      ownerId: 'usr-1',
      ownerName: 'Leadership Team',
      ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      department: 'Engineering',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-12-31',
      progress: Math.min(100, Math.max(0, prog)),
      status: prog >= 100 ? 'Completed' : 'In Progress',
      keyResults: [
        {
          id: `kr_${Date.now()}`,
          title: 'Key result milestone metric',
          target: 100,
          current: prog,
          unit: '%',
        },
      ],
    };
    setGoals([newGoal, ...goals]);
    setModalOpen(false);
    setTitle('');
    setDescription('');
    Alert.alert('Success', `Goal "${newGoal.title}" created!`);
  };

  return (
    <AppLayout
      title="Goals & OKRs"
      currentScreen="Goals"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Objectives & Key Results</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Strategic quarterly milestones and metrics
            </Text>
          </View>
          <Button
            title="New Goal"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {goals.map(goal => (
            <Card key={goal.id}>
              <View style={styles.header}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{goal.title}</Text>
                  <Text style={[styles.desc, { color: theme.textSecondary }]}>{goal.description}</Text>
                </View>
                <Badge label={goal.status} status={goal.status === 'Completed' ? 'active' : 'pending'} />
              </View>

              {/* Progress Bar */}
              <View style={styles.progressSection}>
                <View style={styles.progressRow}>
                  <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>Progress</Text>
                  <Text style={[styles.progressPercent, { color: colors.primary }]}>{goal.progress}%</Text>
                </View>
                <View style={[styles.track, { backgroundColor: isDarkMode ? '#1E293B' : '#E2E8F0' }]}>
                  <View
                    style={[
                      styles.fill,
                      {
                        width: `${Math.min(100, goal.progress)}%`,
                        backgroundColor: goal.progress >= 100 ? colors.success : colors.primary,
                      },
                    ]}
                  />
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* New Goal Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create New Objective / OKR"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Goal Objective Title *"
              placeholder="e.g. Expand platform mobile adoption by 40%"
              value={title}
              onChangeText={setTitle}
            />
            <Input
              label="Description"
              placeholder="e.g. Focus on mobile self-service and attendance"
              value={description}
              onChangeText={setDescription}
            />
            <Input
              label="Initial Progress (0 - 100 %)"
              placeholder="25"
              keyboardType="numeric"
              value={targetProgress}
              onChangeText={setTargetProgress}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Save Objective"
                variant="primary"
                size="lg"
                onPress={handleAddGoal}
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
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  list: { gap: spacing.sm },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  title: { fontSize: 15, fontWeight: '700' },
  desc: { fontSize: 12, marginTop: 2 },
  progressSection: { marginTop: spacing.md },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 11 },
  progressPercent: { fontSize: 12, fontWeight: '800' },
  track: { height: 7, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});
