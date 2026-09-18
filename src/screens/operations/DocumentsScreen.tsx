import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FileText, Download, Plus, Upload } from 'lucide-react-native';
import { RootStackParamList } from '../../navigation/types';
import { useAppStore } from '../../store/useAppStore';
import { INITIAL_DOCUMENTS } from '../../services/mockDb';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { DocumentItem } from '../../types';
import { formatDate } from '../../utils';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DocumentsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const theme = isDarkMode ? colors.dark : colors.light;

  const [docs, setDocs] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Policy');

  const handleUploadDoc = () => {
    if (!docTitle.trim()) {
      Alert.alert('Validation Error', 'Please enter a document title.');
      return;
    }
    const newDoc: DocumentItem = {
      id: `doc_${Date.now()}`,
      organizationId: 'org-1',
      title: docTitle.trim(),
      category: 'Policy',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      downloadUrl: '',
      uploadedDate: new Date().toISOString().split('T')[0],
      status: 'Verified',
    };
    setDocs([newDoc, ...docs]);
    setModalOpen(false);
    setDocTitle('');
    Alert.alert('Success', `Document "${newDoc.title}" uploaded to secure vault!`);
  };

  const handleViewDoc = (doc: DocumentItem) => {
    Alert.alert(
      'Document Access',
      `Opening "${doc.title}" (${doc.fileType}, ${doc.fileSize}). Category: ${doc.category}`,
      [{ text: 'Download Offline' }, { text: 'Close' }]
    );
  };

  return (
    <AppLayout
      title="Documents"
      currentScreen="Documents"
      onNavigate={s => navigation.navigate(s as any)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.heading, { color: theme.text }]}>Company Documents</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Policies, handbooks, compliance & employment files
            </Text>
          </View>
          <Button
            title="Upload"
            size="sm"
            icon={<Upload size={14} color="#FFF" />}
            onPress={() => setModalOpen(true)}
          />
        </View>

        <View style={styles.list}>
          {docs.map(doc => (
            <Card key={doc.id}>
              <View style={styles.header}>
                <View style={[styles.iconBox, { backgroundColor: `${colors.primary}15` }]}>
                  <FileText size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: theme.text }]}>{doc.title}</Text>
                  <Text style={[styles.sub, { color: theme.textSecondary }]}>
                    {doc.category} • {doc.fileSize} • Updated {formatDate(doc.uploadedDate)}
                  </Text>
                </View>
                <Button
                  title="View"
                  variant="outline"
                  size="sm"
                  icon={<Download size={14} color={theme.text} />}
                  onPress={() => handleViewDoc(doc)}
                />
              </View>
            </Card>
          ))}
        </View>

        {/* Upload Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Upload to Document Vault"
        >
          <View style={{ gap: spacing.sm, paddingVertical: spacing.xs }}>
            <Input
              label="Document Title *"
              placeholder="e.g. Employee Code of Conduct 2026"
              value={docTitle}
              onChangeText={setDocTitle}
            />
            <Input
              label="Category"
              placeholder="e.g. Policy, Handbook, Compliance, Benefits"
              value={docCategory}
              onChangeText={setDocCategory}
            />
            <View style={{ marginTop: spacing.md }}>
              <Button
                title="Save & Upload Document"
                variant="primary"
                size="lg"
                onPress={handleUploadDoc}
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
