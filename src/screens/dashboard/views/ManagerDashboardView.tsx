import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {
  Users,
  Check,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Check as CheckIcon,
  X as XIcon,
} from 'lucide-react-native';
import { useAppStore } from '../../../store/useAppStore';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { WorkTimerAndGreetingHero } from '../../../components/dashboard/WorkTimerAndGreetingHero';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  onNavigate: (screen: string) => void;
}

// ── 1. Stat Cards Data ────────────────────────────────────────────────────────
const MANAGER_STAT_CARDS = [
  {
    id: '1',
    label: 'My Team',
    value: '14',
    badge: '+2 new',
    badgeBg: '#ECFDF5',
    badgeColor: '#10B981',
    sub: 'Engineering Squad',
    icon: 'users',
    iconColor: '#2563EB',
    iconBg: '#EFF6FF',
  },
  {
    id: '2',
    label: 'Present Today',
    value: '12',
    badge: '86%',
    badgeBg: '#ECFDF5',
    badgeColor: '#10B981',
    sub: '2 On Leave',
    icon: 'check',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
  },
  {
    id: '3',
    label: 'On Leave',
    value: '2',
    badge: '-1 vs last week',
    badgeBg: '#FEF2F2',
    badgeColor: '#EF4444',
    sub: 'Sophia & James',
    icon: 'calendar',
    iconColor: '#EF4444',
    iconBg: '#FEF2F2',
  },
  {
    id: '4',
    label: 'Leave Approvals',
    value: '3',
    badge: 'Action Required',
    badgeBg: '#FFFBEB',
    badgeColor: '#D97706',
    sub: 'Pending Review',
    icon: 'clock',
    iconColor: '#F59E0B',
    iconBg: '#FFFBEB',
  },
  {
    id: '5',
    label: 'Pending Timesheets',
    value: '4',
    badge: '4 to verify',
    badgeBg: '#FFFBEB',
    badgeColor: '#D97706',
    sub: 'Due Friday',
    icon: 'timesheet',
    iconColor: '#8B5CF6',
    iconBg: '#F5F3FF',
  },
  {
    id: '6',
    label: 'Team Performance',
    value: '92%',
    badge: '+4% vs Q1',
    badgeBg: '#ECFDF5',
    badgeColor: '#10B981',
    sub: 'Sprint on track',
    icon: 'trending',
    iconColor: '#06B6D4',
    iconBg: '#ECFEFF',
  },
];

// ── 2. Team Attendance Data ──────────────────────────────────────────────────
const ATTENDANCE_DAYS = [
  { day: 'Mon', office: 11, remote: 8, leave: 1 },
  { day: 'Tue', office: 14, remote: 7, leave: 0 },
  { day: 'Wed', office: 10, remote: 9, leave: 2 },
  { day: 'Thu', office: 11, remote: 8, leave: 1 },
  { day: 'Fri', office: 10, remote: 9, leave: 2 },
];

// ── 3. Active Sprint OKRs ────────────────────────────────────────────────────
const SPRINT_OKRS = [
  {
    id: '1',
    title: 'Migrate Core API to Microservices',
    progress: 85,
    barColor: '#2563EB',
    assignee: 'Alex Rivera',
    due: 'Due May 30',
  },
  {
    id: '2',
    title: 'Optimize Database Query Indexes',
    progress: 65,
    barColor: '#8B5CF6',
    assignee: 'Liam Vance',
    due: 'Due Jun 05',
  },
  {
    id: '3',
    title: 'Security Pen Testing Fixes',
    progress: 95,
    barColor: '#10B981',
    assignee: 'Sophia Davis',
    due: 'Due May 24',
  },
  {
    id: '4',
    title: 'Implement Realtime WebSockets',
    progress: 40,
    barColor: '#F59E0B',
    assignee: 'David Anderson',
    due: 'Due Jun 15',
  },
];

// ── 4. Direct Reports ────────────────────────────────────────────────────────
const DIRECT_REPORTS = [
  {
    id: '1',
    name: 'Sophia Davis',
    role: 'Senior Backend Engineer',
    status: 'Online',
    statusBg: '#ECFDF5',
    statusColor: '#10B981',
    hours: '38.5 hrs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Liam Vance',
    role: 'Fullstack Developer',
    status: 'In Meeting',
    statusBg: '#EFF6FF',
    statusColor: '#2563EB',
    hours: '40.0 hrs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Alex Rivera',
    role: 'DevOps Architect',
    status: 'Online',
    statusBg: '#ECFDF5',
    statusColor: '#10B981',
    hours: '37.0 hrs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'James Miller',
    role: 'Frontend Specialist',
    status: 'On Leave',
    statusBg: '#FEF2F2',
    statusColor: '#EF4444',
    hours: '0 hrs',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'Emily Clark',
    role: 'QA Automation Engineer',
    status: 'Online',
    statusBg: '#ECFDF5',
    statusColor: '#10B981',
    hours: '39.0 hrs',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
];

// ── 5. Pending Leave Approvals ───────────────────────────────────────────────
const INITIAL_LEAVE_APPROVALS = [
  {
    id: '1',
    name: 'Sophia Davis',
    type: 'Annual Leave',
    dates: 'May 28 - May 30 (3 days)',
    reason: '"Family vacation"',
    status: 'pending',
  },
  {
    id: '2',
    name: 'Alex Rivera',
    type: 'Sick Leave',
    dates: 'May 23 (1 day)',
    reason: '"Doctor appointment"',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Liam Vance',
    type: 'Casual Leave',
    dates: 'Jun 02 (1 day)',
    reason: '"Personal work"',
    status: 'pending',
  },
];

export const ManagerDashboardView: React.FC<Props> = ({ onNavigate }) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [dotIdx, setDotIdx] = useState(0);
  const [leaveApprovals, setLeaveApprovals] = useState(INITIAL_LEAVE_APPROVALS);

  const GAP = 10;
  const CARD_W = SCREEN_WIDTH * 0.44;

  const handleApprove = (id: string) => {
    setLeaveApprovals(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'approved' } : item))
    );
  };

  const handleReject = (id: string) => {
    setLeaveApprovals(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
  };

  const pendingCount = leaveApprovals.filter(a => a.status === 'pending').length;

  return (
    <View style={styles.container}>
      {/* ── 1. Hero: Greeting & Work Timer ─────────────────────────────── */}
      <WorkTimerAndGreetingHero
        onNavigate={onNavigate}
        defaultName="Amit Verma"
        defaultDesignation="Engineering Manager"
        defaultDepartment="Engineering"
        defaultAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
        primaryActionText="+ Assign Goal"
        onPrimaryAction={() => onNavigate('Performance')}
        secondaryActionText="Team Attendance"
        secondaryActionIcon="timesheets"
        onSecondaryAction={() => onNavigate('Attendance')}
      />

      {/* ── 2. Stat Cards (Swipeable on Mobile) ─────────────────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_W + GAP}
        contentContainerStyle={{ gap: GAP, paddingRight: 20 }}
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / (CARD_W + GAP));
          setDotIdx(Math.max(0, Math.min(idx, MANAGER_STAT_CARDS.length - 1)));
        }}
      >
        {MANAGER_STAT_CARDS.map(card => {
          let IconComp = Users;
          if (card.icon === 'check') IconComp = Check;
          if (card.icon === 'calendar') IconComp = Calendar;
          if (card.icon === 'clock') IconComp = Clock;
          if (card.icon === 'timesheet') IconComp = CheckCircle2;
          if (card.icon === 'trending') IconComp = TrendingUp;

          return (
            <View
              key={card.id}
              style={[
                styles.statCard,
                {
                  width: CARD_W,
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              {/* Row 1: Icon + Title */}
              <View style={styles.statCardHeader}>
                <View style={[styles.statIconBox, { backgroundColor: card.iconBg }]}>
                  <IconComp size={15} color={card.iconColor} />
                </View>
                <Text
                  style={[
                    styles.statLabel,
                    { color: isDarkMode ? '#94A3B8' : '#475569' },
                  ]}
                  numberOfLines={1}
                >
                  {card.label}
                </Text>
              </View>

              {/* Row 2: Value + Badge */}
              <View style={styles.statValueRow}>
                <Text
                  style={[
                    styles.statValue,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  {card.value}
                </Text>
                <View style={[styles.statBadge, { backgroundColor: card.badgeBg }]}>
                  <Text style={[styles.statBadgeText, { color: card.badgeColor }]}>
                    {card.badge}
                  </Text>
                </View>
              </View>

              {/* Row 3: Subtitle */}
              <Text
                style={[
                  styles.statSub,
                  { color: isDarkMode ? '#64748B' : '#94A3B8' },
                ]}
                numberOfLines={1}
              >
                {card.sub}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Dot Indicators */}
      <View style={styles.dotsRow}>
        {MANAGER_STAT_CARDS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor:
                  dotIdx === i
                    ? colors.primary
                    : isDarkMode
                    ? '#334155'
                    : '#CBD5E1',
                width: dotIdx === i ? 16 : 6,
              },
            ]}
          />
        ))}
      </View>

      {/* ── 3. Middle Section: Charts & OKRs ────────────────────────────── */}
      <View style={styles.middleSection}>
        {/* Left Widget: Team Attendance & Working Modes */}
        <View
          style={[
            styles.widgetCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.widgetHeaderRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onNavigate('Attendance')}
              style={{ flex: 1 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text
                  style={[
                    styles.widgetTitle,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  Team Attendance & Working Modes
                </Text>
                <ArrowUpRight size={15} color="#2563EB" />
              </View>
              <Text
                style={[
                  styles.widgetSubtitle,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' },
                ]}
              >
                Direct reports daily attendance (Mon - Fri) • Tap to view tracker
              </Text>
            </TouchableOpacity>

            {/* Legend */}
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                <Text style={styles.legendText}>Office</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#6366F1' }]} />
                <Text style={styles.legendText}>Remote</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.legendText}>Leave</Text>
              </View>
            </View>
          </View>

          {/* Bar Chart */}
          <View style={styles.barChartContainer}>
            {/* Y Axis */}
            <View style={styles.chartYAxis}>
              {['15', '8', '4', '0'].map(val => (
                <Text
                  key={val}
                  style={[
                    styles.chartAxisLabel,
                    { color: isDarkMode ? '#64748B' : '#94A3B8' },
                  ]}
                >
                  {val}
                </Text>
              ))}
            </View>

            {/* Plot Area */}
            <View style={styles.chartPlotArea}>
              {/* Horizontal Grid lines */}
              {[0, 0.33, 0.67, 1].map((f, i) => (
                <View
                  key={i}
                  style={[
                    styles.chartGridLine,
                    {
                      top: f * 110,
                      backgroundColor: isDarkMode
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(0,0,0,0.05)',
                    },
                  ]}
                />
              ))}

              {/* Grouped Bars per Day */}
              <View style={styles.barsRow}>
                {ATTENDANCE_DAYS.map(dayItem => {
                  const maxH = 110;
                  const officeH = Math.min(maxH, (dayItem.office / 15) * maxH);
                  const remoteH = Math.min(maxH, (dayItem.remote / 15) * maxH);
                  const leaveH = Math.min(maxH, (dayItem.leave / 15) * maxH);

                  return (
                    <View key={dayItem.day} style={styles.barGroup}>
                      <View style={styles.barPillarGroup}>
                        {/* Office Bar */}
                        <View
                          style={[
                            styles.barPillar,
                            {
                              height: officeH,
                              backgroundColor: '#2563EB',
                            },
                          ]}
                        />
                        {/* Remote Bar */}
                        <View
                          style={[
                            styles.barPillar,
                            {
                              height: remoteH,
                              backgroundColor: '#6366F1',
                            },
                          ]}
                        />
                        {/* Leave Bar */}
                        {leaveH > 0 && (
                          <View
                            style={[
                              styles.barPillar,
                              {
                                height: leaveH,
                                backgroundColor: '#EF4444',
                              },
                            ]}
                          />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.barDayLabel,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' },
                        ]}
                      >
                        {dayItem.day}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Right Widget: Active Team Sprint OKRs */}
        <View
          style={[
            styles.widgetCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.widgetHeaderRow}>
            <Text
              style={[
                styles.widgetTitle,
                { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
              ]}
            >
              Active Team Sprint OKRs
            </Text>
            <View style={styles.q2Badge}>
              <Text style={styles.q2BadgeText}>Q2 Objectives</Text>
            </View>
          </View>

          {/* OKR List */}
          <View style={styles.okrList}>
            {SPRINT_OKRS.map(okr => (
              <View key={okr.id} style={styles.okrItem}>
                <View style={styles.okrTitleRow}>
                  <Text
                    style={[
                      styles.okrTitle,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                    numberOfLines={1}
                  >
                    {okr.title}
                  </Text>
                  <Text style={styles.okrPercent}>{okr.progress}%</Text>
                </View>

                {/* Progress Track */}
                <View
                  style={[
                    styles.progressTrack,
                    {
                      backgroundColor: isDarkMode ? '#334155' : '#F1F5F9',
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${okr.progress}%`,
                        backgroundColor: okr.barColor,
                      },
                    ]}
                  />
                </View>

                {/* Meta footer */}
                <View style={styles.okrMetaRow}>
                  <Text
                    style={[
                      styles.okrMetaText,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    Assignee: {okr.assignee}
                  </Text>
                  <Text
                    style={[
                      styles.okrMetaText,
                      { color: isDarkMode ? '#64748B' : '#94A3B8' },
                    ]}
                  >
                    {okr.due}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ── 4. Bottom Section: Direct Reports & Pending Approvals ──────── */}
      <View style={styles.bottomSection}>
        {/* Left Section: My Direct Reports */}
        <View
          style={[
            styles.bottomCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.bottomCardHeader}>
            <Text
              style={[
                styles.bottomCardTitle,
                { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
              ]}
            >
              My Direct Reports (Engineering Squad)
            </Text>
            <TouchableOpacity
              style={styles.viewAllRow}
              onPress={() => onNavigate('EmployeesList')}
            >
              <Text style={styles.viewAllText}>View All 14</Text>
              <ArrowUpRight size={13} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* List of Direct Reports */}
          <View style={styles.reportsList}>
            {DIRECT_REPORTS.map((report, index) => (
              <View
                key={report.id}
                style={[
                  styles.reportItem,
                  index < DIRECT_REPORTS.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: isDarkMode ? '#334155' : '#F1F5F9',
                  },
                ]}
              >
                {/* Avatar */}
                <Image
                  source={{ uri: report.avatar }}
                  style={styles.reportAvatar}
                />

                {/* Name and Role */}
                <View style={styles.reportInfo}>
                  <Text
                    style={[
                      styles.reportName,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    {report.name}
                  </Text>
                  <Text
                    style={[
                      styles.reportRole,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    {report.role}
                  </Text>
                </View>

                {/* Status Badge */}
                <View
                  style={[
                    styles.reportStatusBadge,
                    { backgroundColor: report.statusBg },
                  ]}
                >
                  <Text
                    style={[
                      styles.reportStatusText,
                      { color: report.statusColor },
                    ]}
                  >
                    {report.status}
                  </Text>
                </View>

                {/* Hours */}
                <Text
                  style={[
                    styles.reportHours,
                    { color: isDarkMode ? '#94A3B8' : '#475569' },
                  ]}
                >
                  {report.hours}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Right Section: Pending Team Leave Approvals */}
        <View
          style={[
            styles.bottomCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          <View style={styles.bottomCardHeader}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onNavigate('LeaveRequests')}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Text
                style={[
                  styles.bottomCardTitle,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                Pending Team Leave Approvals
              </Text>
              <ArrowUpRight size={14} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onNavigate('LeaveRequests')}
              style={styles.pendingBadge}
            >
              <Text style={styles.pendingBadgeText}>
                {pendingCount} Pending
              </Text>
            </TouchableOpacity>
          </View>

          {/* Leave Cards */}
          <View style={styles.leaveCardsContainer}>
            {leaveApprovals.map(approval => {
              const isResolved = approval.status !== 'pending';

              return (
                <View
                  key={approval.id}
                  style={[
                    styles.leaveApprovalCard,
                    {
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    },
                  ]}
                >
                  {/* Top Row: Name + Leave Type Badge */}
                  <View style={styles.leaveCardTopRow}>
                    <Text
                      style={[
                        styles.leaveApplicantName,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      {approval.name}
                    </Text>
                    <View style={styles.leaveTypeBadge}>
                      <Text style={styles.leaveTypeBadgeText}>
                        {approval.type}
                      </Text>
                    </View>
                  </View>

                  {/* Dates & Reason */}
                  <Text
                    style={[
                      styles.leaveDatesText,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    {approval.dates}
                  </Text>
                  <Text
                    style={[
                      styles.leaveReasonText,
                      { color: isDarkMode ? '#64748B' : '#94A3B8' },
                    ]}
                  >
                    {approval.reason}
                  </Text>

                  {/* Action Buttons: Reject & Approve */}
                  {approval.status === 'pending' ? (
                    <View style={styles.leaveCardActions}>
                      <TouchableOpacity
                        style={[
                          styles.rejectBtn,
                          {
                            backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                          },
                        ]}
                        activeOpacity={0.8}
                        onPress={() => handleReject(approval.id)}
                      >
                        <XIcon size={13} color="#EF4444" />
                        <Text style={styles.rejectBtnText}>Reject</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.approveBtn}
                        activeOpacity={0.8}
                        onPress={() => handleApprove(approval.id)}
                      >
                        <CheckIcon size={13} color="#FFFFFF" />
                        <Text style={styles.approveBtnText}>Approve</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.resolvedStatusRow}>
                      <Text
                        style={[
                          styles.resolvedStatusText,
                          {
                            color:
                              approval.status === 'approved'
                                ? '#10B981'
                                : '#EF4444',
                          },
                        ]}
                      >
                        {approval.status === 'approved'
                          ? '✓ Approved by You'
                          : '✕ Rejected'}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 40,
  },

  // ── Stat Cards ───────────────────────────────────────────────────
  statCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 8,
  },
  statIconBox: {
    width: 26,
    height: 26,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    flex: 1,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  statBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 12,
    marginBottom: 18,
  },
  dot: {
    height: 5,
    borderRadius: 3,
  },

  // ── Middle Section: Charts & OKRs ────────────────────────────────
  middleSection: {
    width: '100%',
    gap: 16,
    marginBottom: 16,
  },
  widgetCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  widgetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
    flexWrap: 'wrap',
    gap: 8,
  },
  widgetTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  widgetSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  legendText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },

  // Bar chart styles
  barChartContainer: {
    flexDirection: 'row',
    height: 140,
    marginTop: 6,
  },
  chartYAxis: {
    width: 22,
    height: 110,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  chartAxisLabel: {
    fontSize: 9,
    fontWeight: '600',
  },
  chartPlotArea: {
    flex: 1,
    height: 140,
    position: 'relative',
  },
  chartGridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  barsRow: {
    flexDirection: 'row',
    height: 110,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
  },
  barGroup: {
    alignItems: 'center',
    gap: 6,
  },
  barPillarGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 110,
  },
  barPillar: {
    width: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  barDayLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },

  // OKRs styles
  q2Badge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  q2BadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  okrList: {
    gap: 14,
    marginTop: 4,
  },
  okrItem: {
    gap: 6,
  },
  okrTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  okrTitle: {
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
    paddingRight: 8,
  },
  okrPercent: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  okrMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  okrMetaText: {
    fontSize: 10,
    fontWeight: '500',
  },

  // ── Bottom Section: Direct Reports & Leave Approvals ─────────────
  bottomSection: {
    width: '100%',
    gap: 16,
  },
  bottomCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bottomCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  bottomCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  reportsList: {
    gap: 2,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    gap: 10,
  },
  reportAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#CBD5E1',
  },
  reportInfo: {
    flex: 1,
  },
  reportName: {
    fontSize: 13,
    fontWeight: '700',
  },
  reportRole: {
    fontSize: 11,
    marginTop: 1,
  },
  reportStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  reportStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  reportHours: {
    fontSize: 11,
    fontWeight: '600',
    minWidth: 46,
    textAlign: 'right',
  },

  // Leave approval cards styles
  pendingBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  pendingBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  leaveCardsContainer: {
    gap: 10,
  },
  leaveApprovalCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  leaveCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  leaveApplicantName: {
    fontSize: 13,
    fontWeight: '800',
  },
  leaveTypeBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  leaveTypeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  leaveDatesText: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  leaveReasonText: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  leaveCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  rejectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  rejectBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
  },
  approveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  approveBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resolvedStatusRow: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  resolvedStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
