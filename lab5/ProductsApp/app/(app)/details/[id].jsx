import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { products } from '../../../data/products';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const product = products.find((p) => p.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product ? product.name : 'Деталі',
    });
  }, [navigation, product]);

  if (!product) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Товар не знайдено</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price.toLocaleString('uk-UA')} ₴</Text>
          <View style={styles.divider} />
          <Text style={styles.descriptionLabel}>Опис</Text>
          <Text style={styles.description}>{product.description}</Text>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Купити зараз</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Додати до кошика</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 10,
    lineHeight: 30,
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: '#4f46e5',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e4f0',
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 32,
  },
  buyButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cartButton: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4f46e5',
    marginBottom: 12,
  },
  cartButtonText: {
    color: '#4f46e5',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4f46e5',
    borderRadius: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
