import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom'
import styled from 'styled-components';
import {comma, getScrollHeight, copyUrlToClip} from '../shared/util'
import {axiosInstance} from '../shared/api'
import {getCookie} from '../shared/Cookie'

import {Grid, Button} from '../elements';
import {BiArrowBack, BiHomeAlt, BiDotsVerticalRounded} from 'react-icons/bi';
import {BsShare} from 'react-icons/bs';
import {AiFillHeart} from 'react-icons/ai';
import OtherPost from '../components/OtherPost';

const NO_IMG = 'https://www.i-shop.link/home/assets/images/no-image.png'

const PostDetail = ({history}) => {
  const is_login = getCookie('id')
  const params = useParams()
  const topBarRef = useRef(null)
  const [heart, setHeart] = useState(true)
  const [opt_modal_open, setOptModal] = useState(false)
  const [detail_data, setDetailData] = useState(null)
  const [alt_data, setAltData] = useState(null)
  const [cnt_value, setCntValue] = useState({like: 0, visit: 0})

  // 디테일 상단바 색상 세팅 함수
  const handleHeaderPaint = () => {
    const topBar = topBarRef?.current;

    if (!topBar) {
      return;
    }

    const current = window.pageYOffset;
    const scrollHeight = getScrollHeight();
    const max = scrollHeight - document.documentElement.clientHeight;
    const percentage = (current / max) * 100;

    topBar.style.backgroundColor = `hsl(0deg 0% 100% / ${percentage * 2.5}%)`;
    topBar.style.color = `hsl(0deg 0% ${100 - percentage}%)`;
    topBar.style.borderColor = `hsl(0deg 0% 0% / ${percentage * 0.12}%)`;
  };

  // 온도별 face image (face-6 최상 -> face-1 최하)
  const setFaceMark = (temp) => {
    if (temp >= 80) {
      return "face-6";
    } else if (temp < 80 && temp >= 60) {
      return "face-5";
    } else if (temp < 60 && temp >= 50) {
      return "face-4";
    } else if (temp < 50 && temp >= 40) {
      return "face-3";
    } else if (temp < 40 && temp >= 30) {
      return "face-2";
    } else if (temp < 30) {
      return "face-1";
    }
  };

  const handleClickLikeBtn = async (post_id) => {
    try {
      const res = await axiosInstance.post(`/postLike/${post_id}`);
      // console.log("찜하기 API 결과", res);
    } catch (err) {
      alert("알수없는 이유로 기능을 사용할 수 없습니다 :(");
    }

    if (heart) {
      setHeart(false)
      setCntValue({
        ...cnt_value,
        like: cnt_value.like - 1
      })
    } else {
      setHeart(true)
      setCntValue({
        ...cnt_value,
        like: cnt_value.like + 1
      })
    }
  }


  const handleClickCopyUrl = () => {
    copyUrlToClip();
    alert("링크가 복사되었습니다.");
  };

  const handleOpenOtpModal = (e) => {
    setOptModal(true);
  };

  const sendDeletePost = async (post_id) => {
    const delete_confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (delete_confirm) {
      try {
        const res = await axiosInstance.delete(`/posts/${post_id}`);
        // console.log("데이터 삭제 성공", res);
        window.location.href = "/";
      } catch (err) {
        alert("삭제 할 수 없습니다 :(");
        console.log("데이터 삭제 실패", err.response);
      }
    }
  };

  const handleClickRemoveBtn = (post_id) => {
    sendDeletePost(post_id);
    setOptModal(false);
  };

  const handleClickModifyBtn = (post_id) => {
    setOptModal(false);
    history.push(`/write/${post_id}`);
  };

  const handleCloseOptModal = (e) => {
    if (
        e.target.classList.value === "opt-btn" ||
        e.target.classList.value === "more-icon"
    ) {
      return;
    }

    setOptModal(false);
  };

  const fetchDetailData = async () => {
    try {
      const res = await axiosInstance.get(`/posts/${params.post_id}`)
      setDetailData(res.data)

      const isLiked = res.data.likeCheck
      setHeart(isLiked)
      setCntValue({
        like: res.data.postLike,
        visit: res.data.visitCount
      })
      // console.log('상세 데이터 조회 성공', res)
    } catch (err) {
      setDetailData(null);
      console.log("상세 데이터 조회 실패", err.response);
    }
  };

  const fetchAltData = async () => {
    try {
      const res = await axiosInstance.get(`/posts?page=0&size=6`);
      // console.log("대체 데이터 조회 성공", res);
      setAltData(res.data);
    } catch (err) {
      setAltData(null);
      console.log("대체 데이터 조회 실패", err.response);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleHeaderPaint);
    window.addEventListener("click", handleCloseOptModal);

    return () => {
      window.removeEventListener("scroll", handleHeaderPaint);
      window.addEventListener("click", handleCloseOptModal);
    };
  }, []);

  useEffect(() => {
    fetchDetailData();
    fetchAltData();
  }, [params]);

  if (!detail_data) {
    return (
        <DetailWrap>
          <nav className={"detail-nav off"} ref={topBarRef}>
            <Grid
                is_container
                is_flex
                flex_justify={"space-between"}
                _className={"nav-btns"}
            >
              <button
                  type={"button"}
                  className={"back-btn"}
                  onClick={() => (window.location.href = "/")}
              >
                <BiArrowBack/>
              </button>
              <button
                  type={"button"}
                  onClick={() => (window.location.href = "/")}
              >
                <BiHomeAlt/>
              </button>
            </Grid>
          </nav>

          <div className={"not-exist-post"}>
            <Grid is_container>
              <div className={"guide-txt"}>존재하지 않는 상품이에요 :(</div>

              <h2 className={"alt-title"}>새로 올라온 중고</h2>
              <ul className={"alt-list"}>
                <OtherPost other_list={alt_data} title_show={false}/>
              </ul>
            </Grid>
          </div>
        </DetailWrap>
    );
  }

  return (
      <DetailWrap>
        <nav className={"detail-nav"} ref={topBarRef}>
          <Grid is_container _className={"nav-btns"}>
            <div className={"devider"}>
              <button
                  type={"button"}
                  className={"back-btn"}
                  onClick={() => (window.location.href = "/")}
              >
                <BiArrowBack/>
              </button>
              <button
                  type={"button"}
                  onClick={() => (window.location.href = "/")}
              >
                <BiHomeAlt/>
              </button>
            </div>

            <div className={"devider"}>
              <button
                  type={"button"}
                  className={"share-btn"}
                  onClick={handleClickCopyUrl}
              >
                <BsShare/>
              </button>

              {is_login === detail_data.username && ( // 로그인 아이디와 작성자가 같을 경우
                  <button
                      type={"button"}
                      className={"more-btn"}
                      onClick={handleOpenOtpModal}
                  >
                    <BiDotsVerticalRounded className={"more-icon"}/>
                    {opt_modal_open && (
                        <div className={`opt-modal`}>
                          <div
                              type={"button"}
                              className={"opt-btn"}
                              onClick={() => handleClickModifyBtn(detail_data.postId)}
                          >
                            수정
                          </div>
                          <div
                              type={"button"}
                              className={"opt-btn"}
                              onClick={() => handleClickRemoveBtn(detail_data.postId)}
                          >
                            삭제
                          </div>
                        </div>
                    )}
                  </button>
              )}
            </div>
          </Grid>
        </nav>

        <div className={"detail-cont"}>
          <Grid is_container>
            <div className={"prd-img"}>
              <div className={"ratio-box"}>
                <img
                    src={detail_data.goodsImg}
                    alt={""}
                    onError={(e) => (e.target.src = NO_IMG)}
                />
              </div>
            </div>
          </Grid>

          <Grid is_container padding={"0 16px"}>
            <div className={"user-box"}>
              <div className={"user-profile"}>
                <img
                    className={"user-img"}
                    src={detail_data.profileImg}
                    alt={""}
                />
                <div className={"user-info"}>
                  <div className={"user-name"}>{detail_data.nickname}</div>
                  <div className={"user-area"}>동네정보없음</div>
                </div>
              </div>

              <div className={"user-rating"}>
                <div className={`rating-temp ${setFaceMark(50.5)}`}>
                  <span className={"rating-num"}>50.5 °C</span>
                  <span className={"rating-icon"}></span>
                </div>
                <div className={"rating-guide"}>매너온도</div>
              </div>
            </div>
          </Grid>

          <Grid is_container padding={"16px"}>
            <div className={"cont-title"}>
              <h2 className={"subject"}>{detail_data.title}</h2>
              <span className={"category"}>{detail_data.categoryName}</span>
              <span className={"datetime"}>{detail_data.createdAt}</span>
            </div>
            <div className={"cont-desc"}>{detail_data.content}</div>
          </Grid>

          <Grid is_container padding={'16px'}>
            <div className={'veiws-count'}>관심 {cnt_value.like}· 조회 {cnt_value.visit}</div>
            <button type={'button'} className={'singo-btn'}>
              이 게시글 신고하기
            </button>
          </Grid>

        </div>

        <div className={"detail-ctrl"}>
          <Grid
              is_container
              is_flex
              flex_justify={"space-between"}
              flex_align={"center"}
              _className={"ctrl-inner"}
              padding={"16px"}
          >
            <button
                type={"button"}
                className={`like-btn ${heart ? "on" : ""}`}
                onClick={() => handleClickLikeBtn(detail_data.postId)}
            >
              <AiFillHeart/>
            </button>

            <div className={"price-opt"}>
              <strong className={"price"}>{comma(detail_data.price)}원</strong>
              <button
                  type={"button"}
                  className={`nego-btn ${detail_data.negoCheck ? "on" : ""}`}
              >
                가격 제안하기
              </button>
            </div>

            <Button version={"orange"} _className={"chat-btn"}>
              채팅으로 거래하기
            </Button>
          </Grid>
        </div>

        <OtherPost other_list={detail_data.insideList}/>
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
    border-bottom: 1px solid hsl(0deg 0% 0% / 0%);
    background-color: hsl(0deg 0% 100% / 0%);
    color: hsl(0deg 0% 100%);

    &.off {
      border-bottom: 1px solid hsl(0deg 0% 0% / 4%) !important;
      background-color: #fff !important;
      color: var(--main-font-color) !important;
    }
  }

  .not-exist-post {
    padding-top: 56px;

    .guide-txt {
      text-align: center;
      padding: 80px 0;
    }

    .alt-title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .alt-list {
    }
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
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
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
        color: var(--point-color);
      }

      &::after {
        content: "";
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
        color: #ccc;

        &.on {
          color: var(--point-color);
        }
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
          width: 100%;
          height: 100%;
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
        object-fit: cover;
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
        background-image: url("https://d1unjqcospf8gs.cloudfront.net/assets/home/articles/face-icon-set-0cffc52be32961b0bb4a308c272d8f526ddcdeda66dbde6eb32618eeb22b74e6.png");
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
