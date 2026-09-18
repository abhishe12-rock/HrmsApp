import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Bell, X, CheckCheck } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { formatDate } from '../../utils';

export const NotificationsDrawer: React.FC = () => {
  const {
    notificationsOpen,
    setNotificationsOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    isDarkMode,
  } = useAppStore();

  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <Modal
      visible={notificationsOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setNotificationsOpen(false)}
    >
      <View style={[styles.overlay, { backgroundColor: theme.backdrop }]}>
        <TouchableOpacity
          style={styles.backdropTouch}
          onPress={() => setNotificationsOpen(false)}
        />

        <SafeAreaView style={[styles.drawerContainer, { backgroundColor: theme.surface }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <View style={styles.headerLeft}>
              <Bell size={18} color={colors.primary} />
              <Text style={[styles.title, { color: theme.text }]}>
                Notifications
              </Text>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={markAllNotificationsRead}
                style={styles.actionBtn}
              >
                <CheckCheck size={16} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNotificationsOpen(false)}
                style={[styles.closeBtn, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}
              >
                <X size={18} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notifications List */}
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {notifications.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: theme.textMuted }]}>
                  No notifications
                </Text>
              </View>
            ) : (
              notifications.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => markNotificationRead(item.id)}
                  style={[
                    styles.notificationItem,
                    {
                      borderColor: theme.border,
                      backgroundColor: item.isRead
                        ? theme.surface
                        : isDarkMode
                        ? 'rgba(37, 99, 235, 0.08)'
                        : '#EFF6FF',
                    },
                  ]}
                >
                  <View style={styles.itemHeader}>
                    <Text style={[styles.itemTitle, { color: theme.text }]}>
                      {item.title}
                    </Text>
                    {!item.isRead && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={[styles.itemMessage, { color: theme.textSecondary }]}>
                    {item.message}
                  </Text>
                  <Text style={[styles.itemTime, { color: theme.textMuted }]}>
                    {formatDate(item.timestamp, 'MMM dd, hh:mm a')}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdropTouch: {
    flex: 1,
  },
  drawerContainer: {
    width: '85%',
    maxWidth: 340,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    padding: 6,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    padding: spacing.md,
  },
  emptyContainer: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
  },
  notificationItem: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  itemMessage: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 6,
  },
  itemTime: {
    fontSize: 10,
  },
});
