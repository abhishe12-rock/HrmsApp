import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Clock,
  ShieldCheck,
  Building2,
  Laptop,
  Compass,
  Download,
  Play,
  Square,
  Coffee,
  Flame,
  Sun,
  MapPin,
  History,
  ArrowRight,
  Activity,
  CheckCircle2,
} from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PunchLogItem {
  id: string;
  date: string;
  shift: string;
  punchIn: string;
  punchOut: string;
  totalBreaks: string;
  effectiveWork: string;
  status: string;
  statusType: 'present' | 'onTime' | 'overtime' | 'grace' | 'remote';
}

const PUNCH_LOGS: PunchLogItem[] = [
  {
    id: '1',
    date: 'Sep 16, 2026 (Today)',
    shift: 'General Shift',
    punchIn: '09:00 AM',
    punchOut: '06:00 PM',
    totalBreaks: '00:00:00',
    effectiveWork: '00:00:00',
    status: 'Present',
    statusType: 'present',
  },
  {
    id: '2',
    date: 'Sep 15, 2026',
    shift: 'General Shift',
    punchIn: '09:05 AM',
    punchOut: '06:18 PM',
    totalBreaks: '00:48:10',
    effectiveWork: '08:24:50',
    status: 'On-Time',
    statusType: 'onTime',
  },
  {
    id: '3',
    date: 'Sep 14, 2026',
    shift: 'General Shift',
    punchIn: '09:02 AM',
    punchOut: '06:12 PM',
    totalBreaks: '00:52:00',
    effectiveWork: '08:18:00',
    status: 'On-Time',
    statusType: 'onTime',
  },
  {
    id: '4',
    date: 'Sep 11, 2026',
    shift: 'General Shift',
    punchIn: '08:58 AM',
    punchOut: '06:30 PM',
    totalBreaks: '00:45:00',
    effectiveWork: '08:47:00',
    status: 'Overtime (+30m)',
    statusType: 'overtime',
  },
  {
    id: '5',
    date: 'Sep 10, 2026',
    shift: 'General Shift',
    punchIn: '09:12 AM',
    punchOut: '06:05 PM',
    totalBreaks: '01:00:00',
    effectiveWork: '07:53:00',
    status: 'Grace In (09:12)',
    statusType: 'grace',
  },
  {
    id: '6',
    date: 'Sep 09, 2026',
    shift: 'Remote Shift',
    punchIn: '09:00 AM',
    punchOut: '06:00 PM',
    totalBreaks: '00:50:00',
    effectiveWork: '08:10:00',
    status: 'Remote (WFH)',
    statusType: 'remote',
  },
];

export const ClockInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  // Live timer and attendance states from store
  const {
    isClockedIn,
    isOnBreak,
    clockInTimeFormatted,
    secondsElapsed,
    breakSecondsElapsed,
    punchIn,
    startBreak,
    resumeWork,
    punchOut,
  } = useAppStore();

  const isWide = SCREEN_WIDTH >= 900;
  const [selectedLocation, setSelectedLocation] = useState<'office' | 'remote' | 'client'>('office');

  // Live Digital Clock state
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [currentDateStr, setCurrentDateStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: 01:50:24 PM
      const timeParts = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTimeStr(timeParts);

      // Format: THU, SEP 17, 2026
      const dateParts = now
        .toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
        .toUpperCase();
      setCurrentDateStr(dateParts);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds to HH:MM:SS
  const formatSeconds = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleExport = () => {
    Alert.alert('Export Timesheet', 'Your official weekly attendance timesheet has been exported to PDF & CSV.');
  };

  return (
    <AppLayout
      title="Clock In / Out"
      currentScreen="ClockIn"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── 1. Top Header Banner: Attendance Check-In & Time Overview ── */}
        <View
          style={[
            styles.bannerCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF',
              borderColor: isDarkMode ? '#334155' : '#DBEAFE',
            },
          ]}
        >
          {/* Left Title & Live Geofence Tag */}
          <View style={styles.bannerLeft}>
            <View style={styles.bannerIconBox}>
              <Clock size={22} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.bannerTitleRow}>
                <Text
                  style={[
                    styles.bannerTitle,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  Attendance Check-In & Time Overview
                </Text>
                <View style={styles.geofencePill}>
                  <ShieldCheck size={13} color="#059669" />
                  <Text style={styles.geofencePillText}>Live Geofence</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.bannerSubtitle,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' },
                ]}
              >
                Automated web punch tracking, biometric shift alignment & weekly time metrics
              </Text>
            </View>
          </View>

          {/* Right Location Switcher & Export */}
          <View style={styles.bannerRight}>
            <View
              style={[
                styles.locationSwitcherGroup,
                {
                  backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => setSelectedLocation('office')}
                style={[
                  styles.locationBtn,
                  selectedLocation === 'office' && styles.locationBtnActive,
                ]}
              >
                <Building2
                  size={13}
                  color={selectedLocation === 'office' ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.locationBtnText,
                    selectedLocation === 'office' && styles.locationBtnTextActive,
                    { color: selectedLocation === 'office' ? '#FFFFFF' : '#64748B' },
                  ]}
                >
                  Office
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedLocation('remote')}
                style={[
                  styles.locationBtn,
                  selectedLocation === 'remote' && styles.locationBtnActive,
                ]}
              >
                <Laptop
                  size={13}
                  color={selectedLocation === 'remote' ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.locationBtnText,
                    selectedLocation === 'remote' && styles.locationBtnTextActive,
                    { color: selectedLocation === 'remote' ? '#FFFFFF' : '#64748B' },
                  ]}
                >
                  Remote
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedLocation('client')}
                style={[
                  styles.locationBtn,
                  selectedLocation === 'client' && styles.locationBtnActive,
                ]}
              >
                <Compass
                  size={13}
                  color={selectedLocation === 'client' ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.locationBtnText,
                    selectedLocation === 'client' && styles.locationBtnTextActive,
                    { color: selectedLocation === 'client' ? '#FFFFFF' : '#64748B' },
                  ]}
                >
                  Client Site
                </Text>
              </TouchableOpacity>
            </View>

            {/* Export Timesheet Button */}
            <TouchableOpacity
              onPress={handleExport}
              style={[
                styles.exportBtn,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <Download size={14} color={isDarkMode ? '#F8FAFC' : '#1E293B'} />
              <Text
                style={[
                  styles.exportBtnText,
                  { color: isDarkMode ? '#F8FAFC' : '#1E293B' },
                ]}
              >
                Export Timesheet
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── 2. Top Main Row: Punch Card + Shift Rota / Session Widgets ─ */}
        <View style={[styles.topRowLayout, isWide && styles.topRowLayoutWide]}>
          {/* Left Column: Clock In / Out Main Card */}
          <View
            style={[
              styles.punchCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
              isWide && { flex: 1.5 },
            ]}
          >
            {/* Header: Date + Standby Status */}
            <View style={styles.punchCardHeader}>
              <View style={styles.dateLabelRow}>
                <Clock size={15} color={isDarkMode ? '#94A3B8' : '#64748B'} />
                <Text
                  style={[
                    styles.dateLabelText,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' },
                  ]}
                >
                  {currentDateStr || 'THU, SEP 17, 2026'}
                </Text>
              </View>

              {/* Status Pill */}
              <View
                style={[
                  styles.statusStandbyPill,
                  isClockedIn && !isOnBreak && styles.statusLivePill,
                  isOnBreak && styles.statusBreakPill,
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    isClockedIn && !isOnBreak && { backgroundColor: '#10B981' },
                    isOnBreak && { backgroundColor: '#F59E0B' },
                  ]}
                />
                <Text
                  style={[
                    styles.statusStandbyText,
                    isClockedIn && !isOnBreak && { color: '#059669' },
                    isOnBreak && { color: '#D97706' },
                  ]}
                >
                  {isClockedIn
                    ? isOnBreak
                      ? 'ON BREAK'
                      : 'LIVE RECORDING'
                    : 'STANDBY'}
                </Text>
              </View>
            </View>

            {/* Big Digital Clock Display */}
            <View style={styles.digitalClockCenter}>
              <Text
                style={[
                  styles.bigDigitalClockText,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                {currentTimeStr || '01:50:24 PM'}
              </Text>

              {/* Circular Timer Widget */}
              <View
                style={[
                  styles.circularTimerBox,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isClockedIn
                      ? isOnBreak
                        ? '#F59E0B'
                        : '#10B981'
                      : isDarkMode
                      ? '#334155'
                      : '#E2E8F0',
                  },
                ]}
              >
                <Clock
                  size={20}
                  color={
                    isClockedIn
                      ? isOnBreak
                        ? '#F59E0B'
                        : '#10B981'
                      : '#94A3B8'
                  }
                  style={{ marginBottom: 6 }}
                />
                <Text
                  style={[
                    styles.elapsedDigits,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  {isClockedIn
                    ? isOnBreak
                      ? formatSeconds(breakSecondsElapsed)
                      : formatSeconds(secondsElapsed)
                    : '00:00:00'}
                </Text>
                <Text style={styles.elapsedSubLabel}>
                  {isClockedIn
                    ? isOnBreak
                      ? 'BREAK IN PROGRESS'
                      : 'WORKING ACTIVE'
                    : 'NOT CHECKED IN'}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.punchActionContainer}>
              {!isClockedIn ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={punchIn}
                  style={styles.clockInPrimaryBtn}
                >
                  <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                  <Text style={styles.clockInPrimaryBtnText}>Clock In Now</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.clockInSplitRow}>
                  {!isOnBreak ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={startBreak}
                      style={styles.breakActionBtn}
                    >
                      <Coffee size={15} color="#D97706" />
                      <Text style={styles.breakActionBtnText}>Take Break</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={resumeWork}
                      style={styles.resumeActionBtn}
                    >
                      <Play size={15} color="#FFFFFF" fill="#FFFFFF" />
                      <Text style={styles.resumeActionBtnText}>Resume Work</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={punchOut}
                    style={styles.punchOutActionBtn}
                  >
                    <Square size={15} color="#FFFFFF" fill="#FFFFFF" />
                    <Text style={styles.punchOutActionBtnText}>Clock Out</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Footer: HQ Geofence & Verified */}
            <View
              style={[
                styles.punchFooterRow,
                { borderTopColor: isDarkMode ? '#334155' : '#F1F5F9' },
              ]}
            >
              <View style={styles.locationFooterLeft}>
                <MapPin size={14} color="#2563EB" />
                <Text
                  style={[
                    styles.locationFooterText,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' },
                  ]}
                >
                  San Francisco HQ (Geofenced ✓)
                </Text>
              </View>

              <View style={styles.verifiedRight}>
                <ShieldCheck size={14} color="#10B981" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          </View>

          {/* Right Column: Shift Rota + Session Summary + Activity Log */}
          <View
            style={[
              styles.sideWidgetsCol,
              isWide && { flex: 1.1 },
            ]}
          >
            {/* Widget 1: Today's Shift Rota */}
            <View
              style={[
                styles.sideWidgetCard,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <View style={styles.sideWidgetHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Sun size={15} color="#3B82F6" />
                  <Text
                    style={[
                      styles.sideWidgetTitle,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    Today's Shift Rota
                  </Text>
                </View>
                <View style={styles.generalBadge}>
                  <Text style={styles.generalBadgeText}>General</Text>
                </View>
              </View>

              <View style={styles.widgetDetailRow}>
                <Text style={styles.widgetDetailKey}>Timing</Text>
                <Text
                  style={[
                    styles.widgetDetailVal,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  09:00 AM - 06:00 PM
                </Text>
              </View>

              <View style={styles.widgetDetailRow}>
                <Text style={styles.widgetDetailKey}>Break Allowance</Text>
                <Text
                  style={[
                    styles.widgetDetailVal,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  60 mins
                </Text>
              </View>

              <View style={[styles.widgetDetailRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.widgetDetailKey}>Grace Time</Text>
                <Text style={[styles.widgetDetailVal, { color: '#10B981' }]}>
                  15 mins
                </Text>
              </View>
            </View>

            {/* Widget 2: Session Summary */}
            <View
              style={[
                styles.sideWidgetCard,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <View style={styles.sideWidgetHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Activity size={15} color="#10B981" />
                  <Text
                    style={[
                      styles.sideWidgetTitle,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    Session Summary
                  </Text>
                </View>
                <View
                  style={[
                    styles.pendingBadge,
                    isClockedIn && { backgroundColor: '#ECFDF5' },
                  ]}
                >
                  <Text
                    style={[
                      styles.pendingBadgeText,
                      isClockedIn && { color: '#059669' },
                    ]}
                  >
                    {isClockedIn ? 'Active' : 'Pending'}
                  </Text>
                </View>
              </View>

              <View style={styles.widgetDetailRow}>
                <Text style={styles.widgetDetailKey}>Check-In Time</Text>
                <Text
                  style={[
                    styles.widgetDetailVal,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  {isClockedIn ? clockInTimeFormatted || '09:00 AM' : '--:--'}
                </Text>
              </View>

              <View style={styles.widgetDetailRow}>
                <Text style={styles.widgetDetailKey}>Break Logged</Text>
                <Text style={[styles.widgetDetailVal, { color: '#D97706' }]}>
                  {formatSeconds(breakSecondsElapsed)}
                </Text>
              </View>

              <View style={[styles.widgetDetailRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.widgetDetailKey}>Productive Hours</Text>
                <Text style={[styles.widgetDetailVal, { color: '#10B981' }]}>
                  {formatSeconds(secondsElapsed)}
                </Text>
              </View>
            </View>

            {/* Widget 3: Today's Activity Log */}
            <View
              style={[
                styles.sideWidgetCard,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <Text
                style={[
                  styles.sideWidgetTitle,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A', marginBottom: 8 },
                ]}
              >
                Today's Activity Log
              </Text>

              {isClockedIn ? (
                <View style={{ gap: 8 }}>
                  <View style={styles.activityLogRow}>
                    <CheckCircle2 size={14} color="#10B981" />
                    <Text
                      style={[
                        styles.activityLogText,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      Punched In at {clockInTimeFormatted || '09:00 AM'} (Office Geofence)
                    </Text>
                  </View>
                  {isOnBreak && (
                    <View style={styles.activityLogRow}>
                      <Coffee size={14} color="#F59E0B" />
                      <Text
                        style={[
                          styles.activityLogText,
                          { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                        ]}
                      >
                        Break started
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.emptyActivityLog}>
                  <Text
                    style={[
                      styles.emptyLogText,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                  >
                    No punches recorded yet today.
                  </Text>
                  <Text
                    style={[
                      styles.emptyLogSubText,
                      { color: isDarkMode ? '#64748B' : '#94A3B8' },
                    ]}
                  >
                    Click "Clock In Now" to begin.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* ── 3. Middle Section: 4 KPI Cards ────────────────────────────── */}
        <View style={styles.kpiGrid}>
          {/* Card 1: Week Total Hours */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiHeaderRow}>
              <Text style={styles.kpiTitle}>Week Total Hours</Text>
              <View style={[styles.kpiIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Clock size={16} color="#2563EB" />
              </View>
            </View>

            <View style={styles.kpiValueRow}>
              <Text
                style={[
                  styles.kpiBigNumber,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                38.5h
              </Text>
              <Text style={styles.kpiTargetSub}> / 40.0h</Text>
            </View>

            {/* Progress Track */}
            <View
              style={[
                styles.kpiProgressBarTrack,
                { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' },
              ]}
            >
              <View
                style={[
                  styles.kpiProgressBarFill,
                  { width: '96.2%', backgroundColor: '#2563EB' },
                ]}
              />
            </View>
          </View>

          {/* Card 2: Avg Daily Punch In */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiHeaderRow}>
              <Text style={styles.kpiTitle}>Avg Daily Punch In</Text>
              <View style={[styles.kpiIconBox, { backgroundColor: '#ECFDF5' }]}>
                <Sun size={16} color="#10B981" />
              </View>
            </View>

            <Text
              style={[
                styles.kpiBigNumber,
                { color: isDarkMode ? '#F8FAFC' : '#0F172A', marginTop: 4 },
              ]}
            >
              09:04 AM
            </Text>

            <Text style={styles.complianceText}>98.2% On-Time Compliance</Text>
          </View>

          {/* Card 3: Break Expended */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiHeaderRow}>
              <Text style={styles.kpiTitle}>Break Expended</Text>
              <View style={[styles.kpiIconBox, { backgroundColor: '#FFFBEB' }]}>
                <Coffee size={16} color="#F59E0B" />
              </View>
            </View>

            <View style={styles.kpiValueRow}>
              <Text
                style={[
                  styles.kpiBigNumber,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                4h 15m
              </Text>
              <Text style={styles.kpiTargetSub}> / 5h cap</Text>
            </View>

            {/* Progress Track */}
            <View
              style={[
                styles.kpiProgressBarTrack,
                { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' },
              ]}
            >
              <View
                style={[
                  styles.kpiProgressBarFill,
                  { width: '85%', backgroundColor: '#F59E0B' },
                ]}
              />
            </View>
          </View>

          {/* Card 4: Overtime Credits */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiHeaderRow}>
              <Text style={styles.kpiTitle}>Overtime Credits</Text>
              <View style={[styles.kpiIconBox, { backgroundColor: '#F5F3FF' }]}>
                <Flame size={16} color="#8B5CF6" />
              </View>
            </View>

            <Text
              style={[
                styles.kpiBigNumber,
                { color: '#8B5CF6', marginTop: 4 },
              ]}
            >
              +2h 30m
            </Text>

            <Text style={styles.payrollSubText}>Accrued for September Payroll</Text>
          </View>
        </View>

        {/* ── 4. Analytics Row: Bar Chart & Attendance Rate Gauge ───────── */}
        <View style={[styles.analyticsRow, isWide && styles.analyticsRowWide]}>
          {/* Left Chart: Weekly Working Hours Expended */}
          <View
            style={[
              styles.chartCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
              isWide && { flex: 1.4 },
            ]}
          >
            <View style={styles.chartHeaderRow}>
              <View>
                <Text
                  style={[
                    styles.chartTitle,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  Weekly Working Hours Expended
                </Text>
                <Text
                  style={[
                    styles.chartSubtitle,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' },
                  ]}
                >
                  Daily logged productive hours vs. 8h standard target
                </Text>
              </View>

              {/* Legend */}
              <View style={styles.chartLegend}>
                <View style={styles.legendDotGroup}>
                  <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                  <Text style={styles.legendText}>Worked Hours</Text>
                </View>
                <View style={styles.legendDotGroup}>
                  <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                  <Text style={styles.legendText}>Break Hours</Text>
                </View>
              </View>
            </View>

            {/* Bar Chart Graphics */}
            <View style={styles.barChartWrapper}>
              {/* Y-Axis */}
              <View style={styles.yAxisLabels}>
                <Text style={styles.yAxisText}>10</Text>
                <Text style={styles.yAxisText}>6</Text>
                <Text style={styles.yAxisText}>3</Text>
                <Text style={styles.yAxisText}>0</Text>
              </View>

              {/* Bars Area */}
              <View style={styles.barsContainer}>
                {/* Horizontal guide lines */}
                <View
                  style={[
                    styles.dashedGuideLine,
                    { top: '0%', borderColor: isDarkMode ? '#334155' : '#F1F5F9' },
                  ]}
                />
                <View
                  style={[
                    styles.dashedGuideLine,
                    { top: '40%', borderColor: isDarkMode ? '#334155' : '#F1F5F9' },
                  ]}
                />
                <View
                  style={[
                    styles.dashedGuideLine,
                    { top: '70%', borderColor: isDarkMode ? '#334155' : '#F1F5F9' },
                  ]}
                />
                <View
                  style={[
                    styles.dashedGuideLine,
                    { bottom: 0, borderColor: isDarkMode ? '#334155' : '#E2E8F0' },
                  ]}
                />

                {/* Day Columns */}
                {[
                  { day: 'Mon', workH: 82, breakH: 10 },
                  { day: 'Tue', workH: 80, breakH: 8 },
                  { day: 'Wed', workH: 76, breakH: 12 },
                  { day: 'Thu', workH: 84, breakH: 8 },
                  { day: 'Fri', workH: 79, breakH: 11 },
                  { day: 'Sat', workH: 0, breakH: 0 },
                  { day: 'Sun', workH: 0, breakH: 0 },
                ].map(col => (
                  <View key={col.day} style={styles.dayCol}>
                    <View style={styles.dualBarsWrapper}>
                      {col.workH > 0 ? (
                        <View
                          style={[
                            styles.singleBar,
                            {
                              height: `${col.workH}%`,
                              backgroundColor: '#2563EB',
                            },
                          ]}
                        />
                      ) : (
                        <View style={{ height: 4 }} />
                      )}

                      {col.breakH > 0 && (
                        <View
                          style={[
                            styles.singleBar,
                            {
                              height: `${col.breakH}%`,
                              backgroundColor: '#F59E0B',
                            },
                          ]}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.dayColLabel,
                        { color: isDarkMode ? '#94A3B8' : '#64748B' },
                      ]}
                    >
                      {col.day}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Right Card: September Attendance Rate */}
          <View
            style={[
              styles.chartCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
              isWide && { flex: 1 },
            ]}
          >
            <View style={styles.chartHeaderRow}>
              <Text
                style={[
                  styles.chartTitle,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                September Attendance Rate
              </Text>
              <Text style={styles.ratePercentGreen}>98.4%</Text>
            </View>

            <View style={styles.gaugeAndLegendRow}>
              {/* Donut Gauge Visual */}
              <View style={styles.donutGaugeBox}>
                <View
                  style={[
                    styles.donutOuterRing,
                    {
                      borderColor: '#10B981',
                      borderRightColor: '#2563EB',
                      borderBottomColor: '#8B5CF6',
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.donutInnerCircle,
                      {
                        backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.donutDaysNumber,
                        { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                      ]}
                    >
                      22
                    </Text>
                    <Text style={styles.donutDaysSub}>DAYS</Text>
                  </View>
                </View>
              </View>

              {/* Donut Legend */}
              <View style={styles.donutLegendCol}>
                <View style={styles.donutLegendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.donutLegendLabel}>On-Time (Present)</Text>
                  <Text
                    style={[
                      styles.donutLegendVal,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    18d
                  </Text>
                </View>

                <View style={styles.donutLegendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                  <Text style={styles.donutLegendLabel}>Remote / WFH</Text>
                  <Text
                    style={[
                      styles.donutLegendVal,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    3d
                  </Text>
                </View>

                <View style={styles.donutLegendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
                  <Text style={styles.donutLegendLabel}>Approved Leave</Text>
                  <Text
                    style={[
                      styles.donutLegendVal,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    1d
                  </Text>
                </View>

                <View style={styles.donutLegendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                  <Text style={styles.donutLegendLabel}>Late Arrival</Text>
                  <Text
                    style={[
                      styles.donutLegendVal,
                      { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                    ]}
                  >
                    0d
                  </Text>
                </View>
              </View>
            </View>

            {/* Regularization Action Link */}
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Request Regularization',
                  'Attendance regularization request submitted to your HR manager.'
                )
              }
              style={styles.requestRegularizationLink}
            >
              <Text style={styles.requestRegularizationText}>
                Request Regularization →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── 5. Bottom Section: Recent Attendance & Punch Logs Table ──── */}
        <View
          style={[
            styles.tableCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          {/* Table Header Row */}
          <View style={styles.tableCardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={styles.tableHeaderIconBox}>
                <History size={16} color="#2563EB" />
              </View>
              <View>
                <Text
                  style={[
                    styles.tableCardTitle,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  Recent Attendance & Punch Logs
                </Text>
                <Text
                  style={[
                    styles.tableCardSubtitle,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' },
                  ]}
                >
                  Detailed breakdown of in/out timestamps, breaks, and productive durations
                </Text>
              </View>
            </View>

            <View style={styles.pastSevenDaysPill}>
              <Text style={styles.pastSevenDaysPillText}>Past 7 Days</Text>
            </View>
          </View>

          {/* Table Data Rows */}
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={{ minWidth: 800 }}>
              {/* Column Headers */}
              <View
                style={[
                  styles.tableHead,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0',
                  },
                ]}
              >
                <Text style={[styles.thText, { width: 170 }]}>DATE</Text>
                <Text style={[styles.thText, { width: 130 }]}>SHIFT</Text>
                <Text style={[styles.thText, { width: 110 }]}>PUNCH IN</Text>
                <Text style={[styles.thText, { width: 110 }]}>PUNCH OUT</Text>
                <Text style={[styles.thText, { width: 120 }]}>TOTAL BREAKS</Text>
                <Text style={[styles.thText, { width: 120 }]}>EFFECTIVE WORK</Text>
                <Text style={[styles.thText, { width: 130, textAlign: 'right' }]}>
                  STATUS
                </Text>
              </View>

              {/* Rows */}
              {PUNCH_LOGS.map((item, index) => {
                let badgeBg = '#ECFDF5';
                let badgeText = '#059669';

                if (item.statusType === 'overtime') {
                  badgeBg = '#EFF6FF';
                  badgeText = '#2563EB';
                } else if (item.statusType === 'grace') {
                  badgeBg = '#FFFBEB';
                  badgeText = '#D97706';
                } else if (item.statusType === 'remote') {
                  badgeBg = '#F5F3FF';
                  badgeText = '#7C3AED';
                }

                return (
                  <View
                    key={item.id}
                    style={[
                      styles.tableRowItem,
                      index !== PUNCH_LOGS.length - 1 && {
                        borderBottomWidth: 1,
                        borderBottomColor: isDarkMode ? '#334155' : '#F1F5F9',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tdTextBold,
                        {
                          width: 170,
                          color: isDarkMode ? '#F8FAFC' : '#0F172A',
                        },
                      ]}
                    >
                      {item.date}
                    </Text>

                    <Text
                      style={[
                        styles.tdTextMuted,
                        { width: 130, color: isDarkMode ? '#94A3B8' : '#64748B' },
                      ]}
                    >
                      {item.shift}
                    </Text>

                    <Text
                      style={[
                        styles.tdTextRegular,
                        { width: 110, color: isDarkMode ? '#F8FAFC' : '#1E293B' },
                      ]}
                    >
                      {item.punchIn}
                    </Text>

                    <Text
                      style={[
                        styles.tdTextRegular,
                        { width: 110, color: isDarkMode ? '#F8FAFC' : '#1E293B' },
                      ]}
                    >
                      {item.punchOut}
                    </Text>

                    <Text
                      style={[
                        styles.tdTextAmber,
                        { width: 120, color: '#D97706' },
                      ]}
                    >
                      {item.totalBreaks}
                    </Text>

                    <Text
                      style={[
                        styles.tdTextBold,
                        {
                          width: 120,
                          color: isDarkMode ? '#F8FAFC' : '#0F172A',
                        },
                      ]}
                    >
                      {item.effectiveWork}
                    </Text>

                    <View style={{ width: 130, alignItems: 'flex-end' }}>
                      <View style={[styles.rowStatusBadge, { backgroundColor: badgeBg }]}>
                        <Text style={[styles.rowStatusBadgeText, { color: badgeText }]}>
                          {item.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 60,
  },

  // ── 1. Top Header Banner ──────────────────────────────────────────────────
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
  bannerLeft: {
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
  bannerTitleRow: {
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
  geofencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  geofencePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  bannerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  bannerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  locationSwitcherGroup: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    padding: 2,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  locationBtnActive: {
    backgroundColor: '#2563EB',
  },
  locationBtnText: {
    fontSize: 12,
    fontWeight: '500',
  },
  locationBtnTextActive: {
    fontWeight: '600',
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  exportBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // ── 2. Top Row Layout: Punch Card + Shift / Session Widgets ───────────────
  topRowLayout: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 16,
  },
  topRowLayoutWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  punchCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
  },
  punchCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateLabelText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  statusStandbyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusLivePill: {
    backgroundColor: '#ECFDF5',
  },
  statusBreakPill: {
    backgroundColor: '#FFFBEB',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#64748B',
  },
  statusStandbyText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  digitalClockCenter: {
    alignItems: 'center',
    marginVertical: 12,
  },
  bigDigitalClockText: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
    fontFamily: 'monospace',
    marginBottom: 16,
  },
  circularTimerBox: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  elapsedDigits: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  elapsedSubLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 4,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  punchActionContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  clockInPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
  },
  clockInPrimaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  clockInSplitRow: {
    flexDirection: 'row',
    gap: 10,
  },
  breakActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingVertical: 11,
    borderRadius: 10,
  },
  breakActionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
  },
  resumeActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#10B981',
    paddingVertical: 11,
    borderRadius: 10,
  },
  resumeActionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  punchOutActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EF4444',
    paddingVertical: 11,
    borderRadius: 10,
  },
  punchOutActionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  punchFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  locationFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationFooterText: {
    fontSize: 11,
  },
  verifiedRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },

  // ── Side Column Widgets ───────────────────────────────────────────────────
  sideWidgetsCol: {
    gap: 12,
  },
  sideWidgetCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  sideWidgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sideWidgetTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  generalBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  generalBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2563EB',
  },
  pendingBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  pendingBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  widgetDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  widgetDetailKey: {
    fontSize: 11,
    color: '#94A3B8',
  },
  widgetDetailVal: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyActivityLog: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  emptyLogText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyLogSubText: {
    fontSize: 11,
    marginTop: 2,
  },
  activityLogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activityLogText: {
    fontSize: 11,
  },

  // ── 3. KPI Grid ───────────────────────────────────────────────────────────
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  kpiCard: {
    flex: 1,
    minWidth: 160,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  kpiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kpiTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  kpiIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  kpiBigNumber: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  kpiTargetSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 3,
  },
  kpiProgressBarTrack: {
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  kpiProgressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  complianceText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
    marginTop: 4,
  },
  payrollSubText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },

  // ── 4. Analytics Row ──────────────────────────────────────────────────────
  analyticsRow: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 16,
  },
  analyticsRowWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  chartCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  chartHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  chartSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legendDotGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: '#64748B',
  },
  barChartWrapper: {
    flexDirection: 'row',
    height: 140,
    marginTop: 10,
  },
  yAxisLabels: {
    width: 25,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  yAxisText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'relative',
    paddingBottom: 20,
  },
  dashedGuideLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  dayCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  dualBarsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: '80%',
  },
  singleBar: {
    width: 10,
    borderRadius: 2,
  },
  dayColLabel: {
    fontSize: 10,
    marginTop: 6,
  },
  ratePercentGreen: {
    fontSize: 14,
    fontWeight: '800',
    color: '#10B981',
  },
  gaugeAndLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 12,
  },
  donutGaugeBox: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutOuterRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInnerCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutDaysNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  donutDaysSub: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
  },
  donutLegendCol: {
    flex: 1,
    gap: 6,
  },
  donutLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  donutLegendLabel: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
    marginLeft: 6,
  },
  donutLegendVal: {
    fontSize: 11,
    fontWeight: '600',
  },
  requestRegularizationLink: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  requestRegularizationText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },

  // ── 5. Bottom Table Card ──────────────────────────────────────────────────
  tableCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  tableCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  tableHeaderIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableCardTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  tableCardSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  pastSevenDaysPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pastSevenDaysPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  tableHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  thText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  tableRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tdTextBold: {
    fontSize: 12,
    fontWeight: '600',
  },
  tdTextRegular: {
    fontSize: 12,
  },
  tdTextMuted: {
    fontSize: 12,
  },
  tdTextAmber: {
    fontSize: 12,
    fontWeight: '600',
  },
  rowStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  rowStatusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
