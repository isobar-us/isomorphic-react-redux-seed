import {combineReducer} from './reducer';

function getReducedPropFromComponents(components, prop) {
  return components.reduce( (prev, current) => {
    if (typeof current === 'function') {
      return (current[prop] || []).concat(prev);
    } else if (typeof current === 'object') {
      return Object.keys(current).reduce( (p, key) => (current[key][prop] || []).concat(p), []).concat(prev);
    }
  }, []);
}

export function loadAsyncNeeds(dispatch, components, params, query) {
  const needs = getReducedPropFromComponents(components, 'needs');
  if (needs.length) {
    getReducedPropFromComponents(components, 'reducers').forEach(reducer => combineReducer(reducer));
    return Promise.all(needs.map(need => dispatch(need(params, query))));
  } else {
    return Promise.resolve();
  }
}