import { combineReducers } from "redux";
import auth from "./authReducer";
import profile from "./profileReducer";
import fileUpload from "./fileUploadReducer";
import destination from "./destinationReducer";

const rootReducer = combineReducers({
  auth,
  profile,
  fileUpload,
  destination,
});
export default rootReducer;
