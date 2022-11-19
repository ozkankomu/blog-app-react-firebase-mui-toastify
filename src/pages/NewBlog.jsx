import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { AddUser } from "../function/function";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";

const theme = createTheme();

export const NewBlog = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    content: "",
    id: new Date().getTime(),
    userId: "email",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    AddUser(form);

    navigate("/");
    setForm({
      title: "",
      imageUrl: "",
      content: "",
      id: new Date().getTime(),
      userId: "email",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="https://associationofhorizon.org/wp-content/uploads/2018/02/blogpost.png"
            sx={{ m: 1, bgcolor: "secondary.main", width: 140, height: 140 }}
          ></Avatar>
          <Typography component="h1" variant="h4" color="#9c27b0">
            - New Blog -
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoFocus
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="image"
                  label="Image URL"
                  type="text"
                  id="image"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  required
                  label="Please Enter Your Content"
                  multiline
                  fullWidth
                  rows={15}
                  variant="outlined"
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
