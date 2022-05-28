import axios from 'axios';
import { API } from '../utils/constants/endpoint.constants';
export const CreateDocument = async (user_id, file, document_type) => {
  console.log('LOG : CreateDocument -> user_id', user_id);
  console.log('LOG : CreateDocument -> file', file);
  var formdata = new FormData();
  formdata.append('files', file, file.name);
  formdata.append('user_id', user_id);
  formdata.append('document_type', document_type);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  await fetch(`${API.URL}document/`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export const GetDocuments = async (user_id) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const Documents = async () =>
    new Promise((res, rej) =>
      fetch(`${API.URL}document/${user_id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          return res(result);
        })
        .catch((error) => console.log('error', error))
    );
  const response = await Documents();
  const parseResponse = JSON.parse(response);
  return parseResponse.data.document;
};

export const GetInvoice = async (employer_id, contractor_id, transaction) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/pdf');

  const { withdrawal_date, amount, method, transaction_id } = transaction;

  const response = await axios.get(
    `https://smart-deal-backend.herokuapp.com/api/v1/document/downloadInvoice/down?from_user_id=${employer_id}&to_user_id=${contractor_id}&withdrawal_date=${withdrawal_date}&amount=${+amount}&method=${method}&transaction_id=${transaction_id}`,
    {
      responseType: 'blob',
    }
  );
  console.log('LOG : GetInvoice -> response.data', response.data);

  return response.data;
};
