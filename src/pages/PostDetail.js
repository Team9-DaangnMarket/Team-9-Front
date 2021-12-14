import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {comma, getScrollHeight, copyUrlToClip} from '../shared/util'

import {Grid, Button} from '../elements';
import {BiArrowBack, BiHomeAlt, BiDotsVerticalRounded} from 'react-icons/bi';
import {BsShare} from 'react-icons/bs';
import {AiFillHeart} from 'react-icons/ai';
import OtherProduct from '../components/OtherProduct';

const PostDetail = () => {
  console.log('[PostDetail]')
  const topBarRef = useRef(null)
  const [heart, setHeart] = useState(false ? 'on' : '')
  const [opt_modal_open, setOptModal] = useState(false)

  // 디테일 상단바 색상 세팅 함수
  const handleHeaderPaint = () => {
    const topBar = topBarRef.current
    const current = window.pageYOffset
    const scrollHeight = getScrollHeight()
    const max = scrollHeight - document.documentElement.clientHeight
    const percentage = current / max * 100

    topBar.style.backgroundColor = `hsl(0deg 0% 100% / ${percentage * 2.5}%)`
    topBar.style.color = `hsl(0deg 0% ${100 - percentage}%)`
    topBar.style.borderColor = `hsl(0deg 0% 0% / ${percentage * 0.12}%)`
  }

  // 온도별 face image (face-6 최상 -> face-1 최하)
  const setFaceMark = (temp) => {
    if (temp >= 80) {
      return 'face-6'
    } else if (temp < 80 && temp >= 60) {
      return 'face-5'
    } else if (temp < 60 && temp >= 50) {
      return 'face-4'
    } else if (temp < 50 && temp >= 40) {
      return 'face-3'
    } else if (temp < 40 && temp >= 30) {
      return 'face-2'
    } else if (temp < 30) {
      return 'face-1'

    }
  }

  const handleClickLikeBtn = () => {
    const onState = heart ? '' : 'on'
    setHeart(onState)
  }

  const handleClickCopyUrl = () => {
    copyUrlToClip()
    alert('링크가 복사되었습니다.')
  }

  const handleOpenOtpModal = (e) => {
    setOptModal(true)
  }

  const handleClickRemoveBtn = (e) => {
    e.stopPropagation()
    setOptModal(false)
  }

  const handleClickModifyBtn = (e) => {
    e.stopPropagation()
    setOptModal(false)
  }

  const handleCloseOptModal = (e) => {
    if (e.target.classList.value === 'opt-btn' || e.target.classList.value === 'more-icon') {
      return
    }

    setOptModal(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleHeaderPaint)
    window.addEventListener('click', handleCloseOptModal)

    return () => {
      window.removeEventListener('scroll', handleHeaderPaint)
      window.addEventListener('click', handleCloseOptModal)
    }
  }, [])

  return (
      <DetailWrap>
        <nav className={'detail-nav'} ref={topBarRef}>
          <Grid is_container _className={'nav-btns'}>
            <div className={'devider'}>
              <button type={'button'} className={'back-btn'}>
                <BiArrowBack/>
              </button>
              <button type={'button'}>
                <BiHomeAlt/>
              </button>
            </div>

            <div className={'devider'}>
              <button type={'button'} className={'share-btn'} onClick={handleClickCopyUrl}>
                <BsShare/>
              </button>
              <button type={'button'} className={'more-btn'} onClick={handleOpenOtpModal}>
                <BiDotsVerticalRounded className={'more-icon'}/>
                {
                    opt_modal_open
                    && (
                        <div className={`opt-modal`}>
                          <div type={'button'} className={'opt-btn'} onClick={handleClickModifyBtn}>수정</div>
                          <div type={'button'} className={'opt-btn'} onClick={handleClickRemoveBtn}>삭제</div>
                        </div>
                    )
                }
              </button>
            </div>
          </Grid>
        </nav>

        <div className={'detail-cont'}>
          <Grid is_container>
            <div className={'prd-img'}>
              <div className={'ratio-box'}>
                <img
                    src={'https://t1.daumcdn.net/cfile/tistory/160BD90F4B7F846D0C'}
                    alt={''}
                />
              </div>
            </div>
          </Grid>

          <Grid is_container padding={'0 16px'}>
            <div className={'user-box'}>
              <div className={'user-profile'}>
                <img
                    className={'user-img'}
                    src={
                      'https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_80-7e50c459a71e0e88c474406a45bbbdce8a3bf2ed4f2efcae59a064e39ea9ff30.png'
                    }
                    alt={''}
                />
                <div className={'user-info'}>
                  <div className={'user-name'}>username</div>
                  <div className={'user-area'}>서초동</div>
                </div>
              </div>

              <div className={'user-rating'}>
                <div className={`rating-temp ${setFaceMark(50.5)}`}>
                  <span className={'rating-num'}>50.5 °C</span>
                  <span className={'rating-icon'}></span>
                </div>
                <div className={'rating-guide'}>매너온도</div>
              </div>
            </div>
          </Grid>

          <Grid is_container padding={'16px'}>
            <div className={'cont-title'}>
              <h2 className={'subject'}>LG 24인치 Full HD 모니터 판매</h2>
              <span className={'category'}>생활가전</span>
              <span className={'datetime'}>2021-12-13</span>
            </div>
            <div className={'cont-desc'}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
              asperiores debitis delectus eveniet excepturi, iste magni quidem
              quod vel. Aliquid aspernatur, commodi cumque deleniti dolor illo
              ipsam ipsum molestiae nemo nostrum quo sequi, tempore temporibus
              ullam vero. Aliquam aut consectetur consequatur cumque, deleniti,
              est ipsum molestiae nemo saepe, sapiente sequi suscipit! Deleniti
              error eum ex excepturi facere laudantium magni perspiciatis
              praesentium sed tenetur? Ab autem beatae culpa cupiditate deserunt
              dolores et fugit, illum impedit minima nihil non numquam omnis optio
              pariatur praesentium repellat repellendus rerum sequi suscipit vitae
              voluptate voluptates. Accusantium dicta error eum nisi possimus quia
              similique velit vitae?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
              asperiores debitis delectus eveniet excepturi, iste magni quidem
              quod vel. Aliquid aspernatur, commodi cumque deleniti dolor illo
              ipsam ipsum molestiae nemo nostrum quo sequi, tempore temporibus
              ullam vero. Aliquam aut consectetur consequatur cumque, deleniti,
              est ipsum molestiae nemo saepe, sapiente sequi suscipit! Deleniti
              error eum ex excepturi facere laudantium magni perspiciatis
              praesentium sed tenetur? Ab autem beatae culpa cupiditate deserunt
              dolores et fugit, illum impedit minima nihil non numquam omnis optio
              pariatur praesentium repellat repellendus rerum sequi suscipit vitae
              voluptate voluptates. Accusantium dicta error eum nisi possimus quia
              similique velit vitae?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
              asperiores debitis delectus eveniet excepturi, iste magni quidem
              quod vel. Aliquid aspernatur, commodi cumque deleniti dolor illo
              ipsam ipsum molestiae nemo nostrum quo sequi, tempore temporibus
              ullam vero. Aliquam aut consectetur consequatur cumque, deleniti,
              est ipsum molestiae nemo saepe, sapiente sequi suscipit! Deleniti
              error eum ex excepturi facere laudantium magni perspiciatis
              praesentium sed tenetur? Ab autem beatae culpa cupiditate deserunt
              dolores et fugit, illum impedit minima nihil non numquam omnis optio
              pariatur praesentium repellat repellendus rerum sequi suscipit vitae
              voluptate voluptates. Accusantium dicta error eum nisi possimus quia
              similique velit vitae?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
              asperiores debitis delectus eveniet excepturi, iste magni quidem
              quod vel. Aliquid aspernatur, commodi cumque deleniti dolor illo
              ipsam ipsum molestiae nemo nostrum quo sequi, tempore temporibus
              ullam vero. Aliquam aut consectetur consequatur cumque, deleniti,
              est ipsum molestiae nemo saepe, sapiente sequi suscipit! Deleniti
              error eum ex excepturi facere laudantium magni perspiciatis
              praesentium sed tenetur? Ab autem beatae culpa cupiditate deserunt
              dolores et fugit, illum impedit minima nihil non numquam omnis optio
              pariatur praesentium repellat repellendus rerum sequi suscipit vitae
              voluptate voluptates. Accusantium dicta error eum nisi possimus quia
              similique velit vitae?
            </div>
          </Grid>

          <Grid is_container padding={'16px'}>
            <div className={'veiws-count'}>관심1 · 조회 22</div>
            <button type={'button'} className={'singo-btn'}>
              이 게시글 신고하기
            </button>
          </Grid>
        </div>

        <div className={'detail-ctrl'}>
          <Grid
              is_container
              is_flex
              flex_justify={'space-between'}
              flex_align={'center'}
              _className={'ctrl-inner'}
              padding={'16px'}
          >
            <button type={'button'} className={`like-btn ${heart}`} onClick={handleClickLikeBtn}>
              <AiFillHeart/>
            </button>

            <div className={'price-opt'}>
              <strong className={'price'}>{comma(60000)}원</strong>
              <button type={'button'} className={'nego-btn'}>
                가격 제안하기
              </button>
            </div>

            <Button version={'orange'} _className={'chat-btn'}>
              채팅으로 거래하기
            </Button>
          </Grid>
        </div>

        <OtherProduct/>
      </DetailWrap>
  );
};

export default PostDetail;

const DetailWrap = styled.section`
  padding-bottom: 100px;

  .detail-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    z-index: 9999;
    border-bottom: 1px solid hsl(0deg 0% 0% / 0%);;
    background-color: hsl(0deg 0% 100% / 0%);
    color: hsl(0deg 0% 100%);
  }

  .nav-btns {
    display: flex;
    justify-content: space-between;

    .devider {
      display: flex;
    }

    button {
      color: inherit;
      cursor: pointer;
      font-size: 20px;
      border: 0;
      background: none;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .back-btn {
      font-size: 22px;
    }

    .share-btn {
      font-size: 17px;
    }

    .more-btn {
      font-size: 26px;
      position: relative;
    }
  }

  .opt-modal {
    position: absolute;
    border-radius: 6px;
    top: 50%;
    right: 50%;
    background-color: #fff;
    border: 1px solid var(--border-color);
    box-shadow: 0 0 12px rgba(0, 0, 0, .3);
    display: block;

    .opt-btn {
      width: auto;
      height: auto;
      word-break: keep-all;
      padding: 10px 24px;
      font-size: 13px;
      color: var(--main-font-color);
      border-bottom: 1px solid var(--border-color);

      &:last-child {
        border-bottom: 0;
      }

      &:hover {
        background-color: #efefef;
      }
    }
  }

  .veiws-count {
    font-size: 11px;
    color: var(--sub-font-color);
    margin-bottom: 16px;
  }

  .singo-btn {
    cursor: pointer;
    border: 0;
    width: 100%;
    text-align: left;
    font-weight: bold;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    background: none;
    padding: 16px 0;
  }

  .detail-ctrl {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    border-top: 1px solid var(--border-color);
    background-color: #fff;

    .like-btn {
      cursor: pointer;
      border: 0;
      background: none;
      width: 40px;
      height: 40px;
      font-size: 24px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;

      &.on {
        color: red;
      }

      &::after {
        content: '';
        display: block;
        width: 1px;
        height: 80%;
        background-color: #ddd;
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .price-opt {
      display: flex;
      flex-direction: column;

      .price {
        font-weight: bold;
        margin-bottom: 2px;
      }

      .nego-btn {
        cursor: pointer;
        border: 0;
        background: none;
        font-weight: bold;
        text-decoration: underline;
        color: var(--point-color);
      }
    }

    .chat-btn {
      margin-left: auto;
    }
  }

  .detail-cont {
    .prd-img {
      position: relative;
      padding-bottom: 90%;
      overflow: hidden;
      width: 100%;
      max-width: 900px;

      .ratio-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        img {
          object-fit: cover;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .user-box {
    font-size: 13px;
    display: flex;
    padding: 16px 0;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);

    .user-profile {
      display: flex;
      align-items: center;

      .user-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
      }

      .user-info {
        .user-name {
          font-weight: bold;
          margin-bottom: 2px;
        }

        .user-area {
        }
      }
    }

    .user-rating {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;

      .rating-temp {
        display: flex;
        align-items: center;
        margin-bottom: 2px;
        
        &.face-1 {
          .rating-num {
            color: #1c466e;
          }

          .rating-icon {
            background-position: 0 -27px;
          }
        }

        &.face-2 {
          .rating-num {
            color: #577795;
          }

          .rating-icon {
            background-position: 0 -51px;
          }
        }

        &.face-3 {
          .rating-num {
            color: #286eb1;
          }

          .rating-icon {
            background-position: 0 -75px;
          }
        }

        &.face-4 {
          .rating-num {
            color: #3fa551;
          }

          .rating-icon {
            background-position: 0 -99px;
          }
        }

        &.face-5 {
          .rating-num {
            color: #e5a328;
          }

          .rating-icon {
            background-position: 0 -123px;
          }
        }

        &.face-6 {
          .rating-num {
            color: #e16716;
          }

          .rating-icon {
            width: 29px;
            height: 27px;
            background-position: 0 0;
          }
        }
      }

      .rating-num {
        font-size: 16px;
        font-weight: bold;
      }

      .rating-icon {
        margin-left: 5px;
        width: 24px;
        height: 24px;
        background-position: 0 -123px;
        background-size: 29px 147px;
        background-image: url('https://d1unjqcospf8gs.cloudfront.net/assets/home/articles/face-icon-set-0cffc52be32961b0bb4a308c272d8f526ddcdeda66dbde6eb32618eeb22b74e6.png');
      }

      .rating-guide {
        font-size: 11px;
        text-decoration: underline;
        color: var(--sub-font-color);
      }
    }
  }

  .cont-title {
    margin-bottom: 20px;

    .subject {
      font-weight: bold;
    }

    .category,
    .datetime {
      font-size: 11px;
      color: var(--sub-font-color);
    }

    .category {
      margin-right: 10px;
      text-decoration: underline;
    }
  }

  .cont-desc {
    font-size: 14px;
  }
`;
