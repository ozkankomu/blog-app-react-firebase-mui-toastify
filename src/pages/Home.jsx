import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deleteBlog, useGetData } from "../function/function";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/ozkankomu/">
        - Ozkan Komu -
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

const Home = () => {
  const { currentUser, currentBlogs, setCurrentBlogs } =
    React.useContext(AuthContext);
  const { contactList } = useGetData();
  const navigate = useNavigate();
  setCurrentBlogs(contactList);

  const handleDelete = (id, username) => {
    if (currentUser.username === username) {
      if (window.confirm("Are you sure to delete the Blog Title")) {
        deleteBlog(id);
      }
    } else {
      alert("You can only delete the blog title you added");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 4,
            pb: 4,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Blog layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{
                bgcolor: "background.paper",
              }}
            >
              You can share whatever comes to mind for the following content and
              more on this Blog Layout platform.
            </Typography>
            <Stack
              sx={{ pt: 2 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                sx={{ width: "150px" }}
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Please Login
              </Button>
              <Button variant="outlined" onClick={() => navigate("/Register")}>
                Please register
              </Button>
            </Stack>
          </Container>
          <Stack
            sx={{
              bgcolor: "background.paper",
              pt: 2,
              pb: 2,
            }}
          >
            <div
              id="carouselExampleDark"
              className="carousel carousel-dark slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={0}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={2}
                  aria-label="Slide 3"
                />
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval={5000}>
                  <img
                    src="https://thumbs.dreamstime.com/b/wildlife-wild-animals-nature-isolated-animal-illustration-orientation-banner-panoramic-panorama-each-white-213967473.jpg"
                    className="d-block w-100"
                    alt="img"
                    style={{ height: "500px" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h2
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "6rem",
                        marginBottom: "9rem",
                        textShadow: "6px 6px 15px black",
                      }}
                    >
                      Animals
                    </h2>
                  </div>
                </div>
                <div className="carousel-item" data-bs-interval={2000}>
                  <img
                    src="https://cdn.pixabay.com/photo/2017/08/31/16/20/robot-2701312__340.png"
                    className="d-block w-100"
                    alt="img"
                    style={{ height: "500px" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "6rem",
                        marginBottom: "10rem",
                        textShadow: "6px 6px 15px black",
                      }}
                    >
                      Robots
                    </h5>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://previews.123rf.com/images/dusanzidar/dusanzidar1703/dusanzidar170300006/73297139-selection-of-healthy-food-on-white-background-.jpg"
                    className="d-block w-100"
                    alt="img"
                    style={{ height: "500px" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "7rem",
                        marginBottom: "9rem",
                        textShadow: "6px 6px 15px black",
                      }}
                    >
                      Foods
                    </h5>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </Stack>
        </Box>

        <Container sx={{ py: 4, color: "#8888" }} maxWidth="xl">
          <Grid container spacing={4}>
            {contactList?.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: "345px",

                      borderRadius: "20%",
                    }}
                    image={card.imageUrl}
                    onClick={() => navigate(`${card.id}`, { state: card })}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      align="center"
                      component="h2"
                    >
                      {card.title}
                    </Typography>
                    <Typography className="lineClamp">
                      {card.content}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mx: "auto" }}>
                    <FavoriteBorderIcon
                      type="button"
                      // sx={{ cursor: "pointer" }}
                    />
                    <Button
                      size="small"
                      // onClick={() => navigate(`${card.id}`, { state: card })}
                    >
                      View
                    </Button>
                    <Button size="small">Edit</Button>
                    <Button
                      size="small"
                      onClick={() => handleDelete(card.id, card.username)}
                    >
                      Delete
                    </Button>
                    <MessageIcon sx={{ cursor: "pointer" }} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 3 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <hr />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Welcome Our Test Blog Site!
          </Typography>
          <Copyright />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Home;
