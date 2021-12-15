export const comma = (str) => {
  str = String(str)
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

export const uncomma = (str) => {
  str = String(str)
  return str.replace(/[^\d]+/g, '')
}

export const getScrollHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  )
}

export const copyUrlToClip = () => {
  const dummy = document.createElement('input')
  const text = window.location.href
  document.body.appendChild(dummy)
  dummy.value = text
  dummy.select()
  document.execCommand('copy')
  document.body.removeChild(dummy)
}

export const dummyCate = [
  '디지털기기',
  '생활가전',
  '가구/인테리어',
  '유아동',
  '생활/가공식품',
  '유아도서',
  '여성잡화',
  '여성의류',
  '남성패션/잡화',
  '게임/취미',
  '뷰티/미용',
  '반려동물용품',
  '도서/티켓/음반',
  '식물',
  '기타 중고물품',
  '삽니다',
]
