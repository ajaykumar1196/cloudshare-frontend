import api from "../utils/api";
import { fileUploadConstants } from "../constants";
import axios from "axios";

export const setUploadFile = (data) => ({
  type: fileUploadConstants.SET_UPLOAD_FILE,
  payload: data,
});

export const setUploadProgress = (id, progress) => ({
  type: fileUploadConstants.SET_UPLOAD_PROGRESS,
  payload: {
    id,
    progress,
  },
});

export const successUploadFile = (id) => ({
  type: fileUploadConstants.SUCCESS_UPLOAD_FILE,
  payload: id,
});

export const cancelUploadFile = (id) => {
  return {
    type: fileUploadConstants.CANCELED_UPLOAD_FILE,
    payload: id,
  };
};

export const failureUploadFile = (id) => ({
  type: fileUploadConstants.FAILURE_UPLOAD_FILE,
  payload: id,
});

export const resetUploadFile = () => ({
  type: fileUploadConstants.RESET_UPLOAD_FILE,
});

export const setCancelToken = (id, source) => ({
  type: fileUploadConstants.SET_CANCEL_TOKEN,
  payload: {
    id,
    source,
  },
});

export const uploadFile = (files, path) => (dispatch) => {
  if (files.length) {
    files.forEach((file) => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      dispatch(setCancelToken(file.id, source));
      const formPayload = new FormData();
      formPayload.append("file", file.file);
      formPayload.append("destination", path);
      api
        .post("file/upload", formPayload, {
          onUploadProgress: (progress) => {
            const { loaded, total } = progress;
            const percentageProgress = Math.floor((loaded / total) * 100);
            dispatch(setUploadProgress(file.id, percentageProgress));
          },
          cancelToken: source.token,
        })
        .then((response) => {
          dispatch(successUploadFile(file.id));
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            dispatch(cancelUploadFile(file.id));
          } else {
            dispatch(failureUploadFile(file.id));
          }
        });
    });
  }
};

export const cancelUpload = (id, source) => (dispatch) => {
  source.cancel("File upload cancelled ");
};
