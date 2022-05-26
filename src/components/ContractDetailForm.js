import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { CreateProposal } from '../hooks/useProposalMethod';
import { UpdateContractStatus } from '../hooks/useContractMethod';
import { ContractStatus } from '../utils/constants/contract.constants';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Input } from './Input';
import classes from './addProductModal.module.css';
// import { itemsActions } from "../../store/reducers/itemSlicer";

export const ContractDetailForm = (props) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const [contractTypeInput, setContractTypeInput] = useState(props.row.contract_type);

  const [startDateValid, setStartDateValid] = useState(false);
  const [startDateInput, setStartDateInput] = useState(props.row.start_date);

  const [endDateValid, setEndDateValid] = useState(false);
  const [endDateInput, setEndDateInput] = useState(props.row.end_date);

  const [paymentRateValid, setPaymentRateValid] = useState(false);
  const [paymentRateInput, setPaymentRateInput] = useState(props.row.payment_rate);

  const [paymentFreqValid, setPaymentFreqValid] = useState(false);
  const [paymentFreqInput, setPaymentFreqInput] = useState(props.row.payment_frequency);

  const [scopeValid, setScopeValid] = useState(false);
  const [scopeInput, setScopeInput] = useState(props.row.scope_of_work);

  const contractTypes = [
    {
      value: 'Fixed Rate',
      label: 'FixedRate',
    },
    {
      value: 'Milestone',
      label: 'Milestone',
    },
    {
      value: 'Monthly',
      label: 'Monthly',
    },
  ];

  useEffect(() => {
    return setIsFormValid(startDateValid && endDateValid && paymentRateValid && paymentFreqValid && scopeValid);
  }, [startDateValid, endDateValid, paymentRateValid, paymentFreqValid, scopeValid]);

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
      employer_id: 1,
      contractor_id: 2,
    };
    console.log('user: ', props.user);
    createProposal(newProposal, props.user.address);
    // Change contract status to ContractStatus.WAITING_CONTRACTOR_RESPONSE

    props.handleClose();
  };

  const handleChange = (event) => {
    setContractTypeInput(event.target.value);
  };

  const createProposal = async (newProposal, account) => {
    const proposalCreated = await CreateProposal(account, props.user.web3, newProposal);
    const updateContractRes = await UpdateContractStatus(
      account,
      props.user.web3,
      props.row.contract_id,
      ContractStatus.WAITING_CONTRACTOR_RESPONSE
    );
    console.log('LOG : createProposal -> updateContractRes', updateContractRes);
  };
  // console.log(' HOLA ', props.row.contract_type);
  return (
    <form onSubmit={handleSubmit}>
      {/* <Input
        id="contract_type"
        title="Contract Type"
        validate={validateCategory}
        inputValid={setContractTypeValid}
        value={contractTypeInput}
        setValue={setContractTypeInput}
        defaultValue={contractTypeInput}
      /> */}
      <TextField
        id="outlined-select-contract_type"
        select
        label="Select"
        value={contractTypeInput}
        onChange={handleChange}
        helperText="Please select your contract type"
        defaultValue=""
      >
        {contractTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Input
        id="start_date"
        title="Start Date"
        type="date"
        validate={validateCategory}
        inputValid={setStartDateValid}
        value={startDateInput}
        setValue={setStartDateInput}
        defaultValue={startDateInput}
      />

      <Input
        id="end_date"
        title="End Date"
        type="date"
        validate={validateCategory}
        inputValid={setEndDateValid}
        value={endDateInput}
        defaultValue={endDateInput}
        setValue={setEndDateInput}
      />

      <Input
        id="payment_rate"
        title="Payment Rate"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
        }}
        validate={validateCategory}
        inputValid={setPaymentRateValid}
        value={paymentRateInput}
        defaultValue={paymentRateInput.replace(/\D/g, '')}
        setValue={setPaymentRateInput}
      />
      <Input
        id="payment_frequency"
        title="Payment Frequency"
        validate={validateCategory}
        inputValid={setPaymentFreqValid}
        value={paymentFreqInput}
        defaultValue={paymentFreqInput}
        setValue={setPaymentFreqInput}
      />
      <Input
        id="scope_of_work"
        title="Scope of work"
        type="text"
        multiline
        rows={4}
        validate={validateCategory}
        inputValid={setScopeValid}
        value={scopeInput}
        defaultValue={scopeInput}
        setValue={setScopeInput}
      />
      <div className={classes.buttons}>
        <Button type="sumbit" disabled={!isFormValid} name="submit">
          Send New Proposal
        </Button>
        <Button onClick={props.handleClose}>Cancel</Button>
      </div>
    </form>
  );
};
