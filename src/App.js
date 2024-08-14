import { Box, Stack } from "@mui/system";
import Feed from "./Components/Feed";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction={"row"} spacing={2} justifyContent="space-between">
        <Sidebar />
        <Feed />
      </Stack>
    </Box>
  );
}

export default App;
