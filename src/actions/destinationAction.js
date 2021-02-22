import api from "../utils/api";
import { destinationConstants } from "../constants";

export const setCurrentDestination = (parentId) => ({
  type: destinationConstants.SET_CURRENT_DESTINATION,
  payload: parentId,
});

const fetchDestinationFilesRequest = () => {
  return {
    type: destinationConstants.FETCH_DESTINATION_FILES_REQUEST,
  };
};

const fetchDestinationFilesSuccess = (files) => {
  return {
    type: destinationConstants.FETCH_DESTINATION_FILES_SUCCESS,
    payload: files,
  };
};

const fetchDestinationFilesFailure = (error) => {
  return {
    type: destinationConstants.FETCH_DESTINATION_FILES_FAILURE,
    payload: error,
  };
};

export const fetchDestinationFiles = (parentId) => (dispatch) => {
  dispatch(fetchDestinationFilesRequest());
  api
    .post("file/all", { parentId: parentId })
    .then((response) => {
      dispatch(fetchDestinationFilesSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Connection Issue";
      }
      dispatch(fetchDestinationFilesFailure(errorMessage));
    });
};
