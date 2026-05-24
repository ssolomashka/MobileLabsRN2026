import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export default function ScoreBoard({ score, lastAction }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>РАХУНОК</Text>
      <Text style={styles.score}>{score}</Text>
      {!!lastAction && <Text style={styles.action}>{lastAction}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: theme.spacing.lg },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.sm,
    letterSpacing: 4,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  score: {
    color: theme.colors.accent,
    fontSize: theme.fontSizes.xxl,
    fontWeight: '900',
    textShadowColor: theme.colors.accent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  action: {
    color: theme.colors.accentGlow,
    fontSize: theme.fontSizes.md,
    marginTop: theme.spacing.xs,
    fontWeight: '600',
  },
});
