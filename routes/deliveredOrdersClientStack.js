import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import DeliveredOrdersClient from '../screens/deliveredOrdersClient';

const screens = {
  DeliveredOrdersClient: {
    screen: DeliveredOrdersClient,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Pedidos' navigation={navigation} />
      }
    },
  },
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