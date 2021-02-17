import api from "../utils/api";
import { fileUploadConstants } from "../constants";

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

export const cancelUploadFile = (id) => ({
  type: fileUploadConstants.CANCELED_UPLOAD_FILE,
  payload: id,
});

export const failureUploadFile = (id) => ({
  type: fileUploadConstants.FAILURE_UPLOAD_FILE,
  payload: id,
});

export const resetUploadFile = () => ({
  type: fileUploadConstants.RESET_UPLOAD_FILE,
});

export const uploadFile = (files) => (dispatch) => {
  if (files.length) {
    files.forEach((file) => {
      const formPayload = new FormData();
      formPayload.append("file", file.file);
      formPayload.append("parentFolder", "dashboard");
      api
        .post("file/upload", formPayload, {
          onUploadProgress: (progress) => {
            const { loaded, total } = progress;
            const percentageProgress = Math.floor((loaded / total) * 100);
            dispatch(setUploadProgress(file.id, percentageProgress));
          },
        })
        .then((response) => {
          dispatch(successUploadFile(file.id));
        })
        .catch((error) => {
          dispatch(failureUploadFile(file.id));
        });
    });
  }
};
