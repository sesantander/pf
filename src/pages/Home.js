import { faker } from '@faker-js/faker';
import { connect } from "react-redux";
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

function Home(props) {
  const theme = useTheme();
  console.log("props", props)
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="ETH Balance" total={Number(props.user.balance)} icon={'ic:baseline-account-balance'} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button sx={{mt:5,px:5,py:2}}variant="contained">Withdraw</Button>
            </div>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              title="Movement"
              subheader="Jan-Oct"
              chartLabels={[
                '01/01/2021',
                '02/01/2021',
                '03/01/2021',
                '04/01/2021',
                '05/01/2021',
                '06/01/2021',
                '07/01/2021',
                '08/01/2021',
                '09/01/2021',
                '10/01/2021',
                '11/01/2021',
              ]}
              chartData={[
                {
                  name: 'Movement',
                  type: 'column',
                  fill: 'solid',
                  data: [2300, 1100, 2200, 2700, 1300, 2200, 3700, 2100, 4400, 2200, 3000],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Home);
