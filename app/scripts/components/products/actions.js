import request from 'superagent-bluebird-promise';
import constants from '../../constants';
import pageTitle from '../../pageTitle';

let productsReq = null;

function loadProductsRequest(categoryId, sort) {
  return {type:constants.LOAD_PRODUCTS_REQUEST, categoryId:categoryId, sort:sort};
}

function loadProductsSuccess(items) {
  return {type:constants.LOAD_PRODUCTS_SUCCESS, items:items};
}

function loadProductsError() {
  return {type:constants.LOAD_PRODUCTS_ERROR};
}

export function getNormalizedProp(prop) {
  if (typeof prop === 'undefined') prop = '';
  return prop;
}

export function loadProducts(params, query) {
  let categoryId = getNormalizedProp(params.categoryId);
  let sort = getNormalizedProp(query.sort);
  if (productsReq !== null) productsReq.cancel();
  pageTitle.set(['Products', categoryId]);
  let url = constants.API_URL_DEV + 'products/' + categoryId;
  if (sort !== '') url = url + '?sort=' + sort;
  return function(dispatch) {
    dispatch(loadProductsRequest(categoryId, sort));
    productsReq = request.get(url)
      .then(resp => dispatch(loadProductsSuccess(resp.body)))
      .catch((err) => {
        console.log(err);
        dispatch(loadProductsError());
      })
      .finally(() => {
        productsReq = null;
      });
    // return the promise to track async loading on the server
    return productsReq;
  }
}