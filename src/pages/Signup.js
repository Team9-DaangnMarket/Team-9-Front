import React, { useState, useRef } from "react";
import { axiosInstance } from "../shared/api";
import { storage } from "../shared/firebase";
import { checkName, checkId, checkPw } from "../shared/Check";
import styled from "styled-components";
import { Grid, Button } from "../elements/index";
import { FaCamera } from "react-icons/fa";

const Signup = () => {
  //nickname, id, pwd
  const [nickname, set_nickname] = useState('')
  const [id, set_id] = useState('')
  const [pw, set_pw] = useState('')
  const [pwCheck, set_pwCheck] = useState('')

  //err message
  const [err_nickname, setErr_nickname] = useState("");
  const [err_id, setErr_id] = useState("");
  const [err_pw, setErr_pw] = useState("");
  const [err_pwCheck, setErr_pwCheck] = useState("");
  const [err_, setErr_] = useState("");
  const [err_iddouble, setErr_iddouble] = useState("");
  const [err_namedouble, setErr_namedouble] = useState("");
  const [double_btn, setDouble_btn] = useState(true);


  // upload profile pic
  const fileInput = useRef();
  const [preview, setPreview] = useState();
  const [img_url, setImg_url] = useState();

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
      console.log(reader.result);
    };
  };

  const handleUpload = (file) => {
    const storageRef = storage.ref(file.name);
    storage
      .ref(`images/profileImg_${new Date().getTime()}`)
      .putString(file, "data_url")
      .then(function (snapshot) {
        snapshot.ref.getDownloadURL().then((url) => {
          console.log("스냅샷 URL", url);
          setImg_url(url);
        });
      });
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  //아이디, 닉네임 중복확인 버튼
  const iddoubleChek = () => {
    setErr_iddouble(true);
  };
  const namedoubleChek = () => {
    setErr_namedouble(true);
  };

  //회원가입 버튼
  const signupBtn = () => {
    if (
      nickname === "" ||
      id === "" ||
      pw === "" ||
      pwCheck === "" ||
      preview === ""
    ) {
      setErr_("빈 공간을 채워주세요");
      return;
    }
    setErr_("");
    if (!checkName(nickname)) {
      setErr_nickname('닉네임은 영문/숫자포함 최소3자 이상 10자 이하입니다')
      return
    }

    setErr_nickname('')
    if (!checkId(id)) {
      setErr_id('아이디는 영문/숫자포함 최소 3자 이상 20자 이하입니다')
      return
    }
    setErr_id('')
    if (!checkPw(pw)) {
      setErr_pw('비밀번호는 영문/숫자/특수문자 포함 최소 8자 최대20자입니다')
      return
    }
    setErr_pw('')
    if (pw !== pwCheck) {
      setErr_pwCheck('비밀번호가 일치 하지 않습니다')
      return
    }
    //prifile img upload
    handleUpload(preview);


    axiosInstance
      .post(`/user/signup`, {
        username: id,
        nickname: nickname,
        password: pw,
        profileImg: img_url,
      })
      .then((res) => {
        console.log(res)
        window.alert('가입을 축하드려요!')
        window.location.hef = '/login'
      })
      .catch((err) => {

        setErr_("사용할 수 없는 아이디 혹은 닉네임입니다");
        console.log(`회원가입 오류 발생: ${err}`);
      });
  };

  return (
    <>
      <SignupForm>
        <Grid is_container>
          {/* logo  */}
          <Logo>
            <img src='assets/signup_logo.png' alt='logo' />
          </Logo>
          {/* img upload */}
          <UploadBox>
            <Circle>
              <img
                className='p_img'
                src={
                  preview
                    ? preview
                    : "https://i.pinimg.com/236x/a7/35/bc/a735bc244c696f41a450bc358a027f18--free-wooden-pallets--pallets.jpg"
                }
                alt='user_img'
              />
            </Circle>
            <Btn>
              <Button _onClick={handleClick} _className='uploadBtn'>
                <FaCamera />
              </Button>
              <input
                type='file'
                className='fileUpload'
                accept='image/*'
                ref={fileInput}
                onChange={selectFile}
              />
            </Btn>
          </UploadBox>
          {/* signup Form */}
          <InputForm>
            <Grid
              is_flex
              _className="form-btn"
              flex_align="center"
              flex_justify="center"
            >
              <input
                type="text"
                placeholder="닉네임"
                onChange={(e) => {
                  set_nickname(e.target.value);
                  setDouble_btn(false);
                }}
              />
              <button onClick={namedoubleChek} disabled={double_btn}>
                중복 확인
              </button>
            </Grid>
            {err_nickname && <p>{err_nickname}</p>}
            {err_namedouble && <p>중복된 닉네임입니다</p>}
            <Grid
              is_flex
              _className="form-btn"
              flex_align="center"
              flex_justify="center"
            >
              <input
                type="text"
                placeholder="아이디"
                onChange={(e) => {
                  set_id(e.target.value);
                  setDouble_btn(false);
                }}
              />
              <button onClick={iddoubleChek} disabled={double_btn}>
                중복 확인
              </button>
            </Grid>
            {err_id && <p>{err_id}</p>}
            {err_iddouble && <p>중복된 아이디입니다</p>}

            <input
              type='password'
              placeholder='비밀번호'
              onChange={(e) => set_pw(e.target.value)}
            />
            {err_pw && <p>{err_pw}</p>}

            <input
              type='password'
              placeholder='비밀번호 확인'
              onChange={(e) => set_pwCheck(e.target.value)}
            />
            {err_pwCheck && <p>{err_pwCheck}</p>}
            {err_ && <p>{err_}</p>}
          </InputForm>
          <Button version={'orange'} _onClick={signupBtn}>
            등록하기
          </Button>
        </Grid>
      </SignupForm>
    </>
  )
}

export default Signup

const SignupForm = styled.div`
  button {
    width: 300px;
    margin: 0 auto;
    margin-top: 30px;
  }
`

const Logo = styled.div`
  margin: 0px 0;
  img {
    width: 100%;
  }
`

//회원가입 폼
const InputForm = styled.div`
  width: 300px;
  margin: 0 auto;

  .form-btn {
    padding: 0;
    margin: 20px 0 10px 0;
    input {
      width: 220px;
      margin: 0;
    }
    button {
      width: 75px;
      padding: 12px 0;
      border-radius: 6px;
      background-color: var(--point-color);
      color: #fff;
      border: 0;
      outline: 0;
      margin-left: 5px;
      margin-top: 0px;
      cursor: pointer;
    }
  }

  input {
    width: 100%;
    display: block;
    height: 40px;
    padding: 0px 8px;
    margin: 20px 0 10px 0;
    outline: none;
    border-radius: 6px;
    border: 1px solid var(--sub-font-color);
  }

  p {
    color: red;
    font-size: 0.8em;
    padding-left: 5px;
  }
`

//사진 업로드 박스
const UploadBox = styled.div`
  position: relative;
  width: 200px;
  margin: 0 auto;

  .fileUpload {
    display: none;
  }
`

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
`

//회원가입 등록 버튼
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
    top: -28px;
    right: -00px;

    &:hover {
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      color: #999;
    }
  }
`
