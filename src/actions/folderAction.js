import { folderConstants } from "../constants";

import api from "../utils/api";

const fetchCreateFolderRequest = () => {
  return {
    type: folderConstants.FETCH_CREATE_FOLDER_REQUEST,
  };
};

const fetchCreateFolderSuccess = (successMessage) => {
  return {
    type: folderConstants.FETCH_CREATE_FOLDER_SUCCESS,
    payload: successMessage,
  };
};

const fetchCreateFolderFailure = (error) => {
  return {
    type: folderConstants.FETCH_CREATE_FOLDER_FAILURE,
    payload: error,
  };
};

export const fetchCreateFolder = (newFolder) => (dispatch) => {
  dispatch(fetchCreateFolderRequest());
  api
    .post("file/createFolder/", newFolder)
    .then((response) => {
      dispatch(fetchCreateFolderSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Connection Issue";
      }
      dispatch(fetchCreateFolderFailure(errorMessage));
    });
};
