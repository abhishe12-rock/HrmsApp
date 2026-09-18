import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Clock, Plus } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { ShiftSchedule } from '../../types';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SEED_SHIFTS: ShiftSchedule[] = [
  { id: 'shift-1', organizationId: 'org-1', name: 'General Day Shift', startTime: '09:00 AM', endTime: '06:00 PM', breakDurationMinutes: 60, graceTimeMinutes: 15, color: '#3B82F6' },
  { id: 'shift-2', organizationId: 'org-1', name: 'Early Morning Shift', startTime: '07:00 AM', endTime: '03:30 PM', breakDurationMinutes: 45, graceTimeMinutes: 10, color: '#10B981' },
  { id: 'shift-3', organizationId: 'org-1', name: 'Afternoon / US Shift', startTime: '02:00 PM', endTime: '11:00 PM', breakDurationMinutes: 60, graceTimeMinutes: 15, color: '#F59E0B' },
  { id: 'shift-4', organizationId: 'org-1', name: 'Night Shift', startTime: '10:00 PM', endTime: '06:30 AM', breakDurationMinutes: 60, graceTimeMinutes: 15, color: '#8B5CF6' },
];

export const ShiftScheduleScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [shifts, setShifts] = useState<ShiftSchedule[]>(() => SEED_SHIFTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [shiftName, setShiftName] = useState('');
  const [startTime, setStartTime] = useState('08:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [breakMin, setBreakMin] = useState('45');

  const handleCreateShift = () => {
    if (!shiftName.trim()) {
      Alert.alert('Validation Error', 'Please enter a shift schedule name.');
      return;
    }
    const newShift: ShiftSchedule = {
      id: `shift_${Date.now()}`,
      organizationId: 'org-1',
      name: shiftName.trim(),
      startTime: startTime.trim() || '09:00 AM',
      endTime: endTime.trim() || '06:00 PM',
      breakDurationMinutes: parseInt(breakMin, 10) || 60,
      graceTimeMinutes: 15,
      color: colors.primary,
    };
    setShifts([newShift, ...shifts]);
    setModalOpen(false);
    setShiftName('');
    Alert.alert('Success', `Shift "${newShift.name}" created!`);
  };

  return (
    <AppLayout
      title="Shifts"
      currentScreen="ShiftSchedule"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Shift Schedules</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Configured workforce working hours
            </Text>
          </View>
          <Button
            title="New Shift"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {shifts.map(shift => (
            <Card key={shift.id}>
              <View style={styles.shiftHeader}>
                <View style={[styles.iconBox, { backgroundColor: `${shift.color || colors.primary}15` }]}>
                  <Clock size={20} color={shift.color || colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.shiftName, { color: theme.text }]}>{shift.name}</Text>
                  <Text style={[styles.shiftHours, { color: colors.primary }]}>
                    {shift.startTime} - {shift.endTime}
                  </Text>
                  <Text style={[styles.shiftDetails, { color: theme.textSecondary }]}>
                    Break: {shift.breakDurationMinutes}m • Grace period: {shift.graceTimeMinutes}m
                  </Text>
                </View>
                <Badge label="Active" status="active" />
              </View>
            </Card>
          ))}
        </View>

        {/* Create Shift Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Configure New Shift"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Shift Name *"
              placeholder="e.g. Weekend Support Shift"
              value={shiftName}
              onChangeText={setShiftName}
            />
            <Input
              label="Start Time"
              placeholder="e.g. 08:30 AM"
              value={startTime}
              onChangeText={setStartTime}
            />
            <Input
              label="End Time"
              placeholder="e.g. 05:30 PM"
              value={endTime}
              onChangeText={setEndTime}
            />
            <Input
              label="Break Duration (Minutes)"
              placeholder="60"
              keyboardType="numeric"
              value={breakMin}
              onChangeText={setBreakMin}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Save Shift Schedule"
                variant="primary"
                size="lg"
                onPress={handleCreateShift}
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
  shiftHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shiftName: { fontSize: 14, fontWeight: '700' },
  shiftHours: { fontSize: 13, fontWeight: '700', marginTop: 1 },
  shiftDetails: { fontSize: 11, marginTop: 2 },
});
