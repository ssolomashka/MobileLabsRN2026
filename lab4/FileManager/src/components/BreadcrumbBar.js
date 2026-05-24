import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const BreadcrumbBar = ({ breadcrumb, isAtRoot, onNavigateUp }) => (
  <View style={styles.container}>
    {!isAtRoot && (
      <TouchableOpacity onPress={onNavigateUp} style={styles.upBtn}>
        <Text style={styles.upBtnText}>⬆ Вгору</Text>
      </TouchableOpacity>
    )}
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      <Text style={styles.breadcrumb}>{breadcrumb}</Text>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.bgTertiary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  upBtn: {
    backgroundColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 8,
  },
  upBtnText: { color: colors.accentBlue, fontSize: 12, fontWeight: '600' },
  scroll: { flex: 1 },
  breadcrumb: { color: colors.textAccent, fontSize: 12, paddingVertical: 4 },
});

export default BreadcrumbBar;
