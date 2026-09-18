import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  Modal as RNModal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Users,
  UserCheck,
  Laptop,
  CalendarDays,
  Table as TableIcon,
  LayoutGrid,
  Grid3X3,
  Download,
  Plus,
  Search,
  ChevronDown,
  Check,
  X,
  ArrowUpRight,
  Mail,
  Phone,
  Building2,
  MapPin,
} from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { INITIAL_EMPLOYEES } from '../../services/mockDb';
import { Employee } from '../../types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ── Department badge color mapping ──────────────────────────────────────────
const DEPT_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  Finance: { bg: '#ECFDF5', text: '#059669', label: 'Finance' },
  'Human Resources': { bg: '#F5F3FF', text: '#7C3AED', label: 'Human R...' },
  Marketing: { bg: '#FDF2F8', text: '#DB2777', label: 'Marketing' },
  Engineering: { bg: '#EFF6FF', text: '#2563EB', label: 'Engineeri...' },
  Sales: { bg: '#FFF7ED', text: '#EA580C', label: 'Sales' },
  Product: { bg: '#F3E8FF', text: '#9333EA', label: 'Product' },
};

// ── Seed 6 employee items matching the screenshot ───────────────────────────
const DEFAULT_DIRECTORY_EMPLOYEES: Employee[] = [
  {
    ...INITIAL_EMPLOYEES[2], // Amit Kumar
    id: 'emp-3',
    employeeId: 'EMP003',
    fullName: 'Amit Kumar',
    designation: 'Senior Accountant',
    department: 'Finance',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    employmentType: 'Full-time',
    workLocation: 'Hybrid',
  },
  {
    ...INITIAL_EMPLOYEES[3], // Neha Gupta
    id: 'emp-4',
    employeeId: 'EMP004',
    fullName: 'Neha Gupta',
    designation: 'HR Executive',
    department: 'Human Resources',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    employmentType: 'Full-time',
    workLocation: 'On-site',
  },
  {
    ...INITIAL_EMPLOYEES[1], // Priya Singh
    id: 'emp-2',
    employeeId: 'EMP002',
    fullName: 'Priya Singh',
    designation: 'Marketing Director',
    department: 'Marketing',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    employmentType: 'Full-time',
    workLocation: 'Hybrid',
  },
  {
    ...INITIAL_EMPLOYEES[0], // Rahul Sharma (Selected by default)
    id: 'emp-1',
    employeeId: 'EMP001',
    fullName: 'Rahul Sharma',
    designation: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    employmentType: 'Full-time',
    workLocation: 'Remote',
  },
  {
    ...INITIAL_EMPLOYEES[4], // Sandeep Yadav
    id: 'emp-5',
    employeeId: 'EMP005',
    fullName: 'Sandeep Yadav',
    designation: 'Sales Executive',
    department: 'Sales',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    employmentType: 'Full-time',
    workLocation: 'Hybrid',
  },
  {
    ...INITIAL_EMPLOYEES[5], // Sarah Connor
    id: 'emp-6',
    employeeId: 'EMP006',
    fullName: 'Sarah Connor',
    designation: 'Frontend Lead',
    department: 'Engineering',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    employmentType: 'Full-time',
    workLocation: 'Remote',
  },
];

export const EmployeesListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [employees, setEmployees] = useState<Employee[]>(DEFAULT_DIRECTORY_EMPLOYEES);
  const [selectedEmpId, setSelectedEmpId] = useState<string>('emp-1'); // Rahul Sharma selected
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'smallBox'>('smallBox');

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments (6)');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedSort, setSelectedSort] = useState('Name (A → Z)');

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<'dept' | 'status' | 'type' | 'sort' | null>(null);

  // Add Employee Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDesignation, setNewDesignation] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newType, setNewType] = useState('Full-time');

  // Dropdown option definitions
  const STATUS_OPTIONS = ['All Statuses', 'Active', 'On Leave', 'Probation'];
  const TYPE_OPTIONS = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Internship'];
  const DEPT_OPTIONS = [
    'All Departments (6)',
    'Finance',
    'Human Resources',
    'Marketing',
    'Engineering',
    'Sales',
  ];
  const SORT_OPTIONS = ['Name (A → Z)', 'Name (Z → A)', 'ID (Asc)', 'ID (Desc)'];

  // Filtered and Sorted employees
  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        emp =>
          emp.fullName.toLowerCase().includes(q) ||
          emp.employeeId.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q) ||
          emp.designation.toLowerCase().includes(q) ||
          emp.department.toLowerCase().includes(q)
      );
    }

    // Department filter
    if (selectedDept !== 'All Departments (6)') {
      result = result.filter(emp => emp.department === selectedDept);
    }

    // Status filter
    if (selectedStatus !== 'All Statuses') {
      result = result.filter(emp => emp.status === selectedStatus);
    }

    // Type filter
    if (selectedType !== 'All Types') {
      result = result.filter(emp => emp.employmentType === selectedType);
    }

    // Sorting
    if (selectedSort === 'Name (A → Z)') {
      result.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (selectedSort === 'Name (Z → A)') {
      result.sort((a, b) => b.fullName.localeCompare(a.fullName));
    } else if (selectedSort === 'ID (Asc)') {
      result.sort((a, b) => a.employeeId.localeCompare(b.employeeId));
    } else if (selectedSort === 'ID (Desc)') {
      result.sort((a, b) => b.employeeId.localeCompare(a.employeeId));
    }

    return result;
  }, [employees, searchQuery, selectedDept, selectedStatus, selectedType, selectedSort]);

  // Handle Add Employee submit
  const handleCreateEmployee = () => {
    if (!newFullName.trim()) {
      Alert.alert('Required', 'Please enter employee full name.');
      return;
    }
    const base = INITIAL_EMPLOYEES[0] || ({} as Employee);
    const empIdNum = employees.length + 1;
    const newEmp: Employee = {
      ...base,
      id: `emp-${Date.now()}`,
      organizationId: 'org-1',
      employeeId: `EMP00${empIdNum}`,
      firstName: newFullName.split(' ')[0] || 'Member',
      lastName: newFullName.split(' ').slice(1).join(' ') || '',
      fullName: newFullName.trim(),
      email: `${newFullName.toLowerCase().replace(/\s+/g, '.')}@acmecorp.com`,
      phone: '+1 (555) 342-1000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: newDept,
      designation: newDesignation.trim() || 'Team Member',
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      employmentType: newType as any,
      workLocation: 'Hybrid',
    };

    setEmployees(prev => [newEmp, ...prev]);
    setSelectedEmpId(newEmp.id);
    setIsAddModalOpen(false);
    setNewFullName('');
    setNewEmail('');
    setNewDesignation('');
    Alert.alert('Success', `${newEmp.fullName} has been added to the directory!`);
  };

  const handleExport = () => {
    Alert.alert(
      'Export Employee Directory',
      `Exported ${filteredEmployees.length} employees to CSV report.`
    );
  };

  return (
    <AppLayout
      title="Team Members"
      currentScreen="EmployeesList"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── 1. Top Header Banner: Employee Directory ──────────────────── */}
        <View
          style={[
            styles.bannerCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF',
              borderColor: isDarkMode ? '#334155' : '#DBEAFE',
            },
          ]}
        >
          {/* Left: Icon, Title, Pill, Subtitle */}
          <View style={styles.bannerLeftInfo}>
            <View style={styles.bannerIconBox}>
              <Users size={22} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.titleWithBadge}>
                <Text
                  style={[
                    styles.bannerTitle,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  Employee Directory
                </Text>
                <View style={styles.membersCountPill}>
                  <Text style={styles.membersCountPillText}>
                    {employees.length} Total Members
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.bannerSubtitle,
                  { color: isDarkMode ? '#94A3B8' : '#64748B' },
                ]}
              >
                Manage organization workforce, departmental rosters, roles, and 360° talent profiles.
              </Text>
            </View>
          </View>

          {/* Right: View Switchers & Action Buttons */}
          <View style={styles.bannerRightActions}>
            {/* View Switcher Segment */}
            <View
              style={[
                styles.viewSwitcherGroup,
                {
                  backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              {/* Table Button */}
              <TouchableOpacity
                onPress={() => setViewMode('table')}
                style={[
                  styles.viewSwitcherBtn,
                  viewMode === 'table' && styles.viewSwitcherBtnActive,
                ]}
              >
                <TableIcon
                  size={14}
                  color={viewMode === 'table' ? '#FFFFFF' : isDarkMode ? '#94A3B8' : '#64748B'}
                />
                <Text
                  style={[
                    styles.viewSwitcherText,
                    viewMode === 'table' && styles.viewSwitcherTextActive,
                    {
                      color:
                        viewMode === 'table'
                          ? '#FFFFFF'
                          : isDarkMode
                          ? '#94A3B8'
                          : '#64748B',
                    },
                  ]}
                >
                  Table
                </Text>
              </TouchableOpacity>

              {/* Grid Button */}
              <TouchableOpacity
                onPress={() => setViewMode('grid')}
                style={[
                  styles.viewSwitcherBtn,
                  viewMode === 'grid' && styles.viewSwitcherBtnActive,
                ]}
              >
                <LayoutGrid
                  size={14}
                  color={viewMode === 'grid' ? '#FFFFFF' : isDarkMode ? '#94A3B8' : '#64748B'}
                />
                <Text
                  style={[
                    styles.viewSwitcherText,
                    viewMode === 'grid' && styles.viewSwitcherTextActive,
                    {
                      color:
                        viewMode === 'grid'
                          ? '#FFFFFF'
                          : isDarkMode
                          ? '#94A3B8'
                          : '#64748B',
                    },
                  ]}
                >
                  Grid
                </Text>
              </TouchableOpacity>

              {/* Small Box Button (Active in screenshot) */}
              <TouchableOpacity
                onPress={() => setViewMode('smallBox')}
                style={[
                  styles.viewSwitcherBtn,
                  viewMode === 'smallBox' && styles.viewSwitcherBtnActive,
                ]}
              >
                <Grid3X3
                  size={14}
                  color={viewMode === 'smallBox' ? '#FFFFFF' : isDarkMode ? '#94A3B8' : '#64748B'}
                />
                <Text
                  style={[
                    styles.viewSwitcherText,
                    viewMode === 'smallBox' && styles.viewSwitcherTextActive,
                    {
                      color:
                        viewMode === 'smallBox'
                          ? '#FFFFFF'
                          : isDarkMode
                          ? '#94A3B8'
                          : '#64748B',
                    },
                  ]}
                >
                  Small Box
                </Text>
              </TouchableOpacity>
            </View>

            {/* Export Button */}
            <TouchableOpacity
              onPress={handleExport}
              style={[
                styles.exportBtn,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <Download size={14} color={isDarkMode ? '#F8FAFC' : '#1E293B'} />
              <Text
                style={[
                  styles.exportBtnText,
                  { color: isDarkMode ? '#F8FAFC' : '#1E293B' },
                ]}
              >
                Export
              </Text>
            </TouchableOpacity>

            {/* Add New Employee Button */}
            <TouchableOpacity
              onPress={() => setIsAddModalOpen(true)}
              style={styles.addEmployeeBtn}
            >
              <Plus size={15} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.addEmployeeBtnText}>Add New Employee</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── 2. Stat Cards (4 Cards Grid) ──────────────────────────────── */}
        <View style={styles.kpiCardsRow}>
          {/* Card 1: TOTAL WORKFORCE */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiContentCol}>
              <Text style={styles.kpiLabel}>TOTAL WORKFORCE</Text>
              <Text
                style={[
                  styles.kpiValue,
                  { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                ]}
              >
                {employees.length}
              </Text>
              <Text style={styles.kpiSub}>Across 6 departments</Text>
            </View>
            <View style={[styles.kpiIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Users size={18} color="#2563EB" />
            </View>
          </View>

          {/* Card 2: ACTIVE ON DUTY */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiContentCol}>
              <Text style={styles.kpiLabel}>ACTIVE ON DUTY</Text>
              <Text
                style={[
                  styles.kpiValue,
                  { color: isDarkMode ? '#10B981' : '#059669' },
                ]}
              >
                {employees.filter(e => e.status === 'Active').length}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 }}>
                <View style={[styles.activeIndicatorDot, { backgroundColor: '#10B981' }]} />
                <Text style={[styles.kpiSub, { color: '#10B981', fontWeight: '600' }]}>
                  100% Active
                </Text>
              </View>
            </View>
            <View style={[styles.kpiIconBox, { backgroundColor: '#ECFDF5' }]}>
              <UserCheck size={18} color="#10B981" />
            </View>
          </View>

          {/* Card 3: REMOTE & HYBRID */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiContentCol}>
              <Text style={styles.kpiLabel}>REMOTE & HYBRID</Text>
              <Text
                style={[
                  styles.kpiValue,
                  { color: isDarkMode ? '#818CF8' : '#4F46E5' },
                ]}
              >
                {employees.filter(e => e.workLocation === 'Remote' || e.workLocation === 'Hybrid').length}
              </Text>
              <Text style={styles.kpiSub}>Flexible arrangement</Text>
            </View>
            <View style={[styles.kpiIconBox, { backgroundColor: '#EEF2FF' }]}>
              <Laptop size={18} color="#6366F1" />
            </View>
          </View>

          {/* Card 4: ON LEAVE / PROBATION */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <View style={styles.kpiContentCol}>
              <Text style={styles.kpiLabel}>ON LEAVE / PROBATION</Text>
              <Text
                style={[
                  styles.kpiValue,
                  { color: isDarkMode ? '#FBBF24' : '#D97706' },
                ]}
              >
                {employees.filter(e => e.status === 'On Leave' || e.status === 'Probation').length}
              </Text>
              <Text style={[styles.kpiSub, { color: '#D97706' }]}>
                Temporarily absent / pending
              </Text>
            </View>
            <View style={[styles.kpiIconBox, { backgroundColor: '#FFFBEB' }]}>
              <CalendarDays size={18} color="#F59E0B" />
            </View>
          </View>
        </View>

        {/* ── 3. Filters & Search Toolbar ───────────────────────────────── */}
        <View
          style={[
            styles.toolbarCard,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          {/* Search Input */}
          <View
            style={[
              styles.searchInputContainer,
              {
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <Search size={16} color="#94A3B8" style={{ marginRight: 8 }} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search by employee name, ID, email, designation, or department..."
              placeholderTextColor="#94A3B8"
              style={[
                styles.searchTextInput,
                { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
              ]}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={14} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* Dropdown Filters Row */}
          <View style={styles.dropdownFiltersRow}>
            {/* 1. Department Dropdown */}
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                onPress={() =>
                  setOpenDropdown(openDropdown === 'dept' ? null : 'dept')
                }
                style={[
                  styles.filterPillDropdown,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                    borderColor: openDropdown === 'dept' ? '#2563EB' : isDarkMode ? '#334155' : '#CBD5E1',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    { color: isDarkMode ? '#F8FAFC' : '#334155' },
                  ]}
                >
                  {selectedDept}
                </Text>
                <ChevronDown size={14} color="#64748B" />
              </TouchableOpacity>

              {/* Department Dropdown Menu */}
              {openDropdown === 'dept' && (
                <View
                  style={[
                    styles.dropdownMenu,
                    {
                      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    },
                  ]}
                >
                  {DEPT_OPTIONS.map(opt => {
                    const isSelected = selectedDept === opt;
                    return (
                      <TouchableOpacity
                        key={opt}
                        onPress={() => {
                          setSelectedDept(opt);
                          setOpenDropdown(null);
                        }}
                        style={[
                          styles.dropdownMenuItem,
                          isSelected && styles.dropdownMenuItemActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dropdownMenuItemText,
                            isSelected && styles.dropdownMenuItemTextActive,
                            !isSelected && {
                              color: isDarkMode ? '#F8FAFC' : '#1E293B',
                            },
                          ]}
                        >
                          {opt}
                        </Text>
                        {isSelected && <Check size={14} color="#FFFFFF" />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            {/* 2. Status Dropdown (Screenshot 2) */}
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                onPress={() =>
                  setOpenDropdown(openDropdown === 'status' ? null : 'status')
                }
                style={[
                  styles.filterPillDropdown,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                    borderColor: openDropdown === 'status' ? '#2563EB' : isDarkMode ? '#334155' : '#CBD5E1',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    { color: isDarkMode ? '#F8FAFC' : '#334155' },
                  ]}
                >
                  {selectedStatus}
                </Text>
                <ChevronDown size={14} color="#64748B" />
              </TouchableOpacity>

              {/* Status Dropdown Menu */}
              {openDropdown === 'status' && (
                <View
                  style={[
                    styles.dropdownMenu,
                    {
                      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    },
                  ]}
                >
                  {STATUS_OPTIONS.map(opt => {
                    const isSelected = selectedStatus === opt;
                    return (
                      <TouchableOpacity
                        key={opt}
                        onPress={() => {
                          setSelectedStatus(opt);
                          setOpenDropdown(null);
                        }}
                        style={[
                          styles.dropdownMenuItem,
                          isSelected && styles.dropdownMenuItemActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dropdownMenuItemText,
                            isSelected && styles.dropdownMenuItemTextActive,
                            !isSelected && {
                              color: isDarkMode ? '#F8FAFC' : '#1E293B',
                            },
                          ]}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            {/* 3. Type Dropdown (Screenshot 3) */}
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                onPress={() =>
                  setOpenDropdown(openDropdown === 'type' ? null : 'type')
                }
                style={[
                  styles.filterPillDropdown,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                    borderColor: openDropdown === 'type' ? '#2563EB' : isDarkMode ? '#334155' : '#CBD5E1',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    { color: isDarkMode ? '#F8FAFC' : '#334155' },
                  ]}
                >
                  {selectedType}
                </Text>
                <ChevronDown size={14} color="#64748B" />
              </TouchableOpacity>

              {/* Type Dropdown Menu */}
              {openDropdown === 'type' && (
                <View
                  style={[
                    styles.dropdownMenu,
                    {
                      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    },
                  ]}
                >
                  {TYPE_OPTIONS.map(opt => {
                    const isSelected = selectedType === opt;
                    return (
                      <TouchableOpacity
                        key={opt}
                        onPress={() => {
                          setSelectedType(opt);
                          setOpenDropdown(null);
                        }}
                        style={[
                          styles.dropdownMenuItem,
                          isSelected && styles.dropdownMenuItemActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dropdownMenuItemText,
                            isSelected && styles.dropdownMenuItemTextActive,
                            !isSelected && {
                              color: isDarkMode ? '#F8FAFC' : '#1E293B',
                            },
                          ]}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            {/* 4. Sort Dropdown */}
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                onPress={() =>
                  setOpenDropdown(openDropdown === 'sort' ? null : 'sort')
                }
                style={[
                  styles.filterPillDropdown,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
                    borderColor: openDropdown === 'sort' ? '#2563EB' : isDarkMode ? '#334155' : '#CBD5E1',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    { color: isDarkMode ? '#F8FAFC' : '#334155' },
                  ]}
                >
                  {selectedSort}
                </Text>
                <ChevronDown size={14} color="#64748B" />
              </TouchableOpacity>

              {/* Sort Dropdown Menu */}
              {openDropdown === 'sort' && (
                <View
                  style={[
                    styles.dropdownMenu,
                    {
                      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    },
                  ]}
                >
                  {SORT_OPTIONS.map(opt => {
                    const isSelected = selectedSort === opt;
                    return (
                      <TouchableOpacity
                        key={opt}
                        onPress={() => {
                          setSelectedSort(opt);
                          setOpenDropdown(null);
                        }}
                        style={[
                          styles.dropdownMenuItem,
                          isSelected && styles.dropdownMenuItemActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dropdownMenuItemText,
                            isSelected && styles.dropdownMenuItemTextActive,
                            !isSelected && {
                              color: isDarkMode ? '#F8FAFC' : '#1E293B',
                            },
                          ]}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* ── 4. Sub-header: Count + Active View ────────────────────────── */}
        <View style={styles.subHeaderRow}>
          <Text
            style={[
              styles.subHeaderCount,
              { color: isDarkMode ? '#94A3B8' : '#64748B' },
            ]}
          >
            Showing <Text style={{ fontWeight: '700', color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>{filteredEmployees.length}</Text> of{' '}
            <Text style={{ fontWeight: '700', color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>{employees.length}</Text> employees
          </Text>

          <Text
            style={[
              styles.subHeaderActiveView,
              { color: isDarkMode ? '#94A3B8' : '#64748B' },
            ]}
          >
            Active view:{' '}
            <Text style={{ color: '#2563EB', fontWeight: '600' }}>
              {viewMode === 'smallBox'
                ? 'Compact Mode'
                : viewMode === 'grid'
                ? 'Grid Mode'
                : 'Table Mode'}
            </Text>
          </Text>
        </View>

        {/* ── 5. Main Content: Small Box (Compact) / Grid / Table ───────── */}
        {viewMode === 'smallBox' && (
          <View style={styles.smallBoxGrid}>
            {filteredEmployees.map(emp => {
              const isSelected = emp.id === selectedEmpId;
              const deptBadge = DEPT_BADGES[emp.department] || {
                bg: '#EFF6FF',
                text: '#2563EB',
                label: emp.department,
              };

              return (
                <TouchableOpacity
                  key={emp.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedEmpId(emp.id)}
                  style={[
                    styles.compactCard,
                    {
                      backgroundColor: isDarkMode
                        ? isSelected
                          ? '#1E3A8A25'
                          : '#1E293B'
                        : isSelected
                        ? '#F0F7FF'
                        : '#FFFFFF',
                      borderColor: isSelected
                        ? '#2563EB'
                        : isDarkMode
                        ? '#334155'
                        : '#E2E8F0',
                      borderWidth: isSelected ? 1.5 : 1,
                    },
                  ]}
                >
                  {/* Top Online Indicator Dot */}
                  <View style={styles.compactCardTopRow}>
                    <View style={{ flex: 1 }} />
                    <View style={styles.onlineDot} />
                  </View>

                  {/* Centered Avatar with subtle ring */}
                  <View style={styles.avatarRingWrapper}>
                    <Image
                      source={{ uri: emp.avatar }}
                      style={styles.compactAvatar}
                    />
                  </View>

                  {/* Name */}
                  <Text
                    style={[
                      styles.compactName,
                      isSelected && { color: '#2563EB' },
                      !isSelected && {
                        color: isDarkMode ? '#F8FAFC' : '#0F172A',
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {emp.fullName}
                  </Text>

                  {/* Designation */}
                  <Text
                    style={[
                      styles.compactDesignation,
                      { color: isDarkMode ? '#94A3B8' : '#64748B' },
                    ]}
                    numberOfLines={1}
                  >
                    {emp.designation}
                  </Text>

                  {/* Footer: EMP ID & Department Badge */}
                  <View style={styles.compactFooterRow}>
                    <Text
                      style={[
                        styles.empIdText,
                        { color: isDarkMode ? '#64748B' : '#94A3B8' },
                      ]}
                    >
                      {emp.employeeId}
                    </Text>

                    <View
                      style={[
                        styles.deptBadgePill,
                        { backgroundColor: deptBadge.bg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.deptBadgeText,
                          { color: deptBadge.text },
                        ]}
                        numberOfLines={1}
                      >
                        {deptBadge.label}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Grid Mode View */}
        {viewMode === 'grid' && (
          <View style={styles.standardGrid}>
            {filteredEmployees.map(emp => {
              const deptBadge = DEPT_BADGES[emp.department] || {
                bg: '#EFF6FF',
                text: '#2563EB',
                label: emp.department,
              };

              return (
                <View
                  key={emp.id}
                  style={[
                    styles.gridCard,
                    {
                      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                    },
                  ]}
                >
                  <View style={styles.gridCardHeader}>
                    <Image
                      source={{ uri: emp.avatar }}
                      style={styles.gridAvatar}
                    />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text
                        style={[
                          styles.gridName,
                          { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                        ]}
                      >
                        {emp.fullName}
                      </Text>
                      <Text
                        style={[
                          styles.gridDesignation,
                          { color: isDarkMode ? '#94A3B8' : '#64748B' },
                        ]}
                      >
                        {emp.designation}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <Text style={{ fontSize: 11, color: '#94A3B8' }}>{emp.employeeId}</Text>
                        <View style={[styles.deptBadgePill, { backgroundColor: deptBadge.bg }]}>
                          <Text style={[styles.deptBadgeText, { color: deptBadge.text }]}>
                            {emp.department}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.gridInfoRow}>
                    <Mail size={13} color="#94A3B8" />
                    <Text style={[styles.gridInfoText, { color: isDarkMode ? '#94A3B8' : '#64748B' }]} numberOfLines={1}>
                      {emp.email}
                    </Text>
                  </View>

                  <View style={styles.gridInfoRow}>
                    <Building2 size={13} color="#94A3B8" />
                    <Text style={[styles.gridInfoText, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                      {emp.workLocation} • {emp.employmentType}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EmployeeDetail', { employeeId: emp.id })
                    }
                    style={[
                      styles.viewProfileBtn,
                      { borderColor: isDarkMode ? '#334155' : '#E2E8F0' },
                    ]}
                  >
                    <Text style={styles.viewProfileBtnText}>View Full Profile</Text>
                    <ArrowUpRight size={13} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {/* Table Mode View */}
        {viewMode === 'table' && (
          <View
            style={[
              styles.tableContainer,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            {/* Table Header */}
            <View
              style={[
                styles.tableHeaderRow,
                {
                  backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                  borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
              ]}
            >
              <Text style={[styles.tableColHeader, { flex: 2 }]}>Employee</Text>
              <Text style={[styles.tableColHeader, { flex: 1.5 }]}>Department</Text>
              <Text style={[styles.tableColHeader, { flex: 1.2 }]}>Type</Text>
              <Text style={[styles.tableColHeader, { flex: 1 }]}>Status</Text>
              <Text style={[styles.tableColHeader, { width: 40, textAlign: 'right' }]}>Act</Text>
            </View>

            {/* Table Rows */}
            {filteredEmployees.map((emp, index) => {
              const deptBadge = DEPT_BADGES[emp.department] || {
                bg: '#EFF6FF',
                text: '#2563EB',
                label: emp.department,
              };

              return (
                <TouchableOpacity
                  key={emp.id}
                  onPress={() =>
                    navigation.navigate('EmployeeDetail', { employeeId: emp.id })
                  }
                  style={[
                    styles.tableRow,
                    index !== filteredEmployees.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: isDarkMode ? '#334155' : '#F1F5F9',
                    },
                  ]}
                >
                  <View style={[styles.tableCol, { flex: 2, flexDirection: 'row', alignItems: 'center' }]}>
                    <Image source={{ uri: emp.avatar }} style={styles.tableAvatar} />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                      <Text
                        style={[
                          styles.tableName,
                          { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                        ]}
                        numberOfLines={1}
                      >
                        {emp.fullName}
                      </Text>
                      <Text style={styles.tableSub} numberOfLines={1}>
                        {emp.designation} • {emp.employeeId}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.tableCol, { flex: 1.5 }]}>
                    <View style={[styles.deptBadgePill, { backgroundColor: deptBadge.bg }]}>
                      <Text style={[styles.deptBadgeText, { color: deptBadge.text }]}>
                        {emp.department}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.tableCol, { flex: 1.2 }]}>
                    <Text
                      style={[
                        styles.tableBodyText,
                        { color: isDarkMode ? '#94A3B8' : '#64748B' },
                      ]}
                    >
                      {emp.employmentType}
                    </Text>
                  </View>

                  <View style={[styles.tableCol, { flex: 1 }]}>
                    <View style={styles.tableStatusPill}>
                      <View style={[styles.onlineDot, { width: 6, height: 6 }]} />
                      <Text style={styles.tableStatusText}>{emp.status}</Text>
                    </View>
                  </View>

                  <View style={[styles.tableCol, { width: 40, alignItems: 'flex-end' }]}>
                    <ArrowUpRight size={14} color="#2563EB" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* ── Add New Employee Modal ──────────────────────────────────────── */}
      <RNModal
        visible={isAddModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsAddModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text
                  style={[
                    styles.modalTitle,
                    { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
                  ]}
                >
                  Add New Employee
                </Text>
                <Text
                  style={[
                    styles.modalSubtitle,
                    { color: isDarkMode ? '#94A3B8' : '#64748B' },
                  ]}
                >
                  Enter member details to add to organization directory
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsAddModalOpen(false)}
                style={styles.modalCloseBtn}
              >
                <X size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={styles.modalForm}>
              <Text style={styles.formLabel}>Full Name *</Text>
              <TextInput
                value={newFullName}
                onChangeText={setNewFullName}
                placeholder="e.g. Vikram Malhotra"
                placeholderTextColor="#94A3B8"
                style={[
                  styles.formInput,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#0F172A',
                  },
                ]}
              />

              <Text style={styles.formLabel}>Role / Designation *</Text>
              <TextInput
                value={newDesignation}
                onChangeText={setNewDesignation}
                placeholder="e.g. Lead QA Engineer"
                placeholderTextColor="#94A3B8"
                style={[
                  styles.formInput,
                  {
                    backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                    borderColor: isDarkMode ? '#334155' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#0F172A',
                  },
                ]}
              />

              <Text style={styles.formLabel}>Department</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
                {['Engineering', 'Marketing', 'Finance', 'Human Resources', 'Sales'].map(d => (
                  <TouchableOpacity
                    key={d}
                    onPress={() => setNewDept(d)}
                    style={[
                      styles.modalOptionPill,
                      newDept === d && styles.modalOptionPillActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalOptionPillText,
                        newDept === d && styles.modalOptionPillTextActive,
                      ]}
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.formLabel}>Employment Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setNewType(t)}
                    style={[
                      styles.modalOptionPill,
                      newType === t && styles.modalOptionPillActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalOptionPillText,
                        newType === t && styles.modalOptionPillTextActive,
                      ]}
                    >
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Submit Buttons */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={() => setIsAddModalOpen(false)}
                  style={[
                    styles.cancelBtn,
                    { borderColor: isDarkMode ? '#334155' : '#E2E8F0' },
                  ]}
                >
                  <Text style={[styles.cancelBtnText, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCreateEmployee}
                  style={styles.saveEmployeeBtn}
                >
                  <Text style={styles.saveEmployeeBtnText}>Save Employee</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </RNModal>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 60,
  },

  // ── 1. Top Header Banner ──────────────────────────────────────────────────
  bannerCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  bannerLeftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 260,
  },
  bannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  membersCountPill: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  membersCountPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },
  bannerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  bannerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  viewSwitcherGroup: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    padding: 2,
  },
  viewSwitcherBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewSwitcherBtnActive: {
    backgroundColor: '#2563EB',
  },
  viewSwitcherText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewSwitcherTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  exportBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  addEmployeeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  addEmployeeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // ── 2. Stat Cards ─────────────────────────────────────────────────────────
  kpiCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  kpiCard: {
    flex: 1,
    minWidth: 160,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  kpiContentCol: {
    flex: 1,
  },
  kpiLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: -0.5,
  },
  kpiSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  kpiIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  activeIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  // ── 3. Filters & Search Toolbar ───────────────────────────────────────────
  toolbarCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    gap: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 38,
  },
  searchTextInput: {
    flex: 1,
    fontSize: 12,
    padding: 0,
  },
  dropdownFiltersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterPillDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    minWidth: 115,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 38,
    left: 0,
    minWidth: 140,
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 999,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden',
  },
  dropdownMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  dropdownMenuItemActive: {
    backgroundColor: '#2563EB',
  },
  dropdownMenuItemText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dropdownMenuItemTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // ── 4. Sub-header ─────────────────────────────────────────────────────────
  subHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  subHeaderCount: {
    fontSize: 12,
  },
  subHeaderActiveView: {
    fontSize: 12,
  },

  // ── 5. Small Box / Compact Mode Cards ─────────────────────────────────────
  smallBoxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  compactCard: {
    width: (SCREEN_WIDTH - 32 - 24) / 3 > 140 ? (SCREEN_WIDTH - 32 - 24) / 3 : 155,
    flexGrow: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  compactCardTopRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  avatarRingWrapper: {
    marginVertical: 4,
    padding: 2,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  compactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  compactName: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
  compactDesignation: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  compactFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  empIdText: {
    fontSize: 10,
    fontWeight: '500',
  },
  deptBadgePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    maxWidth: 80,
  },
  deptBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },

  // ── Standard Grid Mode ────────────────────────────────────────────────────
  standardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    flex: 1,
    minWidth: 260,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  gridCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  gridAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  gridName: {
    fontSize: 14,
    fontWeight: '700',
  },
  gridDesignation: {
    fontSize: 12,
    marginTop: 1,
  },
  gridInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  gridInfoText: {
    fontSize: 11,
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  viewProfileBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },

  // ── Table Mode ────────────────────────────────────────────────────────────
  tableContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  tableColHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tableCol: {
    justifyContent: 'center',
  },
  tableAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  tableName: {
    fontSize: 12,
    fontWeight: '600',
  },
  tableSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  tableBodyText: {
    fontSize: 11,
  },
  tableStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  tableStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
  },

  // ── Add Employee Modal ────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 440,
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalForm: {
    gap: 6,
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  formInput: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    marginBottom: 10,
  },
  modalOptionPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    marginRight: 6,
  },
  modalOptionPillActive: {
    backgroundColor: '#2563EB',
  },
  modalOptionPillText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  modalOptionPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 10,
  },
  cancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  saveEmployeeBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveEmployeeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
