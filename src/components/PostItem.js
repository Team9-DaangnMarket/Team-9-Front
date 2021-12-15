import React, { useState } from 'react'
import styled from 'styled-components'
import { comma } from '../shared/util'
import { useLocation } from 'react-router-dom'
import { history } from '../redux/configureStore'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IoChatbubblesOutline } from 'react-icons/io5'

const PostItem = () => {
  const location = useLocation()
  const { pathname } = location
  const [heart_on, setHeartOn] = useState(false)

  const handleClickHeart = () => {
    setHeartOn(!heart_on)
  }

  const handleClickGoDetail = () => {
    history.push('detail')
  }

  return (
    <ItemBox>
      <div className={'item-top'}>
        <div className={'item-img'} onClick={handleClickGoDetail}>
          <img
            src='https://t1.daumcdn.net/cfile/tistory/160BD90F4B7F846D0C'
            alt=''
          />
        </div>
        <div className={'item-detail'} onClick={handleClickGoDetail}>
          <strong className={'subject'}>
            반석 로잉머신반석 로잉머신반석 로잉머신반석 로잉머신반석
            로잉머신반석 로잉머신반석 로잉머신
          </strong>
          <span className={'area'}>서초동</span>
          <span className={'price'}>{comma(60000)}원</span>
        </div>
        {pathname === '/likelist' && (
          <div className={'opt-group'}>
            <AiFillHeart
              className={`heart-btn ${heart_on ? 'on' : ''}`}
              onClick={handleClickHeart}
            />
          </div>
        )}
      </div>
      <div className={'item-bottom'}>
        <div className={'icon-box'}>
          <IoChatbubblesOutline />
          <span>1</span>
        </div>
        <div className={'icon-box'}>
          <AiOutlineHeart />
          <span>1</span>
        </div>
      </div>
    </ItemBox>
  )
}

export default PostItem

const ItemBox = styled.li`
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);

  .item-top {
    display: flex;

    .item-img {
      width: 90px;
      height: 90px;
      position: relative;
      overflow: hidden;
      border-radius: 6px;
      margin-right: 10px;
      flex-shrink: 0;
      cursor: pointer;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 100%;
        transform: translate(-50%, -50%);
      }
    }

    .item-detail {
      display: flex;
      flex-direction: column;
      padding: 3px;
      cursor: pointer;

      .subject {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 5px;
        width: 85%;
      }

      .area {
        color: var(--sub-font-color);
        font-size: 11px;
        margin-bottom: 8px;
      }

      .price {
        font-size: 13px;
        font-weight: bold;
      }
    }

    .opt-group {
      padding-top: 3px;
      padding-right: 3px;

      .heart-btn {
        cursor: pointer;
        color: #ccc;
        font-size: 22px;

        &.on {
          color: var(--point-color);
        }
      }
    }
  }

  .item-bottom {
    display: flex;
    justify-content: flex-end;

    .icon-box {
      color: var(--sub-font-color);
      display: flex;
      font-size: 14px;
      align-items: center;
      margin-left: 10px;

      span {
        font-size: 13px;
        margin-left: 3px;
      }
    }
  }
`
