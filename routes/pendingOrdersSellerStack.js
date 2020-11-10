import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import PendingOrdersSeller from '../screens/pendingOrdersSeller';

const screens = {
  PendingOrdersSeller: {
    screen: PendingOrdersSeller,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Pedidos' navigation={navigation} />
      }
    },
  },
}

const PendingOrdersSellerStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default PendingOrdersSellerStack;