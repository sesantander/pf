import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';

import { Input } from './Input';
import classes from './addProductModal.module.css';
// import { itemsActions } from "../../store/reducers/itemSlicer";

export const ContractDetailForm = (props) => {

  const [isFormValid, setIsFormValid] = useState(false);

  const [categoryValid, setcategoryValid] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');

  const [productValid, setproductValid] = useState(false);
  const [productInput, setProductInput] = useState('');

  const [priceValid, setpriceValid] = useState(false);
  const [priceInput, setPriceInput] = useState('');

  const [descriptionValid, setdescriptionValid] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');

  useEffect(() => {
    return setIsFormValid(categoryValid && productValid && priceValid && descriptionValid);
  }, [categoryValid, productValid, priceValid, descriptionValid]);

  const validateCategory = (inputValue) => {
    return inputValue !== '';
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      category: categoryInput,
      name: productInput,
      price: '$' + priceInput,
      description: descriptionInput,
    };
    // dispatch(itemsActions.addItems({ newProduct: newProduct }));
    props.handleClose();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="contract_type"
        label="Contract Type"
        validate={validateCategory}
        inputValid={setcategoryValid}
        value={categoryInput}
        setValue={setCategoryInput}
      />
      <Input
        id="start_date"
        label="Start Date"
        type="date"
        validate={validateCategory}
        inputValid={setproductValid}
        value={productInput}
        setValue={setProductInput}
      />
      
      <Input
        id="end_date"
        label="End Date"
        type="date"
        validate={validateCategory}
        inputValid={setproductValid}
        value={productInput}
        setValue={setProductInput}
      />
      <Input
        id="payment_rate"
        label="Payment Rate"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        validate={validateCategory}
        inputValid={setpriceValid}
        value={priceInput}
        setValue={setPriceInput}
      />
      <Input
        id="scope_of_work"
        label="Scope of work"
        type="text"
        multiline
        rows={4}
        validate={validateCategory}
        inputValid={setdescriptionValid}
        value={descriptionInput}
        setValue={setDescriptionInput}
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
