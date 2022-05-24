import Web3 from 'web3/dist/web3.min';
import ContractSC from '../utils/contracts/ContractSC.json';

export const createContract = async (account, contractInfo) => {
  const {
    contract_type,
    contract_name,
    job_title,
    status,
    scope_of_work,
    start_date,
    end_date,
    currency,
    payment_rate,
    payment_frequency,
    payment_due,
    employer_id,
    contractor_id,
    proposal_id,
  } = contractInfo;

  const provider = window.ethereum;
  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();
  const smartContractAddress = ContractSC.networks[networkId].address;
  const contractSC = new web3.eth.Contract(ContractSC.abi, smartContractAddress);

  let response;

  await contractSC.methods
    .createContract(
      contract_type,
      contract_name,
      job_title,
      status,
      scope_of_work,
      start_date,
      end_date,
      currency,
      payment_rate,
      payment_frequency,
      payment_due,
      employer_id,
      contractor_id,
      proposal_id
    )
    .send({ from: account })
    .then((res) => {
      response = res;
      console.log('LOG : createContract -> response', response);
    })
    .catch((e) => {
      console.log('error', e);
    });

  return response;
};

export const ContractCount = async () => {
  const provider = window.ethereum;
  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();
  const smartContractAddress = ContractSC.networks[networkId].address;
  const contractSC = new web3.eth.Contract(ContractSC.abi, smartContractAddress);

  let response;

  await contractSC.methods
    .contractCount()
    .call()
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.log('error', e);
    });

  return response;
};

export const ContractList = async (contractsCount) => {
  const provider = window.ethereum;
  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();
  const smartContractAddress = ContractSC.networks[networkId].address;
  const contractSC = new web3.eth.Contract(ContractSC.abi, smartContractAddress);

  let response = [];
  console.log('LOG : ContractList -> contractSC.methods', contractSC.methods);
  for (let i = 1; i < parseInt(contractsCount) + 1; i += 1) {
    /* eslint-disable no-await-in-loop */
    let contract = {};
    await contractSC.methods
      .contracts(i)
      .call()
      .then(async (res) => {
        await contractSC.methods
          .contracts_details(i)
          .call()
          .then((res2) => {
            contract = { ...res, ...res2 };
          })
          .catch((e) => {
            console.log('error', e);
          });
      })
      .catch((e) => {
        console.log('error', e);
      });
    response.push(contract);
    /* eslint-enable no-await-in-loop */
  }
  console.log('LOG : ContractList -> response', response);
  return response;
};

export const ContractUpdate = async (account, contractInfo) => {
  console.log('LOG : ContractUpdate -> contractInfo', contractInfo);
  const { contract_id, status, contract_type, scope_of_work, start_date, end_date, currency, payment_rate } =
    contractInfo;

  const provider = window.ethereum;
  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();
  const smartContractAddress = ContractSC.networks[networkId].address;
  const contractSC = new web3.eth.Contract(ContractSC.abi, smartContractAddress);

  console.log('test ', { ...contractInfo });

  let response;
  console.log('LOG : ContractUpdate -> contractSC.methods', contractSC.methods);
  await contractSC.methods
    .updateContract(contract_id, status, contract_type, scope_of_work, start_date, end_date, currency, payment_rate)
    .send({ from: account })
    .then((res) => {
      console.log('LOG : ContractUpdate -> res', res);
      response = res;
    })
    .catch((e) => {
      console.log('error', e);
    });

  return response;
};

export const UpdateContractStatus = async (account, contract_id, status) => {
  const provider = window.ethereum;
  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();
  const smartContractAddress = ContractSC.networks[networkId].address;
  const contractSC = new web3.eth.Contract(ContractSC.abi, smartContractAddress);

  let response;
  await contractSC.methods
    .setContractStatus(contract_id, status)
    .send({ from: account })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.log('error', e);
    });

  return response;
};
