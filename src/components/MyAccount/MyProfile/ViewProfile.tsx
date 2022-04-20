import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import IProfile from "../../../classes/IProfile";

interface IViewProfileProps {
    Profile: IProfile;
    ChageRightProfileMode: (newEditMode: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    bbtm: {
        borderBottom: '1px solid #E0E0E0'
    },
    p15: {
        padding: 15
    },
    pl15: {
        paddingLeft: 15
    },
    pr15: {
        paddingRight: 15
    },
    label: {
        color: "#000000",
        justifyContent: "flex-start",
        fontWeight: 'bold'
    },
    profileparent: {
        position: 'relative'
    },
    editprofile: {
        position: 'absolute',
        top: 13,
        right: 0,
        padding: 15,
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            top: 80
        }
    },
    btneditprofile: {
        padding: 8,
        minWidth: 0
    }
}));

const convertTime24to12 = (time: string) => {
    let convertedTime: string = time;
    if (time) {
        let [hours, minutes] = time.split(":").map(Number);

        const AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;

        convertedTime = (hours < 10 ? ("0" + hours) : hours) + ':' + (minutes < 10 ? ("0" + minutes) : minutes) + ' ' + AmOrPm;
    }
    return convertedTime;
};

const ViewProfile = ({ Profile, ChageRightProfileMode }: IViewProfileProps) => {
    const classes = useStyles();

    return (
        <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
            <Grid item lg={12} md={12} xs={12}>
                <Card className={classes.profileparent}>
                    <CardHeader
                        subheader="Please use edit to update profile info."
                        title="Profile Information"
                        style={{ textAlign: "center" }}
                        titleTypographyProps={{ variant: 'h3', component: 'h3' }}
                    />
                    <Box className={classes.editprofile}>
                        <Button
                            color="primary"
                            size="large"
                            type="submit"
                            variant="contained"
                            className={classes.btneditprofile}
                            onClick={() => ChageRightProfileMode(true)}
                        >
                            <EditIcon />
                        </Button>
                    </Box>
                    <Divider />
                    <CardContent style={{ textAlign: "left" }}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Grid container spacing={0} className={clsx(classes.p15, classes.bbtm)}>
                                    <Grid item sm={4} xs={12} className={classes.pr15}>
                                        <Typography className={classes.label}>
                                            Name :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={8} xs={12} className={classes.pl15}>
                                        <Typography>{Profile.Name}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={0} className={clsx(classes.p15, classes.bbtm)}>
                                    <Grid item sm={4} xs={12} className={classes.pr15}>
                                        <Typography className={classes.label}>
                                            Email :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={8} xs={12} className={classes.pl15}>
                                        <Typography>{Profile.Email}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={0} className={clsx(classes.p15, classes.bbtm)}>
                                    <Grid item sm={4} xs={12} className={classes.pr15}>
                                        <Typography className={classes.label}>
                                            Phone Number :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={8} xs={12} className={classes.pl15}>
                                        <Typography>{Profile.Phone}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={0} className={clsx(classes.p15, classes.bbtm)}>
                                    <Grid item sm={4} xs={12} className={classes.pr15}>
                                        <Typography className={classes.label}>
                                            Employee Code :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={8} xs={12} className={classes.pl15}>
                                        <Typography>{Profile.EmployeeCode}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={0} className={clsx(classes.p15, classes.bbtm)}>
                                    <Grid item sm={4} xs={12} className={classes.pr15}>
                                        <Typography className={classes.label}>
                                            Designation :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={8} xs={12} className={classes.pl15}>
                                        <Typography>{Profile.Designation}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={0} className={clsx(classes.p15, classes.bbtm)}>
                                    <Grid item sm={4} xs={12} className={classes.pr15}>
                                        <Typography className={classes.label}>
                                            Role :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={8} xs={12} className={classes.pl15}>
                                        <Typography>{Profile.Role}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={0} className={clsx(classes.p15, classes.bbtm)}>
                                    <Grid item sm={4} xs={12} className={classes.pr15}>
                                        <Typography className={classes.label}>
                                            Reporting Manager :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={8} xs={12} className={classes.pl15}>
                                        <Typography>{Profile.ReportingManager}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={0} className={classes.p15}>
                                    <Grid item sm={4} xs={12} className={classes.pr15}>
                                        <Typography className={classes.label}>
                                            Reminder Time :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={8} xs={12} className={classes.pl15}>
                                        <Typography>{convertTime24to12(Profile.ReminderTime)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    );
};

export default ViewProfile;