import { GET_LIST_SUCCESS } from '../constants/List';

const initialState = [];

const MailListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_SUCCESS:
      return action.list;
    default:
      return state;
  }
};

export default MailListReducer;
