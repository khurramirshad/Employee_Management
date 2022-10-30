import React from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Divider,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

YupPassword(Yup);
const initialValues = {
  username: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required().min(5).max(20),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
});

const SignUp = () => {
  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:3000/user/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
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
        height: "90vh",
        mt: 5,
        borderRadius: 10,
        boxShadow: 3,
      }}
    >
      <Toaster />
      <Box sx={{ mt: 4 }}>
        <Box sx={{ ml: 43 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Employee Management
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ ml: 45 }}>
            <Grid item lg={12}>
              <Typography variant="h3" sx={{ color: "primary.main" }}>
                Signup
              </Typography>
            </Grid>
            <Grid item lg={12}>
              <TextField
                id="username"
                name="username"
                label="Username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                variant="outlined"
                sx={{ width: 440 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
                <Typography variant="h6">Sign up</Typography>
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
                Already have an account?{" "}
                <Link to="/" style={{ textDecoration: "none" }}>
                  <span style={{ color: "#000000", fontWeight: "bold" }}>
                    Login
                  </span>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
};

export default SignUp;
