import React, { useState, useEffect } from 'react';
import classes from './addProductModal.module.css';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { flexbox } from '@mui/system';
import { ContractStatus } from '../utils/constants/contract.constants';
import { ContractUpdate, UpdateContractStatus } from '../hooks/useContractMethod';
// import { itemsActions } from "../../store/reducers/itemSlicer";
const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Are you sure?</DialogTitle>
      <div style={{ display: 'flexbox', flexDirection: 'row', margin: '20px' }}>
        <Button style={{ margin: '5px' }} size="large" variant="contained" onClick={props.acceptFunction}>
          Accept
        </Button>
        <Button style={{ margin: '5px' }} size="large" variant="contained" onClick={handleClose} color="error">
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}

export const ContractDetail = (props) => {
  const [infoList, setInfoList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [acceptFunction, setAcceptFunction] = React.useState(() => () => {
  });
  const acceptContract = () => {
    //logica de accept contract
    setAcceptFunction(() => async () => {
      await updateContract(props.user.address, ContractStatus.ACTIVE);
    });
    setOpen(true);
    handleClose()
  };
  const rejectContract = () => {
    //logica de reject contract
    setAcceptFunction(() => async () => {
      await updateContract(props.user.address, ContractStatus.REJECTED);
    });
    setOpen(true);
    handleClose()

  };
  const handleClickOpen = () => {
    //logica new proposal
    setAcceptFunction(() => props.showDetail);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const InfoCard = (props) => {
    return (
      <>
        <h2>{titleCase(props.title)}</h2>
        <p>{props.value.toString()}</p>
      </>
    );
  };
  function titleCase(str) {
    return str
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .replace(/_/g, ' ');
  }

  const updateContract = async (account, status) => {
    //await ContractUpdate(account, props.user.web3, props.row);
    await UpdateContractStatus(account, props.user.web3, props.row.contract_id,status)
  };

  useEffect(() => {
    const infoListMap = Object.keys(props.row).map(function (key, index) {
      if (
        key !== 'employer_id' &&
        key !== 'contractor_id' &&
        key !== 'proposal_id' &&
        key !== '0' &&
        key !== '1' &&
        key !== '2' &&
        key !== '3' &&
        key !== '4' &&
        key !== '5' &&
        key !== '6' &&
        key !== '7'
      ) {
        return <InfoCard key={index} title={key} value={props.row[key]} />;
      }
    });
    setInfoList(infoListMap);
  }, []);
  return (
    <>
      {infoList}
      {props.row.status === 'WAITING_CONTRACTOR_RESPONSE' || props.row.status === 'WAITING_EMPLOYER_RESPONSE' ? (
        <div className={classes.buttons} style={{ marginTop: '10px' }}>
          <Button size="large" onClick={() => acceptContract()} variant="contained" color="success">
            Accept Contract
          </Button>
          <Button size="large" onClick={() => rejectContract()} variant="contained" color="error">
            Reject Contract
          </Button>
          <Button size="large" onClick={() => handleClickOpen()} variant="contained">
            New Proposal
          </Button>
        </div>
      ) : (
        ''
      )}

      <SimpleDialog acceptFunction={acceptFunction} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
};

