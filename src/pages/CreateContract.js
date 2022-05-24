import { useState } from 'react';
import { connect } from 'react-redux';
// material
import { Container, Stack, Typography, Box, Button } from '@mui/material';
// components
import Web3 from 'web3/dist/web3.min';
import Page from '../components/Page';
import { ContractCount, ContractList } from '../hooks/useContractMethod';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import ContractCard from './ContractCard';

import ProposalContract from '../utils/contracts/ProposalSC.json';
import ContractSC from '../utils/contracts/ContractSC.json';

// ----------------------------------------------------------------------
const methodTest = async (account) => {
  const contractCount = await ContractCount();
  console.log("contractCount", contractCount)
  ContractList(contractCount);
};


function CreateContract(props) {
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
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Contracts
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <ContractCard type={contractop[0]}>FIXED</ContractCard>
          <Button
            sx={{ mt: 5, px: 5, py: 2 }}
            variant="contained"
            onClick={async () => {
              await methodTest(props.user.address);
            }}
          >
            Withdraw
          </Button>
          <ContractCard type={contractop[1]}>FIXED</ContractCard>
          <ContractCard type={contractop[2]}>FIXED</ContractCard>
        </div>
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(CreateContract);
