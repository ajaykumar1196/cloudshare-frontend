import { profileConstants } from "../constants";
import api from "../utils/api";

const fetchProfileRequest = () => {
  return {
    type: profileConstants.FETCH_PROFILE_REQUEST,
  };
};

const fetchProfileSuccess = (profile) => {
  return {
    type: profileConstants.FETCH_PROFILE_SUCCESS,
    payload: profile
  };
};

const fetchProfileFailure = (error) => {
  return {
    type: profileConstants.FETCH_PROFILE_FAILURE,
    payload: error,
  };
};

export const fetchProfile = () => (dispatch) => {
  dispatch(fetchProfileRequest());
  api
    .get("me")
    .then((response) => {
      dispatch(fetchProfileSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      console.log(error.response);
      if (error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Connection Issue";
      }
      dispatch(fetchProfileFailure(errorMessage));
    });
};
