import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { axiosInstance } from "../shared/api";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Button } from "../elements";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [login_disabeld, setLoginDisabled] = useState(true);
  const [input_values, setInputValues] = useState({ user_id: "", user_pw: "" });

  const handleChangeInput = (e) => {
    setInputValues({
      ...input_values,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickLogin = () => {
    axiosInstance
      .post(`/user/login`, {
        username: input_values.user_id,
        password: input_values.user_pw,
      })
      .then((res) => {
        // console.log(res.headers.authorization)
        dispatch(
          userActions.loginAction({
            userId: input_values.user_id,
            token: res.headers.authorization,
          })
        );
      })
      .catch((err) => {
        alert('로그인 정보가 맞지않습니다. 다시 시도해주세요.')
        console.log(`로그인 오류 발생: ${err.response}`);
      });
  };

  const handleKeyUpEnter = (e) => {
    if (e.key === 'Enter') {
      handleClickLogin()
    }
  }

  useEffect(() => {
    if (input_values.user_id !== "" && input_values.user_pw !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }

    return () => {};
  }, [input_values]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUpEnter)

    return () => {
      window.removeEventListener('keyup', handleKeyUpEnter)
    }
  })

  return (
    <Grid is_container>
      <Wrap>
        <div className="logo_img">
          <img src="assets/signup_logo.png" alt="logo" />
        </div>

        <div className="input_bx">
          <input
            className="inputEl"
            type="text"
            name="user_id"
            placeholder="아이디"
            onChange={handleChangeInput}
          />

          <input
            className="inputEl"
            type="password"
            name="user_pw"
            placeholder="비밀번호"
            onChange={handleChangeInput}
          />
        </div>

        <Button
          _className="login_btn"
          version="orange"
          disabled={login_disabeld}
          _onClick={handleClickLogin}
        >
          로그인
        </Button>

        <div className="process_login">
          <p>
            아직 계정이 없으신가요?
            <button
              className="signup_btn"
              onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </button>
          </p>
        </div>
      </Wrap>
    </Grid>
  );
};

const Wrap = styled.div`
  .logo_img {
    margin-top: 20px;
    width: 100%;

    img {
      width: 100%;
    }
  }
  .input_bx {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  }
  .inputEl {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    border: 1px solid var(--sub-font-color);
    border-radius: 6px;
    color: var(--main-font-color);
    outline: none;
  }
  .login_btn {
    width: 300px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .process_login {
    font-size: 13.3px;
    text-align: right;
    width: 300px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .signup_btn {
    padding: 5px;
    border: none;
    background: transparent;
    outline: none;
    color: var(--point-color);
    cursor: pointer;
  }
`;

export default Login;
