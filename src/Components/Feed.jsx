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
  const theme = useTheme();
  const [ipSearch, setIpSearch] = useState("");
  const [VistorId, setVistorId] = useState("");

  const [filters, setFilters] = useState({
    ip: "",
    VistorId: "",
  });

  const handleApply = () => {
    setFilters({
      ip: ipSearch,
      VistorId: VistorId,
    });
  };

  const handleClear = () => {
    setIpSearch("");
    setVistorId("");
    setFilters({
      ip: "",
      VistorId: "",
    });
  };

  return (
    <Box
      flex={4}
      p={8}
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
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
                value={VistorId}
                onInputChange={(e, value) => setVistorId(value)}
                options={[]}
                renderInput={(params) => (
                  <TextField {...params} label="Search visitor Id" />
                )}
              />

              <Box
                sx={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  gridRow: 2,
                }}
              >
                <Button variant="contained" onClick={handleApply}>
                  Apply
                </Button>
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
