import * as Yup from "yup";
import { Formik } from "formik";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';
import IProfile from "../../../classes/IProfile";
import { updateProfileRequest } from "../../../services/MyAccount";
import { NumbersRegExp } from "../../../shared/constants";
import snackbarAlert from "../../SnackbarAlert/";


const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(1),
    }
}));

interface IEditProfileProps {
    Profile: IProfile;
    ChageRightProfileMode: (newEditMode: boolean) => void;
}

export interface IFormValues {
    name: string;
    phone: number;
    email: string;
    employeeCode: string;
    designation: string;
    role: string;
    reportingManager: string;
    reminderTime: string;
}

const EditProfile = ({ Profile, ChageRightProfileMode }: IEditProfileProps) => {
    const classes = useStyles();

    const handleSubmit = async (values: IFormValues) => {
        try {
            if (Profile) {
                const response = await updateProfileRequest(Profile._id, values.phone, values.reminderTime);
                if (response) {
                    if (response.Status.ResponseCode == 200) {
                        Profile.Phone = values.phone;
                        Profile.ReminderTime = values.reminderTime;
                        snackbarAlert.success("Profile updated successfully!");
                        ChageRightProfileMode(false);
                    }
                    else if (response.Status.ResponseCode == 205) {
                        snackbarAlert.warning("Phone number already exists! Please enter correct one.");
                    }
                    else {
                        snackbarAlert.error("Oops! Something Broke! Please try again.");
                    }
                }
                else {
                    snackbarAlert.error("Oops! Something Broke! Please try again.");
                }
            }
            else {
                snackbarAlert.error("Oops! Something Broke! Please try again.");
            }
        }
        catch (error) {
            snackbarAlert.error("Oops! Something Broke!");
        }
    };

    const validationSchema = Yup.object().shape({
        phone: Yup.string()
            .min(10, 'Phone number should be 10 digits!')
            .max(10, 'Phone number should be 10 digits!')
            .matches(NumbersRegExp, 'Must be a valid phone number!')
            .required('Phone number is required!'),
        reminderTime: Yup.string().required('Reminder time is required!')
    });

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: Profile.Name,
                phone: Profile.Phone,
                email: Profile.Email,
                employeeCode: Profile.EmployeeCode,
                designation: Profile.Designation,
                role: Profile.Role,
                reportingManager: Profile.ReportingManager,
                reminderTime: Profile.ReminderTime
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
            }) => (
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader
                            subheader="Please change the below details to update profile."
                            title="Edit Profile"
                            style={{ textAlign: "center" }}
                            titleTypographyProps={{ variant: 'h3', component: 'h3' }}
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={Profile.Name}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        value={Profile.Email}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Employee Code"
                                        name="employeeCode"
                                        value={Profile.EmployeeCode}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Designation"
                                        name="designation"
                                        value={Profile.Designation}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Role"
                                        name="role"
                                        value={Profile.Role}
                                        variant="outlined"
                                    >
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Reporting Manager"
                                        name="reportingManager"
                                        value={Profile.ReportingManager}
                                        variant="outlined"
                                    >
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        value={values.phone}
                                        variant="outlined"
                                        inputProps={{ maxLength: 10 }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.phone && errors.phone)}
                                        helperText={touched.phone && errors.phone}

                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Reminder Time"
                                        name="reminderTime"
                                        type="time"
                                        value={values.reminderTime}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.reminderTime && errors.reminderTime)}
                                        helperText={touched.reminderTime && errors.reminderTime}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            p={2}
                        >
                            <Button
                                color="primary"
                                disabled={isSubmitting}
                                size="large"
                                type="submit"
                                variant="contained"
                                className={classes.button}
                            >
                                {(isSubmitting) ? "Please wait..." : "Update"}
                            </Button>
                            <Button
                                color="secondary"
                                size="large"
                                variant="contained"
                                className={classes.button}
                                onClick={() => ChageRightProfileMode(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Card>
                </form>
            )}
        </Formik>
    );
};

export default EditProfile;