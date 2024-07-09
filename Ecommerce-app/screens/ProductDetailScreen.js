import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';


export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
     <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={require('../assets/Menu.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
      </TouchableOpacity>
        <Image style={styles.logo} source={require('../assets/Logo.png')}/>
        <View style={styles.searchShop}>
        <Image source={require('../assets/Search.png')}/>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={{marginLeft: 10}}>
            <Image source={require('../assets/shopping bag.png')}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemContainer}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.titleExport}>
      <Text style={styles.title}>{product.title}</Text>
      <Image source={require('../assets/Export.png')} style={styles.export}/>
      </View>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>

    <Text style={styles.sectionTitle}>MATERIALS</Text>
    <Text style={styles.materials}>
          We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.
    </Text>
    <View style={styles.careContainer}>
      <View style={styles.careItem}>
        <Image source={require('../assets/Do Not Bleach.png')} style={styles.careIcon}/>
        <Text>Do not use bleach</Text>
      </View>
      <View style={styles.careItem}>
        <Image source={require('../assets/Do Not Tumble Dry.png')} style={styles.careIcon}/>
        <Text>Do not tumble dry</Text>
      </View>
      <View style={styles.careItem}>
        <Image source={require('../assets/Do Not Wash.png')} style={styles.careIcon}/>
        <Text>Dry clean with tetrachloroethylene</Text>
      </View>
      <View style={styles.careItem}>
        <Image source={require('../assets/Iron Low Temperature.png')}  style={styles.careIcon}/>
        <Text>Iron at a maximum of 110ºC/230ºF</Text>
      </View>
    </View>

    <View style={styles.line}/>

    <View style={styles.shippingContainer}>
      <Image source={require('../assets/Shipping.png')}/>
      <View style={styles.shipText}>
      <Text style={styles.shippingText}>Free Flat Rate Shipping</Text>
      <Text>Estimated to be delivered on </Text>
      <Text>09/11/2021 - 12/11/2021.</Text>
      </View>
      <Image source={require('../assets/Up.png')}/>
    </View>
      </View> 

      <View style={styles.checkout}>
        <Image source={require('../assets/Plus.png')} style={styles.shoppingBag}/>
        <Text style={styles.checkoutText}>ADD TO BASKET</Text>
        <Image source={require('../assets/Heart.png')} style={styles.heart}/>
      </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15
  },
  itemContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#D39679',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  titleExport: {
    flexDirection: 'row'
  },
  export: {
    top: 20
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: 'bold',
    marginTop: 30
  },
  materials: {
    fontSize: 16,
    marginVertical: 8,
  },
  careContainer: {
    marginVertical: 16,
  },
  careItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  careIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  shippingContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  shippingIcon: {
    width: 24,
    height: 24,
  },
  shippingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shipText: {
    marginRight: 110
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E5E5',
    marginTop: 15,
    marginBottom: 15
  },
  checkout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    height: 70,
    backgroundColor: 'black',
    marginTop: 200
  },
  checkoutText: {
    fontSize: 20,
    marginRight: 200,
    color: 'white'
  },
  shoppingBag: {
    tintColor: 'white',
  },
  heart: {
    tintColor: 'white',
  }
});
