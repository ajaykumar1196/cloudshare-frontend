import React from "react";
import { render } from "react-dom";
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
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Button,
  TableBatchActions,
  TableSelectAll,
  TableSelectRow,
} from "carbon-components-react";
export const rows = [
  {
    id: "a",
    name: "Load Balancer 3",
    protocol: "HTTP",
    port: 3000,
  },
  {
    id: "b",
    name: "Load Balancer 1",
    protocol: "HTTP",
    port: 443,
  },
  {
    id: "c",
    name: "Load Balancer 2",
    protocol: "HTTP",
    port: 80,
  },
  {
    id: "d",
    name: "Load Balancer 6",
    protocol: "HTTP",
    port: 3000,
  },
  {
    id: "e",
    name: "Load Balancer 4",
    protocol: "HTTP",
    port: 443,
  },
  {
    id: "f",
    name: "Load Balancer 5",
    protocol: "HTTP",
    port: 80,
  },
];

export const headers = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "protocol",
    header: "Protocol",
  },
  {
    key: "port",
    header: "Port",
  },
];

export const batchActionClick = (selectedRows) => () => selectedRows;

const RepoTable = () => (
  <DataTable rows={rows} headers={headers}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getToolbarProps,
      getBatchActionProps,
      onInputChange,
      selectedRows,
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer>
        <TableToolbar {...getToolbarProps()}>
          <TableBatchActions {...getBatchActionProps()}>
            <TableBatchAction
              tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
              onClick={batchActionClick(selectedRows)}
            >
              Delete
            </TableBatchAction>
            <TableBatchAction
              tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
              onClick={batchActionClick(selectedRows)}
            >
              Save
            </TableBatchAction>
            <TableBatchAction
              tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
              onClick={batchActionClick(selectedRows)}
            >
              Download
            </TableBatchAction>
          </TableBatchActions>
          <TableToolbarContent>
            <TableToolbarSearch
              defaultExpanded
              tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
              onChange={onInputChange}
            />
            <TableToolbarMenu
              tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            >
              <TableToolbarAction onClick={() => alert("Alert 1")}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={() => alert("Alert 2")}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={() => alert("Alert 3")}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button
              tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
              size="small"
              kind="primary"
            >
              Add new
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              <TableSelectAll {...getSelectionProps()} />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} {...getRowProps({ row })}>
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export default RepoTable;
