import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { type, placeholder, _onChange, value, _className, max } = props;
  return (
    <InputForm>
      <input
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        defaultValue={value}
        className={_className}
        maxLength={max}
      />
    </InputForm>
  );
};

export default Input;

const InputForm = styled.div`
  input {
    width: 100%;
    display: flex;
    padding: 8px 10px;
    height: 50px;
    outline: 0;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;
