import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import RejectedOrdersSeller from '../screens/rejectedOrdersSeller';

const screens = {
  RejectedOrdersSeller: {
    screen: RejectedOrdersSeller,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Pedidos' navigation={navigation} />
      }
    },
  },
}

const RejectedOrdersSellerStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default RejectedOrdersSellerStack;