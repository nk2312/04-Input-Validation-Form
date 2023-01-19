import "./index.css";
import { useState } from "react";
import useInput from "../hooks/useInput";
const BasicForm = () => {
  const {
    value: name,
    valueIsValid: enteredNameIsValid,
    valueIsInValid: nameIsInValid,
    valueHandler: nameHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: lastName,
    valueIsValid: enteredLastNameIsValid,
    valueIsInValid: lastNameIsInValid,
    valueHandler: lastNameHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    valueIsValid: enteredEmailIsValid,
    valueIsInValid: emailIsInValid,
    valueHandler: emailHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.includes("@"));
  

  const [formSubmit,setFormSubmit]=useState(false);
  let form = false;

  if (enteredEmailIsValid && enteredNameIsValid && enteredLastNameIsValid) {
    form = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!form) {
      console.log("form is not valid to submit");
      return;
    }
    setFormSubmit(true);
    console.log(name);
    console.log(email);
    emailReset();
    nameReset();
    lastNameReset();
  };

  return (
    <div className="input">
      {formSubmit && <h1>Form submitted ..successfully!</h1>}
      <form onSubmit={submitHandler}>
        <label htmlFor="name"> First Name</label>
        <input
          id="name"
          type="text"
          onChange={nameHandler}
          onBlur={nameBlurHandler}
          value={name}
          className={nameIsInValid ? "input-invalid" : ""}
        />
        {nameIsInValid && <p>Name is Empty ..start typing something</p>}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          value={lastName}
          onChange={lastNameHandler}
          onBlur={lastNameBlurHandler}
          className={lastNameIsInValid ? "input-invalid" : ""}
        />
        {lastNameIsInValid && <p>Last name is not valid ..plz check!</p>}
        <label htmlFor="name">Email</label>
        <input
          id="email"
          type="email"
          onChange={emailHandler}
          onBlur={emailBlurHandler}
          value={email}
          className={emailIsInValid ? "input-invalid" : ""}
        />
        <br />
        {emailIsInValid && (
          <p>Email is empty or invalid ..start typing something</p>
        )}
        <button disabled={!form}>Submit</button>
      </form>
     
    </div>
  );
};

export default BasicForm;
