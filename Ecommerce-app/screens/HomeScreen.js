import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
   <SafeAreaView>
     <View style={styles.header}>
        <Image source={require('../assets/Menu.png')}/>
        <Image style={styles.logo} source={require('../assets/Logo.png')}/>
        <View style={styles.searchShop}>
        <Image source={require('../assets/Search.png')}/>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{marginLeft: 10}}>
            <Image source={require('../assets/shopping bag.png')}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>OUR STORY</Text>
          <View style={styles.filterList}>
            <View style={styles.filter}>
            <Image source={require('../assets/Listview.png')}/>
          </View>
          <View style={styles.filter}>
          <Image source={require('../assets/Filter.png')}/>
          </View>
          </View>
          
      </View>

    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
          <View style={styles.productContainer}>
           <View style={styles.product}>
           <Image source={item.image} style={styles.productImage} resizeMode='contain' />
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
                <Image source={require('../assets/add_circle.png')}/>
            </TouchableOpacity>
           </View>
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  searchShop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  subHeaderText: {
    fontSize: 24,
    fontWeight: 200,
    letterSpacing: 2
  },
  productContainer: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal:10,
    width: "100%",
  },
  product : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  productImage: {
    width: '100%',
    flex: 1,
    resizeMode: 'contain',  
  },
  productDetails: {
    padding: 5,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#D39679'
  },
  addToCartButton: {
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 190,
    width: 50,
    height: 50,
  },
});
