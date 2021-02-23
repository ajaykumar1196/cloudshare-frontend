import React, { useEffect, useState } from "react";
import {
  ClickableTile,
  Modal,
  Breadcrumb,
  BreadcrumbItem,
} from "carbon-components-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFolders, setAllFolders } from "../../actions/folderAction";

import { Folder20 } from "@carbon/icons-react";

const MoveModal = ({
  fileName,
  fileId,
  openMoveModal,
  onMoveConfirm,
  setOpenMoveModal,
}) => {
  fileId = 106;
  const dispatch = useDispatch();
  const [parentId, setParentId] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Breadcrumbs container list
  let _bc = [{ id: null, name: "Home" }];

  const breadcrumbFolders = useSelector(
    (state) => state.folder.breadcrumbFolders
  );

  const folders = useSelector((state) => state.folder.folders);

  function createBreadCrumbs(parentId) {
    if (parentId == null) {
      return;
    }
    let parent = breadcrumbFolders[parentId];
    createBreadCrumbs(parent.parentId);
    _bc = [..._bc, parent];
    return;
  }

  useEffect(() => {
    dispatch(fetchAllFolders(parentId));
  }, [parentId]);

  useEffect(() => {
    dispatch(setAllFolders(folders));
    createBreadCrumbs(parentId);
    setBreadcrumbs(_bc);
  }, [folders]);

  return (
    <React.Fragment>
      <Modal
        modalHeading={'Move file "' + fileName + '" to'}
        primaryButtonText="Move"
        secondaryButtonText="Cancel"
        shouldSubmitOnEnter
        open={openMoveModal}
        onRequestSubmit={() => {
          onMoveConfirm(true, parentId);
          setOpenMoveModal(false);
        }}
        onRequestClose={() => {
          onMoveConfirm(false);
          setOpenMoveModal(false);
        }}
      >
        <div>
          <Breadcrumb noTrailingSlash className="mb-3">
            {breadcrumbs.map((item) => (
              <BreadcrumbItem onClick={() => setParentId(item.id)} href="#">
                {item.name}
              </BreadcrumbItem>
            ))}
            {/* {breadcrumbs.length > 0
              ? breadcrumbs.map(
                  (item) => '<BreadcrumbItem>"asd"</BreadcrumbItem>'
                )
              : ""} */}
            {/* <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
            <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem> */}
          </Breadcrumb>
          {folders
            .filter((item) => item.type === "folder")
            .map((item) => (
              <div>
                <ClickableTile
                  className="mb-2"
                  light
                  handleClick={() => setParentId(item.id)}
                >
                  <Folder20 className="mr-3" />
                  {item.name}
                </ClickableTile>
              </div>
            ))}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MoveModal;
