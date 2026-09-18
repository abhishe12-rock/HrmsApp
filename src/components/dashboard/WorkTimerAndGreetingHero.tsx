import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  Clock,
  Calendar,
  Play,
  Square,
  Coffee,
  FileText,
  UserPlus,
} from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';

interface Props {
  onNavigate?: (screen: string) => void;
  defaultName?: string;
  defaultDesignation?: string;
  defaultDepartment?: string;
  defaultAvatar?: string;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  secondaryActionText?: string;
  secondaryActionIcon?: 'approvals' | 'timesheets';
  onSecondaryAction?: () => void;
}

export const WorkTimerAndGreetingHero: React.FC<Props> = ({
  onNavigate,
  defaultName,
  defaultDesignation,
  defaultDepartment,
  defaultAvatar,
  primaryActionText,
  onPrimaryAction,
  secondaryActionText,
  secondaryActionIcon = 'approvals',
  onSecondaryAction,
}) => {
  const {
    currentUser,
    isDarkMode,
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

  const screenWidth = Dimensions.get('window').width;
  const isWide = screenWidth >= 900;

  // Format seconds to HH:MM:SS
  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Format today's date (e.g., "Thu, Sep 17, 2026")
  const formatDate = () => {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  };

  // Shift status text & color
  let shiftStatusText = 'Shift Not Started';
  let shiftDotColor = '#94A3B8';
  if (isClockedIn && !isOnBreak) {
    shiftStatusText = 'Working';
    shiftDotColor = '#10B981';
  } else if (isClockedIn && isOnBreak) {
    shiftStatusText = 'On Break';
    shiftDotColor = '#F59E0B';
  }

  const avatarUrl =
    defaultAvatar ||
    currentUser?.avatar ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';

  const employeeName = defaultName || currentUser?.name || 'Alexander Wright';
  const designation = defaultDesignation || currentUser?.designation || 'Chief Platform Officer';
  const department = defaultDepartment || currentUser?.departmentName || 'Engineering';

  return (
    <View style={[styles.heroRow, isWide && styles.heroRowWide]}>
      {/* ── LEFT CARD: Greeting & Daily Wishing Card ───────────────────── */}
      <View
        style={[
          styles.greetingCard,
          {
            backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF',
            borderColor: isDarkMode ? '#334155' : '#DBEAFE',
          },
          isWide && { flex: 1.4 },
        ]}
      >
        <View style={styles.greetingHeaderRow}>
          {/* Avatar with Online Status Dot */}
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            <View style={styles.onlineBadge} />
          </View>

          {/* User Info & Designation */}
          <View style={styles.userInfoCol}>
            <View style={styles.nameRow}>
              <Text
                style={[
                  styles.greetingTitle,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
                numberOfLines={1}
              >
                {getGreeting()}, {employeeName} 👋
              </Text>
              <Text style={styles.empBadge}>EMP000</Text>
            </View>

            <Text style={styles.designationText} numberOfLines={1}>
              {designation} • {department} • Full-Time
            </Text>
          </View>

          {/* Wishing Banner (On Wide Screens) */}
          {isWide && (
            <View style={styles.wishingCol}>
              <Text style={styles.wishingScript}>Great Things Ahead</Text>
              <Text style={styles.wishingSub}>Let's make today count ✨</Text>
            </View>
          )}
        </View>

        {/* Wishing Banner (On Mobile Screens) */}
        {!isWide && (
          <View style={styles.mobileWishingBanner}>
            <Text style={styles.wishingScript}>Great Things Ahead</Text>
            <Text style={styles.wishingSub}>Let's make today count ✨</Text>
          </View>
        )}

        {/* Info Chips: Date, Shift, Status */}
        <View style={styles.chipsRow}>
          <View
            style={[
              styles.infoChip,
              {
                backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <Calendar size={13} color="#2563EB" />
            <Text
              style={[
                styles.chipText,
                { color: isDarkMode ? '#E2E8F0' : '#334155' },
              ]}
            >
              {formatDate()}
            </Text>
          </View>

          <View
            style={[
              styles.infoChip,
              {
                backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <Clock size={13} color="#2563EB" />
            <Text
              style={[
                styles.chipText,
                { color: isDarkMode ? '#E2E8F0' : '#334155' },
              ]}
            >
              Shift: 09:00 AM - 06:00 PM
            </Text>
          </View>

          <View
            style={[
              styles.infoChip,
              {
                backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={[styles.statusDot, { backgroundColor: shiftDotColor }]} />
            <Text
              style={[
                styles.chipText,
                { color: isDarkMode ? '#E2E8F0' : '#334155' },
              ]}
            >
              {shiftStatusText}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.addEmployeeBtn}
            activeOpacity={0.8}
            onPress={onPrimaryAction || (() => onNavigate && onNavigate('AddEmployee'))}
          >
            <Text style={styles.addEmployeeText}>{primaryActionText || '+ Add Employee'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.hrApprovalsBtn,
              {
                backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                borderColor: secondaryActionIcon === 'timesheets'
                  ? (isDarkMode ? '#059669' : '#A7F3D0')
                  : (isDarkMode ? '#6366F1' : '#C4B5FD'),
              },
            ]}
            activeOpacity={0.8}
            onPress={onSecondaryAction || (() => onNavigate && onNavigate('LeaveRequests'))}
          >
            {secondaryActionIcon === 'timesheets' ? (
              <Clock size={14} color="#10B981" />
            ) : (
              <FileText size={14} color="#7C3AED" />
            )}
            <Text
              style={[
                styles.hrApprovalsText,
                secondaryActionIcon === 'timesheets' && { color: isDarkMode ? '#34D399' : '#047857' },
              ]}
            >
              {secondaryActionText || 'HR Approvals'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── RIGHT CARD: Interactive Work Timer ─────────────────────────── */}
      <View
        style={[
          styles.timerCard,
          isOnBreak
            ? [
                styles.timerCardBreak,
                {
                  backgroundColor: isDarkMode ? '#292524' : '#FFFDF5',
                  borderColor: isDarkMode ? '#EAB308' : '#FDE047',
                },
              ]
            : {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
          isWide && { flex: 0.9, minWidth: 280, maxWidth: 360 },
        ]}
      >
        {/* Top Header Row: Label + Status Pill Badge */}
        <View style={styles.timerTopRow}>
          <TouchableOpacity
            style={styles.timerTitleRow}
            activeOpacity={0.7}
            onPress={() => onNavigate?.('ClockIn')}
          >
            <Clock size={16} color="#2563EB" />
            <Text
              style={[
                styles.timerTitle,
                { color: isDarkMode ? '#94A3B8' : '#475569' },
              ]}
            >
              WORK TIMER ↗
            </Text>
          </TouchableOpacity>

          {/* Badge: READY / ● LIVE / ● ON BREAK */}
          {!isClockedIn ? (
            <View style={styles.badgeReady}>
              <Text style={styles.badgeReadyText}>READY</Text>
            </View>
          ) : isOnBreak ? (
            <View style={styles.badgeBreak}>
              <View style={styles.breakPillDot} />
              <Text style={styles.badgeBreakText}>ON BREAK</Text>
            </View>
          ) : (
            <View style={styles.badgeLive}>
              <View style={styles.livePillDot} />
              <Text style={styles.badgeLiveText}>LIVE</Text>
            </View>
          )}
        </View>

        {/* Large Digital Clock Display */}
        <View style={styles.timerDigitsContainer}>
          <Text
            style={[
              styles.timerDigits,
              isOnBreak
                ? styles.timerDigitsBreak
                : { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
            ]}
          >
            {isOnBreak
              ? formatTimer(breakSecondsElapsed)
              : isClockedIn
              ? formatTimer(secondsElapsed)
              : '00:00:00'}
          </Text>
        </View>

        {/* Subtitle / Status description */}
        <View style={styles.timerSubtitleRow}>
          {!isClockedIn ? (
            <Text style={styles.timerSubtitleText}>
              Ready to start today's shift
            </Text>
          ) : isOnBreak ? (
            <View style={styles.subFlexRow}>
              <Coffee size={13} color="#92400E" />
              <Text style={styles.timerSubtitleBreak}>
                On Break • Work: {formatTimer(secondsElapsed)}
              </Text>
            </View>
          ) : (
            <Text style={styles.timerSubtitleText}>
              Working • Started {clockInTimeFormatted || '11:47 AM'}
            </Text>
          )}
        </View>

        {/* Buttons Row */}
        <View style={styles.timerButtonsContainer}>
          {/* State 1: READY -> PUNCH IN */}
          {!isClockedIn && (
            <TouchableOpacity
              style={styles.punchInBtn}
              activeOpacity={0.85}
              onPress={punchIn}
            >
              <Play size={15} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.punchInBtnText}>PUNCH IN</Text>
            </TouchableOpacity>
          )}

          {/* State 2: LIVE -> BREAK + PUNCH OUT */}
          {isClockedIn && !isOnBreak && (
            <View style={styles.dualButtonsRow}>
              <TouchableOpacity
                style={styles.breakBtn}
                activeOpacity={0.85}
                onPress={startBreak}
              >
                <Coffee size={15} color="#FFFFFF" />
                <Text style={styles.breakBtnText}>BREAK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.punchOutBtn}
                activeOpacity={0.85}
                onPress={punchOut}
              >
                <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.punchOutBtnText}>PUNCH OUT</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* State 3: ON BREAK -> RESUME + PUNCH OUT */}
          {isClockedIn && isOnBreak && (
            <View style={styles.dualButtonsRow}>
              <TouchableOpacity
                style={styles.resumeBtn}
                activeOpacity={0.85}
                onPress={resumeWork}
              >
                <Play size={15} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.resumeBtnText}>RESUME</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.punchOutBtn}
                activeOpacity={0.85}
                onPress={punchOut}
              >
                <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.punchOutBtnText}>PUNCH OUT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroRow: {
    width: '100%',
    flexDirection: 'column',
    gap: 14,
    marginBottom: 20,
  },
  heroRowWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  // ── Greeting Card Styles ──────────────────────────────────────────
  greetingCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  greetingHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#CBD5E1',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  greetingTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  empBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    letterSpacing: 0.5,
  },
  designationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    marginTop: 2,
  },
  wishingCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  mobileWishingBanner: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#DBEAFE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wishingScript: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#1E3A8A',
    letterSpacing: -0.2,
  },
  wishingSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
    marginTop: 2,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  addEmployeeBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  addEmployeeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  hrApprovalsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.2,
  },
  hrApprovalsText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '700',
  },

  // ── Work Timer Styles ─────────────────────────────────────────────
  timerCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  timerCardBreak: {
    borderWidth: 1.5,
  },
  timerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  badgeReady: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeReadyText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  badgeLive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
  },
  livePillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  badgeLiveText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  badgeBreak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
  },
  breakPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
  },
  badgeBreakText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 0.5,
  },
  timerDigitsContainer: {
    marginVertical: 4,
  },
  timerDigits: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1.5,
    fontVariant: ['tabular-nums'],
  },
  timerDigitsBreak: {
    color: '#D97706',
  },
  timerSubtitleRow: {
    marginBottom: 14,
  },
  timerSubtitleText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  subFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timerSubtitleBreak: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
  },
  timerButtonsContainer: {
    width: '100%',
  },
  punchInBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  punchInBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dualButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  breakBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EA580C',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  breakBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  resumeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resumeBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  punchOutBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  punchOutBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
