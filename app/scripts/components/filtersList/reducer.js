import {Map} from 'immutable';
import constants from '../../constants';

export default {
  key: 'filtersList',
  fn(state = Map(), action) {
    switch (action.type) {
      case constants.LOAD_CATEGORIES_REQUEST:
        return state.set('categories', Map({items:[], loading:true}));
      case constants.LOAD_CATEGORIES_SUCCESS:
        return state.set('categories', Map({items:action.items, loading:false}));
      case constants.LOAD_CATEGORIES_ERROR:
        return state.set('categories', Map({items:[], loading:false}));
    }
    return state;
  }
}