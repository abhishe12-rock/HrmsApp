import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Megaphone } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AnnouncementsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const POSTS = [
    { title: 'Annual Employee Appreciation Week', date: 'Sep 02, 2024', author: 'Rachel Green', content: 'Join us next week for celebration events, games, and surprise awards across all campuses!' },
    { title: 'Q3 Product Roadmap All-Hands', date: 'Aug 24, 2024', author: 'Alex Wright (CEO)', content: 'Join the CEO address covering our new mobile product launch and customer growth milestones.' },
  ];

  return (
    <AppLayout
      title="Announcements"
      currentScreen="Announcements"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Company Announcements</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Official organizational news & circulars
        </Text>

        <View style={styles.list}>
          {POSTS.map(p => (
            <Card key={p.title}>
              <Text style={[styles.title, { color: theme.text }]}>{p.title}</Text>
              <Text style={[styles.sub, { color: colors.primary }]}>
                {p.author} • {p.date}
              </Text>
              <Text style={[styles.body, { color: theme.textSecondary }]}>
                {p.content}
              </Text>
            </Card>
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  list: { gap: spacing.sm },
  title: { fontSize: 14, fontWeight: '700' },
  sub: { fontSize: 12, marginTop: 2 },
  body: { fontSize: 13, lineHeight: 18, marginTop: spacing.sm },
});
