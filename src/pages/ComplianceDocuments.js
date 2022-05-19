// material
import { Grid, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CreateDocument } from '../hooks/useDocumentHandler';
// components
import Page from '../components/Page';

import { ComplianceDocumentsCard, ComplianceDocumentsSelfEmploy } from '../sections/@dashboard/complianceDocuments';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ComplianceDocuments() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Compliance Documents
        </Typography>
        

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <ComplianceDocumentsCard
              title="Passport or National ID"
              total={71400}
              icon={'ic:baseline-account-balance'}
            />
            <ComplianceDocumentsCard
              title="Proof of registration with social security authorities"
              total={71400}
              icon={'ic:baseline-account-balance'}
            />
            <ComplianceDocumentsCard
              title="Proof of registration with tax authorities"
              total={71400}
              icon={'ic:baseline-account-balance'}
            />
            <ComplianceDocumentsCard
              title="Relevant sector specific licenses and/or permits(Optional)"
              total={71400}
              icon={'ic:baseline-account-balance'}
            />
            <ComplianceDocumentsCard
              title="Any additional relevant documents(Optional)"
              total={71400}
              icon={'ic:baseline-account-balance'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <ComplianceDocumentsSelfEmploy
              title="Register as self-employed (optional)"
              total={71400}
              icon={'ic:baseline-account-balance'}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
