import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { formatSize, formatDate, getFileType } from '../../utils/fileHelpers';
import { ROOT_DIR } from '../../hooks/useFileSystem';

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value} numberOfLines={2}>{value}</Text>
  </View>
);

const FileInfoModal = ({ visible, item, onClose }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Text style={styles.title}>ℹ️  Інформація</Text>
        {item && (
          <View style={styles.table}>
            <InfoRow label="Назва"   value={item.name} />
            <InfoRow label="Тип"     value={getFileType(item.name, item.isDirectory)} />
            {!item.isDirectory && (
              <InfoRow label="Розмір" value={formatSize(item.size)} />
            )}
            <InfoRow label="Змінено" value={formatDate((item.modificationTime || 0) * 1000)} />
            <InfoRow label="Шлях"    value={item.fullPath.replace(ROOT_DIR, 'AppData/')} />
          </View>
        )}
        <TouchableOpacity style={[styles.btn, styles.btnOk]} onPress={onClose}>
          <Text style={styles.btnText}>Закрити</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  box: {
    backgroundColor: colors.bgSecondary, borderRadius: 16,
    padding: 20, width: '100%', borderWidth: 1, borderColor: colors.borderLight,
  },
  title: { color: colors.textPrimary, fontSize: 17, fontWeight: '700', marginBottom: 16 },
  table: { backgroundColor: colors.bgTertiary, borderRadius: 8, padding: 12, gap: 8, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  label: { color: colors.textAccent, fontSize: 13, fontWeight: '600', width: 70 },
  value: { color: colors.textPrimary, fontSize: 13, flex: 1 },
  btn: { paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnOk: { backgroundColor: colors.btnPrimary },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
});

export default FileInfoModal;
