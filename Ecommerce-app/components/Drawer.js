import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
      <Image source={require('../assets/Close.png')} style={{marginLeft: 10}}/>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>ERIC ATSU</Text>
        <View style={styles.headerLine} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerLine: {
    height: 1,
    backgroundColor: '#D39679',
    width: 100,
    marginTop: 10,
    alignItems: 'center',
    marginLeft: 10
  },
});
