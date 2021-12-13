import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  // 변수 사용방법 -> var(--pointer-color);
  :root {
    --point-color: #ff8a3d;
    --main-font-color: #212529;
    --sub-font-color: #868e96;
    --border-color: #0000000a;
  }

  @font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  a {
    color: var(--main-font-color);
    text-decoration: none;
  }
  
  body {
    color: var(--main-font-color);
    overflow-x: hidden;
    font-family: 'NanumSquareRound',serif;
  }
  
  button {
    outline: none;
    color: #4D5159;
    font-family: 'NanumSquareRound',serif;
  }
  
  ol, ul, li {
    list-style-type: none;
  }
  
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    border-radius: 10px;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #aaa;
  }
`
export default GlobalStyles