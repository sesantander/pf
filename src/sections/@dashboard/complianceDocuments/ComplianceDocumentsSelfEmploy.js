// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Button, Grid } from '@mui/material';
// utils
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

ComplianceDocumentsSelfEmploy.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function ComplianceDocumentsSelfEmploy({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        marginTop: '15px',
        color: (theme) => theme.palette[color].darker,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon="eva:file-text-fill" width={32} height={32} />
      </IconWrapperStyle>
      <Typography variant="h7">{title}</Typography>
      <Card
        sx={{
          py: 5,
          boxShadow: 0,
          textAlign: 'start',
          marginLeft: '10px',
          marginRight: '10px',
          paddingTop: '20px',
          paddingBottom: '20px',
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
        {...other}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={10}>
            <Typography
              sx={{
                marginLeft: '15px',
              }}
              variant="subtitle1"
            >
              Tax registration form
            </Typography>
            <Typography
              sx={{
                marginLeft: '15px',
              }}
              variant="subtitle2"
            >
              Fill the official tax registration form online and receive your report.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button sx={{marginLeft: '15px', marginRight: '15px',}} variant="contained">
              Start
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
}
