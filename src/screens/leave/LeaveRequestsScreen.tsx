import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  Modal as RNModal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Calendar,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  X,
  Check,
  ChevronDown,
} from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface LeaveApprovalItem {
  id: string;
  employeeName: string;
  department: string;
  appliedDate: string;
  avatar: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const INITIAL_QUEUE: LeaveApprovalItem[] = [
  {
    id: '1',
    employeeName: 'Sarah Wilson',
    department: 'Marketing',
    appliedDate: 'May 18, 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    leaveType: 'Annual Leave',
    startDate: '2024-05-27',
    endDate: '2024-05-29',
    durationDays: 3,
    reason: 'Family vacation and personal travel',
    status: 'Pending',
  },
  {
    id: '2',
    employeeName: 'David Miller',
    department: 'Engineering',
    appliedDate: 'May 16, 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    leaveType: 'Sick Leave',
    startDate: '2024-05-20',
    endDate: '2024-05-21',
    durationDays: 2,
    reason: 'Medical appointment & recovery',
    status: 'Approved',
  },
  {
    id: '3',
    employeeName: 'Elena Rostova',
    department: 'Product',
    appliedDate: 'May 17, 2024',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    leaveType: 'Casual Leave',
    startDate: '2024-05-24',
    endDate: '2024-05-24',
    durationDays: 1,
    reason: 'Attending family celebration',
    status: 'Pending',
  },
  {
    id: '4',
    employeeName: 'Marcus Vance',
    department: 'Operations',
    appliedDate: 'May 19, 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    leaveType: 'Annual Leave',
    startDate: '2024-06-01',
    endDate: '2024-06-05',
    durationDays: 5,
    reason: 'Summer holiday with family',
    status: 'Pending',
  },
  {
    id: '5',
    employeeName: 'Chloe Davis',
    department: 'Sales',
    appliedDate: 'May 10, 2024',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    leaveType: 'Unpaid Leave',
    startDate: '2024-05-15',
    endDate: '2024-05-18',
    durationDays: 4,
    reason: 'Extended personal leave',
    status: 'Rejected',
  },
];

export const LeaveRequestsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [leaveQueue, setLeaveQueue] = useState<LeaveApprovalItem[]>(INITIAL_QUEUE);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'ALL' | 'Pending' | 'Approved' | 'Rejected'>('ALL');

  // Modal State for Apply on Behalf
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState('Annual Leave (Paid)');
  const [formStartDate, setFormStartDate] = useState('27-05-2024');
  const [formEndDate, setFormEndDate] = useState('29-05-2024');
  const [formReason, setFormReason] = useState('');

  // Counts for KPI Cards
  const pendingCount = useMemo(
    () => leaveQueue.filter(item => item.status === 'Pending').length,
    [leaveQueue]
  );
  const approvedCount = useMemo(
    () => leaveQueue.filter(item => item.status === 'Approved').length,
    [leaveQueue]
  );
  const rejectedCount = useMemo(
    () => leaveQueue.filter(item => item.status === 'Rejected').length,
    [leaveQueue]
  );

  // Filtered List
  const filteredRequests = useMemo(() => {
    return leaveQueue.filter(item => {
      const matchFilter = filterTab === 'ALL' || item.status === filterTab;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.employeeName.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q) ||
        item.leaveType.toLowerCase().includes(q) ||
        item.reason.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [leaveQueue, filterTab, searchQuery]);

  // Handle Approve
  const handleApprove = (id: string) => {
    setLeaveQueue(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'Approved' } : item))
    );
  };

  // Handle Reject
  const handleReject = (id: string) => {
    setLeaveQueue(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'Rejected' } : item))
    );
  };

  // Handle Submit Application
  const handleSubmitApplication = () => {
    if (!formName.trim()) {
      Alert.alert('Required', 'Please enter employee full name.');
      return;
    }
    if (!formReason.trim()) {
      Alert.alert('Required', 'Please describe the reason for leave.');
      return;
    }

    const newItem: LeaveApprovalItem = {
      id: String(Date.now()),
      employeeName: formName.trim(),
      department: 'Engineering',
      appliedDate: 'May 20, 2024',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      leaveType: formType.replace(' (Paid)', ''),
      startDate: formStartDate,
      endDate: formEndDate,
      durationDays: 3,
      reason: formReason.trim(),
      status: 'Pending',
    };

    setLeaveQueue(prev => [newItem, ...prev]);
    setIsModalOpen(false);
    setFormName('');
    setFormReason('');
    Alert.alert('Application Submitted', `Leave application for ${newItem.employeeName} submitted successfully!`);
  };

  return (
    <AppLayout
      title="Leave Approvals"
      currentScreen="LeaveRequests"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── 1. Top Header Banner: Leave Requests Queue ────────────────── */}
        <View
          style={[
            styles.bannerCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF',
              borderColor: isDarkMode ? '#334155' : '#DBEAFE',
            },
          ]}
        >
          {/* Left: Icon, Title, Pill, Subtitle */}
          <View style={styles.bannerLeftInfo}>
            <View style={styles.bannerIconBox}>
              <Calendar size={22} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.titleWithBadge}>
                <Text
                  style={[
                    styles.bannerTitle,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  Leave Requests Queue
                </Text>
                <View style={styles.pendingPillBadge}>
                  <Text style={styles.pendingPillBadgeText}>
                    {pendingCount} Pending
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.bannerSubtitle,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' },
                ]}
              >
                Review, approve, or reject employee time-off applications and PTO requests.
              </Text>
            </View>
          </View>

          {/* Right: Apply on Behalf Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsModalOpen(true)}
            style={styles.applyBtn}
          >
            <Plus size={15} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={styles.applyBtnText}>Apply on Behalf</Text>
          </TouchableOpacity>
        </View>

        {/* ── 2. Stat Cards (3 Cards Grid) ──────────────────────────────── */}
        <View style={styles.kpiCardsRow}>
          {/* Card 1: PENDING APPROVALS */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiContentCol}>
              <Text style={styles.kpiLabel}>PENDING APPROVALS</Text>
              <Text
                style={[
                  styles.kpiValue,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                {pendingCount}
              </Text>
              <Text style={styles.kpiSub}>Requires manager / HR sign-off</Text>
            </View>
            <View style={[styles.kpiIconBox, { backgroundColor: '#FFFBEB' }]}>
              <Clock size={18} color="#F59E0B" />
            </View>
          </View>

          {/* Card 2: APPROVED THIS MONTH */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiContentCol}>
              <Text style={styles.kpiLabel}>APPROVED THIS MONTH</Text>
              <Text
                style={[
                  styles.kpiValue,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                {approvedCount}
              </Text>
              <Text style={styles.kpiSub}>Scheduled on company calendar</Text>
            </View>
            <View style={[styles.kpiIconBox, { backgroundColor: '#ECFDF5' }]}>
              <CheckCircle2 size={18} color="#10B981" />
            </View>
          </View>

          {/* Card 3: REJECTED / CANCELLED */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiContentCol}>
              <Text style={styles.kpiLabel}>REJECTED / CANCELLED</Text>
              <Text
                style={[
                  styles.kpiValue,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                {rejectedCount}
              </Text>
              <Text style={styles.kpiSub}>Quota restored to balance</Text>
            </View>
            <View style={[styles.kpiIconBox, { backgroundColor: '#FEF2F2' }]}>
              <XCircle size={18} color="#EF4444" />
            </View>
          </View>
        </View>

        {/* ── 3. Search & Filter Bar ────────────────────────────────────── */}
        <View
          style={[
            styles.toolbarRow,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          {/* Search Input Box */}
          <View
            style={[
              styles.searchInputBox,
              {
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <Search size={15} color="#94A3B8" style={{ marginRight: 8 }} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search employee or leave reason..."
              placeholderTextColor="#94A3B8"
              style={[
                styles.searchTextInput,
                { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
              ]}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={14} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* Segmented Filter Pills */}
          <View style={styles.filterPillsGroup}>
            {(['ALL', 'Pending', 'Approved', 'Rejected'] as const).map(tab => {
              const isActive = filterTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setFilterTab(tab)}
                  style={[
                    styles.tabPill,
                    isActive && styles.tabPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabPillText,
                      isActive && styles.tabPillTextActive,
                      !isActive && {
                        color: isDarkMode ? '#94A3B8' : '#64748B',
                      },
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── 4. Leave Requests Table ───────────────────────────────────── */}
        <View
          style={[
            styles.tableCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={{ minWidth: 860 }}>
              {/* Header */}
              <View
                style={[
                  styles.tableHeaderRow,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0',
                  },
                ]}
              >
                <Text style={[styles.thCol, { width: 220 }]}>EMPLOYEE</Text>
                <Text style={[styles.thCol, { width: 140 }]}>LEAVE TYPE</Text>
                <Text style={[styles.thCol, { width: 180 }]}>DATES & DURATION</Text>
                <Text style={[styles.thCol, { width: 220 }]}>REASON</Text>
                <Text style={[styles.thCol, { width: 110 }]}>STATUS</Text>
                <Text style={[styles.thCol, { width: 140, textAlign: 'right' }]}>
                  ACTIONS
                </Text>
              </View>

              {/* Rows */}
              {filteredRequests.map((item, index) => {
                const isPending = item.status === 'Pending';
                const isApproved = item.status === 'Approved';
                const isRejected = item.status === 'Rejected';

                return (
                  <View
                    key={item.id}
                    style={[
                      styles.tableRow,
                      index !== filteredRequests.length - 1 && {
                        borderBottomWidth: 1,
                        borderBottomColor: isDarkMode ? '#334155' : '#F1F5F9',
                      },
                    ]}
                  >
                    {/* Employee Col: Avatar + Name + Sub */}
                    <View style={[styles.tdCol, { width: 220, flexDirection: 'row', alignItems: 'center' }]}>
                      <Image source={{ uri: item.avatar }} style={styles.empAvatar} />
                      <View style={{ marginLeft: 10, flex: 1 }}>
                        <Text
                          style={[
                            styles.empName,
                            { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                          ]}
                          numberOfLines={1}
                        >
                          {item.employeeName}
                        </Text>
                        <Text style={styles.empSubText} numberOfLines={1}>
                          {item.department} • Applied {item.appliedDate}
                        </Text>
                      </View>
                    </View>

                    {/* Leave Type Col */}
                    <View style={[styles.tdCol, { width: 140 }]}>
                      <Text
                        style={[
                          styles.leaveTypeText,
                          { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                        ]}
                      >
                        {item.leaveType}
                      </Text>
                    </View>

                    {/* Dates & Duration Col */}
                    <View style={[styles.tdCol, { width: 180 }]}>
                      <Text
                        style={[
                          styles.datesRangeText,
                          { color: isDarkMode ? '#CBD5E1' : '#334155' },
                        ]}
                      >
                        {item.startDate} to {item.endDate}
                      </Text>
                      <Text style={styles.durationBlueText}>
                        {item.durationDays} day(s)
                      </Text>
                    </View>

                    {/* Reason Col */}
                    <View style={[styles.tdCol, { width: 220 }]}>
                      <Text
                        style={[
                          styles.reasonText,
                          { color: isDarkMode ? '#94A3B8' : '#475569' },
                        ]}
                        numberOfLines={2}
                      >
                        {item.reason}
                      </Text>
                    </View>

                    {/* Status Pill Badge */}
                    <View style={[styles.tdCol, { width: 110 }]}>
                      <View
                        style={[
                          styles.statusBadge,
                          isPending && styles.statusBadgePending,
                          isApproved && styles.statusBadgeApproved,
                          isRejected && styles.statusBadgeRejected,
                        ]}
                      >
                        <View
                          style={[
                            styles.statusDot,
                            isPending && { backgroundColor: '#F59E0B' },
                            isApproved && { backgroundColor: '#10B981' },
                            isRejected && { backgroundColor: '#EF4444' },
                          ]}
                        />
                        <Text
                          style={[
                            styles.statusBadgeText,
                            isPending && { color: '#D97706' },
                            isApproved && { color: '#059669' },
                            isRejected && { color: '#DC2626' },
                          ]}
                        >
                          {item.status}
                        </Text>
                      </View>
                    </View>

                    {/* Actions Col */}
                    <View style={[styles.tdCol, { width: 140, alignItems: 'flex-end', justifyContent: 'center' }]}>
                      {isPending ? (
                        <View style={styles.actionButtonsRow}>
                          <TouchableOpacity
                            onPress={() => handleApprove(item.id)}
                            style={styles.approveBtn}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.approveBtnText}>Approve</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => handleReject(item.id)}
                            style={styles.rejectBtn}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.rejectBtnText}>Reject</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <Text style={styles.processedText}>Processed</Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* ── 5. Screenshot 3 Modal: Submit Leave Application ───────────── */}
      <RNModal
        visible={isModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <Text
                style={[
                  styles.modalTitle,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                Submit Leave Application
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalOpen(false)}
                style={styles.modalCloseBtn}
              >
                <X size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Modal Body Fields */}
            <View style={styles.modalBody}>
              {/* Field 1: Employee Full Name */}
              <Text style={styles.modalLabel}>Employee Full Name</Text>
              <TextInput
                value={formName}
                onChangeText={setFormName}
                placeholder="e.g. Sarah Wilson"
                placeholderTextColor="#94A3B8"
                style={[
                  styles.modalTextInput,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                    borderColor: isDarkMode ? '#334155' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#0F172A',
                  },
                ]}
              />

              {/* Field 2: Leave Type */}
              <Text style={styles.modalLabel}>Leave Type</Text>
              <View style={styles.leaveTypeOptionsRow}>
                {[
                  'Annual Leave (Paid)',
                  'Sick Leave',
                  'Casual Leave',
                  'Unpaid Leave',
                ].map(type => {
                  const isSelected = formType === type;
                  return (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setFormType(type)}
                      style={[
                        styles.leaveTypeOptionPill,
                        isSelected && styles.leaveTypeOptionPillActive,
                        !isSelected && {
                          backgroundColor: isDarkMode ? '#0F172A' : '#F1F5F9',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.leaveTypeOptionText,
                          isSelected && styles.leaveTypeOptionTextActive,
                          !isSelected && {
                            color: isDarkMode ? '#CBD5E1' : '#475569',
                          },
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Field 3 & 4: Start Date & End Date */}
              <View style={styles.datesRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.modalLabel}>Start Date</Text>
                  <View
                    style={[
                      styles.datePickerInputBox,
                      {
                        backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                        borderColor: isDarkMode ? '#334155' : '#CBD5E1',
                      },
                    ]}
                  >
                    <TextInput
                      value={formStartDate}
                      onChangeText={setFormStartDate}
                      style={[
                        styles.dateTextInput,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    />
                    <CalendarDays size={16} color="#64748B" />
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.modalLabel}>End Date</Text>
                  <View
                    style={[
                      styles.datePickerInputBox,
                      {
                        backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                        borderColor: isDarkMode ? '#334155' : '#CBD5E1',
                      },
                    ]}
                  >
                    <TextInput
                      value={formEndDate}
                      onChangeText={setFormEndDate}
                      style={[
                        styles.dateTextInput,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    />
                    <CalendarDays size={16} color="#64748B" />
                  </View>
                </View>
              </View>

              {/* Field 5: Reason for Leave */}
              <Text style={styles.modalLabel}>Reason for Leave</Text>
              <TextInput
                value={formReason}
                onChangeText={setFormReason}
                placeholder="Describe the purpose of time off"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                style={[
                  styles.modalTextArea,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                    borderColor: isDarkMode ? '#334155' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#0F172A',
                  },
                ]}
              />

              {/* Modal Action Buttons */}
              <View style={styles.modalActionButtonsRow}>
                <TouchableOpacity
                  onPress={() => setIsModalOpen(false)}
                  style={[
                    styles.modalCancelBtn,
                    { borderColor: isDarkMode ? '#334155' : '#E2E8F0' },
                  ]}
                >
                  <Text
                    style={[
                      styles.modalCancelBtnText,
                      { color: isDarkMode ? '#94A3B8' : '#334155' },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSubmitApplication}
                  style={styles.modalSubmitBtn}
                >
                  <Text style={styles.modalSubmitBtnText}>Submit Request</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </RNModal>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 60,
  },

  // ── 1. Header Banner ──────────────────────────────────────────────────────
  bannerCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  bannerLeftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 280,
  },
  bannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  pendingPillBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  pendingPillBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D97706',
  },
  bannerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // ── 2. Stat Cards ─────────────────────────────────────────────────────────
  kpiCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  kpiCard: {
    flex: 1,
    minWidth: 200,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  kpiContentCol: {
    flex: 1,
  },
  kpiLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  kpiSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  kpiIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  // ── 3. Search & Filter Bar ────────────────────────────────────────────────
  toolbarRow: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  searchInputBox: {
    flex: 1,
    minWidth: 240,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 36,
  },
  searchTextInput: {
    flex: 1,
    fontSize: 12,
    padding: 0,
  },
  filterPillsGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  tabPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  tabPillActive: {
    backgroundColor: '#2563EB',
  },
  tabPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabPillTextActive: {
    color: '#FFFFFF',
  },

  // ── 4. Table ──────────────────────────────────────────────────────────────
  tableCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  thCol: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  tdCol: {
    justifyContent: 'center',
  },
  empAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  empName: {
    fontSize: 13,
    fontWeight: '700',
  },
  empSubText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  leaveTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  datesRangeText: {
    fontSize: 12,
  },
  durationBlueText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 2,
  },
  reasonText: {
    fontSize: 12,
    lineHeight: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusBadgePending: {
    backgroundColor: '#FFFBEB',
  },
  statusBadgeApproved: {
    backgroundColor: '#ECFDF5',
  },
  statusBadgeRejected: {
    backgroundColor: '#FEF2F2',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  approveBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  approveBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rejectBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  rejectBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  processedText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },

  // ── 5. Modal ──────────────────────────────────────────────────────────────
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 460,
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalBody: {
    gap: 6,
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
    marginTop: 6,
  },
  modalTextInput: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
  },
  leaveTypeOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  leaveTypeOptionPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  leaveTypeOptionPillActive: {
    backgroundColor: '#2563EB',
  },
  leaveTypeOptionText: {
    fontSize: 11,
    fontWeight: '500',
  },
  leaveTypeOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  datesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  datePickerInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 38,
  },
  dateTextInput: {
    flex: 1,
    fontSize: 12,
    padding: 0,
  },
  modalTextArea: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    minHeight: 70,
    textAlignVertical: 'top',
  },
  modalActionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },
  modalCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
  },
  modalCancelBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modalSubmitBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
  },
  modalSubmitBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
