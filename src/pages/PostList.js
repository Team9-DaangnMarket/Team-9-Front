import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PostItem from '../components/PostItem'
import { axiosInstance } from '../shared/api'

import { Grid, Button } from '../elements'
import { TiHome } from 'react-icons/ti'
import { BiReceipt } from 'react-icons/bi'
import { RiWechatLine } from 'react-icons/ri'
import { FiUser } from 'react-icons/fi'
import { MdOutlineMenu } from 'react-icons/md'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BsPlusLg } from 'react-icons/bs'
import {
  HiOutlineLocationMarker,
  HiOutlineSearch,
  HiOutlineBell,
} from 'react-icons/hi'

import Skeleton from '../components/skeleton/Skeleton'

import { useHistory } from 'react-router-dom'

const PostList = (props) => {
  const history = useHistory()

  const [listData, setListData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // 스켈레톤 로딩 테스트 코드
  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get('http://15.164.171.227/posts?page=0&size=100')
      .then((res) => {
        setListData(res.data)
      })

    setTimeout(() => setIsLoading(false), 2000)
  }, [])

  return (
    <div>
      <MenuTop>
        <Grid is_container>
          <div className='nav-top-bx'>
            <h2>
              동동동
              <MdOutlineKeyboardArrowDown className='arrow-down' />
            </h2>
            <Grid is_container _className='top-btns'>
              <button>
                <HiOutlineSearch />
              </button>

              <button>
                <MdOutlineMenu />
              </button>

              <button>
                <HiOutlineBell />
              </button>
            </Grid>
          </div>
        </Grid>
      </MenuTop>

      <PostListBx>
        <Grid is_container _className='parent-position'>
          <Button
            _className='plus-btn'
            _onClick={() => {
              history.push('/write')
            }}
          >
            <BsPlusLg />
          </Button>
          {isLoading
            ? listData.map((item, idx) => {
                return <Skeleton version={'post-item'} key={`skel-id-${idx}`} />
              })
            : listData.map((item, idx) => {
                return <PostItem post={item} key={`post-id-${idx}`} />
              })}
        </Grid>
      </PostListBx>

      <MenuBottom>
        <Grid _className='btn-bx' is_container>
          <button type='button' className='btns'>
            <TiHome />
          </button>
          <button type='button' className='btns'>
            <BiReceipt />
          </button>
          <button type='button' className='btns'>
            <HiOutlineLocationMarker />
          </button>
          <button type='button' className='btns'>
            <RiWechatLine />
          </button>
          <button type='button' className='btns'>
            <FiUser />
          </button>
        </Grid>
      </MenuBottom>
    </div>
  )
}

const MenuTop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  /* height: 40px; */
  border-bottom: 1px solid var(--border-color);
  background: #fff;

  .nav-top-bx {
    display: flex;
    align-items: center;

    h2 {
      width: 100%;
      font-size: 20px;
      cursor: pointer;
    }

    .arrow-down {
      vertical-align: middle;
    }
  }

  .top-btns {
    display: flex;
    justify-content: flex-end;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      font-size: 24px;
      cursor: pointer;
    }
  }
`
const PostListBx = styled.div`
  margin: 42px 0;
  .parent-position {
    position: relative;
  }
  .plus-btn {
    position: fixed;
    top: calc(93.67vh + -67.50999999999999px);
    right: calc(49.83vw + -201.79px);
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: var(--point-color);
    color: #fff;
    font-size: 20px;
  }
`

const MenuBottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  border-top: 1px solid var(--border-color);
  background-color: #fff;

  .btn-bx {
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 24px;
    border: none;
    background: none;
  }
`
export default PostList
