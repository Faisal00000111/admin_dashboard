import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../constants/constants";

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersCollection = collection(db, "Users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map((doc) => doc.data());

        let totalUsers = 0;
        let vpnUsers = 0;
        let noVpnUsers = 0;
        let incognitoUsers = 0;
        let regularUsers = 0;
        let browsers = {};
        let countries = {};
        let locations = {};

        usersData.forEach((user) => {
          totalUsers += 1;

          if (user.VpnInfo?.security.vpn) {
            vpnUsers += 1;
          } else {
            noVpnUsers += 1;
          }

          if (user.Incognito.Incognito?.isPrivate) {
            incognitoUsers += 1;
          } else {
            regularUsers += 1;
          }

          const browserName = user.browser || "Unknown";
          browsers[browserName] = (browsers[browserName] || 0) + 1;

          const country = user.VpnInfo?.location?.country || "Unknown";
          countries[country] = (countries[country] || 0) + 1;

          const city = user.VpnInfo?.location?.city || "Unknown";
          locations[city] = (locations[city] || 0) + 1;
        });

        setData({
          totalUsers,
          vpnUsers,
          noVpnUsers,
          incognitoUsers,
          regularUsers,
          browsers,
          countries: Object.entries(countries).map(([label, value]) => ({
            label,
            value,
          })),
          locations: Object.entries(locations).map(([label, value]) => ({
            label,
            value,
          })),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Top Row: Total Users and VPN Users */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Total Users Counter */}
          <Card
            sx={{
              flex: 1,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h3" color="primary">
                {data.totalUsers}
              </Typography>
            </CardContent>
          </Card>

          <Paper
            elevation={3}
            sx={{
              flex: 2,
              p: 2,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="h6" gutterBottom>
              VPN Users vs Non-VPN Users
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: "No VPN",
                      label: "No VPN User",
                      value: data.noVpnUsers,
                    },
                    { id: "VPN", label: "VPN User", value: data.vpnUsers },
                  ],
                },
              ]}
              width={400}
              height={200}
              theme={theme.palette.mode}
            />
          </Paper>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 2,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Incognito Mode Usage
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <PieChart
              series={[
                {
                  data: [
                    {
                      id: "Regular",
                      label: "Regular Mode",
                      value: data.regularUsers,
                    },
                    {
                      id: "Incognito",
                      label: "Incogo Mode",
                      value: data.incognitoUsers,
                    },
                  ],
                },
              ]}
              width={500}
              height={200}
              theme={theme.palette.mode}
            />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 2,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Browser Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BarChart
              xAxis={[
                {
                  data: Object.keys(data.browsers),
                  label: "Browser",
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  label: "Number of Users",
                  data: Object.values(data.browsers),
                },
              ]}
              width={400}
              height={300}
              theme={theme.palette.mode}
            />
          </Paper>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 2,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="h6" gutterBottom>
              User Distribution by Country
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BarChart
              xAxis={[
                {
                  data: data.countries.map((country) => country.label),
                  label: "Country",
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  label: "Number of Users",
                  data: data.countries.map((country) => country.value),
                },
              ]}
              width={600}
              height={300}
              theme={theme.palette.mode}
            />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 2,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="h6" gutterBottom>
              User Distribution by Location
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BarChart
              xAxis={[
                {
                  data: data.locations.map((location) => location.label),
                  label: "City",
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  label: "Number of Users",
                  data: data.locations.map((location) => location.value),
                },
              ]}
              width={600}
              height={300}
              theme={theme.palette.mode}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
