import React from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";

import CustomButton from "../CustomButton";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {
  // define the component props here
}

const LoginPage: React.FC<Props> = ({}) => {
  const router = useRouter();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    await axios
      .post("/api/user/login", { email, password })
      .then((res) => res.status === 200 && router.push("/"))
      .catch((e) => router.push("/login?invalid=true"));
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <Container component="main" maxWidth="xs" className="h-screen">
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        <Avatar
          style={{
            margin: "8px",
            backgroundColor: "#f50057",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form
          onSubmit={handleLogin}
          style={{
            width: "100%",
            marginTop: "24px",
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              margin: "24px 0px 16px",
            }}
          >
            Log In
          </CustomButton>
        </form>
      </div>
      <div className="text-right">
        Don&apost have an account, yet?{" "}
        <Link href={"/login?signup=true"} className="text-blue-600">
          Register now!
        </Link>
      </div>
      <hr className="w-4/5 mx-auto my-4 border-black" />
      <Button
        fullWidth
        sx={{ textTransform: "none", py: 1.5 }}
        variant="contained"
        onClick={() => signIn()}
      >
        <GoogleIcon sx={{ pr: "0.4rem" }} /> Sign in with Google
      </Button>
    </Container>
  );
};
export default LoginPage;
