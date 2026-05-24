import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 36) / 2;

const images = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
}));

export default function GalleryScreen() {
  return (
    <FlatList
      data={images}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      renderItem={() => (
        <View style={[styles.card, { width: ITEM_SIZE, height: ITEM_SIZE }]}>
          <Ionicons name="image-outline" size={40} color="#bbb" />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 12,

  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});