// components
import Web3 from 'web3/dist/web3.min';
import ContractSC from '../utils/contracts/ContractSC.json';

export const CreateContract = async (account, contractInfo) => {
  const {
    type,
    name,
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
      type,
      name,
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
      resultado = res;
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
      console.log('res contracts: ', res);
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

  for (let i = 1; i < parseInt(contractsCount) + 1; i += 1) {
    /* eslint-disable no-await-in-loop */
    await contractSC.methods
      .contracts(i)
      .call()
      .then((res) => {
        response.push(res);
        console.log('res contract: ', res);
      })
      .catch((e) => {
        console.log('error', e);
      });
    /* eslint-enable no-await-in-loop */
  }
};
