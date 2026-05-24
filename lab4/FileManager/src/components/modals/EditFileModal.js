import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const EditFileModal = ({ visible, item, content, onChangeContent, onSave, onBack }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Text style={styles.title} numberOfLines={1}>✏️  {item?.name}</Text>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={onChangeContent}
          multiline
          textAlignVertical="top"
          autoFocus
          placeholderTextColor={colors.textMuted}
        />
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onBack}>
            <Text style={styles.btnText}>← Назад</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnOk]} onPress={onSave}>
            <Text style={styles.btnText}>💾 Зберегти</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20, width: '100%', maxHeight: '85%',
    borderWidth: 1, borderColor: colors.borderLight,
  },
  title: { color: colors.textPrimary, fontSize: 17, fontWeight: '700', marginBottom: 12 },
  input: {
    backgroundColor: colors.bgTertiary, borderRadius: 8, borderWidth: 1,
    borderColor: colors.borderLight, color: colors.textPrimary,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 14,
    minHeight: 200, maxHeight: 320, marginBottom: 12, textAlignVertical: 'top',
  },
  actions: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnCancel: { backgroundColor: colors.btnCancel },
  btnOk: { backgroundColor: colors.btnPrimary },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
});

export default EditFileModal;
