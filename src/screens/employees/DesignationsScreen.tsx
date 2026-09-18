import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Award, Users, Plus } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_DESIGNATIONS } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Designation } from '../../types';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DesignationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [designations, setDesignations] = useState<Designation[]>(() => INITIAL_DESIGNATIONS);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [departmentName, setDepartmentName] = useState('Engineering');
  const [level, setLevel] = useState('Senior');

  const handleCreateDesignation = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a designation title.');
      return;
    }
    const newDes: Designation = {
      id: `des_${Date.now()}`,
      organizationId: 'org-1',
      title: title.trim(),
      departmentId: 'dept-1',
      departmentName: departmentName.trim() || 'Engineering',
      level: level.trim() || 'Senior',
      employeeCount: 1,
    };
    setDesignations([newDes, ...designations]);
    setModalOpen(false);
    setTitle('');
    Alert.alert('Success', `Designation "${newDes.title}" added!`);
  };

  const handleNavigate = (screenName: string) => {
    navigation.navigate(screenName as any);
  };

  return (
    <AppLayout
      title="Designations"
      currentScreen="Designations"
      onNavigate={handleNavigate}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Job Titles & Designations</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              {designations.length} standardized positions
            </Text>
          </View>
          <Button
            title="New Title"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {designations.map(des => (
            <Card key={des.id}>
              <View style={styles.row}>
                <View style={[styles.iconBox, { backgroundColor: `${colors.purple}15` }]}>
                  <Award size={20} color={colors.purple} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{des.title}</Text>
                  <Text style={[styles.dept, { color: theme.textSecondary }]}>
                    {des.departmentName} • Level: {des.level}
                  </Text>
                </View>
                <Badge label={`${des.employeeCount} Members`} status="active" />
              </View>
            </Card>
          ))}
        </View>

        {/* Create Designation Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add New Job Designation"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Designation Title *"
              placeholder="e.g. Principal Architect"
              value={title}
              onChangeText={setTitle}
            />
            <Input
              label="Department"
              placeholder="e.g. Engineering, Product, Design"
              value={departmentName}
              onChangeText={setDepartmentName}
            />
            <Input
              label="Level / Band"
              placeholder="e.g. Junior, Mid, Senior, Lead, Director"
              value={level}
              onChangeText={setLevel}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Save Designation"
                variant="primary"
                size="lg"
                onPress={handleCreateDesignation}
              />
            </View>
          </View>
        </Modal>
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
  subheading: { fontSize: 12, marginTop: 2 },
  list: { gap: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 14, fontWeight: '700' },
  dept: { fontSize: 12, marginTop: 2 },
});
