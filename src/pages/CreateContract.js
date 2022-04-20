import { useState } from 'react';
// material
import { Container, Stack, Typography, Box } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import ContractCard from './ContractCard';

// ----------------------------------------------------------------------

export default function CreateContract() {
  const contractop = [
    {
      title: 'Fixed Rate',
      description: 'For contracts that have a fixed rate on every payment cycle.',
      image: '/static/mock-images/contracs/Screenshot_2.png',
    },
    {
      title: 'Pay As You Go',
      description: 'For contracts with time sheets or submitted work every oayment cycle.',
      image: '/static/mock-images/contracs/Screenshot_3.png',
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
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around',flexWrap:"wrap" }}>
          <ContractCard type={contractop[0]}>FIXED</ContractCard>
          <ContractCard type={contractop[1]}>FIXED</ContractCard>
          <ContractCard type={contractop[2]}>FIXED</ContractCard>
        </div>
      </Container>
    </Page>
  );
}
