import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import ConfirmedOrdersSeller from '../screens/confirmedOrdersSeller';

const screens = {
  ConfirmedOrdersSeller: {
    screen: ConfirmedOrdersSeller,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Pedidos' navigation={navigation} />
      }
    },
  },
}

const ConfirmedOrdersSellerStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default ConfirmedOrdersSellerStack;