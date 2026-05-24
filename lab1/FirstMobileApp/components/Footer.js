import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        Соломаха Олександра Миколаївна, КН-23-1
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },

  text: {
    fontSize: 14,
  },
});