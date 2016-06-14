import request from 'superagent-bluebird-promise';
import constants from '../../constants';

function loadCategoriesRequest() {
  return {type:constants.LOAD_CATEGORIES_REQUEST};
}

function loadCategoriesSuccess(items) {
  return {type:constants.LOAD_CATEGORIES_SUCCESS, items:items};
}

function loadCategoriesError() {
  return {type:constants.LOAD_CATEGORIES_ERROR};
}

export function loadCategories() {
  return function(dispatch) {
    dispatch(loadCategoriesRequest());
    // return the promise to track async loading on the server
    return request.get(constants.API_URL_DEV+'categories')
      .then((resp) => {
        dispatch(loadCategoriesSuccess(resp.body));
      }, (err) => {
        console.log(err);
        dispatch(loadCategoriesError());
      });
  }
}