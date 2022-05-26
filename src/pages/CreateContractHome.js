import { connect } from 'react-redux';

// mock
import ContractCard from './ContractCard';

function CreateContractHome(props) {
  const contractop = [
    {
      title: 'Fixed Rate',
      description: 'For contracts that have a fixed rate on every payment cycle.',
      image: '/static/mock-images/contracs/Screenshot_2.png',
    },
    {
      title: 'Milestone',
      description: 'For contracts with milestones that are paid as they get completed.',
      image: '/static/mock-images/contracs/Screenshot_4.png',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      <ContractCard link="fixed-rate" type={contractop[0]}>
        FIXED
      </ContractCard>
      <ContractCard link="monthly" type={contractop[1]}>
        FIXED
      </ContractCard>
    </div>
  );
}

export default CreateContractHome;
