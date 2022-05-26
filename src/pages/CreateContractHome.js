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
      title: 'Monthly',
      description: 'Indefinite term contract.',
      image: '/static/mock-images/contracs/Screenshot_4.png',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: ' 100%',
      }}
    >
      <ContractCard link="fixed-rate" type={contractop[0]}>
        Fixed
      </ContractCard>
      <ContractCard link="monthly" type={contractop[1]}>
        Monthly
      </ContractCard>
    </div>
  );
}

export default CreateContractHome;
