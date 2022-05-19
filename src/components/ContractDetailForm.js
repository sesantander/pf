import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import { ContractStatus } from './../utils/constants/contract.constants';
import { CreateProposal } from '../hooks/useProposalMethod';

import { Input } from './Input';
import classes from './addProductModal.module.css';
// import { itemsActions } from "../../store/reducers/itemSlicer";

export const ContractDetailForm = (props) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const [contractTypeValid, setContractTypeValid] = useState(false);
  const [contractTypeInput, setContractTypeInput] = useState('');

  const [startDateValid, setStartDateValid] = useState(false);
  const [startDateInput, setStartDateInput] = useState('');

  const [endDateValid, setEndDateValid] = useState(false);
  const [endDateInput, setEndDateInput] = useState('');

  const [paymentRateValid, setPaymentRateValid] = useState(false);
  const [paymentRateInput, setPaymentRateInput] = useState('');

  const [paymentFreqValid, setPaymentFreqValid] = useState(false);
  const [paymentFreqInput, setPaymentFreqInput] = useState('');

  const [scopeValid, setScopeValid] = useState(false);
  const [scopeInput, setScopeInput] = useState('');

  useEffect(() => {
    return setIsFormValid(
      contractTypeValid && startDateValid && endDateValid && paymentRateValid && paymentFreqValid && scopeValid
    );
  }, [contractTypeValid, startDateValid, endDateValid, paymentRateValid, paymentFreqValid, scopeValid]);

  const validateCategory = (inputValue) => {
    return inputValue !== '';
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newProposal = {
      contract_type: contractTypeInput,
      start_date: startDateInput,
      end_date: endDateInput,
      payment_rate: paymentRateInput,
      payment_frequency: paymentFreqInput,
      scope_of_work: scopeInput,
      //status: ContractStatus.WAITING_CONTRACTOR_RESPONSE,
      employer_id: 1,
      contractor_id: 2,
    };
    console.log('user: ', props.user);
    createProposal(newProposal, props.user.address);
    // Change contract status to ContractStatus.WAITING_CONTRACTOR_RESPONSE
    
    props.handleClose();
  };
  const createProposal = async (newProposal, account) => {
    console.log("LOG : createProposal -> account", account)
    const proposalCreated = await CreateProposal(account, newProposal);
    console.log("LOG : createProposal -> proposalCreated", proposalCreated)
  };
  // console.log(' HOLA ', props.row.contract_type);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="contract_type"
        label="Contract Type"
        validate={validateCategory}
        inputValid={setContractTypeValid}
        value={props.row.contract_type}
        setValue={setContractTypeInput}
      />
      <Input
        id="start_date"
        label="Start Date"
        type="date"
        validate={validateCategory}
        inputValid={setStartDateValid}
        value={startDateInput}
        setValue={setStartDateInput}
      />

      <Input
        id="end_date"
        label="End Date"
        type="date"
        validate={validateCategory}
        inputValid={setEndDateValid}
        value={endDateInput}
        setValue={setEndDateInput}
      />
      
      <Input
        id="payment_rate"
        label="Payment Rate"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        validate={validateCategory}
        inputValid={setPaymentRateValid}
        value={paymentRateInput}
        setValue={setPaymentRateInput}
      />
      <Input
        id="payment_frequency"
        label="Payment Frequency"
        validate={validateCategory}
        inputValid={setPaymentFreqValid}
        value={paymentFreqInput}
        setValue={setPaymentFreqInput}
      />
      <Input
        id="scope_of_work"
        label="Scope of work"
        type="text"
        multiline
        rows={4}
        validate={validateCategory}
        inputValid={setScopeValid}
        value={scopeInput}
        setValue={setScopeInput}
      />
      <div className={classes.buttons}>
        <Button type="sumbit" disabled={!isFormValid} name="submit">
          Accept
        </Button>
        <Button onClick={props.handleClose}>Reject</Button>
      </div>
    </form>
  );
};
