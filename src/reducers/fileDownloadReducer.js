import { fileDownloadConstants } from "../constants";

const initalState = {
  isLoading: false,
  link: "",
  errorMessage: "",
};

const fileDownloadReducer = (state = initalState, action) => {
  switch (action.type) {
    case fileDownloadConstants.FETCH_FILE_DOWNLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case fileDownloadConstants.FETCH_FILE_DOWNLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        link: action.payload,
      };
    case fileDownloadConstants.FETCH_FILE_DOWNLOAD_FAILURE:
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
