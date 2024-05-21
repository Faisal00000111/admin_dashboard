import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import {
  Delete,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Visibility,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";

import React from "react";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  visitorId,
  ipAddress,
  cityCountry,
  browser,
  devices,
  lastVisit,
  action
) {
  return {
    visitorId,
    ipAddress,
    cityCountry,
    browser,
    devices,
    lastVisit,
    action,
  };
}

const rows = [
  createData(
    "715f1cc3ae0c3...",
    "20.178.152",
    "Riyadh / SA",
    "Google Chrome",
    { audio: true, video: true },
    "23-02-2024 11:39:55 AM",
    { eye: true, trash: true }
  ),
  createData(
    "2e163b771aef...",
    "38.132.118.72",
    "Miami / US",
    "Google Chrome",
    { audio: false, video: false },
    "29-11-2023 02:04:11 PM",
    { eye: true, trash: true }
  ),
  createData(
    "2e163b771aef...",
    "38.132.118.72",
    "Miami / US",
    "Google Chrome",
    { audio: false, video: false },
    "29-11-2023 02:04:11 PM",
    { eye: true, trash: true }
  ),
  createData(
    "2e163b771aef...",
    "38.132.118.72",
    "Miami / US",
    "Google Chrome",
    { audio: false, video: false },
    "29-11-2023 02:04:11 PM",
    { eye: true, trash: true }
  ),
  createData(
    "2e163b771aef...",
    "38.132.118.72",
    "Miami / US",
    "Google Chrome",
    { audio: false, video: false },
    "29-11-2023 02:04:11 PM",
    { eye: true, trash: true }
  ),
].sort((a, b) => (a.visitorId < b.visitorId ? -1 : 1)); // Sort based on the `lastVisit` or any other criteria as needed

const Feed = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      flex={4}
      p={8}
      sx={{
        backgroundColor: "skyblue",
      }}
    >
      <Box mgbot>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 4,
            }}
          >
            <Autocomplete
              sx={{ width: "100%", maxWidth: "250px" }}
              id="ip-address"
              freeSolo
              options={["192.168.1.1"]}
              renderInput={(params) => (
                <TextField {...params} label="Search IP Address" />
              )}
            />
            <Autocomplete
              sx={{ width: "100%", maxWidth: "250px" }}
              id="city"
              freeSolo
              options={["Jeddah"]}
              renderInput={(params) => (
                <TextField {...params} label="Search City" />
              )}
            />
            <Autocomplete
              sx={{ width: "100%", maxWidth: "250px" }}
              id="sDate"
              freeSolo
              options={["27/03/2024"]}
              renderInput={(params) => (
                <TextField {...params} label="Search Start Date" />
              )}
            />
            <Autocomplete
              sx={{ width: "100%", maxWidth: "250px" }}
              id="eDate"
              freeSolo
              options={["31/12/2024"]}
              renderInput={(params) => (
                <TextField {...params} label="Search End Date" />
              )}
            />
            <Box
              sx={{
                gridColumn: "1 / -1", // Span from first to last column
                display: "flex",
                justifyContent: "center", // Center buttons in this box
                gap: 2, // If you want some space between the buttons
                gridRow: 2, // Place on the second row
              }}
            >
              <Button variant="contained">Apply</Button>
              <Button variant="contained" color="error">
                Clear
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      </Box>
      <Box>
      <Card>
        <CardContent>
          <Box>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow key={row.visitorId}>
                      <TableCell component="th" scope="row">
                        {row.visitorId}
                      </TableCell>
                      <TableCell align="right">{row.ipAddress}</TableCell>
                      <TableCell align="right">{row.cityCountry}</TableCell>
                      <TableCell align="right">{row.browser}</TableCell>
                      <TableCell align="right">
                        {row.devices.audio ? "AUDIO" : "NO AUDIO"} /{" "}
                        {row.devices.video ? "VIDEO" : "NO VIDEO"}
                      </TableCell>
                      <TableCell align="right">{row.lastVisit}</TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="view">
                          {row.action.eye ? <Visibility /> : null}
                        </IconButton>
                        <IconButton aria-label="delete">
                          {row.action.trash ? <Delete /> : null}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
};

export default Feed;
