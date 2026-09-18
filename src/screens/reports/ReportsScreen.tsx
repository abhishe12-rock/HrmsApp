import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BarChart3, TrendingUp, Users, Clock, Download, Share2 } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ReportsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const handleExport = (format: 'PDF' | 'CSV') => {
    Alert.alert(
      'Export Complete',
      `Monthly Workforce Analytics Report exported as ${format} successfully. Saved to Downloads.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <AppLayout
      title="Analytics & Reports"
      currentScreen="Reports"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.statsRow}>
          <StatCard
            title="Monthly Attendance"
            value="94.2%"
            change="+1.8%"
            isPositive
            icon={<Clock size={16} color={colors.primary} />}
          />
          <StatCard
            title="Attrition Rate"
            value="2.1%"
            change="-0.5%"
            isPositive
            icon={<TrendingUp size={16} color={colors.success} />}
            iconColor={colors.success}
          />
        </View>

        <Card>
          <Text style={[styles.reportTitle, { color: theme.text }]}>Workforce Headcount Growth</Text>
          <Text style={[styles.reportSub, { color: theme.textSecondary }]}>
            Net headcount expansion over past 6 months
          </Text>

          <View style={styles.metricsList}>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>Engineering</Text>
              <Text style={[styles.metricVal, { color: theme.text }]}>145 (+12)</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>Product & Design</Text>
              <Text style={[styles.metricVal, { color: theme.text }]}>38 (+4)</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>Sales & Marketing</Text>
              <Text style={[styles.metricVal, { color: theme.text }]}>42 (+6)</Text>
            </View>
            <View style={[styles.metricItem, { borderBottomWidth: 0 }]}>
              <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>Operations & HR</Text>
              <Text style={[styles.metricVal, { color: theme.text }]}>23 (+2)</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
            <View style={{ flex: 1 }}>
              <Button
                title="Export PDF"
                variant="primary"
                icon={<Download size={14} color="#FFF" />}
                onPress={() => handleExport('PDF')}
                fullWidth
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="Export CSV"
                variant="outline"
                icon={<Share2 size={14} color={theme.text} />}
                onPress={() => handleExport('CSV')}
                fullWidth
              />
            </View>
          </View>
        </Card>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  reportTitle: { fontSize: 15, fontWeight: '700' },
  reportSub: { fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  metricsList: { gap: 4 },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  metricLabel: { fontSize: 13 },
  metricVal: { fontSize: 13, fontWeight: '700' },
});
