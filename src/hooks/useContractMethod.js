import Web3 from 'web3/dist/web3.min';
import ContractSC from '../utils/contracts/ContractSC.json';
import TransactionSC from '../utils/contracts/TransactionSC.json';

export const createContract = async (account, web3Provider, contractInfo) => {
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

  const web3 = web3Provider;

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

export const ContractCount = async (web3Provider) => {
  const web3 = web3Provider;

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

export const ContractList = async (contractsCount, web3Provider) => {
  const web3 = web3Provider;

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

export const ContractUpdate = async (account, web3Provider, contractInfo) => {
  console.log('LOG : ContractUpdate -> contractInfo', contractInfo);
  const { contract_id, status, contract_type, scope_of_work, start_date, end_date, currency, payment_rate } =
    contractInfo;

  const web3 = web3Provider;

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

export const UpdateContractStatus = async (account, web3Provider, contract_id, status) => {
  const web3 = web3Provider;

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

export const PayContract = async (account, web3Provider, contractInfo) => {
  const web3 = web3Provider;

  const networkId = await web3.eth.net.getId();

  const contractSC_ContractAddress = ContractSC.networks[networkId].address;
  const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);

  const transactionSC_ContractAddress = TransactionSC.networks[networkId].address;
  const transactionSC = new web3.eth.Contract(TransactionSC.abi, transactionSC_ContractAddress);


  await transactionSC.methods
    .getAddress()
    .call()
    .then(async (res) => {
      await contractSC.methods
        .pay(contractInfo.contract_id, res, new Date().toLocaleDateString('en-GB'), new Date().toLocaleDateString('en-GB'))
        .send({ from: account })
        .then((res) => {
          console.log('LOG : PayContract -> res', res);
        })
        .catch((e) => {
          console.log('error', e);
        });
    })
    .catch((e) => {
      console.log('error', e);
    });
};
