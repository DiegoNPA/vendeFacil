import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import RejectedOrdersSeller from '../screens/rejectedOrdersSeller';
import OrderMap from '../screens/orderMap';

const screens = {
  RejectedOrdersSeller: {
    screen: RejectedOrdersSeller,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Pedidos' navigation={navigation} />
      }
    },
  },
  OrderMap: {
    screen: OrderMap,
    navigationOptions: {
      title: "Ubicacion del pedido"
    }
  }
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