const getCookie = (type) => {
  const cookieStr = document.cookie
  let value = cookieStr
    .split('TEAM9-')
    .filter((parts) => parts.indexOf(`${type}=`) > -1)[0]
  if (value) {
    value = value.split(`${type}=`)[1]
    return value
  } else {
    return undefined
  }
}

// 쿠키에 저장하는 함수
const setCookie = (name, value, exp = 5) => {
  let date = new Date()
  // 날짜를 만들어줍니다.
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000)
  // 저장!
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
}

// 만료일을 예전으로 설정해 쿠키를 지웁니다.
const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
}

export { getCookie, setCookie, deleteCookie }
