import { fileUploadConstants } from "../constants";
import { modifyFiles } from "../utils/fileUtil";

const initalState = {
  fileProgress: {},
  totalPending: 0,
};

const fileUploadReducer = (state = initalState, action) => {
  switch (action.type) {
    case fileUploadConstants.SET_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          ...modifyFiles(state.fileProgress, action.payload),
        },
        totalPending: state.totalPending + action.payload.length,
      };

    case fileUploadConstants.SET_UPLOAD_PROGRESS:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            progress: action.payload.progress,
            status: fileUploadConstants.UPLOADING,
          },
        },
      };

    case fileUploadConstants.SUCCESS_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: fileUploadConstants.COMPLETED,
          },
        },
        totalPending: state.totalPending - 1,
      };

    case fileUploadConstants.CANCELED_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: fileUploadConstants.CANCELED,
          },
        },
        totalPending: state.totalPending - 1,
      };

    case fileUploadConstants.SET_CANCEL_TOKEN:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            source: action.payload.source,
          },
        },
      };

    case fileUploadConstants.FAILURE_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: fileUploadConstants.FAILURE,
            progress: 0,
          },
        },
      };

    case fileUploadConstants.RESET_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {},
        totalPending: 0,
      };
    default:
      return state;
  }
};

export default fileUploadReducer;
