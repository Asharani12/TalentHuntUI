import { useContext, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from "@material-ui/core";
import InputIcon from '@material-ui/icons/Input';
import SessionContext from "../../context/SessionContext";
import IPage from "../../classes/IPage";
import ILoginUser from "../../classes/ILoginUser";
import NavItem from "./NavItem";

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

interface NavBarProps {
  pages: IPage[];
  onMobileClose: any;
  openMobile: boolean;
}

const NavBar = (props: NavBarProps) => {
  const classes = useStyles();
  const location = useLocation();

  const context = useContext(SessionContext);
  const currentUser = context.user as ILoginUser;
  const navItems = props.pages.filter(x => x.isnavitem === true);
  const myAccount = props.pages.find((item) => {
    return item.pagename === 'myaccount'
  });

  useEffect(() => {
    if (props.openMobile && props.onMobileClose) {
      props.onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={currentUser.ProfilePhoto}
          to={myAccount ? myAccount.path : '#'}
        />
        <RouterLink to={myAccount ? myAccount.path : '#'}>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {currentUser.FirstName + ' ' + currentUser.LastName}
          </Typography>
        </RouterLink>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {currentUser.Role.RoleName}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {navItems.map((item) => (
            <NavItem
              href={item.path}
              key={item.pagename}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <NavItem
            onClick={() => context.LogoutUser()}
            key="logout"
            title="Logout"
            icon={InputIcon}
          />
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={props.onMobileClose}
          open={props.openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
