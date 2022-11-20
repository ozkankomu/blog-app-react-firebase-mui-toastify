import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { logOut } from "../helpers/firebase/firebaseAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/newBlog")}
          >
            New Blog
          </Button>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          {user.username ? (
            <>
              <Avatar
                sx={{ mx: "8px" }}
                src={
                  user?.photoURL ||
                  "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"
                }
                className="rounded-full"
                style={{ height: 25, width: 25 }}
                alt="user"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <Button
                color="inherit"
                onClick={() => logOut(navigate, dispatch)}
              >
                Logout
              </Button>{" "}
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
