import {
  LOGIN_USER_SUCCESSFUL,
  LOGIN_USER_FAILED,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  PROFILE_INFORMATION_UPDATED,
  LOGOUT_USER,
  PERSONAL_INFORMATION_UPDATE_SUCCESSFUL,
  EMPLOYMENT_INFORMATION_UPDATE_SUCCESSFUL,
  CONTACT_PERSON_INFORMATION_UPDATE_SUCCESSFUL,
  SALARY_INFORMATION_UPDATE_SUCCESSFUL,
  FINANCING_INFORMATION_UPDATED,
} from "../constants.js";
import { storeAuthInfo } from "../utils.js";

const initialState = {
  isAuthenticated: true,
  id: null,
  email: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  salary: 0,
  address: "",
  companyName: "",
  companyURL: "",
  contactPersonPhoneNumber: "",
  contactPersonEmail: "",
  contactPersonFullname: "",
  authToken: "",
  isProfileUpdated: false,
  isFinancingInformationUpdated: false,
};

const authReducer = (state = initialState, action) => {
  let authState = null;

  switch (action.type) {
    case LOGIN_USER_SUCCESSFUL:
    case REGISTER_USER_SUCCESSFUL:
      storeAuthInfo(action.payload);

      return Object.assign({}, state, {
        isAuthenticated: true,
        ...action.payload,
      });
    case LOGIN_USER_FAILED:
    case REGISTER_USER_FAILED:
      return Object.assign({}, state, {
        isAuthenticated: false,
      });
    case PROFILE_INFORMATION_UPDATED:
      authState = Object.assign({}, state, {
        isProfileUpdated: true,
      });

      storeAuthInfo(authState);

      return authState;
    case FINANCING_INFORMATION_UPDATED:
      authState = Object.assign({}, state, {
        isFinancingInformationUpdated: true,
      });

      storeAuthInfo(authState);

      return authState;
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
      });
    case PERSONAL_INFORMATION_UPDATE_SUCCESSFUL:
    case EMPLOYMENT_INFORMATION_UPDATE_SUCCESSFUL:
    case CONTACT_PERSON_INFORMATION_UPDATE_SUCCESSFUL:
    case SALARY_INFORMATION_UPDATE_SUCCESSFUL:
      authState = Object.assign({}, state, {
        ...action.payload,
      });

      storeAuthInfo(authState);

      return authState;
    default:
      return state;
  }
};

export default authReducer;
