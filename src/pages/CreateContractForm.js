import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { CreateProposal } from '../hooks/useProposalMethod';
import { UpdateContractStatus, createContract } from '../hooks/useContractMethod';
import { GetUser } from '../hooks/useUserHandler';
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

  const [errorMessage, setErroMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (contractData) {
      async function contractCreate() {
        try {
          const response = await GetUser(contractData.contractor_id);
          console.log('LOG : contractCreate -> response', response);
          if (response.user) {
            contractData.contractor_id = response.user.user_id;
            await createContract(props.user.address, props.user.web3, contractData);
            navigate('/dashboard/home', { replace: true });
          } else {
            setErroMessage('Party user does not exist.');
          }
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
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
    var paymentDue = new Date(startdate.setMonth(startdate.getMonth() + 1)).toLocaleDateString('en-GB');
    
    const newContract = {
      contract_type: props.type,
      contract_name: contractNameInput,
      job_title: jobTitleInput,
      status: ContractStatus.PENDING,
      scope_of_work: scopeInput,
      start_date: startdate.toLocaleDateString('en-GB'),
      end_date: enddate.toLocaleDateString('en-GB'),
      currency: 'ETH',
      payment_rate: +paymentRateInput,
      payment_frequency: paymentFreqInput,
      payment_due: paymentDue,
      employer_id: props.user.id,
      contractor_id: partyUsernameInput, //Viene del get username
      proposal_id: 0,
    };
    setErroMessage(null);
    setIsLoading(true);
    console.log("LOG : handleSubmit -> newContract", newContract.payment_rate)
    setContractData(newContract);
  };

  const handleChange = (event) => {
    setContractTypeInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '60%' }}>
      <LoadingOverlay active={isLoading} spinner text="Loading">
        <TextField
          id="outlined-select-contract_type"
          select
          label="Select"
          value={props.type}
          disabled
          onChange={handleChange}
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
        {errorMessage && <p>{errorMessage}</p>}
      </LoadingOverlay>
    </form>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(CreateContractForm);
