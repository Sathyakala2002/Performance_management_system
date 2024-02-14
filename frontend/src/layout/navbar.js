import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom"

const CustomButton = styled(Button)(({ theme }) => ({
  padding:" 10px",
  backgroundColor: "purple",
  "&:hover": {
    backgroundColor: "pink",
  },
}));

const Root = styled("div")(() => ({
  flexGrow: 1,
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const LinkText = styled(Link)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
}));

const DrawerContainer = styled("div")(({ theme }) => ({
  width: 250,
}));

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = async () => {
    await getLoggedIn();
    localStorage.removeItem("token");
    navigate("/")
  };

  const pages = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Form",
      path: "/feedbackform",
    },
    {
      name: "Dashboard",
      path: "/feedbackDetails",
    },
    {
      name: "Table",
      path: "/table",
    },
  ];

  return (
    <Root>
      <AppBar position="static" sx={{ backgroundColor: "white", marginTop: "10px" }}>
        <Toolbar className = "flex justify-between">
          <MenuButton
            edge="start"
            sx={{ backgroundColor: "white" }}
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </MenuButton>

          {loggedIn ? (
            <div >
             <CustomButton color="inherit" onClick={handleSignOut}>
             Sign Out
           </CustomButton>
          </div>
          ) : (
            <>
            <Title variant="h6">Navbar</Title>
            <CustomButton color="inherit" component={Link} to="/">
              Sign In
            </CustomButton>
            <CustomButton color="inherit" component={Link} to="/signup">
              Sign Up
            </CustomButton>
          </>
           
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <DrawerContainer>
          <List>
            {pages.map(({ name, path }) => (
              <ListItem key={name} component={Link} to={path} onClick={handleDrawerClose}>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </DrawerContainer>
      </Drawer>
    </Root>
  );
}

export default Navbar;
