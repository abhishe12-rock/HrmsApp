import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Users,
  Check,
  CalendarCheck,
  TrendingUp,
  UserPlus,
  Clock,
  Briefcase,
} from 'lucide-react-native';
import { useAppStore } from '../../../store/useAppStore';
import { colors } from '../../../theme/colors';
import { borderRadius, spacing } from '../../../theme/spacing';
import { WorkTimerAndGreetingHero } from '../../../components/dashboard/WorkTimerAndGreetingHero';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  onNavigate: (screen: string) => void;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    id: '1',
    label: 'Total Employees',
    value: '248',
    change: '+12%',
    sub: 'vs last week: 221',
    positive: true,
    iconColor: '#2563EB',
    iconBg:   '#EFF6FF',
    icon: 'users',
    badgeColor: '#10B981',
    badgeBg: '#ECFDF5',
  },
  {
    id: '2',
    label: 'Present Today',
    value: '236',
    change: '+8%',
    sub: 'vs yesterday: 218',
    positive: true,
    iconColor: '#10B981',
    iconBg:   '#ECFDF5',
    icon: 'check',
    badgeColor: '#10B981',
    badgeBg: '#ECFDF5',
  },
  {
    id: '3',
    label: 'On Leave',
    value: '12',
    change: '-4%',
    sub: 'vs yesterday: 16',
    positive: false,
    iconColor: '#EF4444',
    iconBg:   '#FEF2F2',
    icon: 'calendar',
    badgeColor: '#EF4444',
    badgeBg: '#FEF2F2',
  },
  {
    id: '4',
    label: 'New Joiners',
    value: '8',
    change: '+25%',
    sub: 'This Month',
    positive: true,
    iconColor: '#8B5CF6',
    iconBg:   '#F5F3FF',
    icon: 'userplus',
    badgeColor: '#10B981',
    badgeBg: '#ECFDF5',
  },
  {
    id: '5',
    label: 'Pending HR Requests',
    value: '14',
    change: '5 Urgent',
    sub: 'Leaves & Docs',
    positive: false,
    iconColor: '#F59E0B',
    iconBg:   '#FFFBEB',
    icon: 'clock',
    badgeColor: '#F59E0B',
    badgeBg: '#FFFBEB',
  },
  {
    id: '6',
    label: 'Open Positions',
    value: '5',
    change: '+40%',
    sub: 'Active Requisitions',
    positive: true,
    iconColor: '#06B6D4',
    iconBg:   '#ECFEFF',
    icon: 'briefcase',
    badgeColor: '#10B981',
    badgeBg: '#ECFDF5',
  },
];

const TREND_DATA = [80, 85, 70, 130, 110, 125, 120];
const TREND_DAYS = ['20', '21', '22', '23', '24', '25', '26'];

const LEAVE_DATA = [
  { label: 'Approved',  count: 68, pct: 36.6, color: '#2563EB' },
  { label: 'Pending',   count: 48, pct: 25.8, color: '#10B981' },
  { label: 'Rejected',  count: 12, pct: 6.5,  color: '#8B5CF6' },
  { label: 'Cancelled', count: 8,  pct: 4.3,  color: '#F59E0B' },
  { label: 'Others',    count: 50, pct: 26.9, color: '#EF4444' },
];

const JOINERS = [
  { id: '1', name: 'James Miller',  role: 'Marketing',   date: 'May 20, 2024', initials: 'JM', color: '#2563EB' },
  { id: '2', name: 'Sophia Davis',  role: 'Engineering', date: 'May 18, 2024', initials: 'SD', color: '#8B5CF6' },
  { id: '3', name: 'William Brown', role: 'Sales',       date: 'May 16, 2024', initials: 'WB', color: '#F59E0B' },
  { id: '4', name: 'Olivia Wilson', role: 'HR',          date: 'May 14, 2024', initials: 'OW', color: '#10B981' },
  { id: '5', name: 'Liam Garcia',   role: 'Finance',     date: 'May 12, 2024', initials: 'LG', color: '#64748B' },
];

const COMPLIANCE_DOCS = [
  { id: '1', title: 'Tax Exemption W-4 Form',       by: 'James Miller',  ago: '1h ago',  status: 'Pending Review', statusColor: '#F59E0B', statusBg: '#FFFBEB' },
  { id: '2', title: 'Passport / Work Authorization', by: 'Sophia Davis',  ago: '3h ago',  status: 'Pending Review', statusColor: '#F59E0B', statusBg: '#FFFBEB' },
  { id: '3', title: 'Direct Deposit Void Check',    by: 'William Brown', ago: '5h ago',  status: 'Verified',       statusColor: '#10B981', statusBg: '#ECFDF5' },
];

const TEAMS = [
  {
    id: '1', dept: 'ENGINEERING', name: 'Frontend Architecture Core',
    members: 8, lead: 'David Miller', leadRole: 'Principal UI Architect',
    leadInitials: 'DM', leadColor: '#2563EB', okr: 88, accentColor: '#2563EB',
    extraCount: 5,
  },
  {
    id: '2', dept: 'ENGINEERING', name: 'Cloud & DevOps Infrastructure',
    members: 6, lead: 'Michael Chang', leadRole: 'DevOps Lead',
    leadInitials: 'MC', leadColor: '#06B6D4', okr: 94, accentColor: '#06B6D4',
    extraCount: 4,
  },
  {
    id: '3', dept: 'MARKETING', name: 'Growth & Demand Generation',
    members: 7, lead: 'Sarah Wilson', leadRole: 'Growth Marketing Lead',
    leadInitials: 'SW', leadColor: '#10B981', okr: 75, accentColor: '#10B981',
    extraCount: 5,
  },
  {
    id: '4', dept: 'PRODUCT', name: 'Product Design & Research',
    members: 5, lead: 'Elena Rostova', leadRole: 'Design Director',
    leadInitials: 'ER', leadColor: '#EC4899', okr: 82, accentColor: '#EC4899',
    extraCount: 3,
  },
  {
    id: '5', dept: 'SALES', name: 'Enterprise Accounts Team',
    members: 11, lead: 'James Wilson', leadRole: 'VP Sales',
    leadInitials: 'JW', leadColor: '#F59E0B', okr: 91, accentColor: '#F59E0B',
    extraCount: 9,
  },
  {
    id: '6', dept: 'HUMAN RESOURCES', name: 'People Operations & Culture',
    members: 6, lead: 'Rachel Green', leadRole: 'Head of People',
    leadInitials: 'RG', leadColor: '#8B5CF6', okr: 89, accentColor: '#8B5CF6',
    extraCount: 4,
  },
];

// ── Mini Line Chart ───────────────────────────────────────────────────────────
const LineChart: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const CHART_W = SCREEN_WIDTH - spacing.lg * 2 - 32 - 28; // card padding + y-axis
  const CHART_H = 100;
  const max = Math.max(...TREND_DATA);
  const min = Math.min(...TREND_DATA);
  const range = max - min;

  const pts = TREND_DATA.map((v, i) => ({
    x: (i / (TREND_DATA.length - 1)) * CHART_W,
    y: CHART_H - ((v - min) / range) * CHART_H,
  }));

  const lineColor = '#2563EB';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const axisColor = isDark ? '#475569' : '#CBD5E1';
  const labelColor = isDark ? '#64748B' : '#94A3B8';

  return (
    <View style={{ marginTop: spacing.md }}>
      <View style={{ flexDirection: 'row', height: CHART_H }}>
        {/* Y axis */}
        <View style={{ width: 28, justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: 4 }}>
          {['250', '130', '85', '0'].map(l => (
            <Text key={l} style={{ fontSize: 9, color: labelColor }}>{l}</Text>
          ))}
        </View>

        {/* Plot area */}
        <View style={{ flex: 1, height: CHART_H, position: 'relative' }}>
          {/* Grid */}
          {[0, 0.33, 0.67, 1].map((f, i) => (
            <View key={i} style={{ position: 'absolute', top: f * CHART_H, left: 0, right: 0, height: 1, backgroundColor: gridColor }} />
          ))}

          {/* Segments */}
          {pts.slice(0, -1).map((p, i) => {
            const n = pts[i + 1];
            const dx = n.x - p.x;
            const dy = n.y - p.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            return (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  left: p.x,
                  top: p.y - 1.25,
                  width: len,
                  height: 2.5,
                  backgroundColor: lineColor,
                  transformOrigin: 'left center',
                  transform: [{ rotate: `${angle}deg` }],
                }}
              />
            );
          })}

          {/* Dots */}
          {pts.map((p, i) => (
            <View key={i} style={{
              position: 'absolute',
              left: p.x - 4,
              top: p.y - 4,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: lineColor,
              borderWidth: 2,
              borderColor: isDark ? '#0F172A' : '#FFFFFF',
            }} />
          ))}
        </View>
      </View>

      {/* X axis */}
      <View style={{ flexDirection: 'row', marginLeft: 28, marginTop: 6 }}>
        {TREND_DAYS.map((d, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 9, color: labelColor }}>{d}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// ── Donut (css-border trick) ──────────────────────────────────────────────────
const DonutChart: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const SIZE = 108;
  const B = 20;
  const lbl = isDark ? '#F8FAFC' : '#0F172A';
  const sub = isDark ? '#94A3B8' : '#64748B';
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: spacing.md }}>
      {/* Ring */}
      <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          width: SIZE, height: SIZE, borderRadius: SIZE / 2,
          borderWidth: B,
          borderTopColor: '#2563EB',
          borderRightColor: '#10B981',
          borderBottomColor: '#EF4444',
          borderLeftColor: '#F59E0B',
          transform: [{ rotate: '-45deg' }],
        }} />
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: lbl }}>186</Text>
          <Text style={{ fontSize: 9, color: sub }}>Total</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={{ flex: 1, gap: 7 }}>
        {LEAVE_DATA.map(seg => (
          <View key={seg.label} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: seg.color }} />
              <Text style={{ fontSize: 12, color: sub }}>{seg.label}</Text>
            </View>
            <Text style={{ fontSize: 12, color: lbl, fontWeight: '600' }}>
              {seg.count}{'  '}
              <Text style={{ fontSize: 10, color: sub }}>({seg.pct}%)</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
export const HrAdminDashboardView: React.FC<Props> = ({ onNavigate }) => {
  const isDarkMode = useAppStore(s => s.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;
  const [dotIdx, setDotIdx] = useState(0);

  // 2 cards visible + peek of 3rd (about 44% each)
  const GAP = 8;
  // compact card: ~42% screen so 2 are fully visible + peek of 3rd
  const CARD_W = SCREEN_WIDTH * 0.42;

  return (
    <View style={{ width: '100%', paddingBottom: 40 }}>


      {/* Hero: Wishing Banner & Work Timer */}
      <WorkTimerAndGreetingHero onNavigate={onNavigate} />

      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_W + GAP}
        contentContainerStyle={{ gap: GAP, marginTop: spacing.lg, paddingRight: 24 }}
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / (CARD_W + GAP));
          setDotIdx(Math.max(0, Math.min(idx, STAT_CARDS.length - 1)));
        }}
      >
        {STAT_CARDS.map(card => (
          <View
            key={card.id}
            style={{
              width: CARD_W,
              backgroundColor: theme.surface,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: isDarkMode ? 0.2 : 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            {/* Row 1: Icon + Label */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 10 }}>
              <View style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: card.iconBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {card.icon === 'users'    && <Users        size={13} color={card.iconColor} />}
                {card.icon === 'check'    && <Check        size={13} color={card.iconColor} />}
                {card.icon === 'calendar' && <CalendarCheck size={13} color={card.iconColor} />}
                {card.icon === 'userplus' && <UserPlus      size={13} color={card.iconColor} />}
                {card.icon === 'clock'    && <Clock         size={13} color={card.iconColor} />}
                {card.icon === 'briefcase'&& <Briefcase     size={13} color={card.iconColor} />}
              </View>
              <Text style={{ fontSize: 11, color: theme.textSecondary, fontWeight: '500', flex: 1 }} numberOfLines={2}>
                {card.label}
              </Text>
            </View>

            {/* Row 2: Big number */}
            <Text style={{ fontSize: 26, fontWeight: '800', color: theme.text, letterSpacing: -0.5 }}>
              {card.value}
            </Text>

            {/* Row 3: Badge + subtitle */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <View style={{
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 20,
                backgroundColor: card.badgeBg,
              }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: card.badgeColor }}>
                  {card.change}
                </Text>
              </View>
            </View>

            {/* Subtitle */}
            <Text style={{ fontSize: 9, color: theme.textMuted, marginTop: 3 }} numberOfLines={1}>
              {card.sub}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: spacing.md }}>
        {STAT_CARDS.map((_, i) => (
          <View key={i} style={{
            width: i === dotIdx ? 20 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: i === dotIdx ? colors.primary : (isDarkMode ? '#334155' : '#CBD5E1'),
          }} />
        ))}
      </View>

      {/* ── Attendance Chart Card ───────────────────────────────────────── */}
      <View style={[cardStyle(isDarkMode), { backgroundColor: theme.surface, borderColor: theme.border, marginTop: spacing.lg }]}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: theme.text }}>Organization Attendance Trend</Text>
        <Text style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>Daily attendance across all departments</Text>
        <LineChart isDark={isDarkMode} />
      </View>

      {/* ── Leave Allocation Card ───────────────────────────────────────── */}
      <View style={[cardStyle(isDarkMode), { backgroundColor: theme.surface, borderColor: theme.border, marginTop: spacing.lg }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: theme.text }}>Leave Allocation</Text>
          <Text style={{ fontSize: 12, color: theme.textSecondary }}>186 Total Leaves</Text>
        </View>
        <DonutChart isDark={isDarkMode} />
      </View>

      {/* ── Recent New Joiners ──────────────────────────────────────────── */}
      <View style={[cardStyle(isDarkMode), { backgroundColor: theme.surface, borderColor: theme.border, marginTop: spacing.lg }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: theme.text }}>Recent New Joiners</Text>
          <TouchableOpacity onPress={() => onNavigate('EmployeesList')}>
            <Text style={{ fontSize: 13, color: colors.primary, fontWeight: '600' }}>View All Directory ↗</Text>
          </TouchableOpacity>
        </View>

        {JOINERS.map((j, idx) => (
          <View key={j.id} style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            gap: 12,
            borderBottomWidth: idx < JOINERS.length - 1 ? 1 : 0,
            borderBottomColor: theme.border,
          }}>
            {/* Avatar circle */}
            <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: j.color, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>{j.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: theme.text }}>{j.name}</Text>
              <Text style={{ fontSize: 11, color: theme.textSecondary, marginTop: 1 }}>{j.role}</Text>
            </View>
            <Text style={{ fontSize: 11, color: theme.textMuted }}>{j.date}</Text>
          </View>
        ))}
      </View>

      {/* ── Document Compliance Queue ────────────────────────────────────── */}
      <View style={[cardStyle(isDarkMode), { backgroundColor: theme.surface, borderColor: theme.border, marginTop: spacing.lg }]}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: theme.text }}>Document Compliance Queue</Text>
          <View style={{ backgroundColor: '#FFFBEB', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#F59E0B' }}>3 Pending</Text>
          </View>
        </View>

        {COMPLIANCE_DOCS.map((doc, idx) => (
          <View
            key={doc.id}
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 12,
              marginBottom: idx < COMPLIANCE_DOCS.length - 1 ? 10 : 0,
            }}
          >
            {/* Doc title + status */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: theme.text, flex: 1, marginRight: 8 }}>
                {doc.title}
              </Text>
              <View style={{ backgroundColor: doc.statusBg, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 20 }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: doc.statusColor }}>{doc.status}</Text>
              </View>
            </View>
            {/* Submitted by */}
            <Text style={{ fontSize: 11, color: theme.textSecondary, marginTop: 4 }}>
              Submitted by {doc.by} • {doc.ago}
            </Text>
            {/* Verify button */}
            <TouchableOpacity
              style={{ backgroundColor: colors.primary, borderRadius: 8, paddingVertical: 8, alignItems: 'center', marginTop: 10 }}
              onPress={() => onNavigate('DocumentReview')}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>Verify Doc</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

    </View>
  );
};

// shared card style helper
const cardStyle = (isDark: boolean) => ({
  borderRadius: 20,
  borderWidth: 1,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: isDark ? 0.25 : 0.05,
  shadowRadius: 8,
  elevation: 3,
});
