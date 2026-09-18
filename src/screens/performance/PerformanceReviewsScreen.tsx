import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_REVIEWS } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PerformanceReview } from '../../types';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PerformanceReviewsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [reviews] = useState<PerformanceReview[]>(INITIAL_REVIEWS);

  return (
    <AppLayout
      title="Reviews"
      currentScreen="PerformanceReviews"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Employee Appraisals</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          360-degree feedback and annual performance evaluation
        </Text>

        <View style={styles.list}>
          {reviews.map(rev => (
            <Card key={rev.id}>
              <View style={styles.header}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{rev.employeeName}</Text>
                  <Text style={[styles.desc, { color: theme.textSecondary }]}>
                    Cycle: {rev.cycle} • Reviewer: {rev.reviewerName}
                  </Text>
                </View>
                <Badge label={`Rating: ${rev.rating}/5.0`} status="active" />
              </View>
              <Text style={[styles.feedback, { color: theme.textSecondary }]}>
                "{rev.feedback}"
              </Text>
            </Card>
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

const colors = {
  dark: { text: '#F8FAFC', textSecondary: '#94A3B8' },
  light: { text: '#0F172A', textSecondary: '#64748B' },
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  heading: { fontSize: 18, fontWeight: '800' },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  list: { gap: spacing.sm },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  title: { fontSize: 15, fontWeight: '700' },
  desc: { fontSize: 12, marginTop: 2 },
  feedback: { fontSize: 12, fontStyle: 'italic', marginTop: spacing.sm },
});
