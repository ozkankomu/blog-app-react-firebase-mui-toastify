import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { logOut } from "../helpers/firebase/firebaseAuthentication";
import { Avatar } from "@mui/material";
import { AuthContext } from "../context/AuthContextProvider";

export const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box container sx={{ flexGrow: 1 }}>
            <Button variant="h6" onClick={() => navigate("/newBlog")}>
              New Blog
            </Button>
          </Box>

          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          {currentUser?.displayName ? (
            <>
              <Avatar
                sx={{ mx: "8px" }}
                src={
                  currentUser?.photoURL ||
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
                onClick={() => logOut(navigate, setCurrentUser)}
              >
                Logout
              </Button>
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
