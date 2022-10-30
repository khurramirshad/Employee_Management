import React, { useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Box,
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
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  address: "",
  role: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  address: Yup.string().required(),
  role: Yup.string().required(),
});

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["x-auth-token"]);

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post(
        "http://localhost:3000/api/emp",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          address: values.address,
          role: values.role,
        },
        {
          headers: { "x-auth-token": cookie["x-auth-token"] },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
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
    <>
      <Toaster />
      <Box sx={{ mt: 10 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ ml: 1 }}>
            <Grid item lg={12}>
              <Typography variant="h6" sx={{ color: "primary.main" }}>
                Employee
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                variant="outlined"
                sx={{ width: 440 }}
              />
            </Grid>
            <Grid item lg={4}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                variant="outlined"
                sx={{ width: 440 }}
              />
            </Grid>
            <Grid item lg={4}>
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
              />
            </Grid>
            <Grid item lg={4}>
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
              />
            </Grid>
            <Grid item lg={4}>
              <TextField
                id="address"
                name="address"
                label="Address"
                type="text"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                variant="outlined"
                sx={{ width: 440 }}
              />
            </Grid>
            <Grid item lg={4}>
              <TextField
                id="role"
                name="role"
                label="Role"
                type="text"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
                variant="outlined"
                sx={{ width: 440 }}
              />
            </Grid>
            <Grid item lg={12}>
              <Button
                variant="contained"
                sx={{ width: 200, height: 50 }}
                type="submit"
              >
                <Typography variant="h6">Add</Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default EmployeeForm;
