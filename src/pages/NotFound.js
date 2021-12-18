import React from 'react';
import styled from 'styled-components'

import { Grid, Button } from '../elements'

const NotFound = (props) => {
  const { history } = props

  const handleClickHomeBtn = () => {
    history.push('/')
  }

  return (
      <NotFoundWrap>
        <Grid is_container>
          <img className={'character'} src="https://d1unjqcospf8gs.cloudfront.net/assets/error/error_daangn@2x-c4f7844b7e7f2ed3276c805cdcbf9bdb22aea4e2b65c203bdaf2e83a22c48bd6.png" alt=""/>
          <p className={'guide-txt'}>
            <strong>앗! 죄송해요.</strong>
            "원하시는 페이지를 찾을 수 없어요.<br/>
            찾으시려는 페이지의 주소가 잘못 입력되었거나,<br/>
            페이지 주소가 변경 또는 삭제되어 더는 사용하실 수 없습니다.<br/><br/>

            입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요."
          </p>
          <Button _className={'home-btn'} version={'orange'} _onClick={handleClickHomeBtn}>홈으로</Button>
        </Grid>
      </NotFoundWrap>
  );
};

export default NotFound;

const NotFoundWrap = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 16px;
  
  .character {
    display: block;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
    margin-bottom: 40px;
  }
  
  .guide-txt {
    font-size: 12px;
    text-align: center;
    word-break: keep-all;
    
    strong {
      display: block;
      font-size: 32px;
      margin-bottom: 20px;
    }
  }
  
  .home-btn {
    margin: 0 auto;
    margin-top: 20px;
  }
`