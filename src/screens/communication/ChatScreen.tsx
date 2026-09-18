import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MessageSquare, Search } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const CHATS = [
    { id: '1', name: 'Rachel Green', role: 'Head of People', lastMsg: 'Your leave request has been approved!', time: '10:45 AM', unread: 1 },
    { id: '2', name: 'Sarah Jenkins', role: 'Engineering Lead', lastMsg: 'Let us sync on the mobile sprint release.', time: '09:12 AM', unread: 2 },
    { id: '3', name: 'Michael Chang', role: 'Staff Engineer', lastMsg: 'Thanks for sending over the designs.', time: 'Yesterday', unread: 0 },
    { id: '4', name: 'General Announcements', role: 'Company-wide', lastMsg: 'Town Hall meeting this Friday at 4 PM.', time: 'Sep 08', unread: 0 },
  ];

  return (
    <AppLayout
      title="Team Chat"
      currentScreen="Chat"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Input
          placeholder="Search direct messages or channels..."
          leftIcon={<Search size={18} color={theme.textMuted} />}
          containerStyle={{ marginBottom: spacing.md }}
        />

        <View style={styles.list}>
          {CHATS.map(chat => (
            <Card key={chat.id}>
              <View style={styles.chatRow}>
                <Avatar name={chat.name} size={46} online />
                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.chatName, { color: theme.text }]}>{chat.name}</Text>
                    <Text style={[styles.timeText, { color: theme.textMuted }]}>{chat.time}</Text>
                  </View>
                  <Text style={[styles.roleText, { color: colors.primary }]}>{chat.role}</Text>
                  <Text style={[styles.lastMsg, { color: theme.textSecondary }]} numberOfLines={1}>
                    {chat.lastMsg}
                  </Text>
                </View>
                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unread}</Text>
                  </View>
                )}
              </View>
            </Card>
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  list: { gap: spacing.xs },
  chatRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chatName: { fontSize: 14, fontWeight: '700' },
  timeText: { fontSize: 11 },
  roleText: { fontSize: 11, fontWeight: '600', marginTop: 1 },
  lastMsg: { fontSize: 12, marginTop: 2 },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
});
