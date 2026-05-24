import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../styles/styles';
import formatDateTime from '../utils/formatDate';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [reminderTime, setReminderTime] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 5);
    d.setSeconds(0);
    return d;
  });

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [showTimePicker, setShowTimePicker] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // ─── Вибір дати ─────────────────────
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const updated = new Date(reminderTime);

      updated.setFullYear(
        selectedDate.getFullYear()
      );

      updated.setMonth(
        selectedDate.getMonth()
      );

      updated.setDate(
        selectedDate.getDate()
      );

      setReminderTime(updated);

      setTimeout(() => {
        setShowTimePicker(true);
      }, 300);
    }
  };

  // ─── Вибір часу ─────────────────────
  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);

    if (selectedTime) {
      const updated = new Date(reminderTime);

      updated.setHours(
        selectedTime.getHours()
      );

      updated.setMinutes(
        selectedTime.getMinutes()
      );

      updated.setSeconds(0);

      setReminderTime(updated);
    }
  };

  // ─── Додати задачу ──────────────────
  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert(
        '⚠️',
        'Введіть назву задачі'
      );

      return;
    }

    if (reminderTime <= new Date()) {
      Alert.alert(
        '⚠️',
        'Обери час у майбутньому'
      );

      return;
    }

    setLoading(true);

    const task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      reminderTime:
        reminderTime.toISOString(),
    };

    await onAddTask(task);

    setTitle('');
    setDescription('');

    const d = new Date();

    d.setMinutes(d.getMinutes() + 5);

    setReminderTime(d);

    setLoading(false);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Назва задачі *"
        placeholderTextColor="#555"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[
          styles.input,
          {
            height: 60,
            textAlignVertical: 'top',
          },
        ]}
        placeholder="Опис"
        placeholderTextColor="#555"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity
        style={styles.timeBtn}
        onPress={() =>
          setShowDatePicker(true)
        }
      >
        <Text style={styles.timeBtnText}>
          🗓️ {formatDateTime(reminderTime)}
        </Text>

        <Text style={styles.timeBtnHint}>
          Натисни щоб змінити
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      <TouchableOpacity
        style={[
          styles.addBtn,
          loading && { opacity: 0.5 },
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.addBtnText}>
          {loading
            ? '⏳ Додаємо...'
            : '＋ Додати задачу'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}