import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Building2, Users, Plus } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_DEPARTMENTS } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Department } from '../../types';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DepartmentsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [departments, setDepartments] = useState<Department[]>(() => INITIAL_DEPARTMENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [deptName, setDeptName] = useState('');
  const [deptCode, setDeptCode] = useState('');
  const [deptHead, setDeptHead] = useState('');

  const handleCreateDept = () => {
    if (!deptName.trim()) {
      Alert.alert('Validation Error', 'Please enter a department name.');
      return;
    }
    const newDept: Department = {
      id: `dept_${Date.now()}`,
      organizationId: 'org-1',
      name: deptName.trim(),
      code: (deptCode.trim() || deptName.substring(0, 3)).toUpperCase(),
      headOfDepartmentId: 'usr-1',
      headName: deptHead.trim() || 'Unassigned',
      employeeCount: 1,
      color: colors.primary,
    };
    setDepartments([newDept, ...departments]);
    setModalOpen(false);
    setDeptName('');
    setDeptCode('');
    setDeptHead('');
    Alert.alert('Success', `Department "${newDept.name}" created!`);
  };

  const handleNavigate = (screenName: string) => {
    navigation.navigate(screenName as any);
  };

  return (
    <AppLayout
      title="Departments"
      currentScreen="Departments"
      onNavigate={handleNavigate}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Company Departments</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              {departments.length} functional organizational units
            </Text>
          </View>
          <Button
            title="New Dept"
            size="sm"
            icon={<Plus size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {departments.map(dept => (
            <Card key={dept.id} style={styles.deptCard}>
              <View style={styles.deptHeader}>
                <View style={[styles.deptIcon, { backgroundColor: `${dept.color || colors.primary}18` }]}>
                  <Building2 size={20} color={dept.color || colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.deptName, { color: theme.text }]}>{dept.name}</Text>
                  <Text style={[styles.deptCode, { color: theme.textSecondary }]}>
                    Code: {dept.code} • Head: {dept.headName || 'Not Assigned'}
                  </Text>
                </View>
                <View style={[styles.countBadge, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}>
                  <Users size={12} color={theme.textSecondary} />
                  <Text style={[styles.countText, { color: theme.text }]}>
                    {dept.employeeCount}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Create Department Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create New Department"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Department Name *"
              placeholder="e.g. Artificial Intelligence Labs"
              value={deptName}
              onChangeText={setDeptName}
            />
            <Input
              label="Department Code"
              placeholder="e.g. AIL, RND, MKT"
              value={deptCode}
              onChangeText={setDeptCode}
            />
            <Input
              label="Department Head / Lead"
              placeholder="e.g. Dr. Sarah Connor"
              value={deptHead}
              onChangeText={setDeptHead}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Save Department"
                variant="primary"
                size="lg"
                onPress={handleCreateDept}
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
  list: { gap: spacing.sm },
  deptCard: { marginBottom: spacing.xs },
  deptHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  deptIcon: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deptName: { fontSize: 15, fontWeight: '700' },
  deptCode: { fontSize: 12, marginTop: 2 },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  countText: { fontSize: 12, fontWeight: '700' },
});
