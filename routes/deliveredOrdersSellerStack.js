import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import DeliveredOrdersSeller from '../screens/deliveredOrdersSeller';

const screens = {
  DeliveredOrdersSeller: {
    screen: DeliveredOrdersSeller,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Pedidos' navigation={navigation} />
      }
    },
  },
}

const DeliveredOrdersSellerStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default DeliveredOrdersSellerStack;