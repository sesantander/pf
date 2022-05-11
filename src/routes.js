import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import Web3Login from './pages/Web3Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import Home from './pages/Home';
import ComplianceDocuments from './pages/ComplianceDocuments';
import Invoices from './pages/Invoices';
import Transactions from './pages/Transactions';
import CreateContract from './pages/CreateContract';

// ----------------------------------------------------------------------

export default function Router() {






  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout/>,
      children: [
        { path: 'app', element:  <Navigate to="/home" /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'home', element: <Home /> },
        { path: 'create-contract', element: <CreateContract /> },
        { path: 'compliance-documents', element: <ComplianceDocuments /> },
        { path: 'invoices', element: <Invoices /> },
        { path: 'transactions', element: <Transactions /> },

      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'web3login', element: <Web3Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
