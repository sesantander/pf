import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import classes from './addProductModal.module.css';
import { Stack } from '@mui/material';
// import { itemsActions } from "../../store/reducers/itemSlicer";

export const ContractDetail = (props) => {
  // console.log(' HOLA ', props.row.contract_type);

  const [infoList, setInfoList] = useState([]);
  const InfoCard = (props) => {
    return (
      <>
        <h2>{props.title}</h2>
        <p>{props.value.toString()}</p>
      </>
    );
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
        <Button>Accept Contract</Button>
        <Button onClick={props.showDetail}>New Proposal</Button>
      </div>
    </>
  );
};
