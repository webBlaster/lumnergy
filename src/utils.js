
const LumnergyApi = require("lumnergy_api");
const defaultClient = LumnergyApi.ApiClient.instance;

let localStorage = window.localStorage;


export function storeAuthInfo(authInfo) {
    localStorage.setItem("authInfo", JSON.stringify(authInfo));
}


export function getAuthInfo() {
    let authInfo = localStorage.getItem("authInfo");
    if (authInfo) {
        try {
            authInfo = JSON.parse(authInfo);
        } catch(e) {
            authInfo = {};
        }
    }

    return authInfo;
}


export function clearAuthInfo() {
    localStorage.removeItem("authInfo");
}


// Extract errors from API response. 
// Sometimes request to server crashes or server returns an empty response we want to handle
// that here so we can handle UI updates gracefully.
export function getResponseErrors(errors, response) {
    if (errors) {
      if (response && response.body) {
        if (response.body.errors) {
          return response.body.errors;
        } else {
          return [response.body.message || 'An error occurred, please try again.'];
        }
      } else {
        return ['An error occurred, please try again.'];
      }
    }

    return [];
}


export function getApiInstance(authToken = null) {
  if (authToken) {
    let APIKeyAuth = defaultClient.authentications['APIKeyAuth'];
    APIKeyAuth.apiKey = authToken;
  }
  
  let apiInstance = new LumnergyApi.AccountApi(defaultClient);

  return apiInstance;
}

export const numberFormat = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(value);