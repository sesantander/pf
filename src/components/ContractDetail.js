import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import classes from './addProductModal.module.css';
import { Stack } from '@mui/material';
import { ContractStatus } from '../utils/constants/contract.constants'
import { ContractUpdate } from '../hooks/useContractMethod';
// import { itemsActions } from "../../store/reducers/itemSlicer";

export const ContractDetail = (props) => {
  const [infoList, setInfoList] = useState([]);
  const InfoCard = (props) => {
    return (
      <>
        <h2>{props.title}</h2>
        <p>{props.value.toString()}</p>
      </>
    );
  };

  const updateContract = async (account) => {
    props.row.status = ContractStatus.ACCEPTED;
    await ContractUpdate(account, props.row);
  };

  useEffect(() => {
    const infoListMap = Object.keys(props.row).map(function (key, index) {
      if (key !== 'avatarUrl') {
        return <InfoCard key={index} title={key} value={props.row[key]} />;
      }
    });
    setInfoList(infoListMap);
  }, []);
  return (
    <>
      {infoList}
      <div className={classes.buttons}>
        <Button
          onClick={async () => {
            await updateContract(props.user.address);
          }}
        >
          Accept Contract
        </Button>
        <Button onClick={props.showDetail}>New Proposal</Button>
      </div>
    </>
  );
};
