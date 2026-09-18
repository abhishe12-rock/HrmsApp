import { create } from 'zustand';
import { User, UserRole, Organization, NotificationItem } from '../types';
import { authService } from '../services/authService';
import { INITIAL_NOTIFICATIONS } from '../services/mockDb';
import { saveToStorage, getFromStorage } from '../services/storage';

interface AppState {
  // Auth & Context
  currentUser: User;
  currentRole: UserRole;
  currentOrg: Organization;
  allOrgs: Organization[];
  allDemoUsers: User[];

  // App Shell State
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  isDarkMode: boolean;
  commandPaletteOpen: boolean;
  notificationsOpen: boolean;
  roleSwitcherOpen: boolean;
  notifications: NotificationItem[];
  unreadCount: number;

  // Live Clock In State
  isClockedIn: boolean;
  isOnBreak: boolean;
  clockInTime: string | null;
  clockInTimeFormatted: string;
  secondsElapsed: number;
  breakSecondsElapsed: number;
  breakStartTime: string | null;

  // Actions
  switchRole: (role: UserRole) => Promise<void>;
  switchOrg: (orgId: string) => Promise<void>;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  setRoleSwitcherOpen: (open: boolean) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setClockInState: (active: boolean, time?: string) => void;
  punchIn: () => void;
  startBreak: () => void;
  resumeWork: () => void;
  punchOut: () => void;
  tickClockTimer: () => void;
  logout: () => Promise<void>;
}

const initialUser = authService.getCurrentUser();
const allOrgs = authService.getAllOrganizations();
const currentOrg = allOrgs.find(o => o.id === initialUser.organizationId) || allOrgs[0];
const initialDarkMode = getFromStorage<string>('hrm_theme', 'light') === 'dark';

const formatTime12h = (d: Date = new Date()) => {
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minsStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minsStr} ${ampm}`;
};

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: initialUser,
  currentRole: initialUser.role,
  currentOrg: currentOrg,
  allOrgs: allOrgs,
  allDemoUsers: authService.getAllDemoUsers(),

  sidebarCollapsed: false,
  mobileMenuOpen: false,
  isDarkMode: initialDarkMode,
  commandPaletteOpen: false,
  notificationsOpen: false,
  roleSwitcherOpen: false,
  notifications: INITIAL_NOTIFICATIONS,
  unreadCount: INITIAL_NOTIFICATIONS.filter(n => !n.isRead).length,

  isClockedIn: false,
  isOnBreak: false,
  clockInTime: null,
  clockInTimeFormatted: '11:47 AM',
  secondsElapsed: 0,
  breakSecondsElapsed: 0,
  breakStartTime: null,

  switchRole: async (role: UserRole) => {
    const updatedUser = await authService.switchRole(role);
    set({
      currentUser: updatedUser,
      currentRole: role,
    });
  },

  switchOrg: async (orgId: string) => {
    const { user, org } = await authService.switchOrganization(orgId);
    set({
      currentUser: user,
      currentOrg: org,
    });
  },

  toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  toggleDarkMode: () => set(state => {
    const nextDark = !state.isDarkMode;
    saveToStorage('hrm_theme', nextDark ? 'dark' : 'light');
    return { isDarkMode: nextDark };
  }),

  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setNotificationsOpen: (open) => set({ notificationsOpen: open }),
  setRoleSwitcherOpen: (open) => set({ roleSwitcherOpen: open }),

  markNotificationRead: (id) => set(state => {
    const updated = state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    return {
      notifications: updated,
      unreadCount: updated.filter(n => !n.isRead).length,
    };
  }),

  markAllNotificationsRead: () => set(state => {
    const updated = state.notifications.map(n => ({ ...n, isRead: true }));
    return {
      notifications: updated,
      unreadCount: 0,
    };
  }),

  setClockInState: (active, time) => {
    const now = new Date();
    set({
      isClockedIn: active,
      isOnBreak: false,
      clockInTime: time || (active ? now.toISOString() : null),
      clockInTimeFormatted: formatTime12h(now),
      secondsElapsed: 0,
      breakSecondsElapsed: 0,
      breakStartTime: null,
    });
  },

  punchIn: () => {
    const now = new Date();
    console.log('[AppStore] punchIn triggered');
    set({
      isClockedIn: true,
      isOnBreak: false,
      clockInTime: now.toISOString(),
      clockInTimeFormatted: formatTime12h(now),
      secondsElapsed: 0,
      breakSecondsElapsed: 0,
      breakStartTime: null,
    });
  },

  startBreak: () => {
    const now = new Date();
    console.log('[AppStore] startBreak triggered');
    set({
      isOnBreak: true,
      breakStartTime: now.toISOString(),
      breakSecondsElapsed: 0,
    });
  },

  resumeWork: () => {
    console.log('[AppStore] resumeWork triggered');
    set({
      isOnBreak: false,
      breakStartTime: null,
    });
  },

  punchOut: () => {
    console.log('[AppStore] punchOut triggered');
    set({
      isClockedIn: false,
      isOnBreak: false,
      clockInTime: null,
      breakStartTime: null,
      secondsElapsed: 0,
      breakSecondsElapsed: 0,
    });
  },

  tickClockTimer: () => {
    const { isClockedIn, isOnBreak, secondsElapsed, breakSecondsElapsed } = get();
    if (!isClockedIn) return;
    if (isOnBreak) {
      set({ breakSecondsElapsed: breakSecondsElapsed + 1 });
    } else {
      set({ secondsElapsed: secondsElapsed + 1 });
    }
  },

  logout: async () => {
    await authService.logout();
    const guestUser = authService.getCurrentUser();
    set({
      currentUser: guestUser,
      currentRole: guestUser.role,
      mobileMenuOpen: false,
    });
  }
}));
