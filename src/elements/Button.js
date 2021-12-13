import React from 'react';
import styled from 'styled-components'

const Button = (props) => {
  const {_onClick, _className, version, children} = props
  const styles = {
    onClick: _onClick,
    className: _className,
    version
  }
  return (
      <ButtonEl type="button" {...styles}>
        {children}
      </ButtonEl>
  );
};

export default Button;

const ButtonEl = styled.button`
  cursor: pointer;
  width: 120px;
  height: 40px;
  border: 1px solid #D1D3D8;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${
    (props) => {
      switch (props.version) {
        case 'orange':
          return 'color: #fff; background-color: var(--point-color); border-color: var(--point-color);'
        default:
      }
    }
  }
  
  &:disabled {
    opacity: 0.6;
  }
`
