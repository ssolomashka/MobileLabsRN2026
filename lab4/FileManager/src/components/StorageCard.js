import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { formatSize } from '../utils/fileHelpers';

const StorageStat = ({ label, value, color }) => (
  <View style={styles.stat}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const StorageCard = ({ storageInfo }) => {
  if (!storageInfo) return null;

  const usedPercent = (storageInfo.used / storageInfo.total) * 100;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>💾 Пам'ять пристрою</Text>
      <View style={styles.row}>
        <StorageStat label="Всього"  value={formatSize(storageInfo.total)} color={colors.accentBlue} />
        <StorageStat label="Вільно"  value={formatSize(storageInfo.free)}  color={colors.accentGreen} />
        <StorageStat label="Зайнято" value={formatSize(storageInfo.used)}  color={colors.accentRed} />
      </View>
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${usedPercent}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 12,
    backgroundColor: colors.bgSecondary,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 15, fontWeight: '700' },
  statLabel: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  progressBg: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.accentRed,
    borderRadius: 3,
  },
});

export default StorageCard;
