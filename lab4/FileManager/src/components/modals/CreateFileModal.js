import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const CreateFileModal = ({ visible, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async () => {
    try {
      await onCreate(name, content);
      setName('');
      setContent('');
      onClose();
    } catch (e) {
      Alert.alert('Помилка', e.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>📄 Новий файл</Text>
          <TextInput
            style={styles.input}
            placeholder="Назва файлу (напр. notes.txt)"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <TextInput
            style={[styles.input, styles.inputMulti]}
            placeholder="Початковий вміст (необов'язково)"
            placeholderTextColor={colors.textMuted}
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => { setName(''); setContent(''); onClose(); }}>
              <Text style={styles.btnText}>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnOk]} onPress={handleCreate}>
              <Text style={styles.btnText}>Створити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
  input: {
    backgroundColor: colors.bgTertiary, borderRadius: 8, borderWidth: 1,
    borderColor: colors.borderLight, color: colors.textPrimary,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 12,
  },
  inputMulti: { minHeight: 100, textAlignVertical: 'top' },
  actions: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnCancel: { backgroundColor: colors.btnCancel },
  btnOk: { backgroundColor: colors.accentTeal },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
});

export default CreateFileModal;
