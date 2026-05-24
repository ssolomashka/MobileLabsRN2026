import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import FileManagerScreen from './src/screens/FileManagerScreen';
import colors from './src/constants/colors';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgCard} />
      <FileManagerScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
});
