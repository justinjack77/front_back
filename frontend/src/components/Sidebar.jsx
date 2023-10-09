import React, { useState, useEffect, useRef } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "./theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "./images/logo.png";
import Image from "./images/user.png";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  const sidebarRef = useRef(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    // Adjust the height of the sidebar based on its content
    const sidebar = sidebarRef.current;
    if (sidebar) {
      const contentHeight = sidebar.scrollHeight;
      const windowHeight = window.innerHeight;
      const newHeight = Math.max(contentHeight, windowHeight * 1.2);
      sidebar.style.height = `${newHeight}px`;
    }
  }, [selected]);

  const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[200],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

  const SubMenuItem = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      setIsOpen(!isOpen);
      setSelected(title);
    };

    useEffect(() => {
      setIsOpen(selected === title);
    }, [selected, title]);

    return (
      <MenuItem
        style={{
          color: colors.grey[200],
        }}
        icon={icon}
        onClick={handleClick}
        active={isOpen}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#868dfb !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `#${colors.primary[100]} !important`,
        },
        "& .pro-menu-item.active": {},
      }}
    >
      <div ref={sidebarRef} style={{ height: "100vh", overflowY: "auto" }}>
        <ProSidebar
          width={isCollapsed ? "100px" : "301px"} // Set the width to auto or inherit from the parent container
          collapsedWidth="100px"
          collapsed={isCollapsed}
        >
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "20px 20px ",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box display="flex" justifyContent="left" alignItems="left">
                  <img
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    alt="logo"
                    width="100%"
                    height="100%"
                    src={Logo}
                  />
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="30px">
                {/* <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={Image}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                  />
                </Box> */}
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    color="black"
                    fontWeight="bold"
                    sx={{
                      mt: "30px", 
                      mb: "10px",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", 
                      fontFamily: "sans-serif", 
                      letterSpacing: "1px", 
                    }}
                  >
                     Hi, {username}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Typography
                variant="h6"
                color={colors.grey[200]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                <SubMenu
                  title="Operations"
                  to="/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  style={{ color: "black" }}
                  defaultOpen={false}
                >
                  <SubMenuItem
                    title="Masterlist Worker"
                    to="/Masterlist"
                    icon={<KeyboardArrowRightIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>

                <SubMenu
                  title="Accounts"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  style={{ color: "black" }}
                  defaultOpen={false}
                >
                  <SubMenuItem
                    title="Worker Attendance"
                    to="/General"
                    icon={<KeyboardArrowRightIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <SubMenuItem
                    title="Customer Billing"
                    to="/Customer_Bill"
                    icon={<KeyboardArrowRightIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>

                <Item
                  title="Logout"
                  to="/"
                  icon={<LogoutIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Typography>
            </Box>
          </Menu>
        </ProSidebar>
      </div>
    </Box>
  );
};

export default Sidebar;
