import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useGame } from '../context/GameContext';
import { INITIAL_TASKS } from '../data/tasks';
import TaskItem from '../components/TaskItem';
import { theme } from '../theme/theme';

export default function TasksScreen() {
  const { gameState } = useGame();

  const tasks = INITIAL_TASKS.map((t) => ({
    ...t,
    completed: t.check(gameState),
  }));

  const done = tasks.filter((t) => t.completed).length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>📋 Завдання</Text>
        <Text style={styles.progress}>Виконано: {done} / {tasks.length}</Text>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${(done / tasks.length) * 100}%` }]} />
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem item={item} completed={item.completed} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1, paddingHorizontal: theme.spacing.md },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.xl,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    letterSpacing: 2,
  },
  progress: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  barBg: {
    height: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.full,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: theme.colors.success,
    borderRadius: theme.radius.full,
  },
  list: { paddingBottom: theme.spacing.xl },
});
