import {createAction, handleActions} from 'redux-actions'
import {produce} from 'immer'
import {axiosInstance} from '../../shared/api'
import _ from 'lodash'

const GET_POST = 'GET_POST'

const initialState = {
  posts: [],
  page: 0,
  has_next: false,
}

const getPosts = createAction(GET_POST, (post_data) => ({post_data}))

// middlewares
const getPostAction = (page) => {
  return async (dispatch, getState, {history}) => {
    axiosInstance
        .get(`http://15.164.171.227/posts?page=${page}&size=21`)
        .then((res) => {
          let is_next = null
          if (res.data.length < 21) {
            is_next = false
          } else {
            res.data.pop()
            is_next = true
          }
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
            // console.log('[GET_POST]', action.payload.post_data.posts)

            // console.log('기존 포스팅: ', state.posts)
            // console.log('새로 불러온 포스팅', action.payload.post_data.posts)
            //
            // const filtered = [
            //     ...action.payload.post_data.posts,
            //     ...state.posts
            // ]
            //
            // console.log('합쳐진 포스팅', filtered)
            // console.log('중복 제거된 포스팅', _.uniqBy(filtered, 'postId'))


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

export {actionCreators}
