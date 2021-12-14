import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    _className,
    is_container,
    is_flex,
    flex_align,
    flex_justify,
    children,
  } = props;
  const styles = {
    is_container,
    is_flex,
    flex_align,
    flex_justify,
    className: _className,
  };
  return <GridBox {...styles}>{children}</GridBox>;
};

export default Grid;

const GridBox = styled.div`
  ${({ is_container }) =>
    is_container &&
    `
              width: 100%;
              margin: 0 auto;
              max-width: 425px;
            `}

  ${({ is_flex }) => is_flex && "display: flex;"}
  ${({ flex_align }) => flex_align && `align-items: ${flex_align}`}
  ${({ flex_justify }) => flex_justify && `justify-content: ${flex_justify}`}
`;
