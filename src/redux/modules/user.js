import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

import { getCookie, setCookie, deleteCookie } from '../../shared/Cookie'
// 액션
const SET_USER = 'SET_USER'

// 초기값
const initialState = {
  user: null,
  is_login: false,
}

// 액션 생성 함수
const setUser = createAction(SET_USER, (user) => ({ user }))

// 미들웨어
const loginAction = (user) => {
  return (dispatch, getState, { history }) => {
    // console.log(user)
    const login_data = `TEAM9-id=${user.userId}TEAM9-token=${user.token}`
    setCookie('OK', login_data)
    dispatch(setUser(user))
    history.push('/')
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
  // setUser,
  loginAction,
}

export { actionCreators }
