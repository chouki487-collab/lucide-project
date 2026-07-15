/*
import { useState } from "react";
import { useAuth } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<string>("");

  const handleLogin = () => {
    auth?.login(user);
    navigate("/",{replace:true});
  };

  return (
     <>
   <Stack
      component="form"
      sx={{ width: '25ch' }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue="Small"
        variant="filled"
        size="small"
        onChange={(e) => setUser(e.target.value)}
      />
      <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
        defaultValue="Normal"
        variant="filled"
      />
    </Stack>
       <Stack spacing={2} direction="row">
      
      <Button variant="contained" onClick={handleLogin}>Contained</Button>
      
    </Stack>
     </>
  );

};

export default Login;
*/

import { useState } from "react";
import { useAuth } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from '@mui/material/Avatar';


export const Login: React.FC = () => {

  const auth = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<string>("");

  const handleLogin = () => {
    auth?.login(user);
    navigate("/",{replace:true});
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
        alt="Remy Sharp"
        src="/src/assets/LOGO.PNG"
        sx={{ width: 80, height: 80 }}
      />
        <Typography component="h1" variant="h3" sx={{color:'#3f50b5'}}>
            Nota-link
        </Typography>
        <Typography component="h1" variant="h4" sx={{color:'#3f50b5'}}>
           الموثق الالكتروني
        </Typography>
        <Box   sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
              onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
             
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            تسجيل الدخول
          </Button>

        </Box>
      </Box>
    </Container>
  );
};

export default Login;

