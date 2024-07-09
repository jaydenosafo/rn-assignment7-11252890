import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('cart')
      .then(cart => {
        if (cart) {
          setCart(JSON.parse(cart));
        }
      });
  }, []);

  const removeItem = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    setCart(newCart);
    AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <FlatList
      data={cart}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Button title="Remove" onPress={() => removeItem(item.id)} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
  },
});
