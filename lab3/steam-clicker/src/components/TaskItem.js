import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export default function TaskItem({ item, completed }) {
  return (
    <View style={[styles.container, completed && styles.completed]}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={styles.info}>
        <Text style={[styles.title, completed && styles.titleDone]}>
          {item.title}
        </Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
      <Text style={styles.status}>{completed ? '✅' : '⬜'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  completed: {
    borderColor: theme.colors.success,
    backgroundColor: '#1a2e1a',
  },
  icon: { fontSize: 28, marginRight: theme.spacing.md },
  info: { flex: 1 },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  titleDone: {
    color: theme.colors.success,
    textDecorationLine: 'line-through',
  },
  desc: { color: theme.colors.textSecondary, fontSize: theme.fontSizes.sm },
  status: { fontSize: 22, marginLeft: theme.spacing.sm },
});
