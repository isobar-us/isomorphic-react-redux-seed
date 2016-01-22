let allowSubscribe;
let subscribers;
let subscribersReadyCt;
let allSubscribersReady;

function subscriberReady() {
  subscribersReadyCt++;
  if (subscribersReadyCt === subscribers.length) allSubscribersReady();
}

export default {
  init() {
    allowSubscribe = true;
    subscribers = [];
    subscribersReadyCt = 0;
  },
  doAsyncFns(callbackFn) {
    allowSubscribe = false;
    if (subscribers.length) {
      allSubscribersReady = callbackFn;
      subscribers.forEach(obj => obj.action(obj.dispatch, obj.getState, subscriberReady));
    }
    return (subscribers.length !== 0);
  },
  middleware: store => next => action => {
    if (!action.async) {
      return next(action);
    } else if (allowSubscribe) {
      subscribers.push({action:action.async, dispatch:store.dispatch, getState:store.getState});
    } else {
      return action.async(store.dispatch, store.getState, function(){});
    }
  }
}