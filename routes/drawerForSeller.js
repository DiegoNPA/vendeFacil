import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import SellerInfoStack from './sellerInfo';
import ExitApp from './exitApp';
import OrdersForSellerStack from './ordersForSellerStack';
import ProductsForSellerStack from './productsForSellerStack'

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Pedidos: {
    screen: OrdersForSellerStack
  },
  MisProductos: {
    screen: ProductsForSellerStack
  },
  Usuario: {
    screen: SellerInfoStack
  },
  Salir: {
    screen: ExitApp
  }
});

export default createAppContainer(RootDrawerNavigator);