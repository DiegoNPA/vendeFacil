import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import RejectedOrdersClient from '../screens/rejectedOrdersClient';

const screens = {
  RejectedOrdersClient: {
    screen: RejectedOrdersClient,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Pedidos' navigation={navigation} />
      }
    },
  },
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