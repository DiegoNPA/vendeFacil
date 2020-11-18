import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import RejectedOrdersClient from '../screens/rejectedOrdersClient';
import OrderMap from '../screens/orderMap';

const screens = {
  RejectedOrdersClient: {
    screen: RejectedOrdersClient,
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

const RejectedOrdersClientStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default RejectedOrdersClientStack;