import {combineReducer} from './reducer';

let needs;
let needReadyCt;
let allNeedsReady;

function needReady() {
  needReadyCt++;
  if (needReadyCt === needs.length) allNeedsReady();
}

function getReducedPropFromComponents(components, prop) {
  return components.reduce( (prev, current) => {
    if (typeof current === 'function') {
      return (current[prop] || []).concat(prev);
    } else if (typeof current === 'object') {
      return Object.keys(current).reduce( (p, key) => (current[key][prop] || []).concat(p), []).concat(prev);
    }
  }, []);
}

export function loadAsyncNeeds(dispatch, components, params, query, callbackFn) {
  needReadyCt = 0;
  needs = getReducedPropFromComponents(components, 'needs');
  if (needs.length) {
    allNeedsReady = callbackFn;
    const reducers = getReducedPropFromComponents(components, 'reducers');
    reducers.forEach(reducer => combineReducer(reducer));
    needs.forEach(need => dispatch(need(params, query, needReady)));
  } else {
    callbackFn();
  }
}