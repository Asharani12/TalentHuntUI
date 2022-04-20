import { useState, useContext } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IProfile from "../../../classes/IProfile";
import { updateProfilePictureRequest } from "../../../services/MyAccount";
import SessionContext from "../../../context/SessionContext";
import snackbarAlert from "../../SnackbarAlert/";

interface ILeftProfileProps {
    UserId: string;
    Profile: IProfile;
}

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        height: 200,
        width: 200,
        [theme.breakpoints.down('xs')]: {
            height: 100,
            width: 100,
        },
    },
    loadingspan: {
        width: 200,
        height: 200,
        position: 'relative',
        marginTop: -200,
        opacity: 0.7,
        backgroundColor: '#fff',
        borderRadius: '50%'
    },
    loadingimg: {
        width: 100,
        marginTop: 50,
    }
}));

const LeftProfile = ({ UserId, Profile, ...rest }: ILeftProfileProps) => {
    const classes = useStyles();
    const [state, setState] = useState({ isUploading: false });
    const context = useContext(SessionContext);

    const handleChange = async (e: any) => {
        try {
            setState({ isUploading: true });
            let file_list = e.target.files;

            if (file_list && file_list[0]) {
                const selectedFile = file_list[0];
                const maxFileSize: number = 4194304; // 4MB -> 4 * 1024 * 1024 – to check in KB – Kilo Bytes

                if (selectedFile.size > maxFileSize) {
                    setState({ isUploading: false });
                    snackbarAlert.error("Failed!! Max allowed image size is 4 MB");
                }
                else {
                    const allowedExt = ['png', 'jpg', 'jpeg'];
                    const ext = selectedFile.name.split('.').pop().toLowerCase();
                    if (!allowedExt.includes(ext)) {
                        setState({ isUploading: false });
                        snackbarAlert.error("Failed!! Allowed image with these extentions only : " + allowedExt.join(', ') + ".");
                    }
                    else {
                        if (UserId) {
                            const response = await updateProfilePictureRequest(UserId, selectedFile);
                            if (response) {
                                if (response.Status.ResponseCode == 200) {
                                    Profile.ProfilePhoto = response.ProfilePhoto;
                                    context.UpdateProfilePicture(response.ProfilePhoto);
                                    snackbarAlert.success("Profile picture updated successfully!");
                                }
                                else {
                                    snackbarAlert.error("Oops! Something Broke!");
                                }
                            }
                            else {
                                snackbarAlert.error("Oops! Something Broke!");
                            }
                        }
                        else {
                            snackbarAlert.error("Oops! Something Broke!");
                        }
                    }
                }
            }
            else {
                snackbarAlert.error("Please select the image to update.");
            }
            setState({ isUploading: false });
        }
        catch (error) {
            setState({ isUploading: false });
            snackbarAlert.error("Oops! Something Broke!");
        }
    }

    return (
        <Card
            {...rest}
        >
            <CardContent>
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Avatar
                        className={classes.avatar}
                        src={Profile.ProfilePhoto}
                    />
                    {(state.isUploading) &&
                        <span className={classes.loadingspan}>
                            <img src="/static/images/loader.gif" className={classes.loadingimg} />
                        </span>
                    }
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                    >
                        {Profile.Name}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        {Profile.EmployeeCode}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="center">
                <CardActions>
                    <label htmlFor="ProfilePhoto">
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="ProfilePhoto"
                            disabled={state.isUploading}
                            onChange={handleChange}
                        />
                        <Button
                            color="primary"
                            fullWidth
                            variant="text"
                            component="span"
                            disabled={state.isUploading}
                            startIcon={<CloudUploadIcon />}
                        >
                            Update Profile Picture
                        </Button>
                    </label>
                </CardActions>
            </Box>
        </Card>
    );
};

export default LeftProfile;