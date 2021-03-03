import { fetch } from './csrf.js';

const SET_BUSINESS = '/business/setBusiness'
const ADD_POST = '/business/addPost'
const EDIT_POST = '/business/editPost'
const LIST_BUSINESSES = '/business/listBusinesses'
const CLEAR_BUSINESS = '/business/clearBusiness'
const SEARCH = '/business/search'
const CLEAR_SEARCH = '/business/clearSearch'

const tt = window.tt

const setBusiness = (business) => ({
  type: SET_BUSINESS,
  payload: business
});

const listBusinesses = (businesses) => ({
  type: LIST_BUSINESSES,
  payload: businesses
});

const addPost = (post) => ({
  type: ADD_POST,
  payload: post
});

const editPost = (post) => ({
  type: EDIT_POST,
  payload: post
});

const search = (businesses) => ({
  type: SEARCH,
  payload: businesses
});

export const clearBusinessInfo = () => ({
  type: CLEAR_BUSINESS
});

export const clearSearchInfo = () => ({
  type: CLEAR_SEARCH
});

export const getBusinessInfo = (id) => async (dispatch) => {
  const res = await fetch(`/api/business/${id}`);
  dispatch(setBusiness(res.data))
};

export const searchBusinesses = (url, location) => async (dispatch) => {
  let coordString = 'NoLocation'
  if (location) {
    let loc = await tt.services.fuzzySearch({
      key: 'g0ZS3ih3olA15iG2cSglfY1YrEJO8DKR',
      query: location
    }).go()
    coordString = `${loc.results[0].position.lng},${loc.results[0].position.lat}`
  }

  const res = await fetch(url + `&coord=${coordString}`);
  dispatch(search(res.data))
};

export const getTenBusinesses = () => async (dispatch) => {
  const res = await fetch(`/api/business/recent`);
  dispatch(listBusinesses(res.data))
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
      newState.businessInfo.averageRating = (newState.businessInfo.averageRating * newState.businessInfo.reviewNumber + action.payload.rating) / (newState.businessInfo.reviewNumber + 1)
      newState.businessInfo.reviewNumber ++
      return newState;
    case EDIT_POST:
      newState = { ...state };
      const ind = newState.posts.findIndex((post) => post.id === action.payload.id)
      debugger
      newState.posts[ind] = action.payload;
      let total = 0;
      newState.posts.forEach((el) => total += el.rating)
      newState.businessInfo.averageRating = total / (newState.businessInfo.reviewNumber);
      newState.allImages = newState.allImages.filter((el) => el.userId !== action.payload.user.id)
      newState.allImages.push(...action.payload.images)
      return newState;
    case LIST_BUSINESSES:
      newState = Object.assign({}, state, { ...action.payload });
      return newState;
    case CLEAR_BUSINESS:
      newState = Object.assign({}, state);
      newState.businessInfo = null;
      return newState;
    case CLEAR_SEARCH:
      newState = Object.assign({}, state);
      newState.searchResultBusinesses = null;
      newState.searchCenter = null;
      return newState;
    case SEARCH:
      newState = Object.assign({}, state, { ...action.payload });
      return newState;
    case CLEAR_BUSINESS:
      newState = Object.assign({}, state);
      newState.businessInfo = null;
      return newState;
    default:
      return state;
  }
}

export default reducer;
