import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option...',
}) => {
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(o => o.value === value);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setOpen(true)}
        style={[
          styles.trigger,
          {
            backgroundColor: theme.inputBg,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.triggerText,
            { color: selectedOption ? theme.text : theme.textMuted },
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <ChevronDown size={18} color={theme.textMuted} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={[styles.modalBackdrop, { backgroundColor: theme.backdrop }]}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    style={[
                      styles.optionItem,
                      isSelected && { backgroundColor: `${colors.primary}10` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionLabel,
                        {
                          color: isSelected ? colors.primary : theme.text,
                          fontWeight: isSelected ? '700' : '500',
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Check size={16} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  triggerText: {
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  dropdownList: {
    maxHeight: 300,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    paddingVertical: spacing.xs,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  optionLabel: {
    fontSize: 14,
  },
});
