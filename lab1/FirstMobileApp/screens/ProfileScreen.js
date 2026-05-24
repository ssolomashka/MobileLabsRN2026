import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Реєстрація</Text>

      <Text>Електрона пошта</Text>
      <TextInput style={styles.input} keyboardType="email-address" />

      <Text>Пароль</Text>
      <TextInput style={styles.input} secureTextEntry />

      <Text>Пароль ще раз</Text>
      <TextInput style={styles.input} secureTextEntry />

      <Text>Прізвище</Text>
      <TextInput style={styles.input} />

      <Text>Ім'я</Text>
      <TextInput style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});