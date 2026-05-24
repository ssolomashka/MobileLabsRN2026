import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const ViewFileModal = ({ visible, item, content, onClose, onEdit }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Text style={styles.title} numberOfLines={1}>👁  {item?.name}</Text>
        <ScrollView style={styles.scroll}>
          <Text style={styles.content}>{content || '(файл порожній)'}</Text>
        </ScrollView>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onClose}>
            <Text style={styles.btnText}>Закрити</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnOk]} onPress={onEdit}>
            <Text style={styles.btnText}>✏️ Редагувати</Text>
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
    padding: 20, width: '100%', maxHeight: '80%',
    borderWidth: 1, borderColor: colors.borderLight,
  },
  title: { color: colors.textPrimary, fontSize: 17, fontWeight: '700', marginBottom: 12 },
  scroll: {
    backgroundColor: colors.bgTertiary, borderRadius: 8,
    padding: 12, marginBottom: 12, maxHeight: 300,
  },
  content: { color: '#c0c0e0', fontSize: 13, lineHeight: 20 },
  actions: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnCancel: { backgroundColor: colors.btnCancel },
  btnOk: { backgroundColor: colors.btnPrimary },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
});

export default ViewFileModal;
