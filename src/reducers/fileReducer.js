import { fileConstants } from "../constants";

const initalState = {
  isLoading: false,
  successMessage: "",
  errorMessage: "",
};

const fileReducer = (state = initalState, action) => {
  switch (action.type) {
    case fileConstants.RENAME_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case fileConstants.RENAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.successMessage,
      };
    case fileConstants.RENAME_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };

    case fileConstants.DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case fileConstants.DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.successMessage,
      };
    case fileConstants.DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };

    case fileConstants.MOVE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case fileConstants.MOVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.successMessage,
      };
    case fileConstants.MOVE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default fileReducer;
