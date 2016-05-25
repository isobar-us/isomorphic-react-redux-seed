import request from 'superagent';
import constants from '../../constants';
import pageTitle from '../../pageTitle';

let productsReq = null;

export function getNormalizedProp(prop) {
  if (typeof prop === 'undefined') prop = '';
  return prop;
}

export function loadProducts(params, query, readyFn) {
  return function(dispatch) {
    let categoryId = getNormalizedProp(params.categoryId);
    let sort = getNormalizedProp(query.sort);
    if (productsReq !== null) productsReq.abort();
    dispatch({type:constants.LOAD_PRODUCTS, categoryId:categoryId, sort:sort});
    pageTitle.set(['Products', categoryId]);
    let url = constants.API_URL_DEV + 'products/' + categoryId;
    if (sort !== '') url = url + '?sort=' + sort;
    productsReq = request.get(url).end( (err, resp) => {
      dispatch({type:constants.LOAD_PRODUCTS_SUCCESS, items:resp.body});
      productsReq = null;
      if (typeof readyFn === 'function') readyFn();
    });
  }
}