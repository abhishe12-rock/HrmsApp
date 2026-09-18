import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  ArrowRightCircle,
} from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ── Attendance Data for Calendar (April 2025 as in screenshot) ───────────────
interface DayAttendance {
  day: number;
  status: 'present' | 'absent' | 'leave' | 'weekend' | 'empty';
  dateStr: string;
  checkIn?: string;
  checkOut?: string;
  hours?: string;
}

const ATTENDANCE_MAP: Record<number, DayAttendance> = {
  1: { day: 1, status: 'present', dateStr: 'Tue, Apr 01, 2025', checkIn: '09:05 AM', checkOut: '06:10 PM', hours: '9h 05m' },
  2: { day: 2, status: 'present', dateStr: 'Wed, Apr 02, 2025', checkIn: '09:15 AM', checkOut: '06:05 PM', hours: '8h 50m' },
  3: { day: 3, status: 'present', dateStr: 'Thu, Apr 03, 2025', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m' },
  4: { day: 4, status: 'absent', dateStr: 'Fri, Apr 04, 2025' },
  5: { day: 5, status: 'present', dateStr: 'Sat, Apr 05, 2025', checkIn: '10:00 AM', checkOut: '02:30 PM', hours: '4h 30m' },
  6: { day: 6, status: 'present', dateStr: 'Sun, Apr 06, 2025', checkIn: '09:30 AM', checkOut: '01:30 PM', hours: '4h 00m' },
  7: { day: 7, status: 'present', dateStr: 'Mon, Apr 07, 2025', checkIn: '08:55 AM', checkOut: '06:15 PM', hours: '9h 20m' },
  8: { day: 8, status: 'present', dateStr: 'Wed, Apr 08, 2025', checkIn: '09:12 AM', checkOut: '06:08 PM', hours: '8h 56m' },
  9: { day: 9, status: 'present', dateStr: 'Wed, Apr 09, 2025', checkIn: '09:08 AM', checkOut: '06:12 PM', hours: '9h 04m' },
  10: { day: 10, status: 'present', dateStr: 'Thu, Apr 10, 2025', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m' },
  11: { day: 11, status: 'leave', dateStr: 'Fri, Apr 11, 2025', checkIn: '-', checkOut: '-', hours: '0h 00m' },
  12: { day: 12, status: 'present', dateStr: 'Sat, Apr 12, 2025', checkIn: '09:45 AM', checkOut: '02:15 PM', hours: '4h 30m' },
  13: { day: 13, status: 'present', dateStr: 'Sun, Apr 13, 2025', checkIn: '09:10 AM', checkOut: '06:00 PM', hours: '8h 50m' },
  14: { day: 14, status: 'present', dateStr: 'Mon, Apr 14, 2025', checkIn: '09:05 AM', checkOut: '06:05 PM', hours: '9h 00m' },
  15: { day: 15, status: 'present', dateStr: 'Tue, Apr 15, 2025', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m' },
  16: { day: 16, status: 'absent', dateStr: 'Wed, Apr 16, 2025' },
  17: { day: 17, status: 'present', dateStr: 'Thu, Apr 17, 2025', checkIn: '09:12 AM', checkOut: '06:10 PM', hours: '8h 58m' },
  18: { day: 18, status: 'present', dateStr: 'Fri, Apr 18, 2025', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m' },
  19: { day: 19, status: 'present', dateStr: 'Sat, Apr 19, 2025', checkIn: '09:30 AM', checkOut: '02:00 PM', hours: '4h 30m' },
  20: { day: 20, status: 'present', dateStr: 'Sun, Apr 20, 2025', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m' },
  21: { day: 21, status: 'present', dateStr: 'Mon, Apr 21, 2025', checkIn: '09:02 AM', checkOut: '06:08 PM', hours: '9h 06m' },
  22: { day: 22, status: 'present', dateStr: 'Tue, Apr 22, 2025', checkIn: '09:10 AM', checkOut: '06:00 PM', hours: '8h 50m' },
  23: { day: 23, status: 'present', dateStr: 'Wed, Apr 23, 2025', checkIn: '09:05 AM', checkOut: '06:12 PM', hours: '9h 07m' },
  24: { day: 24, status: 'present', dateStr: 'Thu, Apr 24, 2025', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m' },
  25: { day: 25, status: 'absent', dateStr: 'Fri, Apr 25, 2025' },
  26: { day: 26, status: 'present', dateStr: 'Sat, Apr 26, 2025', checkIn: '09:15 AM', checkOut: '06:05 PM', hours: '8h 50m' },
  27: { day: 27, status: 'present', dateStr: 'Sun, Apr 27, 2025', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m' },
  28: { day: 28, status: 'present', dateStr: 'Mon, Apr 28, 2025', checkIn: '09:05 AM', checkOut: '06:10 PM', hours: '9h 05m' },
  29: { day: 29, status: 'present', dateStr: 'Tue, Apr 29, 2025', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m' },
  30: { day: 30, status: 'present', dateStr: 'Wed, Apr 30, 2025', checkIn: '09:10 AM', checkOut: '06:15 PM', hours: '9h 05m' },
};

export const AttendanceScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const isWide = SCREEN_WIDTH >= 900;
  const [selectedDay, setSelectedDay] = useState<number>(8);

  const selectedData = ATTENDANCE_MAP[selectedDay] || {
    day: selectedDay,
    status: 'present',
    dateStr: `Wed, Apr ${selectedDay < 10 ? '0' + selectedDay : selectedDay}, 2025`,
    checkIn: '09:12 AM',
    checkOut: '06:08 PM',
    hours: '8h  56m',
  };

  // 4 Top Stat Cards Data
  const STAT_METRICS = [
    {
      id: '1',
      title: 'Present Days',
      value: '18',
      change: '12%',
      isPositive: true,
      sub: 'This Month',
      icon: CalendarCheck,
      iconColor: '#10B981',
      iconBg: isDarkMode ? '#064E3B' : '#ECFDF5',
      badgeBg: '#ECFDF5',
      badgeColor: '#10B981',
    },
    {
      id: '2',
      title: 'Absent Days',
      value: '2',
      change: '50%',
      isPositive: false,
      sub: 'This Month',
      icon: XCircle,
      iconColor: '#EF4444',
      iconBg: isDarkMode ? '#7F1D1D' : '#FEF2F2',
      badgeBg: '#FEF2F2',
      badgeColor: '#EF4444',
    },
    {
      id: '3',
      title: 'Leave Days',
      value: '1',
      change: '0%',
      isPositive: true,
      sub: 'This Month',
      icon: FileText,
      iconColor: '#8B5CF6',
      iconBg: isDarkMode ? '#4C1D95' : '#F5F3FF',
      badgeBg: '#F5F3FF',
      badgeColor: '#8B5CF6',
    },
    {
      id: '4',
      title: 'Total Working Hours',
      value: '144.5 hrs',
      change: '8%',
      isPositive: true,
      sub: 'This Month',
      icon: Clock,
      iconColor: '#2563EB',
      iconBg: isDarkMode ? '#1E3A8A' : '#EFF6FF',
      badgeBg: '#ECFDF5',
      badgeColor: '#10B981',
    },
  ];

  // Days of week
  const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calendar cells generation (April 2025 starts on Tuesday, so Sun:30, Mon:31 are previous month)
  // Row 1: 30, 31 (prev month), 1, 2, 3, 4, 5
  // Row 2: 6, 7, 8, 9, 10, 11, 12
  // Row 3: 13, 14, 15, 16, 17, 18, 19
  // Row 4: 20, 21, 22, 23, 24, 25, 26
  // Row 5: 27, 28, 29, 30, 1, 2, 3
  const CALENDAR_ROWS = [
    [
      { num: 30, isCurrentMonth: false },
      { num: 31, isCurrentMonth: false },
      { num: 1, isCurrentMonth: true },
      { num: 2, isCurrentMonth: true },
      { num: 3, isCurrentMonth: true },
      { num: 4, isCurrentMonth: true },
      { num: 5, isCurrentMonth: true },
    ],
    [
      { num: 6, isCurrentMonth: true },
      { num: 7, isCurrentMonth: true },
      { num: 8, isCurrentMonth: true },
      { num: 9, isCurrentMonth: true },
      { num: 10, isCurrentMonth: true },
      { num: 11, isCurrentMonth: true },
      { num: 12, isCurrentMonth: true },
    ],
    [
      { num: 13, isCurrentMonth: true },
      { num: 14, isCurrentMonth: true },
      { num: 15, isCurrentMonth: true },
      { num: 16, isCurrentMonth: true },
      { num: 17, isCurrentMonth: true },
      { num: 18, isCurrentMonth: true },
      { num: 19, isCurrentMonth: true },
    ],
    [
      { num: 20, isCurrentMonth: true },
      { num: 21, isCurrentMonth: true },
      { num: 22, isCurrentMonth: true },
      { num: 23, isCurrentMonth: true },
      { num: 24, isCurrentMonth: true },
      { num: 25, isCurrentMonth: true },
      { num: 26, isCurrentMonth: true },
    ],
    [
      { num: 27, isCurrentMonth: true },
      { num: 28, isCurrentMonth: true },
      { num: 29, isCurrentMonth: true },
      { num: 30, isCurrentMonth: true },
      { num: 1, isCurrentMonth: false },
      { num: 2, isCurrentMonth: false },
      { num: 3, isCurrentMonth: false },
    ],
  ];

  return (
    <AppLayout
      title="Attendance"
      currentScreen="Attendance"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── 1. Top Banner: Attendance Tracker ─────────────────────────── */}
        <View
          style={[
            styles.bannerCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF',
              borderColor: isDarkMode ? '#334155' : '#DBEAFE',
            },
          ]}
        >
          <View style={styles.bannerLeftCol}>
            <View style={styles.bannerTitleRow}>
              <View style={styles.bannerIconBox}>
                <CalendarIcon size={22} color="#2563EB" />
              </View>
              <View>
                <View style={styles.titleBadgeFlex}>
                  <Text
                    style={[
                      styles.bannerTitle,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    Attendance Tracker
                  </Text>
                  <View style={styles.offlineBadge}>
                    <Text style={styles.offlineBadgeText}>Offline</Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.bannerSub,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' },
                  ]}
                >
                  Track your daily attendance, view punch timestamps, and manage working hours.
                </Text>
              </View>
            </View>
          </View>

          {/* Right 3D illustration badge preview */}
          <View style={styles.bannerRightIllustration}>
            <View style={styles.illustrationClockBg}>
              <Clock size={36} color="#60A5FA" />
            </View>
            <View style={styles.illustrationCalendarBg}>
              <CalendarCheck size={28} color="#2563EB" />
              <View style={styles.presentBadgeSmall}>
                <CheckCircle2 size={10} color="#FFFFFF" />
                <Text style={styles.presentBadgeSmallText}>Present</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── 2. Stat Cards (4 Cards Grid / Row) ────────────────────────── */}
        <View style={styles.statMetricsGrid}>
          {STAT_METRICS.map(item => {
            const Icon = item.icon;
            return (
              <View
                key={item.id}
                style={[
                  styles.metricCard,
                  {
                    backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                    borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  },
                ]}
              >
                {/* Top Row: Icon + Change Badge */}
                <View style={styles.metricTopRow}>
                  <View
                    style={[
                      styles.metricIconBox,
                      { backgroundColor: item.iconBg },
                    ]}
                  >
                    <Icon size={18} color={item.iconColor} />
                  </View>
                  <View
                    style={[
                      styles.metricBadge,
                      { backgroundColor: item.badgeBg },
                    ]}
                  >
                    {item.isPositive ? (
                      <TrendingUp size={11} color={item.badgeColor} />
                    ) : (
                      <TrendingDown size={11} color={item.badgeColor} />
                    )}
                    <Text
                      style={[
                        styles.metricBadgeText,
                        { color: item.badgeColor },
                      ]}
                    >
                      {item.change}
                    </Text>
                  </View>
                </View>

                {/* Title */}
                <Text
                  style={[
                    styles.metricTitle,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' },
                  ]}
                >
                  {item.title}
                </Text>

                {/* Big Value */}
                <Text
                  style={[
                    styles.metricValue,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  {item.value}
                </Text>

                {/* Subtitle */}
                <Text
                  style={[
                    styles.metricSub,
                    { color: isDarkMode ? '#64748B' : '#94A3B8' },
                  ]}
                >
                  {item.sub}
                </Text>
              </View>
            );
          })}
        </View>

        {/* ── 3. Main Body: Calendar + Side Widgets ─────────────────────── */}
        <View style={[styles.mainLayout, isWide && styles.mainLayoutWide]}>
          {/* ── LEFT COLUMN: Attendance Calendar ───────────────────────── */}
          <View
            style={[
              styles.calendarCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
              isWide && { flex: 1.4 },
            ]}
          >
            {/* Header: Title + Navigation */}
            <View style={styles.calendarHeaderRow}>
              <Text
                style={[
                  styles.calendarTitle,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                Attendance Calendar
              </Text>

              <View style={styles.calendarControls}>
                <TouchableOpacity
                  style={[
                    styles.navArrowBtn,
                    { borderColor: isDarkMode ? '#334155' : '#E2E8F0' },
                  ]}
                >
                  <ChevronLeft size={16} color={isDarkMode ? '#F8FAFC' : '#475569'} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.navArrowBtn,
                    { borderColor: isDarkMode ? '#334155' : '#E2E8F0' },
                  ]}
                >
                  <ChevronRight size={16} color={isDarkMode ? '#F8FAFC' : '#475569'} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.monthDropdownBtn,
                    { borderColor: isDarkMode ? '#334155' : '#E2E8F0' },
                  ]}
                >
                  <Text
                    style={[
                      styles.monthDropdownText,
                      { color: isDarkMode ? '#F8FAFC' : '#1E293B' },
                    ]}
                  >
                    April 2025
                  </Text>
                  <ChevronDown size={14} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Days of Week Header */}
            <View style={styles.weekDaysHeaderRow}>
              {DAYS_OF_WEEK.map(d => (
                <View key={d} style={styles.weekDayCol}>
                  <Text
                    style={[
                      styles.weekDayText,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    {d}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar Month Grid */}
            <View style={styles.calendarGrid}>
              {CALENDAR_ROWS.map((row, rIdx) => (
                <View key={rIdx} style={styles.calendarRow}>
                  {row.map((cell, cIdx) => {
                    const isSelected = cell.isCurrentMonth && cell.num === selectedDay;
                    const attData = cell.isCurrentMonth ? ATTENDANCE_MAP[cell.num] : null;

                    let dotColor = '#10B981'; // present default
                    if (attData?.status === 'absent') dotColor = '#EF4444';
                    if (attData?.status === 'leave') dotColor = '#8B5CF6';

                    return (
                      <TouchableOpacity
                        key={cIdx}
                        activeOpacity={cell.isCurrentMonth ? 0.7 : 1}
                        onPress={() => {
                          if (cell.isCurrentMonth) setSelectedDay(cell.num);
                        }}
                        style={[
                          styles.dayCell,
                          {
                            backgroundColor: isDarkMode
                              ? isSelected
                                ? '#1E3A8A'
                                : '#1E293B'
                              : isSelected
                              ? '#EFF6FF'
                              : '#FFFFFF',
                            borderColor: isSelected
                              ? '#2563EB'
                              : isDarkMode
                              ? '#334155'
                              : '#F1F5F9',
                            borderWidth: isSelected ? 2 : 1,
                          },
                        ]}
                      >
                        {/* Day Number */}
                        <View
                          style={[
                            styles.dayNumWrapper,
                            isSelected && styles.dayNumSelectedCircle,
                          ]}
                        >
                          <Text
                            style={[
                              styles.dayNumText,
                              !cell.isCurrentMonth && {
                                color: isDarkMode ? '#475569' : '#CBD5E1',
                              },
                              cell.isCurrentMonth && !isSelected && {
                                color: isDarkMode ? '#F8FAFC' : '#1E293B',
                              },
                              isSelected && { color: '#FFFFFF' },
                            ]}
                          >
                            {cell.num}
                          </Text>
                        </View>

                        {/* Status Indicator Dot */}
                        {cell.isCurrentMonth && attData && (
                          <View
                            style={[
                              styles.calendarDot,
                              { backgroundColor: dotColor },
                            ]}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>

            {/* Calendar Footer: Legend + Action */}
            <View style={styles.calendarFooter}>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.legendText}>Present</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                  <Text style={styles.legendText}>Absent</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
                  <Text style={styles.legendText}>Leave</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.viewFullCalRow}>
                <Text style={styles.viewFullCalText}>View Full Calendar</Text>
                <ArrowRight size={13} color="#2563EB" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ── RIGHT COLUMN: Today's Attendance, Summary, Recent Activity ── */}
          <View
            style={[
              styles.sideWidgetsCol,
              isWide && { flex: 1.1 },
            ]}
          >
            {/* Widget 1: Today's / Selected Day Attendance */}
            <View
              style={[
                styles.widgetBox,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <View style={styles.widgetBoxHeader}>
                <View>
                  <Text
                    style={[
                      styles.widgetBoxTitle,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    Today's Attendance
                  </Text>
                  <Text
                    style={[
                      styles.widgetBoxSub,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    {selectedData.dateStr}
                  </Text>
                </View>

                {/* Status Badge */}
                <View
                  style={[
                    styles.dayStatusBadge,
                    {
                      backgroundColor:
                        selectedData.status === 'present'
                          ? '#ECFDF5'
                          : selectedData.status === 'absent'
                          ? '#FEF2F2'
                          : '#F5F3FF',
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.statusBullet,
                      {
                        backgroundColor:
                          selectedData.status === 'present'
                            ? '#10B981'
                            : selectedData.status === 'absent'
                            ? '#EF4444'
                            : '#8B5CF6',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.dayStatusBadgeText,
                      {
                        color:
                          selectedData.status === 'present'
                            ? '#10B981'
                            : selectedData.status === 'absent'
                            ? '#EF4444'
                            : '#8B5CF6',
                      },
                    ]}
                  >
                    {selectedData.status === 'present'
                      ? 'Present'
                      : selectedData.status === 'absent'
                      ? 'Absent'
                      : 'On Leave'}
                  </Text>
                </View>
              </View>

              {/* Attendance Details (Check In, Check Out, Working Hours) */}
              <View style={styles.timeStatsGrid}>
                {/* Check In */}
                <View
                  style={[
                    styles.timeStatCard,
                    {
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#F1F5F9',
                    },
                  ]}
                >
                  <View style={styles.timeStatIconBg}>
                    <Clock size={16} color="#2563EB" />
                  </View>
                  <View>
                    <Text style={styles.timeStatLabel}>Check In</Text>
                    <Text
                      style={[
                        styles.timeStatValue,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      {selectedData.checkIn || '09:12 AM'}
                    </Text>
                  </View>
                </View>

                {/* Check Out */}
                <View
                  style={[
                    styles.timeStatCard,
                    {
                      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                      borderColor: isDarkMode ? '#334155' : '#F1F5F9',
                    },
                  ]}
                >
                  <View style={styles.timeStatIconBg}>
                    <Clock size={16} color="#2563EB" />
                  </View>
                  <View>
                    <Text style={styles.timeStatLabel}>Check Out</Text>
                    <Text
                      style={[
                        styles.timeStatValue,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      {selectedData.checkOut || '06:08 PM'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Working Hours Full Width */}
              <View
                style={[
                  styles.workingHoursCard,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#F1F5F9',
                  },
                ]}
              >
                <View style={styles.timeStatIconBg}>
                  <Clock size={16} color="#2563EB" />
                </View>
                <View>
                  <Text style={styles.timeStatLabel}>Working Hours</Text>
                  <Text
                    style={[
                      styles.workingHoursValue,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    {selectedData.hours || '8h  56m'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Widget 2: Attendance Summary */}
            <View
              style={[
                styles.widgetBox,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <View style={styles.widgetBoxHeader}>
                <View>
                  <Text
                    style={[
                      styles.widgetBoxTitle,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    Attendance Summary
                  </Text>
                  <Text
                    style={[
                      styles.widgetBoxSub,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    This Month
                  </Text>
                </View>

                <TouchableOpacity style={styles.viewReportBtn}>
                  <Text style={styles.viewReportText}>View Report</Text>
                  <ArrowRight size={13} color="#2563EB" />
                </TouchableOpacity>
              </View>

              {/* Gauge & Metrics Breakdown */}
              <View style={styles.summaryBodyRow}>
                {/* 90% Circular Ring Gauge */}
                <View style={styles.gaugeContainer}>
                  <View style={styles.gaugeRingOuter}>
                    <View
                      style={[
                        styles.gaugeRingBorder,
                        {
                          borderColor: '#10B981',
                        },
                      ]}
                    />
                    <View style={styles.gaugeCenterText}>
                      <Text
                        style={[
                          styles.gaugePercent,
                          { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                        ]}
                      >
                        90%
                      </Text>
                      <Text style={styles.gaugeLabel}>Attendance Rate</Text>
                    </View>
                  </View>
                </View>

                {/* Days Breakdown */}
                <View style={styles.breakdownCol}>
                  <View style={styles.breakdownRow}>
                    <View style={styles.breakdownLeft}>
                      <View style={[styles.breakdownDot, { backgroundColor: '#10B981' }]} />
                      <Text
                        style={[
                          styles.breakdownLabel,
                          { color: isDarkMode ? '#E2E8F0' : '#334155' },
                        ]}
                      >
                        Present
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.breakdownValue,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      18 days
                    </Text>
                  </View>

                  <View style={styles.breakdownRow}>
                    <View style={styles.breakdownLeft}>
                      <View style={[styles.breakdownDot, { backgroundColor: '#EF4444' }]} />
                      <Text
                        style={[
                          styles.breakdownLabel,
                          { color: isDarkMode ? '#E2E8F0' : '#334155' },
                        ]}
                      >
                        Absent
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.breakdownValue,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      2 days
                    </Text>
                  </View>

                  <View style={styles.breakdownRow}>
                    <View style={styles.breakdownLeft}>
                      <View style={[styles.breakdownDot, { backgroundColor: '#8B5CF6' }]} />
                      <Text
                        style={[
                          styles.breakdownLabel,
                          { color: isDarkMode ? '#E2E8F0' : '#334155' },
                        ]}
                      >
                        Leave
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.breakdownValue,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      1 day
                    </Text>
                  </View>

                  <View style={styles.breakdownRow}>
                    <View style={styles.breakdownLeft}>
                      <View style={[styles.breakdownDot, { backgroundColor: '#2563EB' }]} />
                      <Text
                        style={[
                          styles.breakdownLabel,
                          { color: isDarkMode ? '#E2E8F0' : '#334155' },
                        ]}
                      >
                        Total Working Days
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.breakdownValue,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      21 days
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Widget 3: Recent Activity */}
            <View
              style={[
                styles.widgetBox,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <View style={styles.widgetBoxHeader}>
                <Text
                  style={[
                    styles.widgetBoxTitle,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  Recent Activity
                </Text>
                <TouchableOpacity style={styles.viewReportBtn}>
                  <Text style={styles.viewReportText}>View All</Text>
                  <ArrowRight size={13} color="#2563EB" />
                </TouchableOpacity>
              </View>

              {/* Activity List */}
              <View style={styles.activityList}>
                {/* Item 1: Checked In */}
                <View style={styles.activityItem}>
                  <View style={[styles.activityIconBox, { backgroundColor: '#ECFDF5' }]}>
                    <CheckCircle2 size={16} color="#10B981" />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text
                      style={[
                        styles.activityTitle,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      Checked In
                    </Text>
                    <Text
                      style={[
                        styles.activitySub,
                        { color: isDarkMode ? '#94A3B8' : '#64748B' },
                      ]}
                    >
                      Today, 09:12 AM
                    </Text>
                  </View>
                </View>

                {/* Item 2: Checked Out */}
                <View style={styles.activityItem}>
                  <View style={[styles.activityIconBox, { backgroundColor: '#EFF6FF' }]}>
                    <ArrowRightCircle size={16} color="#2563EB" />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text
                      style={[
                        styles.activityTitle,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      Checked Out
                    </Text>
                    <Text
                      style={[
                        styles.activitySub,
                        { color: isDarkMode ? '#94A3B8' : '#64748B' },
                      ]}
                    >
                      Today, 06:08 PM
                    </Text>
                  </View>
                </View>

                {/* Item 3: Leave Approved */}
                <View style={[styles.activityItem, { borderBottomWidth: 0 }]}>
                  <View style={[styles.activityIconBox, { backgroundColor: '#F5F3FF' }]}>
                    <CalendarIcon size={16} color="#8B5CF6" />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text
                      style={[
                        styles.activityTitle,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      Leave Approved
                    </Text>
                    <Text
                      style={[
                        styles.activitySub,
                        { color: isDarkMode ? '#94A3B8' : '#64748B' },
                      ]}
                    >
                      Apr 05, 2025 • Casual Leave
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },

  // ── 1. Banner Card ───────────────────────────────────────────────
  bannerCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bannerLeftCol: {
    flex: 1,
    paddingRight: 10,
  },
  bannerTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  titleBadgeFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  offlineBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  offlineBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  bannerSub: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  bannerRightIllustration: {
    position: 'relative',
    width: 76,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationClockBg: {
    position: 'absolute',
    top: 2,
    left: 4,
    opacity: 0.85,
  },
  illustrationCalendarBg: {
    position: 'absolute',
    bottom: 2,
    right: 4,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  presentBadgeSmall: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#10B981',
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 6,
  },
  presentBadgeSmallText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // ── 2. Stat Metrics Grid ─────────────────────────────────────────
  statMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: '46%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metricIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  metricBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  metricTitle: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  metricSub: {
    fontSize: 11,
    fontWeight: '500',
  },

  // ── 3. Main Layout ───────────────────────────────────────────────
  mainLayout: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  mainLayoutWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // ── Calendar Card Styles ─────────────────────────────────────────
  calendarCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  calendarTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  calendarControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navArrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  monthDropdownText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Week days
  weekDaysHeaderRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayCol: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 11,
    fontWeight: '700',
  },

  // Calendar Grid
  calendarGrid: {
    gap: 5,
  },
  calendarRow: {
    flexDirection: 'row',
    gap: 5,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayNumWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumSelectedCircle: {
    backgroundColor: '#2563EB',
  },
  dayNumText: {
    fontSize: 12,
    fontWeight: '700',
  },
  calendarDot: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    position: 'absolute',
    bottom: 3.5,
  },

  // Calendar Footer
  calendarFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  viewFullCalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewFullCalText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },

  // ── Side Widgets Column ──────────────────────────────────────────
  sideWidgetsCol: {
    gap: 16,
  },
  widgetBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  widgetBoxHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  widgetBoxTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  widgetBoxSub: {
    fontSize: 11,
    marginTop: 2,
  },
  dayStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dayStatusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },

  // Time stats
  timeStatsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  timeStatCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  timeStatIconBg: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeStatLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  timeStatValue: {
    fontSize: 13,
    fontWeight: '800',
  },
  workingHoursCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  workingHoursValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  // Attendance Summary & Gauge
  viewReportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewReportText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  summaryBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeRingOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gaugeRingBorder: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 10,
    borderLeftColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  gaugeCenterText: {
    alignItems: 'center',
  },
  gaugePercent: {
    fontSize: 18,
    fontWeight: '800',
  },
  gaugeLabel: {
    fontSize: 8,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
  },
  breakdownCol: {
    flex: 1,
    gap: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  breakdownDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  breakdownLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  breakdownValue: {
    fontSize: 11,
    fontWeight: '700',
  },

  // Recent activity
  activityList: {
    gap: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.08)',
  },
  activityIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  activitySub: {
    fontSize: 10,
    marginTop: 1,
  },
});
