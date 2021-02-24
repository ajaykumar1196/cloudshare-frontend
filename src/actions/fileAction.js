import api from "../utils/api";
import { fileConstants } from "../constants";

const renameRequest = () => {
  return {
    type: fileConstants.RENAME_REQUEST,
  };
};

const renameSuccess = (files) => {
  return {
    type: fileConstants.RENAME_SUCCESS,
    payload: files,
  };
};

const renameFailure = (error) => {
  return {
    type: fileConstants.RENAME_FAILURE,
    payload: error,
  };
};

export const renameFile = (id, name) => (dispatch) => {
  dispatch(renameRequest());
  api
    .put("file/rename", { id: id, name: name })
    .then((response) => {
      dispatch(renameSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Connection Issue";
      }
      dispatch(renameFailure(errorMessage));
    });
};

const deleteRequest = () => {
  return {
    type: fileConstants.DELETE_REQUEST,
  };
};

const deleteSuccess = (files) => {
  return {
    type: fileConstants.DELETE_SUCCESS,
    payload: files,
  };
};

const deleteFailure = (error) => {
  return {
    type: fileConstants.DELETE_FAILURE,
    payload: error,
  };
};

export const deleteFile = (id, name) => (dispatch) => {
  dispatch(deleteRequest());
  api
    .delete("file/delete/" + id)
    .then((response) => {
      dispatch(deleteSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Connection Issue";
      }
      dispatch(deleteFailure(errorMessage));
    });
};

const moveRequest = () => {
  return {
    type: fileConstants.MOVE_REQUEST,
  };
};

const moveSuccess = (files) => {
  return {
    type: fileConstants.MOVE_SUCCESS,
    payload: files,
  };
};

const moveFailure = (error) => {
  return {
    type: fileConstants.MOVE_FAILURE,
    payload: error,
  };
};

export const moveFile = (id, parentId) => (dispatch) => {
  dispatch(moveRequest());
  api
    .put("file/move", { id: id, parentId: parentId })
    .then((response) => {
      dispatch(moveSuccess(response.data));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data;
      } else {
        errorMessage = "Connection Issue";
      }
      dispatch(moveFailure(errorMessage));
    });
};
