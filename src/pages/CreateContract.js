import { useState } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link as RouterLink } from 'react-router-dom';

// material
import { Container, Stack, Typography, Box, Button, Link } from '@mui/material';
// components
import Web3 from 'web3/dist/web3.min';
import Page from '../components/Page';
import { ContractCount, ContractList, createContract } from '../hooks/useContractMethod';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import { ContractStatus } from '../utils/constants/contract.constants';
// mock
import ContractCard from './ContractCard';

// ----------------------------------------------------------------------

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
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center',alignItems:'center' }}>
          <Outlet></Outlet>
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
