import { fetch } from './csrf.js';

const SET_BUSINESS = '/business/setBusiness'

const setBusiness = (business) => ({
    type: SET_BUSINESS,
    payload: business
  });

export const getBusinessInfo = (id) => async (dispatch) => {
    const res = await fetch(`/api/business/${id}`);
    dispatch(setBusiness(res.data))
  };

  const initialState = { businessInfo: null };

  function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case SET_BUSINESS:
        newState = Object.assign({}, state, { ...action.payload });
        return newState;
      default:
        return state;
    }
  }

  export default reducer;
