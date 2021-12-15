import React from 'react';
import styled from 'styled-components'
import {comma} from '../shared/util'
import {history} from '../redux/configureStore'

import {Grid, Button} from '../elements';

const OtherPost = ({other_list, title_show}) => {
  console.log('[OtherProduct]')

  if (!other_list) {
    return null
  }

  const handleClickDetailLink = (post_id) => {
    history.push(`/detail/${post_id}`)
  }

  return (
      <OtherList>
        {
            title_show
            && (
                <Grid is_container is_flex flex_justify={'space-between'} flex_align={'flex-end'} padding={'16px'}>
                  <h3 className={'title'}>하루살이님의 판매상품</h3>
                  <button type={'button'} className={'all-btn'}>모두보기</button>
                </Grid>
            )
        }

        <Grid is_container padding={'16px'}>
          <ul className={'other-list'}>
            {
              other_list.map((item, idx) => {
                return (
                    <li key={`other-id-${idx}`} className={'other-item'}
                        onClick={() => handleClickDetailLink(item.postId)}>
                      <div className={'prd-img'}>
                        <img src={item.goodsImg} alt=""/>
                      </div>

                      <div className={'prd-subject'}>{item.title}</div>
                      <div className={'prd-price'}>
                        <b>{comma(item?.price)}</b>원
                      </div>
                    </li>
                )
              })
            }

          </ul>
        </Grid>
      </OtherList>
  );
};

export default OtherPost;

const OtherList = styled.article`
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
      height: 120px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .prd-subject {
      font-size: 13px;
      margin-bottom: 3px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .prd-price {
      font-size: 13px;
    }
  }
`
