import Web3 from 'web3/dist/web3.min';
import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ethers } from 'ethers';

import { useSelector, useDispatch } from 'react-redux';
// material
import { styled } from '@mui/material/styles';

import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

import { userActions } from '../../store/reducers/userSlice';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

function DashboardLayout(props) {
  console.log('props', props);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [walletChanged, setWalletChanged] = useState(null);
  const isAuthStorage = localStorage.getItem('isAuth');
  const isAuth = isAuthStorage === 'true';
  
  const accountChangedHandler = async (newAccount) => {
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = async (account) => {
    await window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        const user = {
          username: props.user.user,
          ...props.user,
          address: account,
          balance: ethers.utils.formatEther(balance),
        };
        setWalletChanged(user);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  useEffect(() => {
    if (walletChanged) {
      dispatch(userActions.setUser(walletChanged));
    }

    if (isAuth && !props.user.user) {
      const web3 = new Web3(window.ethereum);
      const userStorage = {
        username: localStorage.getItem('user'),
        id: localStorage.getItem('id'),
        isAuth: isAuth,
        balance: localStorage.getItem('balance'),
        address: localStorage.getItem('address'),
        role: localStorage.getItem('role'),
        token: localStorage.getItem('token'),
        web3: web3,
      };
      console.log('LOG : DashboardLayout -> userStorage', userStorage);
      dispatch(userActions.setUser(userStorage));
    }
  }, [walletChanged]);

  return (
    <>
      {isAuth ? (
        <RootStyle>
          <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
          <MainStyle>
            <Outlet />
          </MainStyle>
        </RootStyle>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(DashboardLayout);
