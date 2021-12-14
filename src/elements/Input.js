import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { type, placeholder, _onChange, value, _className } = props;
  return (
    <InputForm>
      <input
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        className={_className}
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
`;
