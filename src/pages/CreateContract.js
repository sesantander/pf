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
      image: '/static/mock-images/products/product_1.jpg',
    },
    {
      title: 'Fixed Rate',
      description: 'For contracts that.',
      image: '/static/mock-images/products/product_1.jpg',
    },
    {
      title: 'Fixed Rate',
      description: 'For contracts that have a fixed rate on every payment cycle.',
      image: '/static/mock-images/products/product_1.jpg',
    },
  ];

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <ContractCard type={contractop[0]}>FIXED</ContractCard>
          <ContractCard type={contractop[1]}>FIXED</ContractCard>
          <ContractCard type={contractop[2]}>FIXED</ContractCard>
        </div>
      </Container>
    </Page>
  );
}
