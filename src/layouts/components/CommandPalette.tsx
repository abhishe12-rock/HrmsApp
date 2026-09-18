import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Search, X, Users, ArrowRight } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

interface CommandPaletteProps {
  onNavigate: (screenName: string) => void;
}

interface QuickAction {
  id: string;
  title: string;
  screen: string;
  category: string;
}

const ACTIONS: QuickAction[] = [
  { id: '1', title: 'View Dashboard', screen: 'Dashboard', category: 'Navigation' },
  { id: '2', title: 'Clock In / Clock Out', screen: 'ClockIn', category: 'Attendance' },
  { id: '3', title: 'Employee Directory', screen: 'EmployeesList', category: 'People' },
  { id: '4', title: 'Apply For Leave', screen: 'LeaveManagement', category: 'Leave' },
  { id: '5', title: 'View Payslips', screen: 'Payslips', category: 'Payroll' },
  { id: '6', title: 'Performance Reviews', screen: 'PerformanceReviews', category: 'Performance' },
  { id: '7', title: 'Job Openings', screen: 'JobOpenings', category: 'Recruitment' },
  { id: '8', title: 'Submit Expense', screen: 'Expenses', category: 'Operations' },
  { id: '9', title: 'Help & Support', screen: 'HelpSupport', category: 'Support' },
  { id: '10', title: 'Settings & Security', screen: 'Settings', category: 'Settings' },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
  const { commandPaletteOpen, setCommandPaletteOpen, isDarkMode } = useAppStore();
  const [query, setQuery] = useState('');
  const theme = isDarkMode ? colors.dark : colors.light;

  const filtered = useMemo(() => {
    if (!query.trim()) return ACTIONS;
    const q = query.toLowerCase();
    return ACTIONS.filter(a =>
      a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = (screen: string) => {
    setCommandPaletteOpen(false);
    setQuery('');
    onNavigate(screen);
  };

  return (
    <Modal
      visible={commandPaletteOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setCommandPaletteOpen(false)}
    >
      <View style={[styles.backdrop, { backgroundColor: theme.backdrop }]}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          {/* Search Box */}
          <View style={[styles.searchBox, { borderBottomColor: theme.border }]}>
            <Search size={18} color={theme.textMuted} />
            <TextInput
              autoFocus
              value={query}
              onChangeText={setQuery}
              placeholder="Search actions, screens..."
              placeholderTextColor={theme.textMuted}
              style={[styles.input, { color: theme.text }]}
            />
            <TouchableOpacity
              onPress={() => setCommandPaletteOpen(false)}
              style={styles.closeBtn}
            >
              <X size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Results List */}
          <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
            {filtered.map(action => (
              <TouchableOpacity
                key={action.id}
                onPress={() => handleSelect(action.screen)}
                style={[
                  styles.actionItem,
                  { borderBottomColor: isDarkMode ? '#1E293B' : '#F1F5F9' },
                ]}
              >
                <View>
                  <Text style={[styles.actionTitle, { color: theme.text }]}>
                    {action.title}
                  </Text>
                  <Text style={[styles.actionCategory, { color: theme.textMuted }]}>
                    {action.category}
                  </Text>
                </View>
                <ArrowRight size={14} color={theme.textMuted} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    padding: spacing.lg,
    paddingTop: 60,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxHeight: 400,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    height: 52,
    borderBottomWidth: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  closeBtn: {
    padding: 6,
  },
  resultsList: {
    padding: spacing.sm,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionCategory: {
    fontSize: 11,
  },
});
