import React from 'react';
import styled from 'styled-components'
import {getCookie} from '../shared/Cookie'
import { history } from '../redux/configureStore'

import {Grid, Button} from '../elements'

const Permit = (props) => {
  const {children} = props
  const is_login = getCookie('id')
  console.log('로그인', is_login)

  if (!is_login) {
    return (
        <PermitWrap>
          <Grid is_container _className={'redirect-box'}>
            <img
                src="https://d1unjqcospf8gs.cloudfront.net/assets/home/base/header/logo-basic-24b18257ac4ef693c02233bf21e9cb7ecbf43ebd8d5b40c24d99e14094a44c81.svg"
                alt=""/>
            <p className={'guide-text'}>
              해당 페이지를 사용하시려면<br/>
              먼저 로그인 해주세요.
            </p>

            <Button version={'orange'} _onClick={() => history.push('/login')}>로그인</Button>
          </Grid>
        </PermitWrap>
    )
  }

  return (
      <>
        {children}
      </>
  );
};

export default Permit;

const PermitWrap = styled.section`
  .redirect-box {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    
    img {
      max-width: 200px;
      margin-bottom: 40px;
      width: 100%;
    }
    
    .guide-text {
      text-align: center;
      font-size: 18px;
      line-height: 1.72;
      margin-bottom: 30px;
    }
  }
`