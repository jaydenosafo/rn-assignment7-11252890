import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CustomDrawerContent from './components/Drawer'; 

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="HomeDrawer" 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: styles.drawer,
        drawerLabelStyle: styles.drawerLabel,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen name="Store" component={HomeScreen} />
      <Drawer.Screen name="Locations" component={HomeScreen} />
      <Drawer.Screen name="Blog" component={HomeScreen} />
      <Drawer.Screen name="Jewelry" component={HomeScreen} />
      <Drawer.Screen name="Electronic" component={HomeScreen} />
      <Drawer.Screen name="Clothing" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#fff',
    width: 240,
  },
  drawerLabel: {
    fontSize: 18,
    marginLeft: 10,
  },
});
