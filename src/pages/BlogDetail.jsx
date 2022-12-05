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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Container, TextField, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateBlog, useGetData } from "../function/function";
import { useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import { useEffect } from "react";

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
  const [expanded, setExpanded] = React.useState(true);
  const { currentBlogs, setCurrentBlogs } = useContext(AuthContext);
  const [commentInput, setCommentInput] = React.useState([]);
  const [updatedCommnet, setupdatedCommnet] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { currentUser } = React.useContext(AuthContext);
  const date = new Date().toLocaleString("tr-TR");
  const [comments, setComments] = useState(state.comments || []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      ...state,
      comments: [
        ...comments,
        {
          date: date,
          id: id,
          username: currentUser.displayName,
          photoURL: currentUser.photoURL,
          comment: commentInput,
        },
      ],
    };
    setupdatedCommnet(newComment);

    updateBlog(newComment);
    navigate("/");
  };

  const handleDelete = (date) => {
    const deletedComments = state.comments.filter((item) => item.date !== date);
    const newComment = { ...state, comments: [...deletedComments] };

    setupdatedCommnet(newComment);
    updateBlog(newComment);
    navigate("/");
  };

  return (
    <Container align="center" sx={{ mt: "3rem" }}>
      <Card sx={{ maxWidth: 850, borderRadius: "100px" }}>
        <CardMedia
          component="img"
          height={"400px"}
          image={state?.imageUrl}
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
            <Avatar src={state?.photoURL} aria-label="recipe"></Avatar>

            <Typography sx={{ fontSize: "1.8rem", ml: "1rem" }}>
              {state?.username}
            </Typography>
          </Box>
          <Typography variant="body1" color="text.primary">
            {state.content}
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
          <Box align="end" flexGrow="1">
            {!expanded && (
              <Typography
                onClick={handleExpandClick}
                sx={{ mx: "auto", cursor: "pointer" }}
              >
                Show Comments
              </Typography>
            )}
            {expanded && (
              <Typography
                onClick={handleExpandClick}
                sx={{ mx: "auto", cursor: "pointer" }}
              >
                Hide Comments
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
        {state?.comments?.map((item) => {
          console.log(item);
          return (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Card sx={{ maxWidth: 700 }}>
                  <Avatar src={item?.photoURL} aria-label="recipe"></Avatar>

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
                    <Button
                      size="small"
                      onClick={() => handleDelete(item.date)}
                    >
                      Delete
                    </Button>
                    <Button size="small">Edit</Button>
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
