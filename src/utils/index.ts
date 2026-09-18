import { format, parseISO, isValid } from 'date-fns';
import { colors } from '../theme/colors';

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount.toLocaleString()}`;
  }
}

export function formatDate(dateString: string | undefined | null, formatStr: string = 'MMM dd, yyyy'): string {
  if (!dateString) return '--';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
    if (!isValid(date)) return dateString;
    return format(date, formatStr);
  } catch {
    return dateString;
  }
}

export function formatTime(timeStr: string | undefined): string {
  if (!timeStr) return '--:--';
  return timeStr;
}

export function getInitials(name: string): string {
  if (!name) return 'HR';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

export function getStatusColors(status: string, isDark: boolean = false) {
  const s = (status || '').toLowerCase();
  switch (s) {
    case 'present':
    case 'active':
    case 'approved':
    case 'paid':
    case 'completed':
    case 'success':
    case 'verified':
    case 'joined':
      return {
        bg: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5',
        text: isDark ? '#34D399' : '#047857',
        border: isDark ? '#065F46' : '#A7F3D0',
      };
    case 'late':
    case 'pending':
    case 'in progress':
    case 'probation':
    case 'trial':
    case 'warning':
    case 'screening':
    case 'interview':
    case 'shortlisted':
    case 'draft':
      return {
        bg: isDark ? 'rgba(245, 158, 11, 0.15)' : '#FFFBEB',
        text: isDark ? '#FBBF24' : '#B45309',
        border: isDark ? '#92400E' : '#FDE68A',
      };
    case 'absent':
    case 'rejected':
    case 'cancelled':
    case 'terminated':
    case 'failed':
    case 'at risk':
    case 'suspended':
      return {
        bg: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2',
        text: isDark ? '#F87171' : '#B91C1C',
        border: isDark ? '#991B1B' : '#FECACA',
      };
    case 'on leave':
    case 'half day':
    case 'work from home':
    case 'reimbursed':
    case 'selected':
      return {
        bg: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF',
        text: isDark ? '#818CF8' : '#4338CA',
        border: isDark ? '#3730A3' : '#C7D2FE',
      };
    default:
      return {
        bg: isDark ? 'rgba(148, 163, 184, 0.15)' : '#F1F5F9',
        text: isDark ? '#94A3B8' : '#475569',
        border: isDark ? '#334155' : '#E2E8F0',
      };
  }
}
