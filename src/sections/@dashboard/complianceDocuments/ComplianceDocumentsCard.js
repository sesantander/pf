// @mui
import PropTypes from 'prop-types';
import { Card, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { CreateDocument } from '../../../hooks/useDocumentHandler';
import LoadingOverlay from 'react-loading-overlay';
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

export default function ComplianceDocumentsCard({
  title,
  total,
  icon,
  user_id,
  document_url,
  color = 'primary',
  sx,
  ...other
}) {
  console.log('LOG : ComplianceDocumentsCard -> document_url', document_url);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFileSaved, setIsFileSaved] = useState(false);
  const onFileChange = (event) => {
    let file = event.target.files[0];
    setFile(event.target.files[0]);
    console.log('LOG : ComplianceDocumentsCard -> img', file);
  };

  const fileSave = async () => {
    console.log('LOG : fileSave -> file', file);
    setErrorMessage(null);
    setIsLoading(true);
    if (file) {
      await CreateDocument(user_id, file, title);
      setIsFileSaved(true);
    } else {
      setErrorMessage('Upload a file before saving.');
    }
    setIsLoading(false);
  };
  return (
    <LoadingOverlay active={isLoading} spinner text="Loading">
      <Card
        sx={{
          py: 5,
          boxShadow: 1,
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
            borderWidth: '2px',
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
          {document_url ? (
            <a href={document_url}>Download your document</a>
          ) : !isFileSaved ? (
            <Typography
              sx={{
                textDecoration: 'none',
              }}
              variant="subtitle2"
            >
              Click here or drag file to upload
              <input type="file" name="myImage" onChange={onFileChange} />
            </Typography>
          ) : (
            <Typography
              sx={{
                textDecoration: 'none',
              }}
              variant="subtitle2"
            >
              File Saved!
            </Typography>
          )}
        </Card>
        {document_url ? null : isFileSaved ? null : (
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
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </Card>
    </LoadingOverlay>
  );
}
