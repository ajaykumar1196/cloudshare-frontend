import { userConstants } from "../constants";

const initalState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem("authToken") ? true : false,
  successMessage: "",
  errorMessage: "",
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        successMessage: "",
        errorMessage: "",
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        successMessage: "",
        errorMessage: "",
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        successMessage: "",
        errorMessage: action.payload,
      };

    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        successMessage: "",
        errorMessage: "",
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        successMessage: action.payload,
        errorMessage: "",
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        successMessage: "",
        errorMessage: action.payload,
      };

    case userConstants.LOGOUT:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        successMessage: "",
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default authReducer;
