import React from 'react';
import styled, {keyframes} from 'styled-components'
import './skeleton.css'

import { AiFillHeart } from 'react-icons/ai'

const Skeleton = (props) => {
  const {version} = props

  if (version === 'post-item') {
    return (
        <PostSkeleton>
          <div className={'item-top'}>
            <div className={'item-img wave'}></div>
            <div className={'item-detail'}>
              <strong className={'subject wave'}></strong>
              <span className={'area wave'}></span>
              <span className={'price wave'}></span>
            </div>
            <div className={'opt-group'}>
              <AiFillHeart className={'heart-btn'}/>
            </div>
          </div>
          <div className={'item-bottom'}>
            <div className={'icon-box wave'}></div>
            <div className={'icon-box wave'}></div>
          </div>
        </PostSkeleton>
    )
  }

  return null
};

export default Skeleton;

const PostSkeleton = styled.li`
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
    }

    .item-detail {
      display: flex;
      flex-direction: column;
      padding: 3px;
      cursor: pointer;
      flex: 1;

      .subject {
        margin-bottom: 5px;
        max-width: 70%;
        height: 15px;
      }

      .area {
        margin-bottom: 8px;
        height: 13px;
        width: 60px;
      }

      .price {
        margin-bottom: 8px;
        height: 13px;
        width: 60px;
      }
    }

    .opt-group {
      padding-top: 3px;
      padding-right: 3px;

      .heart-btn {
        font-size: 20px;
        color: #f2f2f2;
      }
    }
  }

  .item-bottom {
    display: flex;
    justify-content: flex-end;

    .icon-box {
      margin-left: 10px;
      height: 13px;
      width: 40px;
    }
  }
`
