import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import ClientInfo from '../screens/clientInfo';

const screens = {
  ClientInfo: {
    screen: ClientInfo,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Info del usuario' navigation={navigation} />
      }
    },
  },
}

const ClientInfoStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default ClientInfoStack;