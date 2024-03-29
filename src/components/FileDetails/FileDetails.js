import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  OverflowMenu,
  OverflowMenuItem,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarAction,
  Button,
  TableSelectAll,
  Tag,
  Modal,
  TextInput,
  TableSelectRow,
  CopyButton,
} from "carbon-components-react";
import {
  OverflowMenuVertical20,
  FolderAdd20,
  Folder20,
} from "@carbon/icons-react";

import {
  setCurrentDestination,
  fetchDestinationFiles,
} from "../../actions/destinationAction";
import { fetchFileDownload } from "../../actions/fileDownloadAction";
import { fetchCreateFolder } from "../../actions/folderAction";
import { deleteFile, renameFile, moveFile } from "../../actions/fileAction";
import { Link } from "react-router-dom";
import MoveModal from "../MoveModal/MoveModal";

export const rows = [
  {
    id: "a",
    name: "Load Balancer 3",
    protocol: "HTTP",
  },
  {
    id: "b",
    name: "Load Balancer 1",
  },
  {
    id: "c",
    name: "Load Balancer 2",
  },
  {
    id: "d",
    name: "Load Balancer 6",
  },
  {
    id: "e",
    name: "Load Balancer 4",
  },
  {
    id: "f",
    name: "Load Balancer 5",
  },
];

export const headers = [
  {
    key: "name",
    header: "File Name",
  },
  {
    key: "type",
    header: "",
  },
];

const FileDetails = () => {
  const dispatch = useDispatch();
  const { parentId } = useParams();

  const shareableLink = useSelector((state) => state.fileDownload.link);
  const files = useSelector((state) => state.destination.files);

  useEffect(() => {
    dispatch(setCurrentDestination(parentId));
    dispatch(fetchDestinationFiles(parentId));
  }, [parentId]);

  const handleFileDownload = (downloadFileId) => {
    dispatch(fetchFileDownload(downloadFileId));
  };

  const [{ id, fileName }, setFile] = useState({});

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const [openShareModal, setOpenShareModal] = useState(false);

  const [openMoveModal, setOpenMoveModal] = useState(false);

  const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const onDelete = (id, fileName) => {
    setOpenDeleteModal(true);
    console.log("onDelete - " + id + " " + fileName);
    setFile({ id: id, fileName: fileName });
  };

  const onDeleteConfirm = (ok) => {
    if (ok) {
      console.log("onDeleteConfirm - " + id + " " + fileName);
      dispatch(deleteFile(id));
      dispatch(fetchDestinationFiles(parentId));
    } else {
      console.log("Not ok");
    }
    setFile({});
  };

  const onRename = (id, fileName) => {
    setOpenRenameModal(true);
    console.log("onRename - " + id + " " + fileName);
    setNewFileName(fileName);
    setFile({ id: id, fileName: fileName });
  };

  const onRenameConfirm = (ok) => {
    if (ok) {
      console.log(
        "onRenameConfirm - " + id + " " + fileName + " --> " + newFileName
      );
      dispatch(renameFile(id, newFileName));
      dispatch(fetchDestinationFiles(parentId));
    } else {
      console.log("Not ok");
    }
    setFile({});
  };

  const onShare = (id, fileName) => {
    setOpenShareModal(true);
    dispatch(fetchFileDownload(id));
    console.log("onShare - " + id + " " + fileName);
    setFile({ id: id, fileName: fileName });
  };

  const onMove = (id, fileName) => {
    setOpenMoveModal(true);
    console.log("onMove - " + id + " " + fileName);
    setFile({ id: id, fileName: fileName });
  };

  const onMoveConfirm = (ok, newParentId) => {
    if (ok) {
      console.log("onMoveConfirm - " + parentId + "-->" + newParentId);
      dispatch(moveFile(id, newParentId));
      dispatch(fetchDestinationFiles(parentId));
    } else {
      console.log("Not ok");
    }
    setFile({});
  };

  const onCreateFolder = () => {
    setOpenCreateFolderModal(true);
    console.log("onCreateFolder - " + newFolderName);
    setNewFolderName(newFolderName.trim());
    setFile({ id: id, fileName: fileName });
  };

  const onCreateFolderConfirm = (ok) => {
    if (ok) {
      console.log("onCreateFolderConfirm - " + newFolderName.trim());
      let folder = { folderName: newFolderName.trim(), parentId: parentId };
      dispatch(fetchCreateFolder(folder));
    } else {
      console.log("Not ok");
    }
    setNewFolderName("");
  };

  return (
    <div className="bx--row">
      <div className="bx--col-lg-16">
        {files.length > 0 ? (
          <DataTable rows={files} headers={headers}>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getSelectionProps,
              getToolbarProps,
              onInputChange,
              selectedRows,
            }) => (
              <TableContainer>
                <TableToolbar {...getToolbarProps()}>
                  <TableToolbarContent>
                    <TableToolbarMenu renderIcon={OverflowMenuVertical20}>
                      <TableToolbarAction
                      // onClick={() => batchActionClick(selectedRows)}
                      >
                        Move
                      </TableToolbarAction>
                      <TableToolbarAction
                        onClick={() => console.log(selectedRows)}
                      >
                        Selected
                      </TableToolbarAction>
                    </TableToolbarMenu>

                    <Button onClick={onCreateFolder} renderIcon={FolderAdd20}>
                      Add Folder
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table overflowMenuOnHover={false}>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />

                      {headers.map((header) => (
                        <TableHeader
                          key={header.key}
                          {...getHeaderProps({ header })}
                        >
                          {header.header}

                          {selectedRows.length !== 0 &&
                          header.key === "name" ? (
                            <Tag type="blue">
                              {selectedRows.length} files selected
                            </Tag>
                          ) : null}
                        </TableHeader>
                      ))}
                      <TableHeader />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />

                        <TableCell key={row.cells[0].id}>
                          {row.cells[1].value === "folder" ? (
                            <Link to={"/" + row.id}>
                              <Folder20 className="mr-1" />
                              {row.cells[0].value}
                            </Link>
                          ) : (
                            row.cells[0].value
                          )}
                        </TableCell>

                        <TableCell className="bx--table-column-menu">
                          <OverflowMenu className="ml-auto" light flipped>
                            <OverflowMenuItem
                              onClick={() =>
                                onRename(row.id, row.cells[0].value)
                              }
                              itemText="Rename"
                            ></OverflowMenuItem>
                            {row.cells[1].value !== "folder" ? (
                              <OverflowMenuItem
                                onClick={() => handleFileDownload(row.id)}
                                itemText="Download"
                              ></OverflowMenuItem>
                            ) : null}
                            {row.cells[1].value !== "folder" ? (
                              <OverflowMenuItem
                                itemText="Share"
                                onClick={() =>
                                  onShare(row.id, row.cells[0].value)
                                }
                              ></OverflowMenuItem>
                            ) : null}
                            <OverflowMenuItem
                              onClick={() => onMove(row.id, row.cells[0].value)}
                              itemText="Move"
                            ></OverflowMenuItem>
                            <OverflowMenuItem
                              hasDivider
                              isDelete
                              itemText="Delete"
                              onClick={() =>
                                onDelete(row.id, row.cells[0].value)
                              }
                            ></OverflowMenuItem>
                          </OverflowMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
        ) : (
          "Upload Files"
        )}

        <ModalWrapper>
          {openDeleteModal ? (
            <Modal
              modalHeading={
                'Are you sure you want to delete "' +
                fileName +
                '" from Cloudshare?'
              }
              primaryButtonText="Delete"
              secondaryButtonText="Cancel"
              danger
              shouldSubmitOnEnter
              open={openDeleteModal}
              onRequestSubmit={() => {
                onDeleteConfirm(true);
                setOpenDeleteModal(false);
              }}
              onRequestClose={() => {
                onDeleteConfirm(false);
                setOpenDeleteModal(false);
              }}
            ></Modal>
          ) : null}
          {openRenameModal ? (
            <Modal
              modalHeading="Rename File"
              primaryButtonText="Submit"
              secondaryButtonText="Cancel"
              shouldSubmitOnEnter
              open={openRenameModal}
              onRequestSubmit={() => {
                onRenameConfirm(true);
                setOpenRenameModal(false);
              }}
              primaryButtonDisabled={newFileName === ""}
              onRequestClose={() => {
                onRenameConfirm(false);
                setOpenRenameModal(false);
              }}
            >
              <TextInput
                invalid={newFileName === ""}
                invalidText="A valid name is required"
                data-modal-primary-focus
                value={newFileName}
                id="rename-file-selected-row"
                labelText="Name"
                placeholder="New file name"
                onChange={(e) => setNewFileName(e.target.value)}
              />
            </Modal>
          ) : null}

          {openShareModal ? (
            <Modal
              modalHeading="Share Link"
              secondaryButtonText="Close"
              shouldSubmitOnEnter
              open={openShareModal}
              passiveModal
              onRequestClose={() => {
                onRenameConfirm(false);
                setOpenShareModal(false);
              }}
            >
              <div className="d-flex pb-5">
                <TextInput
                  invalid={shareableLink === ""}
                  invalidText="A valid name is required"
                  data-modal-primary-focus
                  value={shareableLink}
                  id="share-file-selected-row"
                  placeholder="Link"
                  // onChange={(e) => setNewFileName(e.target.value)}
                />
                <CopyButton
                  onClick={() => {
                    navigator.clipboard.writeText(shareableLink);
                  }}
                ></CopyButton>
              </div>
            </Modal>
          ) : null}

          {openMoveModal ? (
            <MoveModal
              fileName={fileName}
              fileId={106}
              openMoveModal={openMoveModal}
              onMoveConfirm={onMoveConfirm}
              setOpenMoveModal={setOpenMoveModal}
            ></MoveModal>
          ) : null}

          {openCreateFolderModal ? (
            <Modal
              modalHeading="Create Folder"
              primaryButtonText="Create"
              secondaryButtonText="Cancel"
              shouldSubmitOnEnter
              open={openCreateFolderModal}
              onRequestSubmit={() => {
                onCreateFolderConfirm(true);
                setOpenCreateFolderModal(false);
              }}
              primaryButtonDisabled={newFolderName.trim() === ""}
              onRequestClose={() => {
                onCreateFolderConfirm(false);
                setOpenCreateFolderModal(false);
              }}
            >
              <TextInput
                data-modal-primary-focus
                value={newFolderName}
                id="create-folder"
                labelText="Name"
                placeholder="New folder name"
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </Modal>
          ) : null}
        </ModalWrapper>
      </div>
    </div>
  );
};

export default FileDetails;
