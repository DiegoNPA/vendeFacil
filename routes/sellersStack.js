import { createStackNavigator } from 'react-navigation-stack';
import Sellers from '../screens/sellers';
import Products from '../screens/products';
import Header from '../shared/header'
import React from 'react';
import BuyProduct from '../screens/buyProduct';
import Comments from '../screens/comments';

const screens = {
  Sellers: {
    screen: Sellers,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Vendedores' navigation={navigation} />
      }
    }
  },
  Products: {
    screen: Products,
    navigationOptions: {
      title: "Productos"
    }
  },
  BuyProduct: {
    screen: BuyProduct,
    navigationOptions: {
      title: "Comprar Producto"
    }
  },
  Comments: {
    screen: Comments,
    navigationOptions: {
      title: "Comentarios"
    }
  }
}

const SellersStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: {
      backgroundColor: "coral"
    }
  }
})

export default SellersStack;