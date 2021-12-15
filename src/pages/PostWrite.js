import React, { useState, useRef } from "react";
import { Grid, Button, Input } from "../elements";
import { comma } from "../shared/util";
import styled from "styled-components";
import { GoSettings } from "react-icons/go";
import { MdOutlinePostAdd, MdOutlineClose } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { FaChevronRight, FaCamera } from "react-icons/fa";

const PostWrite = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cate, setCate] = useState("카테고리");
  const [content, setContent] = useState();
  const [preview, setPreview] = useState();

    const handeTest = (e) => {
    const file = e.target.files[0]
    const storageRef = storage.ref(file.name);
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      storage.ref(`images/${file.name}`).putString(reader.result, 'data_url').then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(url => {
          console.log('스냅샷 URL', url)
        })
      });
    }
  }
  
  const fileInput = useRef();

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
      console.log(reader.result);
    };
  };
  const handleClick = () => {
    fileInput.current.click();
  };

  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const priceOnChange = (e) => {
    const priceFormat = comma(e.target.value);
    setPrice(priceFormat);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const comepleted = () => {
    console.log(title, cate, price, content);
  };
  return (
    <>
      <WriteBox>
        <Grid is_container>
          <Grid
            is_flex
            flex_align="center;"
            flex_justify="space-between;"
            _className="title"
          >
            <p>
              <BiArrowBack />
            </p>
            <h3>중고거래 글쓰기</h3>
            <Button _className="btn" _onClick={comepleted}>
              완료
            </Button>
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
                  <button>
                    <MdOutlineClose />
                  </button>
                </UploadImg>
              </>
            ) : null}
          </UploadBox>
          <Grid>
            <Input
              placeholder="글 제목"
              _onChange={titleOnChange}
              value={title}
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
                    <li
                      onClick={() => {
                        setIsOpen(false);
                        setCate("디지털기기");
                      }}
                    >
                      디지털기기
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(false);
                        setCate("생활가전");
                      }}
                    >
                      생활가전
                    </li>
                    <li>가구/인테리어</li>
                    <li>유아동</li>
                    <li>생활/가공식품</li>
                    <li>유아도서</li>
                    <li>여성잡화</li>
                    <li>여성의류</li>
                    <li>남성패션/잡화</li>
                    <li>게임/취미</li>
                    <li>뷰티/미용</li>
                    <li>반려동물용품</li>
                    <li>도서/티켓/음반</li>
                    <li>식물</li>
                    <li>기타 중고물품</li>
                    <li>삽니다</li>
                  </ul>
                </Modal>
              </>
            )}
          </SelectBox>
          <Grid is_flex>
            <Grid is_flex _className="price-box">
              <Cur cur={price}>\</Cur>
              <Input
                placeholder="가격 (선택사항)"
                _className="price"
                _onChange={priceOnChange}
                value={price || ""}
              >
                {price}
              </Input>
            </Grid>

            <Grid _className="price-checkbox">
              <label className="control control--checkbox">
                가격 제안받기
                <input
                  type="checkbox"
                  checked={price ? "checked" : null}
                  disabled={price ? false : true}
                />
                <div className="control__indicator"></div>
              </label>
            </Grid>
          </Grid>
          <textarea
            cols="20"
            rows="30"
            className="textarea"
            type="textarea"
            placeholder="자양동에 올릴 게시글 내용을 작성해주세요.(가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
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
    border-bottom: 1px solid var(--border-color);
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
  margin: 30px 0;
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

  button{
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
    z-index: 10;
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
