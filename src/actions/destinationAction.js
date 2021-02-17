import api from "../utils/api";
import { destinationConstants } from "../constants";

export const setCurrentDestination = (path) => ({
  type: destinationConstants.SET_CURRENT_DESTINATION,
  payload: path,
});

const fetchDestinationFilesRequest = () => {
  return {
    type: destinationConstants.FETCH_DESTINATION_FILES_REQUEST,
  };
};

const fetchDestinationFilesSuccess = (profile) => {
  return {
    type: destinationConstants.FETCH_DESTINATION_FILES_SUCCESS,
    payload: profile,
  };
};

const fetchDestinationFilesFailure = (error) => {
  return {
    type: destinationConstants.FETCH_DESTINATION_FILES_FAILURE,
    payload: error,
  };
};

export const fetchDestinationFiles = (path) => (dispatch) => {
  dispatch(fetchDestinationFilesRequest());
  api
    .post("file/all", { path: path.pathname })
    .then((response) => {
      dispatch(fetchDestinationFilesSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      console.log(error.response);
      if (error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Connection Issue";
      }
      dispatch(fetchDestinationFilesFailure(errorMessage));
    });
};
