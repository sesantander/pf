import Web3 from 'web3/dist/web3.min';
import ContractSC from '../utils/contracts/ContractSC.json';
import TransactionSC from '../utils/contracts/TransactionSC.json';
import { ContractAddress } from '../utils/constants/contract_address.constants';

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

  // const networkId = await web3.eth.net.getId();
  // const smartContractAddress = ContractSC.networks[networkId].address;
  // const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);
  const contractSC = new web3.eth.Contract(ContractSC.abi, ContractAddress.ContractSC);

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

  //const networkId = await web3.eth.net.getId();
  //const smartContractAddress = ContractSC.networks[networkId].address;
  // const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);
  const contractSC = new web3.eth.Contract(ContractSC.abi, ContractAddress.ContractSC);

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

  // const networkId = await web3.eth.net.getId();
  // const smartContractAddress = ContractSC.networks[networkId].address;
  // const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);
  const contractSC = new web3.eth.Contract(ContractSC.abi, ContractAddress.ContractSC);

  let response = [];

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
  return response;
};

export const GetContractById = async (id, web3Provider) => {
  const web3 = web3Provider;

  // const networkId = await web3.eth.net.getId();
  // const smartContractAddress = ContractSC.networks[networkId].address;
  // const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);
  const contractSC = new web3.eth.Contract(ContractSC.abi, ContractAddress.ContractSC);

  let response = {};

  await contractSC.methods
    .contracts(id)
    .call()
    .then(async (res) => {
      await contractSC.methods
        .contracts_details(id)
        .call()
        .then((res2) => {
          response = { ...res, ...res2 };
        })
        .catch((e) => {
          console.log('error', e);
        });
    })
    .catch((e) => {
      console.log('error', e);
    });

    return response
};

export const ContractUpdate = async (account, web3Provider, contractInfo) => {
  const { contract_id, status, contract_type, scope_of_work, start_date, end_date, currency, payment_rate } =
    contractInfo;

  const web3 = web3Provider;

  // const networkId = await web3.eth.net.getId();
  // const smartContractAddress = ContractSC.networks[networkId].address;
  // const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);
  const contractSC = new web3.eth.Contract(ContractSC.abi, ContractAddress.ContractSC);

  console.log('test ', { ...contractInfo });

  let response;
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

  // const networkId = await web3.eth.net.getId();
  // const smartContractAddress = ContractSC.networks[networkId].address;
  // const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);
  const contractSC = new web3.eth.Contract(ContractSC.abi, ContractAddress.ContractSC);

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

export const PayContract = async (account, web3Provider, contractInfo, addressToPay) => {
  const { payment_rate } = contractInfo;
  const web3 = web3Provider;

  // const networkId = await web3.eth.net.getId();

  // const contractSC_ContractAddress = ContractSC.networks[networkId].address;
  // const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);
  const contractSC = new web3.eth.Contract(ContractSC.abi, ContractAddress.ContractSC);

  // const transactionSC_ContractAddress = TransactionSC.networks[networkId].address;
  // const transactionSC = new web3.eth.Contract(TransactionSC.abi, transactionSC_ContractAddress);
  const transactionSC = new web3.eth.Contract(TransactionSC.abi, ContractAddress.TransactionSC);
  const payment = parseInt(payment_rate)/10
  
  console.log("LOG : PayContract -> payment", payment)
  await web3.eth.sendTransaction(
    {
      from: account,
      to: ContractAddress.ContractSC,
      value: web3.utils.toWei(payment.toString(), 'ether'),
    },
    async function (err, transactionHash) {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log('Transaction Hash', transactionHash);
      }
    }
  );

  const value = web3.utils.toWei(payment.toString(), 'ether');

  console.log('LOG : PayContract -> value', value);
  await transactionSC.methods
    .getAddress()
    .call()
    .then(async (res) => {
      await contractSC.methods
        .pay(
          contractInfo.contract_id,
          res,
          new Date().toLocaleDateString('en-GB'),
          new Date().toLocaleDateString('en-GB'),
          addressToPay,
          value
        )
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
