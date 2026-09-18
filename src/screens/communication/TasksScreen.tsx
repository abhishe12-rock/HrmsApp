import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TasksScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete Q3 self-appraisal review', due: 'Today', priority: 'High', done: false },
    { id: '2', title: 'Submit travel expense receipts', due: 'Tomorrow', priority: 'Medium', done: false },
    { id: '3', title: 'Security compliance refresh course', due: 'Sep 20', priority: 'Low', done: true },
    { id: '4', title: 'Update emergency contact profile info', due: 'Sep 25', priority: 'Medium', done: true },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDue, setTaskDue] = useState('Tomorrow');
  const [taskPriority, setTaskPriority] = useState('Medium');

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      Alert.alert('Validation Error', 'Please enter a task description.');
      return;
    }
    const newTask = {
      id: `task_${Date.now()}`,
      title: taskTitle.trim(),
      due: taskDue.trim() || 'Next week',
      priority: taskPriority,
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setModalOpen(false);
    setTaskTitle('');
    Alert.alert('Success', 'New task added to checklist!');
  };

  return (
    <AppLayout
      title="Tasks"
      currentScreen="Tasks"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>My Task Checklist</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              {tasks.filter(t => !t.done).length} pending • {tasks.filter(t => t.done).length} completed
            </Text>
          </View>
          <Button
            title="Add Task"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {tasks.map(task => (
            <Card key={task.id}>
              <View style={styles.taskRow}>
                <TouchableOpacity
                  onPress={() => toggleTask(task.id)}
                  style={{ marginRight: 4 }}
                >
                  {task.done ? (
                    <CheckCircle2 size={22} color={colors.success} />
                  ) : (
                    <Circle size={22} color={theme.textMuted} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => toggleTask(task.id)}
                  style={{ flex: 1 }}
                >
                  <Text
                    style={[
                      styles.taskTitle,
                      {
                        color: task.done ? theme.textMuted : theme.text,
                        textDecorationLine: task.done ? 'line-through' : 'none',
                      },
                    ]}
                  >
                    {task.title}
                  </Text>
                  <Text style={[styles.taskDue, { color: theme.textSecondary }]}>
                    Due: {task.due}
                  </Text>
                </TouchableOpacity>

                <Badge
                  label={task.priority}
                  status={task.priority === 'High' ? 'danger' : 'warning'}
                />

                <TouchableOpacity
                  onPress={() => deleteTask(task.id)}
                  style={styles.deleteBtn}
                >
                  <Trash2 size={16} color={theme.textMuted} />
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>

        {/* Add Task Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create New Task"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Task Description *"
              placeholder="e.g. Prepare monthly HR headcount report"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />
            <Input
              label="Due Date"
              placeholder="e.g. Today, Tomorrow, Sep 28"
              value={taskDue}
              onChangeText={setTaskDue}
            />
            <Input
              label="Priority (High, Medium, Low)"
              placeholder="Medium"
              value={taskPriority}
              onChangeText={setTaskPriority}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Add to Checklist"
                variant="primary"
                size="lg"
                onPress={handleAddTask}
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
  taskRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  taskTitle: { fontSize: 14, fontWeight: '600' },
  taskDue: { fontSize: 11, marginTop: 2 },
  deleteBtn: {
    padding: 6,
    borderRadius: borderRadius.sm,
  },
});
