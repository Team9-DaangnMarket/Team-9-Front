import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import PostItem from '../components/PostItem'

import {Grid} from '../elements'

import {TiHome} from 'react-icons/ti'
import {BiReceipt} from 'react-icons/bi'
import {RiWechatLine} from 'react-icons/ri'
import {FiUser} from 'react-icons/fi'
import {MdOutlineMenu} from 'react-icons/md'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {
  HiOutlineLocationMarker,
  HiOutlineSearch,
  HiOutlineBell,
} from 'react-icons/hi'

import Skeleton from '../components/skeleton/Skeleton'

import {axiosInstance} from '../shared/api'

const PostList = (props) => {
  const list = [
    {
      postId: 26,
      username: 'aaazz11',
      nickname: 'zxcv',
      title: '4번째 내꺼',
      price: 12345,
      goodsImg: 'asdfqwer',
      postLikes: 2,
    },
    {
      postId: 25,
      username: 'aaaa',
      nickname: 'babooo',
      title: '시간형식체크2',
      price: 12345,
      goodsImg: 'asdfqwer',
      postLikes: 0,
    },
  ]
  // const apiTest = async () => {
  //   const res = await axiosInstance.get(
  //       'http://15.164.171.227/posts?page=0&size=2'
  //   )
  //   console.log('로그인 성공', res)
  // }
  // apiTest()

  const [listData, setListData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // 스켈레톤 로딩 테스트 코드
  useEffect(() => {
    setIsLoading(true)
    setListData(list);
    setTimeout(() => setIsLoading(false), 2500);
  }, [])
  const [_post, set_Post] = useState()

  useEffect(() => {
    axiosInstance
      .get('http://15.164.171.227/posts?page=0&size=20')
      .then((res) => {
        set_Post(res.data)
      })
  }, [])
  return (
      <div>
        <MenuTop>
          <Grid is_container>
            <div className='nav-top-bx'>
              <h2>
                동동동
                <MdOutlineKeyboardArrowDown className='arrow-down'/>
              </h2>
              <Grid is_container _className='top-btns'>
                <button>
                  <HiOutlineSearch/>
                </button>

                <button>
                  <MdOutlineMenu/>
                </button>

                <button>
                  <HiOutlineBell/>
                </button>
              </Grid>
            </div>
          </Grid>
        </MenuTop>

        <PostListBx>
          <Grid is_container>
            {
              isLoading
                ? listData.map((item, idx) => {
                    return <Skeleton version={'post-item'} key={`skel-id-${idx}`}/>
                  })
                : listData.map((item, idx) => {
                    return <PostItem list={item}  key={`post-id-${idx}`}/>
                  })
            }
          </Grid>
        </PostListBx>

        <MenuBottom>
          <Grid _className='btn-bx' is_container>
            <button type='button' className='btns'>
              <TiHome/>
            </button>
            <button type='button' className='btns'>
              <BiReceipt/>
            </button>
            <button type='button' className='btns'>
              <HiOutlineLocationMarker/>
            </button>
            <button type='button' className='btns'>
              <RiWechatLine/>
            </button>
            <button type='button' className='btns'>
              <FiUser/>
            </button>
          </Grid>
        </MenuBottom>
      </div>
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
        <Grid is_container>
          {_post &&
            _post.map((a, b) => {
              return <PostItem list={a} key={a.postId}></PostItem>
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
