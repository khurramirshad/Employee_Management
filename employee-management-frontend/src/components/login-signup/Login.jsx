import React, { useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Divider,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["x-auth-token"]);

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:3000/auth/signin", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setCookie("x-auth-token", res.data.token);
        setTimeout(() => {
          navigate("/landingPage");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Paper
      elevation={24}
      sx={{
        margin: "auto",
        width: "70vw",
        height: "80vh",
        mt: 10,
        borderRadius: 10,
        boxShadow: 3,
      }}
    >
      <Toaster />
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Employee Management
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ ml: 46 }}>
          <Grid item lg={12}>
            <Typography variant="h3" sx={{ color: "primary.main" }}>
              Login
            </Typography>
          </Grid>

          <Grid item lg={12}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
              sx={{ width: 440 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="outlined"
              sx={{ width: 440 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg={12} sx={{ ml: 15 }}>
            <Button
              variant="contained"
              sx={{ width: 200, height: 50, borderRadius: 16 }}
              type="submit"
            >
              <Typography variant="h6">Login</Typography>
            </Button>
          </Grid>
          <Grid item lg={12}>
            <Divider
              sx={{
                "&::before": { borderTop: 1, borderColor: "#00000" },
                width: 300,
                ml: 8,
                "&::after": { borderTop: 1, borderColor: "#00000" },
              }}
            >
              or
            </Divider>
          </Grid>
          <Grid item lg={12} sx={{ ml: 11 }}>
            <Typography variant="body1" component="span">
              Don't have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <span style={{ color: "#000000", fontWeight: "bold" }}>
                  Signup
                </span>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Login;
