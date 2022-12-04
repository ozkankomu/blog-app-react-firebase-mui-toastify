import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Container, TextField, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog } from "../function/function";
import { useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlogDetail() {
  const { currentBlogs, setCurrentBlogs } = useContext(AuthContext);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [expanded, setExpanded] = React.useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = React.useContext(AuthContext);

  const [commentInput, setCommentInput] = React.useState([]);
  const [comment, setComment] = useState();

  console.log(currentBlogs);
  React.useEffect(() => {
    const date = new Date().toLocaleString("tr-TR");
    setComment({
      // ...state,
      comments: [
        // ...comments,
        {
          date: date,
          id: id,
          username: currentUser.displayName,
          comment: commentInput,
        },
      ],
    });
  }, [commentInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(comment);
    navigate("/");
  };
  const currentBlog = currentBlogs.filter((item) => item.id == id);
  console.log(...currentBlog);
  return (
    <Container align="center" sx={{ mt: "3rem" }}>
      <Card sx={{ maxWidth: 850, borderRadius: "100px" }}>
        <CardMedia
          component="img"
          height={"400px"}
          image={currentBlog[0]?.imageUrl}
          alt="image"
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              padding: "1rem",
            }}
          >
            <Avatar src={currentBlog[0]?.photoURL} aria-label="recipe"></Avatar>

            <Typography sx={{ fontSize: "1.8rem", ml: "1rem" }}>
              {currentBlog[0]?.username}
            </Typography>
          </Box>
          <Typography variant="body1" color="text.primary">
            {currentBlog[0].content}
          </Typography>
        </CardContent>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go Back
        </Button>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Box sx={{ ml: "10rem" }}>
            {!expanded && (
              <Typography onClick={handleExpandClick} sx={{ mx: "auto" }}>
                Show Comments
              </Typography>
            )}
          </Box>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <div style={{ marginTop: "2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                required
                label="Please Enter Your Comment"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                onChange={(e) => setCommentInput(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Send Comment
          </Button>
        </div>
        {currentBlog[0].comments.map((item) => {
          console.log(item);
          return (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Card sx={{ maxWidth: 700 }}>
                  <Avatar
                    // src={state?.comments?.photoURL}
                    aria-label="recipe"
                  ></Avatar>

                  <CardContent>
                    <Typography variant="h6">{item?.comment}</Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      color="text.secondary"
                      component="div"
                    >
                      {item?.username} - {item.date}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </CardContent>
            </Collapse>
          );
        })}
      </Card>
    </Container>
  );
}
