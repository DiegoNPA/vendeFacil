import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import SellersStack from './sellersStack';
import OrdersStack from './ordersStack';
import AllProductsStack from './allProductsStack';
import ClientInfoStack from './clientInfo';
import SellerInfoStack from './sellerInfo';

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Vendedores: {
    screen: SellersStack,
  },
  Pedidos: {
    screen: OrdersStack,
  },
  TodosLosProductos: {
    screen: AllProductsStack
  },
  Usuario: {
    screen: ClientInfoStack
  }
});

export default createAppContainer(RootDrawerNavigator);