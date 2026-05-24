import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const news = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: 'Заголовок новини',
  date: '20.05.2026',
  desc: 'Короткий текст новини',
}));

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Новини</Text>

      {news.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Дефолтна іконка замість картинки */}
          <View style={styles.iconBox}>
            <Ionicons name="image-outline" size={32} color="#aaa" />
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 10,

    padding: 10,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
    marginBottom: 3,
  },
  date: {
    fontSize: 11,
    color: 'gray',
    marginBottom: 3,
  },
  desc: {
    fontSize: 12,
    color: '#555',
  },
});