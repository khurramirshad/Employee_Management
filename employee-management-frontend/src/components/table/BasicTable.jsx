import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function BasicTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [cookie, setCookie] = useCookies(["x-auth-token"]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/emp", {
        headers: { "x-auth-token": cookie["x-auth-token"] },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteEmp = (me) => {
    console.log(me);
    axios
      .delete(`http://localhost:3000/api/emp/${me}`, {
        headers: { "x-auth-token": cookie["x-auth-token"] },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateEmp = (me) => {
    console.log(me);
    axios
      .put(
        `http://localhost:3000/api/emp/${me}`,

        {
          headers: { "x-auth-token": cookie["x-auth-token"] },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box
        sx={{
          mt: 10,
          ml: 5,
        }}
      >
        <Button variant="contained" onClick={() => navigate("/employeeForm")}>
          Add Employee
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        onClick={() => updateEmp(row._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        onClick={() => deleteEmp(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
