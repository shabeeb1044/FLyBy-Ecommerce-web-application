import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import AdminRoutes from "./components/AdminRoutes"
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivetRoutes from './components/PrivetRoutes';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrder from './screens/PlaceOrder';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/Admin/OrderListScreen';
import UserEditScreen from './screens/Admin/UserEditScreen';
import ProductListScreen from './screens/Admin/ProductListScreen';
import ProductEditScreen from './screens/Admin/ProductEditScreen';
import UsersListScreen from './screens/Admin/UsersListScreen';
import {HelmetProvider} from "react-helmet-async";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route  index={true} path="/" element={<HomeScreen />} />
      <Route  path="/search/:keyword" element={<HomeScreen />} />
      <Route  path="/page/:pageNumber" element={<HomeScreen />} />
      <Route  path="/search/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/Product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={< CartScreen />} />
      <Route path="/login" element={< LoginScreen />} />
      <Route path="/register" element={< RegisterScreen />} />

      <Route path="" element={<PrivetRoutes/>} >
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen/>} />
        <Route path="/placeorder" element={<PlaceOrder/>} />
        <Route path="/order/:id" element={<OrderScreen/>} />
        <Route path="/profile" element={<ProfileScreen/>} />
      </Route>
      <Route path="" element={<AdminRoutes/>} >
        <Route path="/admin/orderlist" element={<OrderListScreen />} />4
        <Route path="/admin/productslist" element={<ProductListScreen />} />
        <Route path="/admin/productslist/:pageNumber" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>} />
        <Route path="/admin/userlist" element={<UsersListScreen/>} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />
      </Route>
    </Route>
  )
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PayPalScriptProvider deferLoading={true}>
//         <RouterProvider router={router}/>
//       </PayPalScriptProvider>
      
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>
// );

// reportWebVitals();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
      </PayPalScriptProvider >
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();

