import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import PendingOrdersSeller from '../screens/pendingOrdersSeller';
import OrderMap from '../screens/orderMap';

const screens = {
  PendingOrdersSeller: {
    screen: PendingOrdersSeller,
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

const PendingOrdersSellerStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default PendingOrdersSellerStack;