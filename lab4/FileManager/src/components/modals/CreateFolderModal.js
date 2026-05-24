import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const CreateFolderModal = ({ visible, onClose, onCreate }) => {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    try {
      await onCreate(name);
      setName('');
      onClose();
    } catch (e) {
      Alert.alert('Помилка', e.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>📁 Нова папка</Text>
          <TextInput
            style={styles.input}
            placeholder="Назва папки"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => { setName(''); onClose(); }}>
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
  actions: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnCancel: { backgroundColor: colors.btnCancel },
  btnOk: { backgroundColor: colors.btnPrimary },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
});

export default CreateFolderModal;
