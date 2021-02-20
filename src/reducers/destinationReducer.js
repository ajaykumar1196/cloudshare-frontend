import { destinationConstants } from "../constants";

const initalState = {
  files: [],
  currentDestination: "",
  isLoading: false,
  errorMessage: "",
};

const destinationReducer = (state = initalState, action) => {
  switch (action.type) {
    case destinationConstants.SET_CURRENT_DESTINATION:
      return {
        ...state,
        currentDestination: action.payload,
      };
    case destinationConstants.FETCH_DESTINATION_FILES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case destinationConstants.FETCH_DESTINATION_FILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        files: action.payload,
      };
    case destinationConstants.FETCH_DESTINATION_FILES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default destinationReducer;
