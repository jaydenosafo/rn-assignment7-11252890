import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cart');
      const cart = jsonValue!= null? JSON.parse(jsonValue) : [];
      let totalPrice = 0;
      cart.forEach(item => {
        totalPrice += item.price;
      });
      setCartItems(cart);
      setTotalPrice(totalPrice);
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = JSON.parse(cart).filter(item => item.id!== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      let totalPrice = 0;
      cart.forEach(item => {
        totalPrice += item.price;
      });
      setCartItems(cart);
      setTotalPrice(totalPrice);
    } catch (e) {
      console.error(e);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCartItems();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  }, [navigation]);
  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
      title: 'Checkout',
      headerStyle: {
        backgroundColor: '#fff',
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image style={styles.title} source={require('../assets/Logo.png')}/>
        <Image style={styles.search} source={require('../assets/Search.png')}/>
      </View>
      <Text style={styles.header}>CHECKOUT</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
              <Image source={require('../assets/remove.png')}/>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.bottomTab}>
        <Text style={styles.estTotal}>EST. TOTAL</Text>
        <Text style={styles.totalPriceText}> ${totalPrice.toFixed(2)}</Text> 
      </View>
      <View style={styles.checkout}>
        <Image source={require('../assets/shopping bag.png')} style={styles.shoppingBag}/>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center'
  },
  title:{
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto'
  },
  search:{
    marginLeft: 'auto'
  },
  container: {
    flex: 1,
    marginTop: 30
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  itemImage: {
    width: 120,
    height: 150,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#D39679'
  },
  removeButton: {
    top: 40
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  totalPriceText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D39679'
  },
  checkout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    height: 70,
    backgroundColor: 'black'
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    width: '100%',
  },
  checkoutText: {
    fontSize: 20,
    marginLeft: 10,
    color: 'white'
  },
  shoppingBag: {
    tintColor: 'white',
  },
  estTotal: {
    fontSize: 20
  }
});

export default CartScreen;