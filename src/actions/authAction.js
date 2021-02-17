import axios from "axios";
import { userConstants } from "../constants";
import api from "../utils/api";

const API_URL = process.env.REACT_APP_BASE_URL;

const loginRequest = () => {
  return {
    type: userConstants.LOGIN_REQUEST,
  };
};

const loginSuccess = () => {
  return {
    type: userConstants.LOGIN_SUCCESS,
  };
};

const loginFailure = (error) => {
  return {
    type: userConstants.LOGIN_FAILURE,
    payload: error,
  };
};

export const login = (credentials) => (dispatch) => {
  dispatch(loginRequest());
  api
    .post("auth/login", credentials)
    .then((response) => {
      if (response.data) {
        localStorage.setItem("authToken", response.data);
        dispatch(loginSuccess());
      }
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = "Error connecting to server";
      }
      dispatch(loginFailure(errorMessage));
    });
};

const registerRequest = () => {
  return {
    type: userConstants.REGISTER_REQUEST,
  };
};

const registerSuccess = (successMessage) => {
  return {
    type: userConstants.REGISTER_SUCCESS,
    payload: successMessage,
  };
};

const registerFailure = (error) => {
  return {
    type: userConstants.REGISTER_FAILURE,
    payload: error,
  };
};

export const register = (details) => (dispatch) => {
  dispatch(registerRequest());
  axios
    .post(API_URL + "auth/signup", details)
    .then((response) => {
      dispatch(registerSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = "Error connecting to server";
      }
      dispatch(registerFailure(errorMessage));
    });
};

export const logout = () => {
  localStorage.removeItem("authToken");
  return {
    type: userConstants.LOGOUT,
  };
};
