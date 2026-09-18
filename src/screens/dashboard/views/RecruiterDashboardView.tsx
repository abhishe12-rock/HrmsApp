import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Briefcase, Users, Calendar, Award } from 'lucide-react-native';
import { useAppStore } from '../../../store/useAppStore';
import { Card } from '../../../components/ui/Card';
import { StatCard } from '../../../components/ui/StatCard';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

interface Props {
  onNavigate: (screen: string) => void;
}

export const RecruiterDashboardView: React.FC<Props> = ({ onNavigate }) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <StatCard
          title="Active Openings"
          value="15"
          subtitle="Across 4 departments"
          icon={<Briefcase size={16} color={colors.primary} />}
        />
        <StatCard
          title="Active Candidates"
          value="142"
          change="+18 this week"
          isPositive
          icon={<Users size={16} color={colors.info} />}
          iconColor={colors.info}
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="Interviews Today"
          value="6"
          subtitle="2 technical rounds"
          icon={<Calendar size={16} color={colors.warning} />}
          iconColor={colors.warning}
        />
        <StatCard
          title="Offers Accepted"
          value="8"
          change="89% acceptance"
          isPositive
          icon={<Award size={16} color={colors.success} />}
          iconColor={colors.success}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Today's Interview Schedule
      </Text>
      <Card>
        <View style={styles.interviewRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.candName, { color: theme.text }]}>Alexander Novak</Text>
            <Text style={[styles.candRole, { color: theme.textSecondary }]}>
              Senior React Native Developer • 02:00 PM
            </Text>
          </View>
          <Badge label="Round 2 Tech" status="active" />
        </View>

        <View style={[styles.interviewRow, { borderBottomWidth: 0 }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.candName, { color: theme.text }]}>Elena Rostova</Text>
            <Text style={[styles.candRole, { color: theme.textSecondary }]}>
              UI/UX Product Designer • 04:30 PM
            </Text>
          </View>
          <Badge label="Final Culture" status="warning" />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginVertical: spacing.md,
  },
  interviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  candName: {
    fontSize: 14,
    fontWeight: '700',
  },
  candRole: {
    fontSize: 12,
    marginTop: 2,
  },
});
