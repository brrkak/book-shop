import Layout from './components/layout/Layout';
import Home from  './pages/Home'
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { BoookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';
import Signup from './components/common/Signup';
import ResetPassword from './pages/ResetPage';
import Login from './components/common/Login';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import ToastContainer from './components/common/toast/ToastContainer';

const routeList = [
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/books",
    element:<Books/> 
  },
  {
    path: "/signup",
    element:<Signup/> 
  },
  {
    path: "/reset",
    element:<ResetPassword/> 
  },
  {
    path: "/login",
    element :<Login/>
  },
  {
    path: "/book/:bookId",
    element:<BookDetail/>
  },
  {
    path: "/cart",
    element:<Cart/>
  },
  {
    path: "/order",
    element:<Order/>
    
  },
  {
    path: "/orderlist",
    element:<OrderList/>
    
  }];

const router = createBrowserRouter(
  routeList.map((item) => {
  return {
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: <Error/>
  }
}));


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BoookStoreThemeProvider>
          <RouterProvider router={router}/>
          <ToastContainer/>
      </BoookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
