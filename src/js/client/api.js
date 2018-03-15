import axios from 'axios';

const callApi = (api, endpoint, method, schema, store, headers, body) => {
  console.log('Will call api with endpoint', endpoint, 'and method', method);
  let fullUrl;
  // Create Url
  if (endpoint.indexOf('http') === -1) {
    let baseUrl;
    switch (api) {
        case API_TILE:
          baseUrl = Config.tileApiBaseUrl;
          break;
        case API_SENSOR:
          baseUrl = Config.sensorApiBaseUrl;
          break;
    }
    fullUrl = baseUrl + ((endpoint.indexOf('/') === 0) ? endpoint : '/' + endpoint);
  } else {
    // User provided a specific endpoint (third-party?
    fullUrl = endpoint;
  }
  
  // Return Promise
  return axios({
    url: fullUrl,
    method: method,
    headers: headers,
    data: body
  });
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

export const API_TILE = Symbol('Tile API');
export const API_SENSOR = Symbol('GIS API');


// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  // Check if action is a CALL_API action
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    // Not a CALL_API, exit here.
    return next(action);
  }

  // A CALL_API action has an endpoint, a method, 3 action types, a schema (optional), a body (optional)
  let {endpoint} = callAPI;
  const {schema, method, body, types, headers, api} = callAPI;

  // Some endpoints can require state to replace path variables and params
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  // There are always 3 action types: X_REQUEST, X_SUCCESS, X_FAILURE
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = actionType => {
    // Copy action type and all parent action metadata into finalAction
    const finalAction = Object.assign({}, action, actionType);
    // Remove original CALL_API
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, failureType ] = types;

  // This only forwards the type request to be dispatched without the specific API content payload
  next(actionWith({type: requestType}));

  // Calls API and will forward the type success or failure after completion
  return callApi(api, endpoint, method, schema, store, headers, body)
  .then(res => {
    // Success
    let result = null;
    if (schema) {
      // Parse normalized response body according to schema
      result = Object.assign({}, normalize(res.data, schema));
    } else {
      // No schema provided.
      if (Array.isArray(res.data)) {
        result = res.data;
      } else if (typeof res.data === 'object') {
        result = Object.assign({}, res.data);
      } else {
        result = res.data;
      }
    }
    return next(actionWith({
      result,
      type: successType
    }));
  })
  .catch(err => {
    // Error
    console.log('Error: ', err);
    return next(actionWith({
      type: failureType,
      error: err.response.data ? {message: err.response.data.message, data: err.response.data.data, status: err.response.data.status} : {}
    }));
  });
}
