import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/styles';

export default function Header({ tasksCount }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        📋 To-Do Reminder
      </Text>

      <Text style={styles.headerSub}>
        {tasksCount} задач
      </Text>
    </View>
  );
}