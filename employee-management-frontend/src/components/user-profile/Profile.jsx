import React, { useState, useEffect } from "react";

import {
  Paper,
  Avatar,
  Stack,
  Typography,
  Box,
  Chip,
  Grid,
} from "@mui/material";

import { useCookies } from "react-cookie";
import axios from "axios";

const Profile = () => {
  const [cookie, setCookie] = useCookies(["x-auth-token"]);

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts/new", {
        headers: { "x-auth-token": cookie["x-auth-token"] },
      })
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          width: 840,
          height: 150,
          borderRadius: 5,
          margin: "auto",
          mt: 10,
        }}
      >
        <Grid
          container
          // spacing={3}

          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 3 }}
        >
          <Grid item>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar aria-label="recipe" sx={{ width: 100, height: 100 }} />
              <Box>
                <Typography variant="h6">Name</Typography>
                <Typography variant="h6">
                  {profile[0]?.postedBy.name.charAt(0).toUpperCase() +
                    profile[0]?.postedBy.name.slice(1)}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="column" spacing={1} alignItems="center">
              <Typography variant="h6">{profile.length}</Typography>
              <Typography variant="h6">
                {" "}
                <Chip label="Total Posts" color="primary" />
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="column" spacing={1} alignItems="center">
              <Typography variant="h6">10</Typography>
              <Typography variant="h6">
                {" "}
                <Chip label="Following" color="primary" />
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="column" spacing={1} alignItems="center">
              <Typography variant="h6">150</Typography>
              <Typography variant="h6">
                {" "}
                <Chip label="Followers" color="primary" />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Profile;
