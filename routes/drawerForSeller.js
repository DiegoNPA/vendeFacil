import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import SellerInfoStack from './sellerInfo';
import ExitApp from './exitApp';
import ProductsForSellerStack from './productsForSellerStack';
import ConfirmedOrdersSellerStack from './confirmedOrdersSellerStack';
import DeliveredOrdersSellerStack from './deliveredOrdersSellerStack';
import PendingOrdersSellerStack from './pendingOrdersSellerStack';
import RejectedOrdersSellerStack from './rejectedOrdersSellerStack';

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  PedidosPendientes: {
    screen: PendingOrdersSellerStack
  },
  PedidosConfirmados: {
    screen: ConfirmedOrdersSellerStack
  },
  PedidosEntregados: {
    screen: DeliveredOrdersSellerStack
  },
  PedidosRechazados: {
    screen: RejectedOrdersSellerStack
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