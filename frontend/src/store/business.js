import { fetch } from './csrf.js';

const SET_BUSINESS = '/business/setBusiness'
const ADD_POST = '/business/addPost'
const EDIT_POST = '/business/editPost'
const ADD_ERRORS = '/business/addErrors'

const setBusiness = (business) => ({
  type: SET_BUSINESS,
  payload: business
});

const addPost = (post) => ({
  type: ADD_POST,
  payload: post
});

const editPost = (post) => ({
  type: EDIT_POST,
  payload: post
});

export const getBusinessInfo = (id) => async (dispatch) => {
  const res = await fetch(`/api/business/${id}`);
  dispatch(setBusiness(res.data))
};

export const postReview = (input, type) => async (dispatch) => {
  const res = await fetch(`/api/business/posts`, {
    method: type,
    body: JSON.stringify(input)
  });
  const data = res.data;
  if (type === 'POST') dispatch(addPost(data))
  if (type === 'PUT') dispatch(editPost(data))
};

const initialState = { businessInfo: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_BUSINESS:
      newState = Object.assign({}, state, { ...action.payload });
      return newState;
    case ADD_POST:
      newState = { ...state };
      newState.posts.unshift(action.payload)
      newState.allImages.push(...action.payload.images)
      return newState;
    case EDIT_POST:
      newState = { ...state };
      const ind = newState.posts.findIndex((post) => post.id === action.payload.id)
      newState.posts[ind] = action.payload;
      debugger
      newState.allImages = newState.allImages.filter((el) => el.userId !== action.payload.user.id)
      newState.allImages.push(...action.payload.images)
      return newState;
    default:
      return state;
  }
}

export default reducer;
