import React, { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../shared/api";
import { useParams } from "react-router-dom";
import { getCookie } from "../shared/Cookie";

import { Grid, Button, Input } from "../elements";
import { storage } from "../shared/firebase";
import { dummyCate } from "../shared/util";
import styled from "styled-components";
import { GoSettings } from "react-icons/go";
import { MdOutlinePostAdd, MdOutlineClose } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { FaChevronRight, FaCamera } from "react-icons/fa";

const PostWrite = (props) => {
  const { post_id } = useParams();
  const [_post, set_Post] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [cate, setCate] = useState("카테고리");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const [img_url, setImg_url] = useState();
  const cbRef = useRef(null);

  //modal open
  const [isOpen, setIsOpen] = useState(false);
  // 게시글 조회하는 api
  // 제어 컴포넌트와 비제어 컴포넌트
  useEffect(() => {
    if (post_id) {
      axiosInstance
          .get(`/posts/${post_id}`)
          .then((res) => {
            set_Post(res.data);
            setCate(res.data.categoryName);
            setImg_url(res.data.goodsImg);
            setPreview(res.data.goodsImg);
            setPrice(res.data.price);
            setTitle(res.data.title);
            setContent(res.data.content);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, []);

  useEffect(() => {
    if (price) {
      cbRef.current.checked = true;
      cbRef.current.disabled = false;
    } else {
      cbRef.current.checked = false;
      cbRef.current.disabled = true;
    }
  }, [price]);

  //이미지 파일명 생성을 위한 유저아이디
  const user_id = getCookie("id");

  //upload file
  const fileInput = useRef();

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  //input list
  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const priceOnChange = (e) => {
    setPrice(e.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  //포스트 업로드
  const addPost = () => {
    if (!preview) {
      alert("사진을 업로드 해주세요");
      return;
    }

    if (!title || !content || !price || !cate === "카테고리") {
      window.alert("빈 공간을 채워주세요!");
      return;
    }

    // 새로운 게시물 작성 일때와 수정 일때 로직 분기
    if (!post_id) {
      const storageRef = storage.ref(fileInput.current.files[0].name);
      storage
          .ref(`images/${user_id}_${new Date().getTime()}`)
          .putString(preview, "data_url")
          .then(function (snapshot) {
            snapshot.ref.getDownloadURL().then((url) => {
              //axios
              axiosInstance
                  .post("/posts", {
                    title: title,
                    content: content,
                    price: price,
                    goodsImg: url,
                    negoCheck: true,
                    categoryName: cate,
                  })
                  .then((res) => {
                    // console.log(res);
                    window.location.href = "/";
                  })
                  .catch((err) => console.log(err));
            });
          });
    } else {
      const file = fileInput.current.files[0];
      if (file) {
        const storageRef = storage.ref(fileInput.current.files[0].name);
        storage
            .ref(`images/${user_id}_${new Date().getTime()}`)
            .putString(preview, "data_url")
            .then(function (snapshot) {
              snapshot.ref.getDownloadURL().then((url) => {
                //axios
                axiosInstance
                    .put(`/posts/${post_id}`, {
                      title: title,
                      content: content,
                      price: price,
                      goodsImg: url,
                      negoCheck: true,
                      categoryName: cate,
                    })
                    .then((res) => {
                      // console.log(res);
                      window.location.href = "/";
                    })
                    .catch((err) => console.log(err));
              });
            });
      } else {
        axiosInstance
            .put(`/posts/${post_id}`, {
              title: title,
              content: content,
              price: price,
              goodsImg: img_url,
              negoCheck: true,
              categoryName: cate,
            })
            .then((res) => {
              window.location.href = "/";
            })
            .catch((err) => console.log(err));
      }
    }
  };

  return (
      <>
        <WriteBox>
          <Grid is_container>
            <Grid _className="title">
              <Grid
                  is_flex
                  flex_align="center;"
                  flex_justify="space-between;"
                  _className="title-inner"
              >
                <p>
                  <BiArrowBack
                      onClick={() => (window.location.href = "/")}
                      style={{ cursor: "pointer" }}
                  />
                </p>
                <h3>중고거래 글쓰기</h3>
                {post_id ? (
                    <Button _className="btn" _onClick={addPost}>
                      수정
                    </Button>
                ) : (
                    <Button _className="btn" _onClick={addPost}>
                      완료
                    </Button>
                )}
              </Grid>
            </Grid>
            <UploadBox>
              <UploadBtn onClick={handleClick}>
                <FaCamera />
                <input
                    type="file"
                    className="fileUpload"
                    ref={fileInput}
                    onChange={selectFile}
                />
              </UploadBtn>
              {preview ? (
                  <>
                    <UploadImg>
                      <img src={preview} alt="pre_img" />
                      <button
                          onClick={() => {
                            setPreview("");
                            fileInput.current.value = null;
                          }}
                      >
                        <MdOutlineClose />
                      </button>
                    </UploadImg>
                  </>
              ) : null}
            </UploadBox>
            <Grid>
              <Input
                  placeholder="글 제목(최대 20자)"
                  _onChange={titleOnChange}
                  value={_post?.title}
                  max="20"
              />
            </Grid>
            <SelectBox>
              <div className="cate" onClick={openModal}>
                {cate}
                <span>
                <FaChevronRight />
              </span>
              </div>
              {isOpen && (
                  <>
                    <Modal>
                      <div className="shadow"></div>
                      <ul>
                        {dummyCate.map((c, i) => {
                          return (
                              <li
                                  key={`cate-id-${i}`}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setCate(`${c}`);
                                  }}
                              >
                                {c}
                              </li>
                          );
                        })}
                      </ul>
                    </Modal>
                  </>
              )}
            </SelectBox>
            <Grid is_flex>
              <Grid is_flex _className="price-box">
                <Cur cur={price}>\</Cur>
                <Input
                    type={"number"}
                    placeholder="가격 (선택사항)"
                    _className="price"
                    _onChange={priceOnChange}
                    value={_post?.price}
                ></Input>
              </Grid>

              <Grid _className="price-checkbox">
                <label className="control control--checkbox">
                  가격 제안받기
                  <input type="checkbox" ref={cbRef} />
                  <div className="control__indicator"></div>
                </label>
              </Grid>
            </Grid>
            <textarea
                cols="20"
                rows="30"
                defaultValue={_post?.content}
                className="textarea"
                type="textarea"
                placeholder="올릴 게시글 내용을 작성해주세요.(가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
            />
            <SettingCtrl>
              <Grid
                  is_flex
                  flex_align="center;"
                  _className="setting-inner"
                  padding="16px"
              >
              <span>
                <MdOutlinePostAdd />
              </span>
                <h5>자주 쓰는 문구</h5>
                <span>
                <GoSettings />
              </span>
                <h5>보여줄 동네 설정</h5>
              </Grid>
            </SettingCtrl>
          </Grid>
        </WriteBox>
      </>
  );
};

export default PostWrite;

const WriteBox = styled.div`
  padding: 10px 16px 50px 16px;

  .title {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;

    border-bottom: 1px solid var(--border-color);

    .title-inner {
      max-width: 425px;
      margin: 0 auto;
    }

    p {
      font-size: 22px;
    }
  }

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

  .price-box {
    .price {
      width: 270px;
    }
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
      content: "";
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
    font-family: "NanumSquareRound", serif;
  }
`;

// currency color
const Cur = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) =>
          props.cur ? `var(--main-font-color)` : `var(--sub-font-color)`};
`;

// 상품 사진 업로드
const UploadBox = styled.div`
  margin: 60px 0 30px 0;
  display: flex;

  .fileUpload {
    display: none;
  }
`;

const UploadBtn = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--sub-font-color);
  margin-right: 10px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: var(--main-font-color);
  }

}
`;

const UploadImg = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--sub-font-color);
  margin-right: 10px;

  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  button {
    position: absolute;
    top: -5px;
    right: -5px;

    width: 18px;
    height: 18px;
    line-height: 22px;
    border-radius: 50%;
    outline: 0;
    border: 0;
    background-color: #222;
    color: #fff;
    font-size: 12px;
    text-align: center;
    cursor: pointer
  }

}`;

//select 카테고리
const SelectBox = styled.div`
  .cate {
    padding: 15px 0;
    font-size: 15px;
    span {
      float: right;
    }
  }
`;

const Modal = styled.div`
  .shadow {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }

  ul {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    z-index: 99999;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    font-size: 15px;

    li {
      padding: 10px 0px 10px 10px;
      border-bottom: 1px solid var(--border-color);
    }
  }
`;

const SettingCtrl = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  border-top: 1px solid var(--border-color);
  cursor: pointer;

  .setting-inner {
    margin: 0 auto;
    max-width: 425px;

    span {
      height: 40px;
      line-height: 40px;
      margin-right: 10px;
    }

    h5 {
      margin-right: 30px;
      line-height: 40px;
    }
  }
`;