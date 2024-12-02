import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useRegister } from "../../hooks/useAuth";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const Register = () => {
  const { mutate: registerUser } = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient(); 
  const handleRegister = async () => {
    
    registerUser({ email, password }, {
      onSuccess: (data) => {toast.success("User registered successfully!"); queryClient.invalidateQueries(["users"]);},
      onError: (error) => {toast.error("something went wrong registering user!")},
    });
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} p={3} bgcolor="white" borderRadius={3} boxShadow={3}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Register
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        <p className='ms-5' style={{ textAlign: "center" }}>Already have an account? <a href="/login">Login here</a></p>
      </Box>
    </Container>
  );
};

export default Register;
