import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "blur(5px)",
        borderRadius: "10px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* ICONS */}
      <Box display="flex" alignItems="center">
        <IconButton
          component={Link}
          to="/"
          sx={{
            fontSize: "1.5rem",
            color: colors.primary[500],
            marginRight: "10px",
          }}
        >
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton
          component={Link}
          to="/"
          sx={{
            fontSize: "1.5rem",
            color: colors.primary[500],
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
