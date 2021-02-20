import { fileDownloadConstants } from "../constants";

import api from "../utils/api";

const fetchFileDownloadRequest = () => {
  return {
    type: fileDownloadConstants.FETCH_FILE_DOWNLOAD_REQUEST,
  };
};

const fetchFileDownloadSuccess = (link) => {
  return {
    type: fileDownloadConstants.FETCH_FILE_DOWNLOAD_SUCCESS,
    payload: link,
  };
};

const fetchFileDownloadFailure = (error) => {
  return {
    type: fileDownloadConstants.FETCH_FILE_DOWNLOAD_FAILURE,
    payload: error,
  };
};

export const fetchFileDownload = (id) => (dispatch) => {
  dispatch(fetchFileDownloadRequest());
  api
    .get("file/download/" + id)
    .then((response) => {
      dispatch(fetchFileDownloadSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Connection Issue";
      }
      dispatch(fetchFileDownloadFailure(errorMessage));
    });
};
