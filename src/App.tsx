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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home/></Layout>,
    errorElement: <Error/>
  },
  {
    path: "/books",
    element: <Layout><Books/></Layout> 
  },
  {
    path: "/signup",
    element: <Layout><Signup/></Layout> 
  },
  {
    path: "/reset",
    element: <Layout><ResetPassword/></Layout> 
  },
  {
    path: "/login",
    element : <Layout><Login/></Layout>
  },
  {
    path: "/book/:bookId",
    element: <Layout><BookDetail/></Layout>
  },
  {
    path: "/cart",
    element: <Layout><Cart/></Layout>
  },
  {
    path: "/order",
    element: <Layout><Order/></Layout>
    
  },
  {
    path: "/orderlist",
    element: <Layout><OrderList/></Layout>
    
  }
])


function App() {
  return (
    <BoookStoreThemeProvider>
      <ThemeSwitcher/>
        <RouterProvider router={router}/>
    </BoookStoreThemeProvider>
  );
}

export default App;
