import { profileConstants } from "../constants";

const initalState = {
  isLoading: false,
  errorMessage: "",
};

const profileReducer = (state = initalState, action) => {
  switch (action.type) {
    case profileConstants.FETCH_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case profileConstants.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case profileConstants.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
