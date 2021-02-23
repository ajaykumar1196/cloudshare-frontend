import React, { useEffect, useState } from "react";
import "./move-modal.scss";
import {
  ClickableTile,
  Modal,
  Breadcrumb,
  BreadcrumbItem,
  OverflowMenu,
  OverflowMenuItem,
  UnorderedList,
  ListItem,
} from "carbon-components-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFolders, setAllFolders } from "../../actions/folderAction";

import { Folder20, OverflowMenuHorizontal16 } from "@carbon/icons-react";

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
          <Breadcrumb
            noTrailingSlash
            className="mb-3 overflow-hidden bx--text-truncate--end"
          >
            {breadcrumbs.length <= 2 ? (
              breadcrumbs.map((item) => (
                <BreadcrumbItem
                  className="d-inline"
                  isCurrentPage={item.id === parentId}
                  onClick={() => setParentId(item.id)}
                  href="#"
                >
                  {item.name}
                </BreadcrumbItem>
              ))
            ) : (
              <div className="d-flex align-items-center">
                <BreadcrumbItem
                  className="d-inline"
                  isCurrentPage={breadcrumbs[0].id === parentId}
                  onClick={() => setParentId(breadcrumbs[0].id)}
                  href="#"
                >
                  {breadcrumbs[0].name}
                </BreadcrumbItem>
                <OverflowMenu
                  renderIcon={OverflowMenuHorizontal16}
                  className="d-flex align-items-center"
                >
                  {breadcrumbs.slice(1, breadcrumbs.length - 1).map((item) => (
                    <OverflowMenuItem
                      itemText={item.name}
                      onClick={() => setParentId(item.id)}
                    />
                  ))}
                </OverflowMenu>
                <span className="mx-2">/</span>
                <BreadcrumbItem
                  className="d-inline"
                  isCurrentPage={
                    breadcrumbs[breadcrumbs.length - 1].id === parentId
                  }
                  onClick={() =>
                    setParentId(breadcrumbs[breadcrumbs.length - 1].id)
                  }
                  href="#"
                >
                  {breadcrumbs[breadcrumbs.length - 1].name}
                </BreadcrumbItem>
              </div>
            )}
          </Breadcrumb>
          <div style={{ minHeight: "50px" }}>
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
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MoveModal;
