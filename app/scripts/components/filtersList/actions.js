import request from 'superagent-bluebird-promise';
import constants from '../../constants';

export function loadCategories() {
  return function(dispatch) {
    dispatch({type:constants.LOAD_CATEGORIES});
    return request.get(constants.API_URL_DEV+'categories')
      .then((resp) => dispatch({type:constants.LOAD_CATEGORIES_SUCCESS, items:resp.body}))
      .catch(() => console.warn('ajax error retrieving categories'));
  }
}