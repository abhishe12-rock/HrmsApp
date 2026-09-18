import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarDays, Plus, Shield, CheckCircle, Clock } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_LEAVE_REQUESTS } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { LeaveRequest } from '../../types';
import { formatDate } from '../../utils';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LeaveManagementScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [requests, setRequests] = useState<LeaveRequest[]>(() => INITIAL_LEAVE_REQUESTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual');
  const [startDate, setStartDate] = useState('2024-10-10');
  const [endDate, setEndDate] = useState('2024-10-12');
  const [reason, setReason] = useState('');

  const handleApply = () => {
    if (!reason) return;
    const newReq: LeaveRequest = {
      id: `req_${Date.now()}`,
      organizationId: 'org-1',
      employeeId: 'emp-1',
      employeeCode: 'EMP001',
      employeeName: 'Rahul Sharma',
      employeeAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      department: 'Engineering',
      leaveType: leaveType as any,
      startDate,
      endDate,
      days: 3,
      reason,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setRequests([newReq, ...requests]);
    setModalOpen(false);
    setReason('');
  };

  return (
    <AppLayout
      title="Leave Management"
      currentScreen="LeaveManagement"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Leave & Balances</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Paid time off balances & request history
            </Text>
          </View>
          <Button
            title="Apply"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        {/* Leave Balances Grid */}
        <View style={styles.statsRow}>
          <StatCard
            title="Annual Leave"
            value="12 / 18"
            subtitle="Days Available"
            icon={<CalendarDays size={16} color={colors.primary} />}
          />
          <StatCard
            title="Casual Leave"
            value="5 / 8"
            subtitle="Days Available"
            icon={<Clock size={16} color={colors.info} />}
            iconColor={colors.info}
          />
        </View>

        <View style={styles.statsRow}>
          <StatCard
            title="Sick Leave"
            value="8 / 10"
            subtitle="Days Available"
            icon={<Shield size={16} color={colors.warning} />}
            iconColor={colors.warning}
          />
          <StatCard
            title="Paternity / Mat."
            value="30"
            subtitle="Special Days"
            icon={<CheckCircle size={16} color={colors.success} />}
            iconColor={colors.success}
          />
        </View>

        {/* Recent Leave Requests */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Leave Requests</Text>
        <View style={styles.list}>
          {requests.map(req => (
            <Card key={req.id}>
              <View style={styles.reqHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.reqType, { color: theme.text }]}>
                    {req.leaveType} Leave • {req.days} Days
                  </Text>
                  <Text style={[styles.reqDates, { color: colors.primary }]}>
                    {formatDate(req.startDate)} - {formatDate(req.endDate)}
                  </Text>
                  <Text style={[styles.reqReason, { color: theme.textSecondary }]}>
                    Reason: {req.reason}
                  </Text>
                </View>
                <Badge label={req.status} status={req.status} />
              </View>
            </Card>
          ))}
        </View>

        {/* Apply Leave Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Apply for Time Off"
          subtitle="Submit request to reporting manager"
        >
          <Select
            label="Leave Type"
            value={leaveType}
            onChange={setLeaveType}
            options={[
              { label: 'Annual Paid Leave', value: 'Annual' },
              { label: 'Casual Leave', value: 'Casual' },
              { label: 'Sick / Medical Leave', value: 'Sick' },
              { label: 'Maternity / Paternity', value: 'Maternity/Paternity' },
            ]}
          />

          <Input
            label="Start Date"
            value={startDate}
            onChangeText={setStartDate}
            placeholder="YYYY-MM-DD"
          />

          <Input
            label="End Date"
            value={endDate}
            onChangeText={setEndDate}
            placeholder="YYYY-MM-DD"
          />

          <Input
            label="Reason / Notes"
            value={reason}
            onChangeText={setReason}
            placeholder="Describe reason for leave request..."
            multiline
            numberOfLines={3}
            style={{ height: 75, textAlignVertical: 'top' }}
          />

          <Button
            title="Submit Leave Request"
            onPress={handleApply}
            fullWidth
            style={{ marginTop: spacing.md }}
          />
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
  statsRow: { flexDirection: 'row', gap: spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginVertical: spacing.md },
  list: { gap: spacing.xs },
  reqHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  reqType: { fontSize: 14, fontWeight: '700' },
  reqDates: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  reqReason: { fontSize: 12, marginTop: 4 },
});
