import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "../helpers/firebase/firebaseAuthentication";

const RegisterSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Password must have min 8 chars")
    .max(16, "Password must have max 16 chars")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have a Uppercase")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[!,?{}><%&$#£+-.]+/, " Password must have a special char"),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/ozkankomu"
        target="_blanked"
      >
        Ozkan Blog_App_Project__
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export const Register = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const { name, surname, email, password } = formInput;

  const handleSubmit = (event) => {
    event.preventDefault();
    const displayName = `${name}${surname}`;
    Signup(email, password, navigate, displayName);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://findicons.com/files/icons/1994/vista_style_business_and_data/256/users.png"
              sx={{ width: 250, height: 250, m: 2 }}
            />
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={RegisterSchema}
              onSubmit={(values, actions) => {
                actions.resetForm();
                actions.setSubmitting(false);
              }}
            >
              {({
                values,
                isSubmitting,
                touched,
                handleChange,
                handleBlur,
                errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="name"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) =>
                        setFormInput({ ...formInput, name: e.target.value })
                      }
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="surname"
                      label="Surname"
                      name="surname"
                      autoComplete="surname"
                      value={surname}
                      onChange={(e) =>
                        setFormInput({ ...formInput, surname: e.target.value })
                      }
                      onBlur={handleBlur}
                      error={touched.surname && Boolean(errors.surname)}
                      helperText={touched.surname && errors.surname}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) =>
                        setFormInput({ ...formInput, email: e.target.value })
                      }
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="password"
                      value={password}
                      onChange={(e) =>
                        setFormInput({ ...formInput, password: e.target.value })
                      }
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />

                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 1 }}
                    >
                      Register
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Continue with Google
                    </Button>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Register;
