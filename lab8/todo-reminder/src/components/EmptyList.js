import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/styles';

export default function EmptyList() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>🎯</Text>

      <Text style={styles.emptyText}>
        Немає задач
      </Text>

      <Text style={styles.emptyHint}>
        Додай першу задачу
      </Text>
    </View>
  );
}