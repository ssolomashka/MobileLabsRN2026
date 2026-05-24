import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen    from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const TABS = [
  { name: 'Головна',     icon: 'home' },
  { name: 'Фотогалерея', icon: 'images' },
  { name: 'Профіль',     icon: 'person' },
];

const SCREENS = [HomeScreen, GalleryScreen, ProfileScreen];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveScreen = SCREENS[activeTab];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Header />

      {/* TABS ЗВЕРХУ */}
      <View style={styles.tabBar}>
        {TABS.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabItem}
              onPress={() => setActiveTab(index)}
            >
              <Ionicons
                name={isActive ? tab.icon : tab.icon + '-outline'}
                size={22}
                color={isActive ? 'blue' : 'gray'}
              />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.name}
              </Text>
              {isActive && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ЕКРАН */}
      <View style={styles.content}>
        <ActiveScreen />
      </View>

      {/* FOOTER */}
      <Footer />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 11,
    color: 'gray',
    marginTop: 2,
  },
  tabLabelActive: {
    color: 'blue',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'blue',
  },
  content: {
    flex: 1,
  },
});