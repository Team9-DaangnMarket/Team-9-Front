import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Grid, Button } from "../elements";

const Login = () => {
  const history = useHistory();
  const [login_disabeld, setLoginDisabled] = useState(true);
  const [input_values, setInputValues] = useState({ user_id: "", user_pw: "" });
  console.log(login_disabeld);

  const handleChangeInput = (e) => {
    setInputValues({
      ...input_values,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (input_values.user_id !== "" && input_values.user_pw !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }

    return () => {};
  }, [input_values]);

  return (
    <Grid is_container>
      <Wrap>
        <div className="logo_img">로고 이미지</div>

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
        >
          로그인
        </Button>

        <button className="login_btn" disabled>
          dasd
        </button>
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
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #eee;
  font-size: 20px;

  .logo_img {
    margin-top: 20px;
    width: 100%;
    height: 40vh;
    background: tomato;
  }
  .input_bx {
    display: flex;
    flex-direction: column;
  }
  .inputEl {
    margin-top: 30px;
    padding: 0 10px;
    width: 100%;
    border: 1px solid var(--sub-font-color);
    border-radius: 6px;
    color: var(--main-font-color);
    outline: none;
  }
  .login_btn {
    margin: 30px 0 10px;
    width: 100%;
  }
  .process_login {
    text-align: right;
  }
  .signup_btn {
    padding: 5px;
    border: none;
    background: transparent;
    font-size: 20px;
    outline: none;
    cursor: pointer;
  }
`;

export default Login;
