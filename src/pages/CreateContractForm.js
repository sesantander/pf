import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { CreateProposal } from '../hooks/useProposalMethod';
import { UpdateContractStatus, createContract } from '../hooks/useContractMethod';
import { ContractStatus } from '../utils/constants/contract.constants';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Input } from '../components/Input';
import classes from '../components/addProductModal.module.css';
// import { itemsActions } from "../../store/reducers/itemSlicer";

function CreateContractForm(props) {
  const navigate = useNavigate();

  const [isFormValid, setIsFormValid] = useState(false);

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

  const [contractNameValid, setContractNameValid] = useState(false);
  const [contractNameInput, setContractNameInput] = useState('');

  const [jobTitleValid, setJobTitleValid] = useState(false);
  const [jobTitleInput, setJobTitleInput] = useState('');

  const [partyUsernameValid, setPartyUsernameValid] = useState(false);
  const [partyUsernameInput, setpartyUsernameInput] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contractData, setContractData] = useState(null);
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
    if(contractData){
      async function contractCreate() {
        try {
          await createContract(props.user.address, props.user.web3, contractData)
          navigate('/dashboard/home', { replace: true });
        } catch (e) {
          console.error(e);
        }
      }
      contractCreate();
    }
    return setIsFormValid(startDateValid && endDateValid && paymentRateValid && paymentFreqValid && scopeValid);
  }, [contractData, startDateValid, endDateValid, paymentRateValid, paymentFreqValid, scopeValid]);

  const validateCategory = (inputValue) => {
    return inputValue !== '';
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const startdate = new Date(startDateInput);
    const enddate = new Date(endDateInput);
    console.log('LOG : handleSubmit -> startdate', startdate);
    var paymentDue = new Date(startdate.setMonth(startdate.getMonth() + 1)).toLocaleDateString('en-GB');
    console.log('user: ', props.user);
    console.log('LOG : handleSubmit -> payment_due', paymentDue);
    const newContract = {
      contract_type: props.type,
      contract_name: contractNameInput,
      job_title: jobTitleInput,
      status: ContractStatus.PENDING,
      scope_of_work: scopeInput,
      start_date: startdate.toLocaleDateString('en-GB'),
      end_date: enddate.toLocaleDateString('en-GB'),
      currency: 'ETH',
      payment_rate: paymentRateInput,
      payment_frequency: paymentFreqInput,
      payment_due: paymentDue,
      employer_id: props.user.id,
      contractor_id: 2, //Viene del get username
      proposal_id: 0,
    };
    setContractData(newContract);
  };

  const handleChange = (event) => {
    setContractTypeInput(event.target.value);
  };

  const createProposal = async (newProposal, account) => {
    const proposalCreated = await CreateProposal(account, newProposal);
    const updateContractRes = await UpdateContractStatus(
      account,
      props.row.contract_id,
      ContractStatus.WAITING_CONTRACTOR_RESPONSE
    );
    console.log('LOG : createProposal -> updateContractRes', updateContractRes);
  };
  // console.log(' HOLA ', props.row.contract_type);
  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: '60%' }}
    >
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
        value={props.type}
        disabled
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
        style={{ width: '100%' }}
        id="contract_name"
        title="Contract Name"
        type="text"
        validate={validateCategory}
        inputValid={setContractNameValid}
        value={contractNameInput}
        defaultValue={contractNameInput}
        setValue={setContractNameInput}
      />
      <Input
        style={{ width: '100%' }}
        id="job_title"
        title="Job Title"
        type="text"
        validate={validateCategory}
        inputValid={setJobTitleValid}
        value={jobTitleInput}
        defaultValue={jobTitleInput}
        setValue={setJobTitleInput}
      />
      <Input
        style={{ width: '100%' }}
        id="party_username"
        title="Party Username"
        type="text"
        validate={validateCategory}
        inputValid={setPartyUsernameValid}
        value={partyUsernameInput}
        defaultValue={partyUsernameInput}
        setValue={setpartyUsernameInput}
      />
      <Input
        style={{ width: '100%' }}
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
        style={{ width: '100%' }}
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
        style={{ width: '100%' }}
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
        style={{ width: '100%' }}
        id="payment_frequency"
        title="Payment Frequency"
        validate={validateCategory}
        inputValid={setPaymentFreqValid}
        value={paymentFreqInput}
        defaultValue={paymentFreqInput}
        setValue={setPaymentFreqInput}
      />
      <Input
        style={{ width: '100%' }}
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
        <Button size="large" variant="contained" type="sumbit" disabled={!isFormValid} name="submit">
        Create contract
        </Button>
      </div>
    </form>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(CreateContractForm);
