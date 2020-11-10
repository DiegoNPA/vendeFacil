import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import SellersStack from './sellersStack';
import AllProductsStack from './allProductsStack';
import ClientInfoStack from './clientInfo';
import ExitApp from './exitApp';
import ConfirmedOrdersClientStack from './confirmedOrdersClientStack';
import DeliveredOrdersClientStack from './deliveredOrdersClientStack';
import PendingOrdersClientStack from './pendingOrdersClientStack';
import RejectedOrdersClientStack from './rejectedOrdersClientStack';

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Vendedores: {
    screen: SellersStack,
  },
  PedidosPendientes: {
    screen: PendingOrdersClientStack,
  },
  PedidosConfirmados: {
    screen: ConfirmedOrdersClientStack,
  },
  PedidosEntregados: {
    screen: DeliveredOrdersClientStack,
  },
  PedidosRecahzados: {
    screen: RejectedOrdersClientStack,
  },
  TodosLosProductos: {
    screen: AllProductsStack
  },
  Usuario: {
    screen: ClientInfoStack
  },
  Salir: {
    screen: ExitApp
  }
});

export default createAppContainer(RootDrawerNavigator);