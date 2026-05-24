import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: theme.colors.accent,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Гра',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🎮</Text>,
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            tabBarLabel: 'Завдання',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>📋</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
