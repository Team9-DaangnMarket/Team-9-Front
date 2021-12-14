import React from 'react';
import styled from 'styled-components'

import { Grid, Button } from '../elements';

const OtherProduct = () => {
  console.log('[OtherProduct]')
  return (
    <OtherProducts>
      <Grid is_container is_flex flex_justify={'space-between'} flex_align={'flex-end'} padding={'16px'}>
        <h3 className={'title'}>하루살이님의 판매상품</h3>
        <button type={'button'} className={'all-btn'}>모두보기</button>
      </Grid>

      <Grid is_container padding={'16px'}>
        <ul className={'other-list'}>
          <li className={'other-item'}>
            <div className={'prd-img'}>
              <img src="https://t1.daumcdn.net/cfile/tistory/160BD90F4B7F846D0C" alt=""/>
            </div>

            <div className={'prd-subject'}>빔프로젝트 싸게 팔아요</div>
            <div className={'prd-price'}>
              <b>30,000</b>원
            </div>
          </li>
          <li className={'other-item'}>
            <div className={'prd-img'}>
              <img src="https://t1.daumcdn.net/cfile/tistory/160BD90F4B7F846D0C" alt=""/>
            </div>

            <div className={'prd-subject'}>빔프로젝트 싸게 팔아요</div>
            <div className={'prd-price'}>
              <b>30,000</b>원
            </div>
          </li>
          <li className={'other-item'}>
            <div className={'prd-img'}>
              <img src="https://t1.daumcdn.net/cfile/tistory/160BD90F4B7F846D0C" alt=""/>
            </div>

            <div className={'prd-subject'}>빔프로젝트 싸게 팔아요</div>
            <div className={'prd-price'}>
              <b>30,000</b>원
            </div>
          </li>
          <li className={'other-item'}>
            <div className={'prd-img'}>
              <img src="https://t1.daumcdn.net/cfile/tistory/160BD90F4B7F846D0C" alt=""/>
            </div>

            <div className={'prd-subject'}>빔프로젝트 싸게 팔아요</div>
            <div className={'prd-price'}>
              <b>30,000</b>원
            </div>
          </li>
        </ul>
      </Grid>
    </OtherProducts>
  );
};

export default OtherProduct;

const OtherProducts = styled.article`
  .all-btn {
    border: 0;
    font-size: 12px;
    cursor: pointer;
    color: var(--sub-font-color);
    background: none;
  }
  
  .other-list {
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
  }
  
  .other-item {
    cursor: pointer;
    width: calc(50% - 20px);
    margin: 10px;
    
    .prd-img {
      overflow: hidden;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .prd-subject {
      font-size: 13px;
      margin-bottom: 3px;
    }

    .prd-price {
      font-size: 13px;
    }
  }
`
