import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import ProductsForSeller from '../screens/productsForSeller'

const screens = {
  ProductsForSeller: {
    screen: ProductsForSeller,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Todos los productos' navigation={navigation} />
      }
    },
  },
}

const ProductsForSellerStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default ProductsForSellerStack;