import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]); // Define state for cart

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data from API:", error);
            }
        };

        fetchData();

        const fetchCart = async () => {
            try {
                const savedCart = await AsyncStorage.getItem('cart');
                if (savedCart) {
                    setCart(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error("Failed to load cart from local storage:", error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (product) => {
        try {
            const jsonValue = await AsyncStorage.getItem('cart');
            let cart = jsonValue != null ? JSON.parse(jsonValue) : [];
            cart.push(product);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            setCart(cart); 
        } catch (e) {
            console.error(e);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <Text style={styles.priceText}>${item.price}</Text>
                </View>
                <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
                    <Image source={require('../assets/add_circle.png')} />
                </TouchableOpacity>
              </TouchableOpacity>
               
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Navbar}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
         <Image source={require('../assets/Menu.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
       </TouchableOpacity>
                <Image source={require('../assets/Logo.png')} />
                <View style={styles.flex}>
                    <Image source={require('../assets/Search.png')} />
                    <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={{marginLeft: 10}}>
                        <Image source={require('../assets/shopping bag.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.Header}>
                <Text style={styles.headerText}>OUR STORY</Text>
                <View style={styles.circle}>
                    <TouchableOpacity>
                        <Image source={require('../assets/Listview.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.circle2}>
                    <TouchableOpacity>
                        <Image source={require('../assets/Filter.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.column}
                contentContainerStyle={styles.layout}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginTop: 50
    },
    Navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flex: {
        flexDirection: 'row',
    },
    Header: {
        marginTop: 20,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 32,
        fontWeight: '400',
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    circle2: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 14,
    },
    layout: {
        marginTop: 20,
    },
    column: {
        justifyContent: 'space-between',
    },
    card: {
        position: 'relative',
        width: '48%',
        marginBottom: 20,
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    addToCartButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    textContainer: {
        marginTop: 10,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '500',
    },
    descriptionText: {
        fontSize: 12,
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#DAA06D',
    },
});

export default HomePage;
