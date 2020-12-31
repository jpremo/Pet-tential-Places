import { fetch } from './csrf.js';

const SET_BUSINESS = '/business/setBusiness'
const ADD_POST = '/business/addPost'
const ADD_ERRORS = '/business/addErrors'

const setBusiness = (business) => ({
  type: SET_BUSINESS,
  payload: business
});

const addPost = (post) => ({
  type: ADD_POST,
  payload: post
});

export const getBusinessInfo = (id) => async (dispatch) => {
  const res = await fetch(`/api/business/${id}`);
  dispatch(setBusiness(res.data))
};

export const postReview = (input) => async (dispatch) => {
  const res = await fetch(`/api/business/posts`, {
    method: 'POST',
    body: JSON.stringify(input)
  });
  debugger
  const data = res.data;
  dispatch(addPost(data))
};

const initialState = { businessInfo: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_BUSINESS:
      newState = Object.assign({}, state, { ...action.payload });
      return newState;
    case ADD_POST:
      newState = {...state};
      debugger
      newState.posts.unshift(action.payload)
      newState.allImages.push(...action.payload.images)
      console.log('ADD_POST')
      return newState;
    default:
      return state;
  }
}

export default reducer;
