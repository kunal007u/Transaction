import {
  Avatar,
  MenuItem,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import { BsBank2 } from "react-icons/bs";
import {
  FaDownload,
  FaEdit,
  FaEye,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import "./CustomShortingMuiTable.css";

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, columns } = props;

  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead className="table-head">
      <TableRow className="table-head-row">
        {columns?.map((column) => (
          <TableCell
            key={column.id}
            sortDirection={orderBy === column.id ? order : false}
            width={column.width}
            className={`table-head-col ${column?.className}`}
          >
            {column.sortable ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
                style={{ color: "white !important" }}
              >
                <span style={{ color: "white" }}>{column.label}</span>
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function CustomShortingMuiTable(props) {
  const {
    columns,
    rows = [],
    onEdit,
    onDelete,
    isLoading,
    background,
    onInfo,
    isViewAction = false,
    isDeleteAction = false,
    isDownloadAction = false,
    isEditAction = false,
    className,
    isInfoAction,
    searchKey,
    firstNumber,
    isPaymentAction,
    isBankDetails,
    onBankDetails,
  } = props;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(
    columns && columns.length > 0 ? columns[0].id : ""
  );
  const [anchorEl, setAnchorEl] = useState(null);

  // const CustomWidthTooltip = styled(({ className, ...props } ) => (
  //     <Tooltip {...props} classes={{ popper: className }} />
  // ))({
  //     [`& .${tooltipClasses.tooltip}`]: {
  //         maxWidth: 800,
  //     },
  // });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleEdit = (_, row) => {
    if (onEdit) {
      onEdit(row);
    }
    setAnchorEl(null);
  };

  const handleInfo = (e, row) => {
    if (onInfo) {
      onInfo(e, row);
    }
    setAnchorEl(null);
  };

  const handleDelete = (_, row) => {
    if (onDelete) {
      onDelete(row);
    }
    setAnchorEl(null);
  };

  const handleBankDetails = (_, row) => {
    if (onBankDetails) {
      onBankDetails(row);
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = (_, row) => {
    if (props.onView) {
      props.onView(row);
    }
  };

  const handleDownload = (_, row) => {
    if (props.onDownload) {
      props.onDownload(row);
    }
  };

  const handleSwitchChange = (event, row) => {
    if (props.onSwitchChange) {
      props.onSwitchChange(event, row);
    }
  };

  return (
    <>
      <TableContainer
        className="table-container mb-1  custom-table "
        sx={{ maxHeight: props.maxHeight }}
      >
        <Table
          className={`table ${className}`}
          stickyHeader={props.stickyHeader}
          aria-label="sticky table"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            columns={columns}
          />

          <TableBody className="table-body">
            <>
              {rows?.map((row, index) => {
                console.log("🚀 ~ {rows?.map ~ row:", row)
                return (
                  <React.Fragment key={index}>
                    <TableRow
                      className="table-body-row"
                      style={
                        background
                          ? {
                              backgroundColor:
                                index % 2 === 1 ? "#f2f2f2" : undefined,
                            }
                          : undefined
                      }
                    >
                      {columns?.map((column) => {
                        if (column.id === "actions") {
                          return (
                            <TableCell
                              key={column.id}
                              className="table-cell text-center"
                            >
                              <div className="ellipsis-icon flex gap-2 items-center justify-center">
                                {isEditAction && (
                                  <FaEdit
                                    onClick={(e) => handleEdit(e, row)}
                                    style={{
                                      color: "#ffa13d",
                                      cursor: "pointer",
                                      fontSize: "16px",
                                    }}
                                  />
                                )}
                                {isDeleteAction && (
                                  <FaTrash
                                    onClick={(e) => handleDelete(e, row)}
                                    style={{
                                      color: "#ff4343",
                                      cursor: "pointer",
                                      fontSize: "16px",
                                    }}
                                  />
                                )}
                                {isViewAction && (
                                  <FaEye
                                    onClick={(e) => handleView(e, row)}
                                    style={{
                                      color: "#024d81",
                                      cursor: "pointer",
                                      fontSize: "16px",
                                    }}
                                  />
                                )}
                                {isInfoAction && (
                                  <FaInfoCircle
                                    onClick={(e) => handleInfo(e, row)}
                                    style={{
                                      color: "#024d81",
                                      cursor: "pointer",
                                      fontSize: "18px",
                                    }}
                                  />
                                )}
                                {isDownloadAction && (
                                  <FaDownload
                                    onClick={(e) => handleDownload(e, row)}
                                    style={{
                                      color: "green",
                                      cursor: "pointer",
                                      fontSize: "16px",
                                    }}
                                  />
                                )}
                                {isPaymentAction && (
                                  <FcMoneyTransfer
                                    onClick={(e) =>
                                      (row?.status === "pending" ||
                                        row?.status === "failed") &&
                                      handlePayment(e, row)
                                    }
                                    style={{
                                      filter:
                                        row?.status === "pending" ||
                                        row?.status === "failed"
                                          ? ""
                                          : "grayscale(100%)",
                                      cursor:
                                        row?.status === "pending" ||
                                        row?.status === "failed"
                                          ? "pointer"
                                          : "",
                                      fontSize: "18px",
                                    }}
                                  />
                                )}
                                {isBankDetails && (
                                  <BsBank2
                                    onClick={(e) => handleBankDetails(e, row)}
                                    style={{
                                      color: "",
                                      cursor: "pointer",
                                      fontSize: "18px",
                                    }}
                                  />
                                )}
                              </div>
                            </TableCell>
                          );
                        }
                        // else if (column.id === 'id') {
                        //     return (
                        //         <TableCell key={column.id} className={`table-cell ${column?.className} text-center`}>
                        //             {firstNumber + index + 1}
                        //         </TableCell>
                        //     );
                        // }
                        else if (column.id === "switches") {
                          return (
                            <TableCell
                              key={column.id}
                              className={`table-cell ${column?.className} text-center`}
                            >
                              {/* <Switch onChange={(event) => handleSwitchChange(event, row)} /> */}
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={row.is_active}
                                  onChange={(event) =>
                                    handleSwitchChange(event, row)
                                  }
                                />
                                <div className="slider">
                                  <div className="circle">
                                    <svg
                                      className="cross"
                                      style={{ background: "new 0 0 512 512" }}
                                      viewBox="0 0 365.696 365.696"
                                      y={0}
                                      x={0}
                                      height={6}
                                      width={6}
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g>
                                        <path
                                          data-original="#000000"
                                          fill="currentColor"
                                          d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"
                                        />
                                      </g>
                                    </svg>
                                    <svg
                                      className="checkmark"
                                      style={{ background: "new 0 0 512 512" }}
                                      viewBox="0 0 24 24"
                                      y={0}
                                      x={0}
                                      height={10}
                                      width={10}
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g>
                                        <path
                                          data-original="#000000"
                                          fill="currentColor"
                                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                        />
                                      </g>
                                    </svg>
                                  </div>
                                </div>
                              </label>
                            </TableCell>
                          );
                        } else if (column.id === "profile_pic") {
                          return (
                            <TableCell
                              key={column.id}
                              className={`${column?.className} items-center justify-center !flex`}
                            >
                              <Avatar
                                src={row[column.id]}
                                alt="profile-pic"
                                className="profile-pic"
                                sx={{ width: 56, height: 56 }}
                              />
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              key={column.id}
                              className={`table-cell ${column?.className}`}
                            >
                              {/* <CustomWidthTooltip key={column.id} title={row[column.id]?.length >= 50 ? row[column.id] : null} style={{ width: "30%" }} followCursor> */}
                              {searchKey ? (
                                <Highlighter
                                  highlightClassName="Highlighter"
                                  searchWords={searchKey?.split(" ") || []}
                                  autoEscape={true}
                                  textToHighlight={row[column.id].toString()}
                                />
                              ) : row[column.id] ? (
                                row[column.id]?.length >= 50 ? (
                                  `${row[column.id]?.substring(0, 50)}...`
                                ) : (
                                  row[column.id]
                                )
                              ) : (
                                "-"
                              )}

                              {/* </CustomWidthTooltip> */}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </>
          </TableBody>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div
              className="d-flex direction-column gap-1"
              style={{ width: "150px", padding: "10px" }}
            >
              <MenuItem onClick={(e) => handleEdit(e, rows)} className="btn">
                Edit{" "}
              </MenuItem>
              <MenuItem
                onClick={(e) => handleDelete(e, rows)}
                className="btn-secondary"
              >
                Delete
              </MenuItem>
            </div>
          </Popover>
        </Table>
      </TableContainer>
    </>
  );
}

export default (CustomShortingMuiTable);
