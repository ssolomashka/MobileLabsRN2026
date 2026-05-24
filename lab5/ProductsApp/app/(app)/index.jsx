import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export default function CatalogScreen() {
  const { logout, user } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Каталог товарів',
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 4 }}>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Вийти</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const renderItem = ({ item }) => (
    <Link href={`/(app)/details/${item.id}`} asChild>
      <TouchableOpacity style={styles.card} activeOpacity={0.85}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.price}>{item.price.toLocaleString('uk-UA')} ₴</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          user ? (
            <Text style={styles.greeting}>Привіт, {user.name}! 👋</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
    lineHeight: 22,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4f46e5',
  },
});
