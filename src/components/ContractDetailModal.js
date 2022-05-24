import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';

import { ContractDetailForm } from './ContractDetailForm';
import { ContractDetail } from './ContractDetail';

import classes from './addProductModal.module.css';

const AddProductBackdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.handleClose} />;
};
const AddProductOverlay = (props) => {
  const [showForm, setShowForm] = useState(false);
  const showDetail = () => {
    setShowForm(true);
    console.log('gola');
  };
  return (
    <Box className={classes.modal}>
      {showForm ? (
        <>
          <div className={classes.header}>
            <h2>Contract Detail</h2>
          </div>
          <div className={classes.body}>
            <ContractDetailForm user={props.user} row={props.row} handleClose={props.handleClose} />
          </div>
        </>
      ) : (
        <>
          <div className={classes.header}>
            <h2>New Contract Proposal</h2>
          </div>
          <div className={classes.body}>
            <ContractDetail showDetail={showDetail} user={props.user} row={props.row} handleClose={props.handleClose} />
          </div>
        </>
      )}
    </Box>
  );
};

function ContractDetailModal(props) {
  const handleClose = () => {
    props.addProductToggler();
    document.body.style.overflow = 'unset';
  };
  return (
    <>
      {ReactDOM.createPortal(
        <AddProductBackdrop handleClose={handleClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <AddProductOverlay user={props.user} row={props.row} handleClose={handleClose} />,
        document.getElementById('overlay-root')
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(ContractDetailModal);
