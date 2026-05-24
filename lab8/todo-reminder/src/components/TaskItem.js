import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';
import formatDateTime from '../utils/formatDate';

export default function TaskItem({
  item,
  onDelete,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft} />

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>
          {item.title}
        </Text>

        {!!item.description && (
          <Text style={styles.cardDesc}>
            {item.description}
          </Text>
        )}

        <Text style={styles.cardTime}>
          🕐 {formatDateTime(item.reminderTime)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.delBtn}
        onPress={() => onDelete(item)}
      >
        <Text style={styles.delBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}