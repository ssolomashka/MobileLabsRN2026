import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { getFileEmoji, formatSize, formatDate } from '../utils/fileHelpers';

const FileListItem = ({ item, onPress, onLongPress, onDelete }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onPress(item)}
    onLongPress={() => onLongPress(item)}
    activeOpacity={0.7}
  >
    <View style={styles.icon}>
      <Text style={styles.iconText}>{getFileEmoji(item.name, item.isDirectory)}</Text>
    </View>

    <View style={styles.body}>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.meta}>
        {item.isDirectory ? 'Папка' : formatSize(item.size)}
        {item.modificationTime
          ? `  ·  ${formatDate(item.modificationTime * 1000)}`
          : ''}
      </Text>
    </View>

    <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteBtn}>
      <Text style={styles.deleteBtnText}>🗑️</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSecondary,
    borderRadius: 10,
    marginBottom: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: { fontSize: 22 },
  body: { flex: 1 },
  name: { color: colors.textPrimary, fontSize: 15, fontWeight: '600' },
  meta: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  deleteBtn: { padding: 6 },
  deleteBtnText: { fontSize: 16 },
});

export default FileListItem;
