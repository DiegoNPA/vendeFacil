import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import AllProducts from '../screens/allProducts';
import BuyProduct2 from '../screens/buyProduct2';

const screens = {
  AllProducts: {
    screen: AllProducts,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Todos los productos' navigation={navigation} />
      }
    },
  },
  BuyProduct2: {
    screen: BuyProduct2,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Compra del producto' navigation={navigation} />
      }
    }
  }
}

const AllProductsStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default AllProductsStack;