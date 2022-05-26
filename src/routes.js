import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import Home from './pages/Home';
import ComplianceDocuments from './pages/ComplianceDocuments';
import Contracts from './pages/Contracts';
import Transactions from './pages/Transactions';
import CreateContract from './pages/CreateContract';
import CreateContractHome from './pages/CreateContractHome';
import CreateContractForm from './pages/CreateContractForm';

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
        { path: 'create-contract', element: <CreateContract /> ,children: [
          { path: '', element: <CreateContractHome /> },
          { path: 'fixed-rate', element: <CreateContractForm type="Fixed Rate"/> },
          { path: 'monthly', element: <CreateContractForm type="Monthly" /> },
        ],},
        { path: 'compliance-documents', element: <ComplianceDocuments /> },
        { path: 'contracts', element: <Contracts /> },
        { path: 'transactions', element: <Transactions /> },

      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
