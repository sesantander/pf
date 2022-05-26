import Web3 from 'web3/dist/web3.min';
import TransactionSC from '../utils/contracts/TransactionSC.json';

export const TransactionCount = async (web3Provider) => {
  const web3 = web3Provider;

  const networkId = await web3.eth.net.getId();
  const smartContractAddress = TransactionSC.networks[networkId].address;
  const transactionSC = new web3.eth.Contract(TransactionSC.abi, smartContractAddress);

  let response;

  await transactionSC.methods
    .transactionCount()
    .call()
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.log('error', e);
    });

  return response;
};

export const TransactionList = async (transactionsCount, web3Provider) => {
  const web3 = web3Provider;

  const networkId = await web3.eth.net.getId();
  const smartContractAddress = TransactionSC.networks[networkId].address;
  const transactionSC = new web3.eth.Contract(TransactionSC.abi, smartContractAddress);

  let response = [];
  console.log('LOG : TransactionList -> transactionSC.methods', transactionSC.methods);
  for (let i = 1; i < parseInt(transactionsCount) + 1; i += 1) {
    /* eslint-disable no-await-in-loop */
    await transactionSC.methods
      .transactions(i)
      .call()
      .then(async (res) => {
        response.push(res);
      })
      .catch((e) => {
        console.log('error', e);
      });

    /* eslint-enable no-await-in-loop */
  }
  console.log('LOG : TransactionList -> response', response);
  return response;
};
