import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import PendingOrdersClient from '../screens/pendingOrdersClient';
import OrderMap from '../screens/orderMap';

const screens = {
  PendingOrdersClient: {
    screen: PendingOrdersClient,
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

const PendingOrdersClientStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default PendingOrdersClientStack;