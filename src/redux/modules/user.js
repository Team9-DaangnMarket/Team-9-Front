// import { getCookie, setCookie, deleteCookie } from '../../shared/Cookie'
import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

// 액션
const GET_USER = 'GET_USER'
const SET_USER = 'SET_USER'

// 초기값
const initialState = {
  user: null,
  is_login: false,
}

// 액션 생성 함수
const getUser = createAction(GET_USER, () => ({}))
const setUser = createAction(SET_USER, (user) => ({ user }))

// 미들웨어
// 얘가 api를 받아와서 setUser로 보내준다
// 아니지 로그인페이지에서 api를 받아오고 거기서 디스패치를 해주면 된다
const loginAction = (user) => {
  return (dispatch, getState, { history }) => {
    // const login_data = `__jjal-id=${user.userId}__jjal-token=${user.token}`
    // setCookie('jjal_login', login_data)
    // dispatch(setUser(user))
    // history.push('/')
    // console.log('되냐?')
  }
}

// 리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log('[SET_USER]', action.payload.userId)
        draft.user = action.payload.user.userId
        draft.is_login = true
      }),
  },
  initialState
)

const actionCreators = {
  getUser,
  setUser,
  loginAction,
}

export { actionCreators }
