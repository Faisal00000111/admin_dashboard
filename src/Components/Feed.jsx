import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";

import React, { useState } from "react";
import EnhancedTable from "./EnhancedTable";

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

const Feed = () => {
  const [ipSearch, setIpSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [startDateSearch, setStartDateSearch] = useState("");
  const [endDateSearch, setEndDateSearch] = useState("");
  const [filters, setFilters] = useState({
    ip: "",
    city: "",
    startDate: "",
    endDate: ""
  });

  const handleApply = () => {
    setFilters({
      ip: ipSearch,
      city: citySearch,
      startDate: startDateSearch,
      endDate: endDateSearch,
    });
  };

  const handleClear = () => {
    setIpSearch("");
    setCitySearch("");
    setStartDateSearch("");
    setEndDateSearch("");
    setFilters({
      ip: "",
      city: "",
      startDate: "",
      endDate: ""
    });
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
                value={ipSearch}
                onInputChange={(e, value) => setIpSearch(value)}
                options={["192.168.1.1"]}
                renderInput={(params) => (
                  <TextField {...params} label="Search IP Address" />
                )}
              />
              <Autocomplete
                sx={{ width: "100%", maxWidth: "250px" }}
                id="city"
                freeSolo
                value={citySearch}
                onInputChange={(e, value) => setCitySearch(value)}
                options={["Jeddah"]}
                renderInput={(params) => (
                  <TextField {...params} label="Search City" />
                )}
              />
              <Autocomplete
                sx={{ width: "100%", maxWidth: "250px" }}
                id="sDate"
                freeSolo
                value={startDateSearch}
                onInputChange={(e, value) => setStartDateSearch(value)}
                options={["27/03/2024"]}
                renderInput={(params) => (
                  <TextField {...params} label="Search Start Date" />
                )}
              />
              <Autocomplete
                sx={{ width: "100%", maxWidth: "250px" }}
                id="eDate"
                freeSolo
                value={endDateSearch}
                onInputChange={(e, value) => setEndDateSearch(value)}
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
                <Button variant="contained" onClick={handleApply}>Apply</Button>
                <Button variant="contained" color="error" onClick={handleClear}>
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
              <EnhancedTable filters={filters} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Feed;
