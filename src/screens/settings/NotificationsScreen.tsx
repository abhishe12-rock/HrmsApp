import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, CheckCheck } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../utils';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    isDarkMode,
  } = useAppStore();

  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <AppLayout
      title="Notifications"
      currentScreen="Notifications"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Text style={[styles.heading, { color: theme.text }]}>All Notifications</Text>
          <Button
            title="Mark All Read"
            variant="outline"
            size="sm"
            icon={<CheckCheck size={14} color={colors.primary} />}
            onPress={markAllNotificationsRead}
          />
        </View>

        <View style={styles.list}>
          {notifications.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => markNotificationRead(item.id)}
            >
              <Card style={!item.isRead ? { borderColor: colors.primary } : undefined}>
                <View style={styles.itemHeader}>
                  <Text style={[styles.itemTitle, { color: theme.text }]}>{item.title}</Text>
                  {!item.isRead && <View style={styles.dot} />}
                </View>
                <Text style={[styles.itemMsg, { color: theme.textSecondary }]}>{item.message}</Text>
                <Text style={[styles.itemTime, { color: theme.textMuted }]}>
                  {formatDate(item.timestamp, 'MMM dd, hh:mm a')}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  heading: { fontSize: 18, fontWeight: '800' },
  list: { gap: spacing.xs },
  itemHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  itemTitle: { fontSize: 14, fontWeight: '700' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  itemMsg: { fontSize: 12, lineHeight: 17, marginVertical: 4 },
  itemTime: { fontSize: 10 },
});
