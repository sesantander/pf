import * as Yup from 'yup';
import Web3 from 'web3/dist/web3.min';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { useSelector, useDispatch } from 'react-redux';

import { Stack, TextField, IconButton, InputAdornment, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { userActions } from '../../../store/reducers/userSlice';
import { RegisterUser } from '../../../hooks/useUserHandler';
import { LoginUser } from '../../../hooks/useUserHandler';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isRegistered, setisRegistered] = useState(null);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isWeb3Connect, setisWeb3Connect] = useState(false);
  const [isWalletConnecting, setisWalletConnecting] = useState(false);

  useEffect(() => {
    if (userData && userBalance && isRegistered) {
      async function loginUser() {
        try {
          const result = await LoginUser({ username: userData.email, password: userData.password });
          const parsedResult = JSON.parse(result);
          const user = {
            ...userData,
            id: parsedResult.user_id,
            balance: userBalance,
            address: defaultAccount,
            role: parsedResult.role,
            token: parsedResult.token,
            web3: new Web3(window.ethereum),
          };
          setToLocalStorage(user);
          dispatch(userActions.setUser(user));
          navigate('/dashboard/home', { replace: true });
        } catch (e) {
          console.error(e);
        }
      }
      loginUser();
    }
    if (isRegistered == false) {
      navigate('/login', { replace: true });
    }
  }, [userBalance, isRegistered]);

  const setToLocalStorage = (user) => {
    localStorage.setItem('isAuth', true);
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('user', user.username);
    localStorage.setItem('address', user.address);
    localStorage.setItem('balance', user.balance);
    localStorage.setItem('id', user.id);
  };

  const roles = [
    {
      value: 'Contractor',
      label: 'Contractor',
    },
    {
      value: 'Employer',
      label: 'Employer',
    },
  ];
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    phone: Yup.string()
      .required('Phone number required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Phone number too short')
      .max(10, 'Phone number too long'),
    company: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Company required'),
    role: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Role required'),
    skills: Yup.string().min(2, 'Too Short!').required('Skills required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
      role: '',
      phone: '',
      skills: '',
      company: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setisSubmitting(true);
      values = await handleUserData(values);
      const account = await connectWalletHandler();

      const responseStatus = await RegisterUser({
        ...values,
        wallet_address: account,
      });

      setUserData(values);

      if (responseStatus) {
        setisRegistered(true);
      } else {
        setisRegistered(false);
      }

      setisSubmitting(false);
    },
  });

  const handleUserData = async (values) => {
    values.name = values.firstName + ' ' + values.lastName;
    delete values.firstName;
    delete values.lastName;
    values.username = values.email;
    return values;
  };
  const handleShowConnectWeb3 = () => {
    setisWeb3Connect(true);
  };
  const connectWalletHandler = async () => {
    setisWalletConnecting(true);
    const provider = window.ethereum;
    if (provider && provider.isMetaMask) {
      let account;
      await provider
        .request({ method: 'eth_requestAccounts' })
        .then(async (result) => {
          account = result[0];
          await accountChangedHandler(result[0]);
          await getAccountBalance(result[0]);
        })
        .catch((error) => {
          console.log('error', error);
        });
      setisWalletConnecting(false);
      return account;
    } else {
      console.log('Need to install MetaMask');
      setisWalletConnecting(false);
    }
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
        console.log('error', error);
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  // listen for account changes
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', accountChangedHandler);

    window.ethereum.on('chainChanged', chainChangedHandler);
  }

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {!isWeb3Connect ? (
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="First name"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                fullWidth
                label="Last name"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>

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
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <TextField
              fullWidth
              select
              autoComplete="role"
              type="role"
              label="What are you ?"
              {...getFieldProps('role')}
              error={Boolean(touched.role && errors.role)}
              helperText={touched.role && errors.role}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="phone"
                type="phone"
                label="Phone number"
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                fullWidth
                autoComplete="company"
                type="company"
                label="Company"
                {...getFieldProps('company')}
                error={Boolean(touched.company && errors.company)}
                helperText={touched.company && errors.company}
              />
            </Stack>

            <TextField
              multiline
              rows={2}
              maxRows={Infinity}
              fullWidth
              autoComplete="skills"
              type="skills"
              label="Skills"
              {...getFieldProps('skills')}
              error={Boolean(touched.skills && errors.skills)}
              helperText={touched.skills && errors.skills}
            />
            <LoadingButton
              fullWidth
              size="large"
              onClick={handleShowConnectWeb3}
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
          </Stack>
        ) : (
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            {isWalletConnecting ? 'Loading..' : 'Connect'}
          </LoadingButton>
          
        )}
      </Form>
    </FormikProvider>
  );
}
