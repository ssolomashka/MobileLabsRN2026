import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScoreBoard from '../components/ScoreBoard';
import GameObject from '../components/GameObject';
import { useGame } from '../context/GameContext';
import { theme } from '../theme/theme';

export default function HomeScreen() {
  const {
    gameState, lastAction,
    onTap, onDoubleTap, onLongPress,
    onPan, onFlingRight, onFlingLeft, onPinch,
  } = useGame();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>⚡ Steam Clicker</Text>

          <ScoreBoard score={gameState.score} lastAction={lastAction} />

          <View style={styles.hint}>
            <Text style={styles.hintText}>👆 Тап +1 · ✌️ Дабл +2 · ⏳ Утримай 3с +10</Text>
            <Text style={styles.hintText}>🖐️ Перетягни +3 · ↔️ Свайп · 🔍 Пінч +5</Text>
          </View>

          <View style={styles.gameArea}>
            <GameObject
              onTap={onTap}
              onDoubleTap={onDoubleTap}
              onLongPress={onLongPress}
              onPan={onPan}
              onFlingRight={onFlingRight}
              onFlingLeft={onFlingLeft}
              onPinch={onPinch}
            />
          </View>

          <View style={styles.stats}>
            {[
              ['👆', 'Тапів', gameState.tapCount],
              ['✌️', 'Дабл', gameState.doubleTapCount],
              ['⏳', 'Утрим', gameState.longPressCount],
              ['🔍', 'Пінч', gameState.pinchCount],
            ].map(([icon, label, val]) => (
              <View key={label} style={styles.stat}>
                <Text style={styles.statIcon}>{icon}</Text>
                <Text style={styles.statVal}>{val}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
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
    letterSpacing: 2,
  },
  hint: { alignItems: 'center', marginBottom: theme.spacing.md, gap: 4 },
  hintText: { color: theme.colors.textSecondary, fontSize: theme.fontSizes.xs },
  gameArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  stat: { alignItems: 'center', gap: 2 },
  statIcon: { fontSize: 20 },
  statVal: { color: theme.colors.accent, fontSize: theme.fontSizes.lg, fontWeight: '800' },
  statLabel: { color: theme.colors.textSecondary, fontSize: theme.fontSizes.xs },
});
