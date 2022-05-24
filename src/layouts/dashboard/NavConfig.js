// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/home',
    icon: getIcon('ant-design:home-filled'),
  },
  {
    title: 'Create Contract',
    path: '/dashboard/create-contract',
    icon: getIcon('clarity:contract-solid'),
  },
  {
    title: 'Compliance Documents',
    path: '/dashboard/compliance-documents',
    icon: getIcon('fa-solid:file-contract'),
  },
  {
    title: 'Contracts',
    path: '/dashboard/contracts',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Transactions',
    path: '/dashboard/transactions',
    icon: getIcon('ant-design:transaction-outlined'),
  },
];

export default navConfig;
