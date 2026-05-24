import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Alert,
} from 'react-native';

import * as Notifications from 'expo-notifications';

import Header from './src/components/Header';
import TaskForm from './src/components/TaskForm';
import TaskItem from './src/components/TaskItem';
import EmptyList from './src/components/EmptyList';

import styles from './src/styles/styles';

import {
  registerForNotifications,
  scheduleNotification,
  cancelNotification,
} from './src/utils/notifications';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const notifListener = useRef();

  useEffect(() => {
    registerForNotifications();

    notifListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        const taskId =
          response.notification.request.content.data?.taskId;

        console.log('Натиснули:', taskId);
      });

    return () => {
      if (notifListener.current) {
        Notifications.removeNotificationSubscription(
          notifListener.current
        );
      }
    };
  }, []);

  const handleAddTask = async task => {
    const notifId = await scheduleNotification(task);

    const newTask = {
      ...task,
      notificationId: notifId,
    };

    setTasks(prev => [newTask, ...prev]);

    Alert.alert('✅ Додано', task.title);
  };

  const handleDelete = task => {
    Alert.alert(
      'Видалити задачу?',
      task.title,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            await cancelNotification(task.notificationId);

            setTasks(prev =>
              prev.filter(t => t.id !== task.id)
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0d0d1a"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header tasksCount={tasks.length} />

        <TaskForm onAddTask={handleAddTask} />

        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={{
            padding: 14,
            paddingBottom: 40,
          }}
          ListEmptyComponent={<EmptyList />}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}