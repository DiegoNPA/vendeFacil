import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import SellerInfo from '../screens/sellerInfo';

const screens = {
  SellerInfo: {
    screen: SellerInfo,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Info del vendedor' navigation={navigation} />
      }
    },
  },
}

const SellerInfoStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: 'coral'
    },
  }
});

export default SellerInfoStack;