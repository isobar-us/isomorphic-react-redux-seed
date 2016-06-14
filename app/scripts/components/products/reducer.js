import {Map} from 'immutable';
import constants from '../../constants';

export default {
  key: 'products',
  fn(state = Map(), action) {
    switch (action.type) {
      case constants.LOAD_PRODUCTS_REQUEST:
        return state.set('products', Map({items:[], categoryId:action.categoryId, sort:action.sort, loading:true}));
      case constants.LOAD_PRODUCTS_SUCCESS:
        return state.update('products', products => products.merge(Map({items:action.items, loading:false})));
      case constants.LOAD_PRODUCTS_ERROR:
        return state.set('products', Map({items:[], categoryId:action.categoryId, sort:action.sort, loading:false}));
    }
    return state;
  }
}