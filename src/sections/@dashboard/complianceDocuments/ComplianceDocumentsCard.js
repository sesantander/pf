// @mui
import PropTypes from 'prop-types';
import { Card, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { CreateDocument } from '../../../hooks/useDocumentHandler';
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
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    let file = event.target.files[0];
    setFile(event.target.files[0]);
    console.log('LOG : ComplianceDocumentsCard -> img', file);
  };

  const fileSave = async () => {
    console.log("LOG : fileSave -> file", file)
    await CreateDocument(file, title)
  };
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
          cursor: 'pointer',
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
          <input type="file" name="myImage" onChange={onFileChange} />
        </Typography>
      </Card>
      <Button
      sx={{
        marginTop: '8px',
        paddingTop: '5px',
        paddingBottom: '5px',
        ...sx,
      }}
        variant="contained"
        onClick={async () => {
          await fileSave();
        }}
      >
        Save
      </Button>
    </Card>
  );
}
