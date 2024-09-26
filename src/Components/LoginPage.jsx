import React, { useState } from "react";
import {
  useTheme,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid login credentials. Please try again.");
    }
    setLoading(false);
  };

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
      <Card
        sx={{ minWidth: 275, p: 3, bgcolor: theme.palette.background.paper }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ bgcolor: "background.default", mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ bgcolor: "background.default", mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
