import { combineReducers } from "redux";
import auth from "./authReducer";
import profile from "./profileReducer";
import fileUpload from "./fileUploadReducer";
import destination from "./destinationReducer";
import fileDownload from "./fileDownloadReducer";
import folder from "./folderReducer";

const rootReducer = combineReducers({
  auth,
  profile,
  fileUpload,
  destination,
  fileDownload,
  folder,
});
export default rootReducer;
