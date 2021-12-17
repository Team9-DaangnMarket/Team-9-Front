import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

const SET_KEYWORD = 'SET_KEYWORD'

const initialState = {
  keyword: null
}

const setKeyword = createAction(SET_KEYWORD, (keyword) => ({ keyword }))

export default handleActions(
    {
      [SET_KEYWORD]: (state, action) =>
          produce(state, (draft) => {
            draft.keyword = action.payload.keyword
          }),
    },
    initialState
)

const actionCreators = {
  setKeyword,
}

export { actionCreators }
