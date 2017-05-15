import request from '../libs/Request';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAILED,
} from '../constants/List';

export const getList = () => (
  request.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => ({ type: GET_LIST_SUCCESS, list: res.data }))
    .catch(() => ({ type: GET_LIST_FAILED }))
);
