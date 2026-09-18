import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[
              styles.tab,
              isActive && {
                backgroundColor: colors.primary,
              },
              !isActive && {
                backgroundColor: isDarkMode ? theme.surfaceSecondary : '#F1F5F9',
              },
            ]}
          >
            {tab.icon}
            <Text
              style={[
                styles.tabText,
                {
                  color: isActive ? '#FFFFFF' : theme.textSecondary,
                  fontWeight: isActive ? '700' : '600',
                },
              ]}
            >
              {tab.label}
            </Text>
            {tab.count !== undefined && (
              <View
                style={[
                  styles.countBadge,
                  {
                    backgroundColor: isActive
                      ? 'rgba(255, 255, 255, 0.25)'
                      : isDarkMode
                      ? '#334155'
                      : '#E2E8F0',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    { color: isActive ? '#FFFFFF' : theme.text },
                  ]}
                >
                  {tab.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  tabText: {
    fontSize: 13,
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: borderRadius.full,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
