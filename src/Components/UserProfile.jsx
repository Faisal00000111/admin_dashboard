import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../constants/constants";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const InfoField = ({ label, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <TextField
      fullWidth
      label={label}
      value={value || "N/A"}
      InputProps={{ readOnly: true }}
      variant="outlined"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    />
  </Grid>
);

const UserProfile = () => {
  const theme = useTheme();
  const { docId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "Users", docId);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          fetchUserVisits(docSnap.data().visitorId).then((data) =>
            setVisits(data)
          );
        } else {
          setUserDetails({});
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserDetails({});
      }
      setLoading(false);
    };

    fetchUserData();
  }, [docId]);

  const fetchUserVisits = async (visitorId) => {
    const visitsRef = collection(db, "Users");

    const q = query(visitsRef, where("visitorId", "==", visitorId));

    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error("Error fetching user visits:", error);
      return 0;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!userDetails) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">No User Details Available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        p: 4,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 3, bgcolor: theme.palette.background.paper }}
      >
        <SectionTitle variant="h4">User Profile</SectionTitle>
        <Divider />
        <Box mt={3}>
          <Card
            variant="outlined"
            sx={{ bgcolor: theme.palette.background.paper }}
          >
            <CardContent>
              <SectionTitle variant="h5">Basic Information</SectionTitle>
              <Grid container spacing={2}>
                <InfoField label="Fingerprint" value={userDetails.visitorId} />
                <InfoField label="IP Address" value={userDetails.location.ip} />
                <InfoField label="Browser" value={userDetails.browser} />
                <InfoField label="Total Visits" value={visits} />
                <InfoField label="City" value={userDetails.location.city} />
                <InfoField
                  label="Country"
                  value={
                    userDetails.location.country || userDetails.location.region
                  }
                />
                <InfoField label="Region" value={userDetails.location.region} />
                <InfoField
                  label="Organization"
                  value={userDetails.location.org}
                />
                <InfoField
                  label="Confidence Score"
                  value={userDetails.confidence?.score.toFixed(2) || "N/A"}
                />
              </Grid>
            </CardContent>
          </Card>

          <Box mt={3}>
            <Card
              variant="outlined"
              sx={{ bgcolor: theme.palette.background.paper }}
            >
              <CardContent>
                <SectionTitle variant="h5">Security Information</SectionTitle>
                <Grid container spacing={2}>
                  <InfoField
                    label="Incognito Mode"
                    value={userDetails.Incognito?.isPrivate ? "Yes" : "No"}
                  />
                  <InfoField
                    label="VPN Usage"
                    value={userDetails.VpnInfo?.security.vpn ? "Yes" : "No"}
                  />
                  <InfoField
                    label="Proxy"
                    value={userDetails.VpnInfo?.security.proxy ? "Yes" : "No"}
                  />
                  <InfoField
                    label="Tor Usage"
                    value={userDetails.VpnInfo?.security.tor ? "Yes" : "No"}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Box>

          <Box mt={3}>
            <Card
              variant="outlined"
              sx={{ bgcolor: theme.palette.background.paper }}
            >
              <CardContent>
                <SectionTitle variant="h5">Network Information</SectionTitle>
                <Grid container spacing={2}>
                  <InfoField
                    label="Autonomous System Organization"
                    value={
                      userDetails.VpnInfo?.network
                        .autonomous_system_organization || "N/A"
                    }
                  />
                  <InfoField
                    label="Autonomous System Number"
                    value={
                      userDetails.VpnInfo?.network.autonomous_system_number ||
                      "N/A"
                    }
                  />
                  <InfoField
                    label="Network"
                    value={userDetails.VpnInfo?.network.network || "N/A"}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Box>

          <Box mt={3}>
            <Card
              variant="outlined"
              sx={{ bgcolor: theme.palette.background.paper }}
            >
              <CardContent>
                <SectionTitle variant="h5">Device Information</SectionTitle>
                <Grid container spacing={2}>
                  <InfoField
                    label="Has Audio"
                    value={
                      userDetails.userComponents?.devicesInfo.hasAudio
                        ? "Yes"
                        : "No"
                    }
                  />
                  <InfoField
                    label="Has Video"
                    value={
                      userDetails.userComponents?.devicesInfo.hasVideo
                        ? "Yes"
                        : "No"
                    }
                  />
                  <InfoField
                    label="Platform"
                    value={userDetails.userComponents?.platform?.value || "N/A"}
                  />
                  <InfoField
                    label="Screen Resolution"
                    value={
                      userDetails.userComponents?.screenResolution?.value ||
                      "N/A"
                    }
                  />
                  <InfoField
                    label="WebGL Renderer"
                    value={
                      userDetails.userComponents?.webGLBasics?.value
                        ?.renderer || "N/A"
                    }
                  />
                </Grid>
              </CardContent>
            </Card>
          </Box>

        
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfile;
