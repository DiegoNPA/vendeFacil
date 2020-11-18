import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import DeliveredOrdersClient from '../screens/deliveredOrdersClient';
import OrderMap from '../screens/orderMap';

const screens = {
  DeliveredOrdersClient: {
    screen: DeliveredOrdersClient,
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

const DeliveredOrdersClientStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default DeliveredOrdersClientStack;