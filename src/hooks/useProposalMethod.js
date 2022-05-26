import Web3 from 'web3/dist/web3.min';
import ProposalSC from '../utils/contracts/ProposalSC.json';

export const CreateProposal = async (account, web3provider, proposalInfo) => {
  console.log('LOG : CreateProposal -> account', account);
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
  
  const web3 = web3provider

  const networkId = await web3.eth.net.getId();
  const smartContractAddress = ProposalSC.networks[networkId].address;
  const proposalSC = new web3.eth.Contract(ProposalSC.abi, smartContractAddress);

  let response;

  await proposalSC.methods
    .createProposal(
      payment_rate,
      scope_of_work,
      payment_frequency,
      employer_id,
      contractor_id,
      start_date,
      end_date,
      contract_type
    )
    .send({ from: account })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      console.log('error', e);
    });

  return response;
};
