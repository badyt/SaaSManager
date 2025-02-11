import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
// import axios from "axios";
import useAuthStore from "../../stores/authStore";
import { useLogin } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { mutate: loginUser } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useAuthStore();



  const handleLogin = async () => {
    loginUser({ email: email, password: password }, {
      onSuccess: (data) => {
        toast.success("User Login successfully!");
        setUserInfo(data.user_id, data.access_token, data.refresh_token ,data.name, data.role, data.email, data.status);
        navigate('/');
      },
      onError: (error) => {
        toast.error("something went wrong loging in user!");
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} p={3} bgcolor="white" borderRadius={3} boxShadow={3}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {/* {error && (
          <Typography color="error" variant="body2" mt={2}>
            {error}
          </Typography>
        )} */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <p className='ms-5' style={{ textAlign: "center" }}>Don't have an account? <a href="/register">Register here</a></p>
      </Box>
    </Container>
  );
};

export default Login;
