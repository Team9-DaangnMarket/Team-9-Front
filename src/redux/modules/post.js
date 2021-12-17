import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { axiosInstance } from '../../shared/api'

const GET_POST = 'GET_POST'

const initialState = {
  posts: [],
  page: 0,
  has_next: false,
}

const getPosts = createAction(GET_POST, (post_data) => ({ post_data }))

// middlewares
const getPostAction = (page) => {
  return async (dispatch, getState, { history }) => {
    axiosInstance
      .get(`http://15.164.171.227/posts?page=${page}&size=21`)
      .then((res) => {
        let is_next = null
        if (res.data.length < 21) {
          is_next = false
        } else {
          is_next = true
        }
        res.data.pop()
        let post_data = {
          posts: res.data,
          page: page + 1,
          next: is_next,
        }
        dispatch(getPosts(post_data))
      })
  }
}

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.posts.push(action.payload.post_data.posts)
        draft.posts.push(...action.payload.post_data.posts)
        draft.has_next = action.payload.post_data.next
        draft.page = action.payload.post_data.page
      }),
  },
  initialState
)

const actionCreators = {
  getPostAction,
}

export { actionCreators }
