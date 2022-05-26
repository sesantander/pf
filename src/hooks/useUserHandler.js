import { API } from '../utils/constants/endpoint.constants';

export const RegisterUser = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var body = JSON.stringify(user);
  console.log('LOG : RegisterUser -> body', body);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  };

  const SignUp = async () =>
    new Promise((res, rej) =>
      fetch(`${API.URL}user/signup`, requestOptions)
        .then((result) => {
          return res(result);
        })
        .catch((error) => console.log('error', error))
    );
  const response = await SignUp();
  return response.ok;
};

export const LoginUser = async (data) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var body = JSON.stringify(data);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  };

  const LogIn = async () =>
    new Promise((res, rej) =>
      fetch(`${API.URL}user/login`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          return res(result);
        })
        .catch((error) => console.log('error', error))
    );
  const response = await LogIn();
  const parseResponse = JSON.parse(response);
  return response;
};

export const GetUser = async (username) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const User = async () =>
    new Promise((res, rej) =>
      fetch(`${API.URL}user/${username}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          return res(result);
        })
        .catch((error) => console.log('error', error))
    );
  const response = await User();
  const parseResponse = JSON.parse(response);
  return parseResponse;
};
