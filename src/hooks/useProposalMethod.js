import Web3 from 'web3/dist/web3.min';
import ProposalSC from '../utils/contracts/ProposalSC.json';

export const CreateProposal = async (account, proposalInfo) => {
  console.log('LOG : CreateProposal -> account', account);
  const {
    //type,
    status,
    scope_of_work,
    description,
    //start_date,
    //end_date,
    currency,
    payment_rate,
    payment_frequency,
    employer_id,
    contractor_id,
  } = proposalInfo;

  const provider = window.ethereum;
  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();
  const smartContractAddress = ProposalSC.networks[networkId].address;
  const proposalSC = new web3.eth.Contract(ProposalSC.abi, smartContractAddress);

  let response;

  await proposalSC.methods
    .createProposal(
      payment_rate,
      currency,
      description,
      scope_of_work,
      payment_frequency,
      status,
      employer_id,
      contractor_id
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
