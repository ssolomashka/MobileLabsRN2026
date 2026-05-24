import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>

      
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

     
      <Text style={styles.title}>FirstMobileApp</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 120,   
    height: 44,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});