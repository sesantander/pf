import Web3 from 'web3/dist/web3.min';
import ProposalSC from '../utils/contracts/ProposalSC.json';
import ContractSC from '../utils/contracts/ContractSC.json';

export const CreateProposal = async (account, web3provider, proposalInfo, contract_id, status) => {
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

  const web3 = web3provider;

  const networkId = await web3.eth.net.getId();

  const contractSC_ContractAddress = ContractSC.networks[networkId].address;
  const contractSC = new web3.eth.Contract(ContractSC.abi, contractSC_ContractAddress);

  const proposalSC_ContractAddress = ProposalSC.networks[networkId].address;
  const proposalSC = new web3.eth.Contract(ProposalSC.abi, proposalSC_ContractAddress);

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
