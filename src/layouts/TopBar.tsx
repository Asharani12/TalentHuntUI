import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import SessionContext from "./../context/SessionContext";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

interface Props {
  className?: any;
  onMobileNavOpen?: any;
  // All other props
  [key: string]: any;
}

const TopBar = ({ className, onMobileNavOpen, ...rest }: Props) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const context = useContext(SessionContext);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <Link to="/">
          <img alt="Logo" src="/static/CE_Logo.png" width="50px" />
        </Link>
        <Box flexGrow={1} />
        {context.isAuthenticated && context.user && (
          <>
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Hidden mdDown>
              <IconButton color="inherit" onClick={() => context.LogoutUser()}>
                <InputIcon />
              </IconButton>
            </Hidden>
            <Hidden lgUp>
              <IconButton color="inherit" onClick={onMobileNavOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
