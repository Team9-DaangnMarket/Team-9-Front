import React, { useState } from 'react'
import { Grid, Button, Input } from '../elements'
import styled from 'styled-components'
import { GoSettings } from 'react-icons/go'
import { MdOutlinePostAdd } from 'react-icons/md'
import { BiArrowBack } from 'react-icons/bi'

const PostWrite = () => {
  const [price, setPrice] = useState()

  const priceOnChange = (e) => {
    setPrice(e.target.value)
  }

  return (
    <>
      <WriteBox>
        <Grid is_container>
          <Grid
            is_flex
            flex_align='center;'
            flex_justify='space-between;'
            _className='title'
          >
            <p>
              <BiArrowBack />
            </p>
            <h3>중고거래 글쓰기</h3>
            <Button _className='btn'>완료</Button>
          </Grid>
          <UploadBox>
            <input type='file' />
          </UploadBox>
          <Grid>
            <Input
              placeholder='글 제목'
              _onChange={priceOnChange}
              value={price}
            />
          </Grid>
          <SelectBox>
            <select>
              <option>디지털기기</option>
              <option>생활가전</option>
              <option>가구/인테리어</option>
              <option>유아동</option>
              <option>생활/가공식품</option>
              <option>유아도서</option>
              <option>여성잡화</option>
              <option>여성의류</option>
              <option>남성패션/잡화</option>
              <option>게임/취미</option>
              <option>뷰티/미용</option>
              <option>반려동물용품</option>
              <option>도서/티켓/음반</option>
              <option>식물</option>
              <option>기타 중고물품</option>
              <option>삽니다</option>
            </select>
          </SelectBox>
          <Grid is_flex>
            <Input placeholder='\ 가격 (선택사항)' _className='price' />
            <Grid _className='price-checkbox'>
              <label className='control control--checkbox'>
                가격 제안받기
                <input type='checkbox' />
                <div className='control__indicator'></div>
              </label>
            </Grid>
          </Grid>
          <textarea
            cols='20'
            rows='30'
            className='textarea'
            type='textarea'
            placeholder='자양동에 올릴 게시글 내용을 작성해주세요.(가품 및 판매금지품목은 게시가 제한될 수 있어요.)'
          />
          <Grid is_flex flex_align='center;' _className='setting-icons'>
            <span>
              <MdOutlinePostAdd />
            </span>
            <h5>자주 쓰는 문구</h5>
            <span>
              <GoSettings />
            </span>
            <h5>보여줄 동네 설정</h5>
          </Grid>
        </Grid>
      </WriteBox>
    </>
  )
}

export default PostWrite

const WriteBox = styled.div`
  padding: 30px 0 50px 0;
  input {
    border: 1px solid var(--border-color);
    border-right: 0;
    border-left: 0;
    padding: 10px 5px;
    height: 60px;
    outline: 0;
  }
  .btn {
    width: 40px;
    background-color: transparent;
    border: 0;
    outline: 0;

    &:hover,
    &:focus {
      color: var(--point-color);
    }
  }

  /* 가격 */
  .price {
    width: 300px;
  }

  .price-checkbox {
    .control {
      display: block;
      position: relative;
      padding-left: 25px;
      margin-top: 25px;
      font-size: 13px;
      font-weight: normal;
      color: var(--sub-font-color);
      cursor: pointer;
    }
    .control input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
    .control__indicator {
      position: absolute;
      top: 0;
      left: 0;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background: #e6e6e6;
    }

    .control__indicator:after {
      content: '';
      position: absolute;
      display: none;
    }

    .control input:checked ~ .control__indicator {
      background-color: var(--point-color);
    }
    .control input:checked {
      color: var(--main-font-color);
    }

    .control--checkbox .control__indicator:after {
      left: 7px;
      top: 3px;
      width: 3px;
      height: 8px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .control input:checked ~ .control__indicator:after {
      display: block;
    }
  }

  /* 컨텐츠 시작 */
  .textarea {
    width: 100%;
    height: 300px;
    max-height: 300px;
    padding: 1em 0.5em;
    margin: 1em 0;
    border: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'NanumSquareRound', serif;
  }

  .setting-icons {
    border-top: 1px solid var(--border-color);
    padding: 15px 10px;
    cursor: pointer;

    span {
      margin-right: 10px;
    }

    h5 {
      margin-right: 30px;
    }
  }
`

// 상품 사진 업로드
const UploadBox = styled.div`
  margin: 30px 0;
`

//select 카테고리
const SelectBox = styled.div`
  select {
    width: 100%;
    height: 50px;
    border: 1px solid var(--border-color);
    border-right: 0;
    border-left: 0;
    outline: 0;
    font-family: 'NanumSquareRound', serif;
  }
`
