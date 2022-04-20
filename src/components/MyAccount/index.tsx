import React from "react";
import { Box, Container } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountPage from "../Page/AccountPage";
import ChangePassword from "./ChangePassword";
import MyProfile from "./MyProfile/";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

interface MyAccountProps {
    classes: any;
    children?: React.ReactNode;
}

interface MyAccountStates {
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 2px 0 rgb(63 63 68 / 15%)',
    },
    container: {
        display: 'flex'
    }
});

class MyAccount extends React.Component<MyAccountProps, MyAccountStates> {
    constructor(props: MyAccountProps) {
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({ value: newValue });
    };

    render() {
        const { classes } = this.props;
        return (
            <AccountPage title="Account">
                <Container className={classes.container} maxWidth="lg">
                    <div className={classes.root}>
                        <AppBar position="static" color="inherit">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="My Profile" icon={<AccountCircleIcon />} {...a11yProps(0)} />
                                <Tab label="Security" icon={<LockOpenIcon />} {...a11yProps(1)} />
                                <Tab label="Notifications (Coming Soon...)" icon={<NotificationsIcon />} {...a11yProps(2)} disabled />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={this.state.value} index={0}>
                            <MyProfile />
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                            <ChangePassword />
                        </TabPanel>
                    </div>
                </Container>
            </AccountPage>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MyAccount);