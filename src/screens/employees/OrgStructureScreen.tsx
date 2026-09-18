import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const OrgStructureScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const HIERARCHY = [
    { title: 'Chief Executive Officer', name: 'Alexander Wright', level: 'Level 1 - Executive' },
    { title: 'VP of Operations', name: 'Alex Johnson', level: 'Level 2 - VP' },
    { title: 'Head of People & Culture', name: 'Rachel Green', level: 'Level 3 - Director' },
    { title: 'Engineering Manager', name: 'Sarah Jenkins', level: 'Level 4 - Manager' },
    { title: 'Senior Software Engineer', name: 'David Miller', level: 'Level 5 - IC' },
  ];

  return (
    <AppLayout
      title="Org Structure"
      currentScreen="OrgStructure"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Reporting Hierarchy</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Chain of command & organizational chart
        </Text>

        <View style={styles.list}>
          {HIERARCHY.map((node, index) => (
            <Card key={node.title} style={{ marginLeft: index * 12 }}>
              <View style={styles.nodeRow}>
                <View style={[styles.nodeDot, { backgroundColor: colors.primary }]} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.nodeTitle, { color: theme.text }]}>{node.title}</Text>
                  <Text style={[styles.nodeName, { color: colors.primary }]}>{node.name}</Text>
                  <Text style={[styles.nodeLevel, { color: theme.textSecondary }]}>{node.level}</Text>
                </View>
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
  nodeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  nodeDot: { width: 10, height: 10, borderRadius: 5 },
  nodeTitle: { fontSize: 14, fontWeight: '700' },
  nodeName: { fontSize: 12, fontWeight: '600', marginTop: 1 },
  nodeLevel: { fontSize: 11, marginTop: 2 },
});
