import { folderConstants } from "../constants";
import { addFoldersBreadcrumbs } from "../utils/fileUtil";

const initalState = {
  isLoading: false,
  folders: [],
  breadcrumbFolders: {},
  successMessage: "",
  errorMessage: "",
};

const folderReducer = (state = initalState, action) => {
  switch (action.type) {
    case folderConstants.SET_FOLDERS_FOR_BREADCRUMBS_FILE:
      return {
        ...state,
        breadcrumbFolders: {
          ...state.breadcrumbFolders,
          ...addFoldersBreadcrumbs(action.payload),
        },
      };

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
    case folderConstants.FETCH_ALL_FOLDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case folderConstants.FETCH_ALL_FOLDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        folders: action.payload,
      };
    case folderConstants.FETCH_ALL_FOLDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default folderReducer;
