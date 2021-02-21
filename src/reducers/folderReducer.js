import { folderConstants } from "../constants";

const initalState = {
  isLoading: false,
  successMessage: "",
  errorMessage: "",
};

const fileDownloadReducer = (state = initalState, action) => {
  switch (action.type) {
    case folderConstants.FETCH_CREATE_FOLDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case folderConstants.FETCH_CREATE_FOLDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.successMessage,
      };
    case folderConstants.FETCH_CREATE_FOLDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default fileDownloadReducer;
