import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GraduationCap } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_TRAINING_COURSES } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { TrainingCourse } from '../../types';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TrainingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [programs] = useState<TrainingCourse[]>(INITIAL_TRAINING_COURSES);

  return (
    <AppLayout
      title="Training"
      currentScreen="Training"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Learning & Development</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Employee professional upskilling and compliance certifications
        </Text>

        <View style={styles.list}>
          {programs.map(prog => (
            <Card key={prog.id}>
              <View style={styles.header}>
                <View style={[styles.iconBox, { backgroundColor: `${colors.purple}15` }]}>
                  <GraduationCap size={20} color={colors.purple} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{prog.title}</Text>
                  <Text style={[styles.sub, { color: theme.textSecondary }]}>
                    Instructor: {prog.instructor} • Duration: {prog.durationHours} hrs
                  </Text>
                </View>
                <Badge label={prog.status} status={prog.status} />
              </View>

              <View style={[styles.footerRow, { borderTopColor: theme.border }]}>
                <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                  {prog.totalEnrolled} enrolled employees • {prog.completedCount} completed
                </Text>
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
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  list: { gap: spacing.sm },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 14, fontWeight: '700' },
  sub: { fontSize: 11, marginTop: 2 },
  footerRow: {
    marginTop: spacing.md,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
  },
  footerText: { fontSize: 11 },
});
