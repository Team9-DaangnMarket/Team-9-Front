// 닉네임 유효성 검사 - 영문,숫자포함 3자이상 10자 이하
export function checkName(value) {
  let RegExp = /^[a-zA-Z0-9]{3,10}$/

  return RegExp.test(value)
}

//아이디 유효성 검사 - 영문,숫자포함 3자이상 20자 이하
export function checkId(value) {
  const RegExp = /^[a-zA-Z0-9]{3,20}$/

  return RegExp.test(value)
}

//비밀번호 유효성 검사 - 영문,숫자,특수기호 포함 8자이상 20자 이하
export function checkPw(value) {
  const RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/

  return RegExp.test(value)
}
