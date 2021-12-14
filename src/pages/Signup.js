import React, { useState, useRef } from "react";
import { axiosInstance } from "../api";
import { checkName, checkId, checkPw } from "../shared/Check";
import styled from "styled-components";
import { Grid, Button } from "../elements/index";
import { FaCamera } from "react-icons/fa";

const Signup = () => {
  //nickname, id, pwd
  const [nickname, set_nickname] = useState("");
  const [id, set_id] = useState("");
  const [pw, set_pw] = useState("");
  const [pwCheck, set_pwCheck] = useState("");

  //err message
  const [err_nickname, setErr_nickname] = useState("");
  const [err_id, setErr_id] = useState("");
  const [err_pw, setErr_pw] = useState("");
  const [err_pwCheck, setErr_pwCheck] = useState("");

  const signupBtn = () => {
    if (nickname === "" || id === "" || pw === "" || pwCheck === "") {
      window.alert("빈 공간을 채워주세요");
      return;
    }

    if (!checkName(nickname)) {
      setErr_nickname("닉네임은 영문/숫자포함 최소3자 이상 10자 이하입니다");
      return;
    }

    setErr_nickname("");
    if (!checkId(id)) {
      setErr_id("아이디는 영문/숫자포함 최소 3자 이상 20자 이하입니다");
      return;
    }
    setErr_id("");
    if (!checkPw(pw)) {
      setErr_pw("비밀번호는 영문/숫자/특수문자 포함 최소 8자 최대20자입니다");
      return;
    }
    setErr_pw("");
    if (pw !== pwCheck) {
      setErr_pwCheck("비밀번호가 일치 하지 않습니다");
      return;
    }

    axiosInstance
      .post(`/api/signup`, {
        username: id,
        nickname: nickname,
        password: pw,
        profileImg: "",
      })
      .then((res) => {
        console.log(res);
        window.alert("가입을 축하드려요!");
        window.location.hef = "/login";
      })
      .catch((err) => {
        console.log(`회원가입 오류 발생: ${err}`);
      });
  };

  // upload profile pic
  const fileInput = useRef();
  const [preview, setPreview] = useState();

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

  return (
    <>
      <SignupForm>
        <Grid is_container>
          {/* logo  */}
          <Logo>
            <img src="assets/signup_logo.png" alt="logo" />
          </Logo>
          {/* img upload */}
          <UploadBox>
            <Circle>
              <img
                className="p_img"
                src={
                  preview
                    ? preview
                    : "https://i.pinimg.com/564x/9b/0e/4d/9b0e4daa1870231d3a69b8d5a1bbd81a.jpg"
                }
                alt="user_img"
              />
            </Circle>
            <Btn>
              <Button _onClick={handleClick} _className="uploadBtn">
                <FaCamera />
              </Button>
              <input
                type="file"
                className="fileUpload"
                accept="image/*"
                ref={fileInput}
                onChange={selectFile}
              />
            </Btn>
          </UploadBox>
          {/* signup Form */}
          <InputForm>
            <input
              type="text"
              placeholder="닉네임"
              onChange={(e) => set_nickname(e.target.value)}
            />
            {err_nickname && <p>{err_nickname}</p>}

            <input
              type="text"
              placeholder="아이디"
              onChange={(e) => set_id(e.target.value)}
            />
            {err_id && <p>{err_id}</p>}

            <input
              type="password"
              placeholder="비밀번호"
              onChange={(e) => set_pw(e.target.value)}
            />
            {err_pw && <p>{err_pw}</p>}

            <input
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => set_pwCheck(e.target.value)}
            />
            {err_pwCheck && <p>{err_pwCheck}</p>}
          </InputForm>
          <Button version={"orange"} _onClick={signupBtn}>
            등록하기
          </Button>
        </Grid>
      </SignupForm>
    </>
  );
};

export default Signup;

const SignupForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  button {
    margin: 50px auto;
    width: 300px;
  }
`;

const Logo = styled.div`
  margin: 0px 0;
  img {
    width: 100%;
  }
`;

const InputForm = styled.div`
  width: 300px;
  margin: 0 auto;

  input {
    width: 100%;
    display: block;
    height: 40px;
    padding: 0px 8px;
    margin: 25px 0 10px 0;
    outline: none;
    border: 1px solid var(--sub-font-color);
  }

  p {
    color: red;
    font-size: 0.8em;
    padding-left: 5px;
  }
`;

const UploadBox = styled.div`
  position: relative;
  width: 200px;
  margin: 50px auto;

  .fileUpload {
    display: none;
  }
`;

const Circle = styled.div`
  border-radius: 100% !important;
  overflow: hidden;
  width: 140px;
  height: 140px;
  border: 1px solid var(--border-color);
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const Btn = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-color);
  border-radius: 100%;
  background: #fff;

  position: absolute;
  top: 90px;
  right: 20px;
  color: #666666;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  .uploadBtn {
    display: block;
    font-size: 22px;
    width: 40px;
    height: 40px;
    border: 1px solid red;
    background-color: transparent;
    border: 0;

    position: absolute;
    top: -50px;
    right: -00px;

    &:hover {
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      color: #999;
    }
  }
`;
