import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import ChartSquareBarIcon from "@mui/icons-material/BarChart";
import TableIcon from "@mui/icons-material/TableChart";
import XIcon from "@mui/icons-material/Close";
import ListItemText from '@mui/material/ListItemText';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

import {
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "../context";

const Sidebar = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const pages = [
    { page: "Home", to: "/home", icon: <HomeIcon />, Tooltip: "Home" },
    { page: "Form", to: "/feedbackform", icon: <ChartSquareBarIcon />, Tooltip: "Form" },
    { page: "Dashboard", to: "/feedbackDetails", icon: <FormatAlignJustifyIcon />, Tooltip: "Dashboard" },
    { page: "Table", to: "/table", icon: <TableIcon />, Tooltip: "Table" },
  ];

  return (
    <div>
      {/* <Navbar/> */}
      <aside
        className={`${sidenavTypes[sidenavType]} ${
          openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
      >
        <div className={`relative`}>
          <Link to="/" className="py-6 px-8 text-center">
            <Typography
              variant="h6"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
            >
              Performance management system
            </Typography>
          </Link>
          <IconButton
            variant="text"
            color="black"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
          </IconButton>
        </div>
        <List>
          {pages.map((page, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={page.to}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title={page.Tooltip} arrow placement="right-start">
                    {page.icon}
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={page.page} sx={{ marginLeft: "3px" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </aside>
    </div>
  );
};

export default Sidebar;
