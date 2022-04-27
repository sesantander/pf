// @mui
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
// utils
// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

ComplianceDocumentsCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function ComplianceDocumentsCard({ title, total, icon, color = 'primary', sx, ...other }) {
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
      <Typography variant="h7">{title}</Typography>
      <a href="">
        <Card
          sx={{
            py: 5,
            boxShadow: 0,
            textAlign: 'center',
            borderStyle: 'dotted',
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
          <Typography
            sx={{
              textDecoration: 'none',
            }}
            variant="subtitle2"
          >
            Click here or drag file to upload
          </Typography>
        </Card>
      </a>
    </Card>
  );
}
