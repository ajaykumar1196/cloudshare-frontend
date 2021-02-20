import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
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
import { OverflowMenuVertical20, FolderAdd20 } from "@carbon/icons-react";

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

const FileDetails = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const files = useSelector((state) => state.destination.files);

  useEffect(() => {
    dispatch(setCurrentDestination(path));
    dispatch(fetchDestinationFiles(path));
  }, [path]);

  const handleFileDownload = (downloadFileId) => {
    dispatch(fetchFileDownload(downloadFileId));
  };

  return (
    <div className="bx--row">
      <div className="bx--col-lg-16">
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
                  <TableToolbarSearch
                    expanded
                    placeHolderText="Search"
                    onChange={onInputChange}
                  />

                  <TableToolbarMenu renderIcon={OverflowMenuVertical20}>
                    <TableToolbarAction
                    // onClick={() => batchActionClick(selectedRows)}
                    >
                      Move
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert("Alert 2")}>
                      Delete
                    </TableToolbarAction>
                  </TableToolbarMenu>

                  <Button hasIconOnly renderIcon={FolderAdd20}></Button>
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

                        {selectedRows.length !== 0 ? (
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
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                      <TableCell className="bx--table-column-menu">
                        <OverflowMenu className="ml-auto" light flipped>
                          <OverflowMenuItem itemText="Move"></OverflowMenuItem>
                          <OverflowMenuItem
                            onClick={() => handleFileDownload(row.id)}
                            itemText="Download"
                          ></OverflowMenuItem>
                          <OverflowMenuItem
                            itemText="Share"
                            // onClick={() => setOpen(true)}
                          ></OverflowMenuItem>
                          <OverflowMenuItem
                            hasDivider
                            isDelete
                            itemText="Delete"
                            // onClick={() => batchActionClick(row)}
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
      </div>
    </div>
  );
};

export default FileDetails;
