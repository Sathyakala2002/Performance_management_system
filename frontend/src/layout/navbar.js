import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const CustomButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "purple",
  "&:hover": {
    backgroundColor: "pink",
    margin: "3px",
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
      <AppBar position="static" sx={{ backgroundColor: "white",marginTop:"10px" }}>
        <Toolbar>
          <MenuButton
            edge="start"
            sx={{ backgroundColor: "white" }}
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </MenuButton>
          
          <Title variant="h6">Navbar</Title>
          <CustomButton color="inherit">
            <LinkText to="/signin">Sign In</LinkText>
          </CustomButton>
          <CustomButton color="inherit">
            <LinkText to="/signup">Sign Up</LinkText>
          </CustomButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <DrawerContainer>
          <List>
            {pages.map(({ name, path }) => (
              <ListItem key={name} component={Link} to={path}>
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
