import { API } from '../utils/constants/endpoint.constants';
export const CreateDocument = async (file, document_type) => {
  console.log('LOG : CreateDocument -> file', file);
  var formdata = new FormData();
  formdata.append('files', file, file.name);
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
