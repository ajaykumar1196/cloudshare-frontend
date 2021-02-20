import {
  Document20,
  ChevronDown20,
  ChevronUp20,
  Close32,
  Close20,
  CheckmarkFilled20,
} from "@carbon/icons-react";
import { Button, FileUploaderItem } from "carbon-components-react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  uploadFile,
  resetUploadFile,
  cancelUpload,
} from "../../actions/fileUploadAction";
import { fileUploadConstants } from "../../constants";

const FileUpload = () => {
  const { fileProgress, totalPending } = useSelector(
    (state) => state.fileUpload
  );
  const path = useSelector((state) => state.destination.currentDestination);

  const noOfFiles = Object.keys(fileProgress).length;

  const [chevron, setChevron] = useState(true);
  const [closed, setClosed] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setClosed(false);
    const filesToUpload = Object.values(fileProgress).filter(
      (file) => file.progress === 0
    );
    dispatch(uploadFile(filesToUpload, path));
  }, [noOfFiles]);

  const handleChevron = () => {
    setChevron(!chevron);
  };

  const handleClose = () => {
    dispatch(resetUploadFile());
    setClosed(true);
  };

  const handleCancel = (id, source) => {
    dispatch(cancelUpload(id, source));
  };

  return noOfFiles > 0 && !closed ? (
    <div className="fixed-bottom mb-3">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="overflow-hidden toast bg-white mw-100 show fade">
              <div className="toast-header" onClick={handleChevron}>
                <div
                  className="mr-auto w-100 py-2"
                  data-toggle="collapse"
                  data-target="#toastBody"
                  aria-expanded="false"
                  aria-controls="toastBody"
                  style={{ cursor: "pointer" }}
                >
                  <span className="mr-1">
                    {chevron ? <ChevronUp20 /> : <ChevronDown20 />}
                  </span>
                  {totalPending > 0 ? (
                    <span className="mb-0 mr-auto d-inline">
                      {totalPending} {totalPending > 1 ? "files" : "file"} left
                    </span>
                  ) : (
                    <span className="mb-0 mr-auto d-inline">
                      Upload Completed
                    </span>
                  )}
                </div>

                {totalPending <= 0 ? (
                  <Button
                    data-dismiss="toast"
                    onClick={handleClose}
                    kind="ghost"
                    size="field"
                    renderIcon={Close20}
                  >
                    Close
                  </Button>
                ) : null}
              </div>
              <div className="collapse" id="toastBody">
                <div
                  className="toast-body overflow-auto"
                  style={{
                    maxHeight: "30vh",
                    overflowY: "hidden",
                    overflowX: "scroll",
                  }}
                >
                  {noOfFiles > 0 ? (
                    <ul className="list-group list-group-flush">
                      {Object.values(fileProgress).map((item) => {
                        return (
                          <div className="mb-2" key={item.id}>
                            <div
                              className="progress progress-sm"
                              style={{
                                height: "3px",
                                translateY: "-10px",
                              }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: item.progress + "%",
                                  backgroundColor:
                                    item.status === fileUploadConstants.CANCELED
                                      ? "red"
                                      : "",
                                }}
                                aria-valuenow={item.progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <FileUploaderItem
                              style={{ minWidth: "100%" }}
                              name={item.file.name}
                              onDelete={() =>
                                handleCancel(item.id, item.source)
                              }
                              status={
                                item.status === fileUploadConstants.UPLOADING
                                  ? "edit"
                                  : item.status ===
                                    fileUploadConstants.COMPLETED
                                  ? "complete"
                                  : null
                              }
                            />
                          </div>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default FileUpload;
