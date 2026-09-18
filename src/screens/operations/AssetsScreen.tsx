import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Laptop } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_ASSETS } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Asset } from '../../types';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AssetsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [assets] = useState<Asset[]>(INITIAL_ASSETS);

  return (
    <AppLayout
      title="Assets"
      currentScreen="Assets"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Company Hardware & Assets</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Track equipment assigned to employees
        </Text>

        <View style={styles.list}>
          {assets.map(asset => (
            <Card key={asset.id}>
              <View style={styles.header}>
                <View style={[styles.iconBox, { backgroundColor: `${colors.info}15` }]}>
                  <Laptop size={20} color={colors.info} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{asset.name}</Text>
                  <Text style={[styles.sub, { color: theme.textSecondary }]}>
                    SN: {asset.serialNumber} • {asset.assignedToEmployeeName || 'Available in Storage'}
                  </Text>
                </View>
                <Badge label={asset.status} status={asset.status === 'Assigned' ? 'active' : 'pending'} />
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
});
