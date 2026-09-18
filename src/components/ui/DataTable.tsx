import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

export interface Column<T> {
  key: string;
  title: string;
  render?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  pageSize?: number;
  keyExtractor?: (item: T, index: number) => string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchable = true,
  searchKeys = [],
  searchPlaceholder = 'Search records...',
  pageSize = 8,
  keyExtractor = (item, idx) => item.id?.toString() || idx.toString(),
}: DataTableProps<T>) {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(item => {
      if (searchKeys.length > 0) {
        return searchKeys.some(key =>
          String(item[key] || '').toLowerCase().includes(query)
        );
      }
      return Object.values(item).some(val =>
        String(val || '').toLowerCase().includes(query)
      );
    });
  }, [data, searchQuery, searchKeys]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      {searchable && (
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.inputBg,
              borderColor: theme.border,
            },
          ]}
        >
          <Search size={16} color={theme.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            value={searchQuery}
            onChangeText={t => {
              setSearchQuery(t);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            placeholderTextColor={theme.textMuted}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>
      )}

      {/* Cards List for Responsive Mobile Experience */}
      {paginatedData.length === 0 ? (
        <View style={[styles.emptyState, { borderColor: theme.border }]}>
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            No records found
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {paginatedData.map((item, index) => (
            <View
              key={keyExtractor(item, index)}
              style={[
                styles.cardItem,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
            >
              {columns.map(col => (
                <View key={col.key} style={styles.rowItem}>
                  <Text style={[styles.colTitle, { color: theme.textSecondary }]}>
                    {col.title}
                  </Text>
                  <View style={styles.colValue}>
                    {col.render ? (
                      col.render(item)
                    ) : (
                      <Text style={[styles.valText, { color: theme.text }]}>
                        {String(item[col.key] ?? '--')}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <View style={styles.pagination}>
          <Text style={[styles.pageInfo, { color: theme.textSecondary }]}>
            Page {currentPage} of {totalPages} ({filteredData.length} items)
          </Text>
          <View style={styles.pageButtons}>
            <TouchableOpacity
              disabled={currentPage <= 1}
              onPress={() => setCurrentPage(p => Math.max(1, p - 1))}
              style={[
                styles.pageBtn,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.surface,
                  opacity: currentPage <= 1 ? 0.4 : 1,
                },
              ]}
            >
              <ChevronLeft size={16} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={currentPage >= totalPages}
              onPress={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              style={[
                styles.pageBtn,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.surface,
                  opacity: currentPage >= totalPages ? 0.4 : 1,
                },
              ]}
            >
              <ChevronRight size={16} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 42,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  list: {
    gap: spacing.sm,
  },
  cardItem: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
  },
  colTitle: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  colValue: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  valText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: borderRadius.xl,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  pageInfo: {
    fontSize: 12,
  },
  pageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  pageBtn: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
