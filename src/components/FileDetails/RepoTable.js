import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "carbon-components/css/carbon-components.min.css";
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
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Button,
  TableSelectAll,
  Tag,
  Modal,
  Search,
  TableSelectRow,
} from "carbon-components-react";
import {
  OverflowMenuVertical20,
  FolderAdd20,
  Delete20,
} from "@carbon/icons-react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentDestination,
  fetchDestinationFiles,
} from "../../actions/destinationAction";

import { fetchFileDownload } from "../../actions/fileDownloadAction";

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
];

const RepoTable = () => {
  const path = "useLocation()";
  let lastPath = "";
  let lastRouteName = "";

  // console.log(path);

  const files = useSelector((state) => state.destination.files);
  const link = useSelector((state) => state.fileDownload.link);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setCurrentDestination(path));
  //   dispatch(fetchDestinationFiles(path));
  // }, [path]);

  useEffect(() => {
    console.log(link);
    const url = link;
    var ifrm = document.createElement("object");
    ifrm.setAttribute("data", url);
    document.body.appendChild(ifrm);
  }, [link]);

  const [open, setOpen] = useState(false);

  const withStateManagerProps = () => ({
    className: "some-class",
    passiveModal: false,
    danger: false,
    alert: false,
    shouldSubmitOnEnter: false,
    hasScrollingContent: false,
    modalHeading: "Modal Heading",
    modalLabel: "Label",
    modalAriaLabel:
      "A label to be read by screen readers on the modal root node",
    primaryButtonText: "Primary Button",
    secondaryButtonText: "Secondary Button",
    selectorPrimaryFocus: "[data-modal-primary-focus]",
    size: "sm",
    iconDescription: "Close",
    onBlur: console.log("onBlur"),
    onClick: console.log("onClick"),
    onFocus: console.log("onFocus"),
    onRequestClose: console.log("onRequestClose"),
    onRequestSubmit: () => console.log("onRequestSubmit"),
    onSecondarySubmit: console.log("onSecondarySubmit"),
  });
  const { size, ...rest } = withStateManagerProps();

  const handleInput = (e) => {
    console.log(e);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>Hello</Button>

      <Modal
        {...rest}
        size={size || undefined}
        open={open}
        onRequestClose={() => setOpen(false)}
      >
        {true && (
          <>
            <Search onChange={handleInput} id="search-1" />
          </>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default RepoTable;
