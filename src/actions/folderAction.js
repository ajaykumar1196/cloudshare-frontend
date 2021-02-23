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

export const setAllFolders = (folders) => {
  return {
    type: folderConstants.SET_FOLDERS_FOR_BREADCRUMBS_FILE,
    payload: folders,
  };
};

const fetchAllFoldersRequest = () => {
  return {
    type: folderConstants.FETCH_ALL_FOLDERS_REQUEST,
  };
};

const fetchAllFoldersSuccess = (folders) => {
  return {
    type: folderConstants.FETCH_ALL_FOLDERS_SUCCESS,
    payload: folders,
  };
};

const fetchAllFoldersFailure = (error) => {
  return {
    type: folderConstants.FETCH_ALL_FOLDERS_FAILURE,
    payload: error,
  };
};

export const fetchAllFolders = (parentId) => (dispatch) => {
  dispatch(fetchAllFoldersRequest());
  api
    .post("file/allFolders", { parentId: parentId })
    .then((response) => {
      dispatch(fetchAllFoldersSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Connection Issue";
      }
      dispatch(fetchAllFoldersFailure(errorMessage));
    });
};
