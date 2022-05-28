import Web3 from 'web3/dist/web3.min';
import ProposalSC from '../utils/contracts/ProposalSC.json';
import ContractSC from '../utils/contracts/ContractSC.json';
import { ContractAddress } from '../utils/constants/contract_address.constants';

export const CreateProposal = async (account, web3provider, proposalInfo, contract_id, status) => {
  const {
    payment_rate,
    scope_of_work,
    payment_frequency,
    employer_id,
    contractor_id,
    start_date,
    end_date,
    contract_type,
  } = proposalInfo;

  const web3 = web3provider;

  // const networkId = await web3.eth.net.getId();

  // const contractSC_ContractAddress = ContractSC.networks[networkId].address;
  // const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);
  const contractSC = new web3.eth.Contract(ContractSC.abi, ContractAddress.ContractSC);

  // const proposalSC_ContractAddress = ProposalSC.networks[networkId].address;
  // const proposalSC = new web3.eth.Contract(ProposalSC.abi, proposalSC_ContractAddress);
  const proposalSC = new web3.eth.Contract(ProposalSC.abi, ContractAddress.ProposalSC);

  let response;

  await contractSC.methods
    .getAddress()
    .call()
    .then(async (res) => {
      await proposalSC.methods
        .createProposal(
          payment_rate,
          scope_of_work,
          payment_frequency,
          employer_id,
          contractor_id,
          start_date,
          end_date,
          contract_type,
          res,
          contract_id,
          status
        )
        .send({ from: account })
        .then((res2) => {
          response = res2;
        })
        .catch((e) => {
          console.log('error', e);
        });
    })
    .catch((e) => {
      console.log('error', e);
    });

  return response;
};

export const ProposalCount = async (web3Provider) => {
  const web3 = web3Provider;

  // const networkId = await web3.eth.net.getId();
  // const proposalSC_ContractAddress = ProposalSC.networks[networkId].address;
  // const proposalSC = new web3.eth.Contract(ProposalSC.abi, proposalSC_ContractAddress);
  const proposalSC = new web3.eth.Contract(ProposalSC.abi, ContractAddress.ProposalSC);

  let response;

  await proposalSC.methods
    .proposalCount()
    .call()
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.log('error', e);
    });

  return response;
};

export const ProposalList = async (proposalsCount, web3Provider) => {
  const web3 = web3Provider;

  // const networkId = await web3.eth.net.getId();
  // const proposalSC_ContractAddress = ProposalSC.networks[networkId].address;
  // const proposalSC = new web3.eth.Contract(ProposalSC.abi, proposalSC_ContractAddress);
  const proposalSC = new web3.eth.Contract(ProposalSC.abi, ContractAddress.ProposalSC);

  let response = [];
  for (let i = parseInt(proposalsCount); i >= 1; i -= 1) {
    /* eslint-disable no-await-in-loop */
    await proposalSC.methods
      .proposals(i)
      .call()
      .then(async (res) => {
        response.push(res);
      })
      .catch((e) => {
        console.log('error', e);
      });

    /* eslint-enable no-await-in-loop */
  }
  return response;
};
