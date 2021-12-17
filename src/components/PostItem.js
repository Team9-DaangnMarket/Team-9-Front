import React, { useState } from 'react'
import styled from 'styled-components'
import { comma } from '../shared/util'
import { useLocation } from 'react-router-dom'
import { history } from '../redux/configureStore'
import { axiosInstance } from '../shared/api'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IoChatbubblesOutline } from 'react-icons/io5'

const NO_IMG = 'https://www.i-shop.link/home/assets/images/no-image.png'

const PostItem = (props) => {
  const location = useLocation()
  const { pathname } = location
  const [heart_on, setHeartOn] = useState(props.post.likeCheck)

  const handleClickHeart = async () => {
    try {
      const res = await axiosInstance.post(`/postLike/${props.post.postId}`)
      console.log('찜하기 API 결과', res)
      window.location.reload()
    } catch (err) {
      alert('알수없는 이유로 기능을 사용할 수 없습니다 :(')
    }

    setHeartOn(!heart_on)
  }

  const handleClickGoDetail = () => {
    history.push(`/detail/${props.post.postId}`)
  }

  return (
    <ItemBox>
      <div className={'item-top'}>
        <div className={'item-img'} onClick={handleClickGoDetail}>
          <img
            src={props.post.goodsImg}
            alt=''
            onError={(e) => (e.target.src = NO_IMG)}
          />
        </div>
        <div className={'item-detail'} onClick={handleClickGoDetail}>
          <strong className={'subject'}>{props.post.title}</strong>
          <span className={'area'}>동네정보없음</span>
          <span className={'price'}>{comma(`${props.post.price}`)}원</span>
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
          <span>0</span>
        </div>
        <div className={'icon-box'}>
          <AiOutlineHeart />
          <span>{props.post.postLikes}</span>
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
        width: 100%;
        height: 100%;
        object-fit: cover;
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
      flex: 1;

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
