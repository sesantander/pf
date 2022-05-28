import * as Yup from 'yup';
import { ethers } from 'ethers';
import Web3 from 'web3/dist/web3.min';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

// material

import { useSelector, useDispatch } from 'react-redux';

import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { LoginUser } from '../../../hooks/useUserHandler';
// ---------------------------------------
// component
import Iconify from '../../../components/Iconify';
import accounts from '../../../_mock/accounts';
import { userActions } from '../../../store/reducers/userSlice';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isWeb3Connect, setisWeb3Connect] = useState(false);
  const [isWalletConnecting, setisWalletConnecting] = useState(false);
  const [web3Environment, setWeb3Environment] = useState(null);

  useEffect(() => {
    if (userData && userBalance && web3Environment) {
      const user = {
        ...userData,
        id: userData.user_id,
        balance: userBalance,
        address: defaultAccount,
        web3: web3Environment,
      };
      console.log('LOG : LoginForm -> user', user);
      setToLocalStorage(user)
      dispatch(userActions.setUser(user));
      navigate('/dashboard/home', { replace: true });
    }
  }, [userBalance, web3Environment]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const setToLocalStorage = (user) => {
    localStorage.setItem('isAuth', true);
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('user', user.username);
    localStorage.setItem('address', user.address);
    localStorage.setItem('balance', user.balance);
    localStorage.setItem('id', user.id);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      setisSubmitting(true);

      const result = await LoginUser({ username: values.email, password: values.password });
      const parseResult = JSON.parse(result);

      if (parseResult.token) {
        console.log('LOG : LoginForm -> parseResult', parseResult);
        const web3provider = await connectWalletHandler();
        setUserData(parseResult);
        setWeb3Environment(web3provider);
      } else {
        navigate('/login', { replace: true });
        setOpen(true);
        setisSubmitting(false);
      }
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowConnectWeb3 = () => {
    setisWeb3Connect(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const connectWalletHandler = async () => {
    setisWalletConnecting(true);
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    if (provider && provider.isMetaMask) {
      await provider
        .request({ method: 'eth_requestAccounts' })
        .then(async (result) => {
          await accountChangedHandler(result[0]);
          await getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
      setisWalletConnecting(false);
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
      setisWalletConnecting(false);
    }
    return web3;
  };
  const accountChangedHandler = async (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = async (account) => {
    await window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <FormikProvider value={formik}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Login Error
        </Alert>
      </Snackbar>{' '}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {!isWeb3Connect ? (
          <div>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                {...getFieldProps('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
              <FormControlLabel
                control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
                label="Remember me"
              />

              <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                Forgot password?
              </Link>
            </Stack>
            <LoadingButton
              fullWidth
              size="large"
              onClick={handleShowConnectWeb3}
              variant="contained"
              loading={isSubmitting}
            >
              Login
            </LoadingButton>{' '}
          </div>
        ) : (
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            {isWalletConnecting ? 'Loading..' : 'Connect'}
          </LoadingButton>
        )}
      </Form>
    </FormikProvider>
  );
}
