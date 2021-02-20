import React, { useRef, useState } from "react";
import "./_dropzone.scss";
import { useDispatch } from "react-redux";
import { setUploadFile } from "../../actions/fileUploadAction";
import { Upload20 } from "@carbon/icons-react";

const Dropzone = (props) => {
  const fileInputRef = useRef();
  const [highlight, setHighlight] = useState(false);

  const dispatch = useDispatch();

  const onFilesAdded = (event) => {
    if (props.disabled) return;
    const files = event.target.files;
    dispatch(setUploadFile(files));
  };

  const openFileDialog = () => {
    if (props.disabled) return;
    fileInputRef.current.click();
  };

  const onDrop = (event) => {
    event.preventDefault();
    if (props.disabled) return;
    const files = event.dataTransfer.files;
    dispatch(setUploadFile(files));
    setHighlight(false);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    if (props.disabled) return;
    setHighlight(true);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  return (
    <div
      className={`dropzone card mb-3 ${highlight ? "highlight" : ""}`}
      onClick={openFileDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{ cursor: props.disabled ? "default" : "pointer" }}
    >
      <span className="mb-1 text-primary">
        <Upload20 />
      </span>
      <span className="small">Click/drag files here to upload</span>
      <input
        ref={fileInputRef}
        className="fileInput"
        type="file"
        multiple
        onChange={onFilesAdded}
      />
    </div>
  );
};

export default Dropzone;
