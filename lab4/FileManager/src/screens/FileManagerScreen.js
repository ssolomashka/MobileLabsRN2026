import React, { useState } from 'react';
import {
  View, FlatList, Text, TouchableOpacity,
  ActivityIndicator, Alert, StyleSheet,
} from 'react-native';

import colors from '../constants/colors';
import { isTextFile } from '../utils/fileHelpers';
import useFileSystem from '../hooks/useFileSystem';

import StorageCard       from '../components/StorageCard';
import BreadcrumbBar     from '../components/BreadcrumbBar';
import FileListItem      from '../components/FileListItem';
import CreateFolderModal from '../components/modals/CreateFolderModal';
import CreateFileModal   from '../components/modals/CreateFileModal';
import ViewFileModal     from '../components/modals/ViewFileModal';
import EditFileModal     from '../components/modals/EditFileModal';
import FileInfoModal     from '../components/modals/FileInfoModal';

const MODAL = {
  NONE:          null,
  CREATE_FOLDER: 'createFolder',
  CREATE_FILE:   'createFile',
  VIEW:          'view',
  EDIT:          'edit',
  INFO:          'info',
};

const FileManagerScreen = () => {
  const {
    items, loading, storageInfo,
    navigateInto, navigateUp, getBreadcrumb, isAtRoot,
    readFile, saveFile, createFolder, createFile, deleteItem,
  } = useFileSystem();

  const [modal, setModal]             = useState(MODAL.NONE);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fileContent, setFileContent]   = useState('');

  // ── Відкриття файлу ────────────────────────────────────────────────────────
  const handleOpenFile = async (item) => {
    if (item.isDirectory) { navigateInto(item); return; }
    if (!isTextFile(item.name)) {
      Alert.alert('Увага', 'Перегляд доступний лише для текстових файлів');
      return;
    }
    try {
      const content = await readFile(item.fullPath);
      setSelectedItem(item);
      setFileContent(content);
      setModal(MODAL.VIEW);
    } catch (e) {
      Alert.alert('Помилка', e.message);
    }
  };

  // ── Збереження відредагованого файлу ──────────────────────────────────────
  const handleSave = async () => {
    try {
      await saveFile(selectedItem.fullPath, fileContent);
      Alert.alert('Успіх', 'Файл збережено');
      setModal(MODAL.NONE);
    } catch (e) {
      Alert.alert('Помилка', e.message);
    }
  };

  // ── Довге натискання — деталі ──────────────────────────────────────────────
  const handleLongPress = (item) => {
    setSelectedItem(item);
    setModal(MODAL.INFO);
  };

  return (
    <View style={styles.container}>
      {/* Статистика пам'яті */}
      <StorageCard storageInfo={storageInfo} />

      {/* Breadcrumb */}
      <BreadcrumbBar
        breadcrumb={getBreadcrumb()}
        isAtRoot={isAtRoot}
        onNavigateUp={navigateUp}
      />

      {/* Список файлів */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.accentBlue} style={styles.loader} />
      ) : items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>Директорія порожня</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.fullPath}
          renderItem={({ item }) => (
            <FileListItem
              item={item}
              onPress={handleOpenFile}
              onLongPress={handleLongPress}
              onDelete={deleteItem}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      {/* FAB кнопки */}
      <View style={styles.fab}>
        <TouchableOpacity
          style={[styles.fabBtn, { backgroundColor: colors.accentPurple }]}
          onPress={() => setModal(MODAL.CREATE_FOLDER)}
        >
          <Text style={styles.fabText}>+ Папка</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fabBtn, { backgroundColor: colors.accentTeal }]}
          onPress={() => setModal(MODAL.CREATE_FILE)}
        >
          <Text style={styles.fabText}>+ Файл</Text>
        </TouchableOpacity>
      </View>

      {/* Модальні вікна */}
      <CreateFolderModal
        visible={modal === MODAL.CREATE_FOLDER}
        onClose={() => setModal(MODAL.NONE)}
        onCreate={createFolder}
      />
      <CreateFileModal
        visible={modal === MODAL.CREATE_FILE}
        onClose={() => setModal(MODAL.NONE)}
        onCreate={createFile}
      />
      <ViewFileModal
        visible={modal === MODAL.VIEW}
        item={selectedItem}
        content={fileContent}
        onClose={() => setModal(MODAL.NONE)}
        onEdit={() => setModal(MODAL.EDIT)}
      />
      <EditFileModal
        visible={modal === MODAL.EDIT}
        item={selectedItem}
        content={fileContent}
        onChangeContent={setFileContent}
        onSave={handleSave}
        onBack={() => setModal(MODAL.VIEW)}
      />
      <FileInfoModal
        visible={modal === MODAL.INFO}
        item={selectedItem}
        onClose={() => setModal(MODAL.NONE)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgPrimary },
  loader: { marginTop: 40 },
  list: { paddingHorizontal: 12, paddingTop: 8, paddingBottom: 100 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: colors.textMuted, fontSize: 15 },
  fab: {
    position: 'absolute', bottom: 24, right: 16, left: 16,
    flexDirection: 'row', gap: 12, justifyContent: 'flex-end',
  },
  fabBtn: {
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: 28,
    elevation: 6, shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.4, shadowRadius: 4,
  },
  fabText: { color: colors.white, fontWeight: '700', fontSize: 14 },
});

export default FileManagerScreen;
