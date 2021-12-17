import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {axiosInstance} from '../shared/api'
import { actionCreators as searchAction } from '../redux/modules/search'

import {Grid} from '../elements'
import {BiArrowBack} from 'react-icons/bi'
import {FiSearch} from 'react-icons/fi'
import {IoSearchCircleOutline} from 'react-icons/io5'
import SyncLoader from "react-spinners/SyncLoader"
import PostItem from '../components/PostItem'

const SearchList = (props) => {
  const { history } = props
  const dispatch = useDispatch()
  const prevKeyword = useSelector(state => state.search.keyword)
  const searchInputRef = useRef(null)
  const [is_loading, setIsLoading]= useState(false)
  const [search_data, setSearchData] = useState(null)

  const fetchSearchData = async (keyword) => {
    try {
      const res = await axiosInstance.get(`/search?keyword=${keyword}&page=0&size=4`)
      return res.data
    }
    catch (err) {
      console.error('[Error]검색 결과를 표시 할 수 없습니다.')
      return false
    }
  }

  const updateSearchState = async (keyword) => {
    console.log(keyword,'를 검색합니다.')
    const result = await fetchSearchData(keyword)
    setSearchData(result)
    dispatch(searchAction.setKeyword(keyword))
  }

  const handleStartSearch = async (e) => {
    if (is_loading) {
      return
    }

    // 서치 버튼 클릭과 키보드 Enter 동작에서만 API 호출
    if (e.type === 'click' || (e.type === 'keyup' && e.key === 'Enter')) {
      const keyword = searchInputRef.current.value
      if (keyword.length < 2) {
        alert('검색 키워드는 2글자 이상 입력해주세요.')
        return
      }

      setIsLoading(true)
      updateSearchState(keyword)

    }

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    if (prevKeyword) {
      updateSearchState(prevKeyword)
    }
  }, [])

  if (!search_data) {
    return (
        <SearchListWrap>
          <nav className={'list-nav'}>
            <Grid is_container is_flex flex_align={'center'}>
              <button
                  type={'button'}
                  className={'back-btn'}
                  onClick={() => history.goBack()}
              >
                <BiArrowBack/>
              </button>

              <div className={'search-bar'}>
                <FiSearch className={'search-icon'} onClick={handleStartSearch}/>
                <input type="text" className={'search-input'} placeholder={'중고 물품을 검색해 보세요.'} ref={searchInputRef} onKeyUp={handleStartSearch}/>
              </div>
            </Grid>
          </nav>

          <Grid is_container _className={'default-display'}>
            <IoSearchCircleOutline/>
            검색어를 입력해주세요 :)
          </Grid>
        </SearchListWrap>
    )
  }

  return (
      <SearchListWrap>
        <nav className={'list-nav'}>
          <Grid is_container is_flex flex_align={'center'}>
            <button
                type={'button'}
                className={'back-btn'}
                onClick={() => history.goBack()}
            >
              <BiArrowBack/>
            </button>

            <div className={'search-bar'}>
              <FiSearch className={'search-icon'} onClick={handleStartSearch}/>
              <input type="text" className={'search-input'} placeholder={'중고 물품을 검색해 보세요.'} ref={searchInputRef} onKeyUp={handleStartSearch}/>
            </div>
          </Grid>
        </nav>

        <Grid is_container>


          <div className={'search-result'}>
            {
              !is_loading && !search_data.length && (
                  <div className={'empty-result'}>아쉽지만 찾으시는 중고 물건이 없어요 :(</div>
                )
            }
            {
              is_loading &&
                <div className={'spinner-box'}>
                  <p>..물건 찾는중..</p>
                  <SyncLoader size={12} color={'var(--point-color); opacity: 0.5;'} />
                </div>
            }
            {
              !is_loading && search_data.map((post, idx) => {
               return <PostItem post={post} key={`result-item-${idx}`}/>
              })
            }
          </div>
        </Grid>
      </SearchListWrap>
  );
};

export default SearchList;

const SearchListWrap = styled.section`
  padding-top: 56px;
  
  .spinner-box {
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    p {
      color: #999;
      margin-bottom: 30px;
    }
  }

  .list-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid var(--border-color);
    z-index: 9999;

    .back-btn {
      border: 0;
      background: none;
      width: 50px;
      height: 50px;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .search-bar {
    flex: 1;
    position: relative;
    
    .search-icon { 
      cursor: pointer;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
    
    .search-input {
      border: 0;
      width: 100%;
      outline: none;
      padding: 10px;
      padding-right: 40px;
      border-radius: 6px;
      background-color: #F2F3F7;
    }
  }
  
  .default-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    
    svg {
      font-size: 36px;
      margin-bottom: 20px;
    }
  }
  
  .empty-result {
    padding-top: 40px;
    text-align: center;
  }

`