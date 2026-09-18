import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { Search, ChevronDown } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { AppLayout } from '../../layouts/AppLayout';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TEAMS = [
  {
    id: '1', dept: 'ENGINEERING', name: 'Frontend Architecture Core',
    members: 8, lead: 'David Miller', leadRole: 'Principal UI Architect',
    leadInitials: 'DM', leadColor: '#2563EB', okr: 88, accentColor: '#2563EB', extraCount: 5,
  },
  {
    id: '2', dept: 'ENGINEERING', name: 'Cloud & DevOps Infrastructure',
    members: 6, lead: 'Michael Chang', leadRole: 'DevOps Lead',
    leadInitials: 'MC', leadColor: '#06B6D4', okr: 94, accentColor: '#06B6D4', extraCount: 4,
  },
  {
    id: '3', dept: 'MARKETING', name: 'Growth & Demand Generation',
    members: 7, lead: 'Sarah Wilson', leadRole: 'Growth Marketing Lead',
    leadInitials: 'SW', leadColor: '#10B981', okr: 75, accentColor: '#10B981', extraCount: 5,
  },
  {
    id: '4', dept: 'PRODUCT', name: 'Product Design & Research',
    members: 5, lead: 'Elena Rostova', leadRole: 'Design Director',
    leadInitials: 'ER', leadColor: '#EC4899', okr: 82, accentColor: '#EC4899', extraCount: 3,
  },
  {
    id: '5', dept: 'SALES', name: 'Enterprise Accounts Team',
    members: 11, lead: 'James Wilson', leadRole: 'VP Sales',
    leadInitials: 'JW', leadColor: '#F59E0B', okr: 91, accentColor: '#F59E0B', extraCount: 9,
  },
  {
    id: '6', dept: 'HUMAN RESOURCES', name: 'People Operations & Culture',
    members: 6, lead: 'Rachel Green', leadRole: 'Head of People',
    leadInitials: 'RG', leadColor: '#8B5CF6', okr: 89, accentColor: '#8B5CF6', extraCount: 4,
  },
];

export const TeamsScreen: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const DEPARTMENTS = ['All Departments', 'Engineering', 'Marketing', 'Product', 'Sales', 'Human Resources'];
  
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const CARD_W = (SCREEN_WIDTH - spacing.lg * 2 - 10) / 2;

  return (
    <AppLayout
      title="Teams"
      currentScreen="Teams"
      onNavigate={s => navigation.navigate(s as any)}
    >
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: theme.text }}>Teams &amp; Pods</Text>
          <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: colors.primary }}>6 Active Teams</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10 }}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>+ Create New Team</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 12, color: theme.textSecondary, marginBottom: spacing.lg }}>
        Cross-functional squads, reporting pods, sprint OKRs, and team lead delegations.
      </Text>

      {/* Search and Filter */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: spacing.lg }}>
        {/* Search Input */}
        <View style={{ 
          flex: 1, 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.border,
          paddingHorizontal: 12,
          height: 40 
        }}>
          <Search size={16} color={theme.textSecondary} style={{ marginRight: 8 }} />
          <TextInput 
            placeholder="Search teams by name or lead..."
            placeholderTextColor={theme.textSecondary}
            style={{ flex: 1, color: theme.text, fontSize: 13 }}
          />
        </View>

        {/* Filter Dropdown */}
        <View style={{ zIndex: 10 }}>
          <TouchableOpacity 
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.border,
              paddingHorizontal: 12,
              height: 40,
              minWidth: 150
            }}>
            <Text style={{ fontSize: 13, color: theme.text, marginRight: 8 }}>{selectedDept}</Text>
            <ChevronDown size={16} color={theme.textSecondary} />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={{
              position: 'absolute',
              top: 44,
              right: 0,
              width: 150,
              backgroundColor: theme.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.border,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: isDarkMode ? 0.3 : 0.1,
              shadowRadius: 10,
              elevation: 5,
              zIndex: 100,
              overflow: 'hidden'
            }}>
              {DEPARTMENTS.map((dept, index) => (
                <TouchableOpacity
                  key={dept}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    backgroundColor: selectedDept === dept ? colors.primary : 'transparent',
                    borderTopWidth: index === 0 ? 0 : 1,
                    borderTopColor: theme.border,
                  }}
                  onPress={() => {
                    setSelectedDept(dept);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text style={{ 
                    fontSize: 13, 
                    color: selectedDept === dept ? '#fff' : theme.text 
                  }}>
                    {dept}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* 2-column grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {TEAMS.map(team => (
          <View
            key={team.id}
            style={{
              width: CARD_W,
              backgroundColor: theme.surface,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.border,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDarkMode ? 0.2 : 0.06,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            {/* Colored top accent bar */}
            <View style={{ height: 4, backgroundColor: team.accentColor }} />

            <View style={{ padding: 12 }}>
              {/* Dept + Members */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Text style={{ fontSize: 9, fontWeight: '700', color: team.accentColor, letterSpacing: 0.5 }}>
                  {team.dept}
                </Text>
                <View style={{ backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 }}>
                  <Text style={{ fontSize: 9, fontWeight: '600', color: theme.textSecondary }}>{team.members} Members</Text>
                </View>
              </View>

              {/* Team name */}
              <Text style={{ fontSize: 13, fontWeight: '700', color: theme.text, marginBottom: 10, lineHeight: 17 }} numberOfLines={2}>
                {team.name}
              </Text>

              {/* Lead person */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: team.leadColor, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 11 }}>{team.leadInitials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text }} numberOfLines={1}>{team.lead}</Text>
                  <Text style={{ fontSize: 10, color: theme.textSecondary }} numberOfLines={1}>{team.leadRole}</Text>
                </View>
              </View>

              {/* OKR Progress */}
              <View style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontSize: 10, color: theme.textSecondary }}>Sprint OKR Progress</Text>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: theme.text }}>{team.okr}%</Text>
                </View>
                <View style={{ height: 6, backgroundColor: isDarkMode ? '#1E293B' : '#E2E8F0', borderRadius: 3 }}>
                  <View style={{ height: 6, width: `${team.okr}%` as any, backgroundColor: team.accentColor, borderRadius: 3 }} />
                </View>
              </View>

              {/* Avatar stack + View Roster */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <View
                      key={i}
                      style={{
                        width: 22, height: 22, borderRadius: 11,
                        backgroundColor: [team.accentColor, '#94A3B8', '#CBD5E1'][i],
                        marginLeft: i > 0 ? -7 : 0,
                        borderWidth: 1.5,
                        borderColor: theme.surface,
                      }}
                    />
                  ))}
                  <Text style={{ fontSize: 10, color: theme.textSecondary, marginLeft: 5 }}>+{team.extraCount}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: colors.primary }}>View Roster →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </AppLayout>
  );
};

export const OrgStructureScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const HIERARCHY = [
    { title: 'Chief Executive Officer',   name: 'Alexander Wright', level: 'Level 1 - Executive' },
    { title: 'VP of Operations',          name: 'Alex Johnson',     level: 'Level 2 - VP' },
    { title: 'Head of People & Culture',  name: 'Rachel Green',     level: 'Level 3 - Director' },
    { title: 'Engineering Manager',       name: 'Sarah Jenkins',    level: 'Level 4 - Manager' },
    { title: 'Senior Software Engineer',  name: 'David Miller',     level: 'Level 5 - IC' },
  ];

  return (
    <AppLayout
      title="Org Structure"
      currentScreen="OrgStructure"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <Text style={{ fontSize: 20, fontWeight: '800', color: theme.text }}>Reporting Hierarchy</Text>
      <Text style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2, marginBottom: spacing.md }}>
        Chain of command &amp; organizational chart
      </Text>

      <View style={{ gap: spacing.sm }}>
        {HIERARCHY.map((node, index) => (
          <View
            key={node.title}
            style={{
              marginLeft: index * 12,
              backgroundColor: theme.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: theme.text }}>{node.title}</Text>
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primary, marginTop: 1 }}>{node.name}</Text>
              <Text style={{ fontSize: 11, color: theme.textSecondary, marginTop: 2 }}>{node.level}</Text>
            </View>
          </View>
        ))}
      </View>
    </AppLayout>
  );
};
