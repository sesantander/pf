// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/home',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Create Contract',
    path: '/dashboard/create-contract',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Compliance Documents',
    path: '/dashboard/compliance-documents',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Invoices',
    path: '/dashboard/invoices',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Transactions',
    path: '/dashboard/transactions',
    icon: getIcon('eva:people-fill'),
  },
];

export default navConfig;
