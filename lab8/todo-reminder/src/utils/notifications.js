import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForNotifications() {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Немає дозволу');
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(
      'reminders',
      {
        name: 'Нагадування',
        importance:
          Notifications.AndroidImportance.HIGH,
      }
    );
  }

  return true;
}

export async function scheduleNotification(task) {
  const trigger = new Date(task.reminderTime);

  const id =
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `📌 ${task.title}`,
        body:
          task.description ||
          'Нагадування про задачу',
        data: { taskId: task.id },
      },
      trigger: {
        type: 'date',
        date: trigger,
      },
    });

  return id;
}

export async function cancelNotification(id) {
  if (!id) return;

  await Notifications.cancelScheduledNotificationAsync(
    id
  );
}