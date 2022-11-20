import CardMedia from "@mui/material/CardMedia";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateBlog, useGetData } from "../function/function";
import { useSelector } from "react-redux";
import { update } from "firebase/database";
import { useState } from "react";

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
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [expanded, setExpanded] = React.useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { username, email } = user;
  const { state } = useLocation();
  const { comments } = state;
  const [commentInput, setCommentInput] = React.useState([]);
  const [comment, setComment] = useState();

  React.useEffect(() => {
    const date = new Date().toLocaleString("tr-TR");
    setComment({
      ...state,
      comments: {
        date: date,
        id: id,
        username: username,
        comment: commentInput,
        // email: email,
      },
    });
  }, [commentInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(comment);
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
          <Avatar
            sx={{ bgcolor: red[500] }}
            src={user.photoURL}
            aria-label="recipe"
          ></Avatar>

          <Typography>
            {state?.comments?.username} - {state.date}
          </Typography>
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Card sx={{ maxWidth: 700 }}>
              <Avatar
                sx={{ bgcolor: red[500] }}
                src={user.photoURL}
                aria-label="recipe"
              ></Avatar>

              <CardContent>
                <Typography variant="h6">{state?.comments?.comment}</Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="text.secondary"
                  component="div"
                >
                  {state?.comments?.username} - {state?.comments?.email} -
                  {state?.comments?.date}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
