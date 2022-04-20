import { useContext } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    TextField
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import { changePasswordRequest } from "../../services/MyAccount";
import snackbarAlert from "../SnackbarAlert/";
import SessionContext from "../../context/SessionContext";

export interface IFormValues {
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
}

const ChangePassword = () => {
    const context = useContext(SessionContext);

    const handleSubmit = async (values: IFormValues, { resetForm }: any) => {
        try {
            if (context.user) {
                const response = await changePasswordRequest(context.user._id, values.oldpassword, values.newpassword);
                if (response) {
                    if (response.Status.ResponseCode == 200) {
                        snackbarAlert.success("Password updated successfully! Please sign in with new password, when you come back.");
                        resetForm();
                    }
                    else if (response.Status.ResponseCode == 207) {
                        snackbarAlert.warning("Old password is wrong! Please enter correct one.");
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
        oldpassword: Yup.string().max(100).required('Old password is required!'),
        newpassword: Yup.string()
            .min(7, 'Password length should be minimum 7 characters!')
            .max(100, 'Password should be maximum 100 characters!')
            .required('New Password is required!')
            .test('passwords-match', 'New password must be different from old password!', function (value) {
                return this.parent.oldpassword !== value
            }),
        confirmpassword: Yup.string().required("Confirm passsword is required!")
            .oneOf([Yup.ref('newpassword')], 'Passwords must match!')
    });

    return (
        <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
            <Formik
                enableReinitialize
                initialValues={{
                    oldpassword: '',
                    newpassword: '',
                    confirmpassword: ''
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
                        <Grid item lg={12} md={12} xs={12}>
                            <Card>
                                <CardHeader
                                    subheader="Please fill below details to change your password"
                                    title="Change Password"
                                    style={{ textAlign: "center" }}
                                    titleTypographyProps={{ variant: 'h3', component: 'h3' }}
                                />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item md={4} sm={12} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Old Password"
                                                margin="normal"
                                                name="oldpassword"
                                                type="password"
                                                value={values.oldpassword}
                                                variant="outlined"
                                                inputProps={{ maxLength: 100 }}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.oldpassword && errors.oldpassword)}
                                                helperText={touched.oldpassword && errors.oldpassword}
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={12} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="New Password"
                                                margin="normal"
                                                name="newpassword"
                                                type="password"
                                                value={values.newpassword}
                                                variant="outlined"
                                                inputProps={{ maxLength: 100 }}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.newpassword && errors.newpassword)}
                                                helperText={touched.newpassword && errors.newpassword}
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={12} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Confirm Password"
                                                margin="normal"
                                                name="confirmpassword"
                                                type="password"
                                                value={values.confirmpassword}
                                                variant="outlined"
                                                inputProps={{ maxLength: 100 }}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.confirmpassword && errors.confirmpassword)}
                                                helperText={touched.confirmpassword && errors.confirmpassword}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Divider />
                                <Box display="flex" justifyContent="flex-end" p={2}>
                                    <Button
                                        color="primary"
                                        disabled={isSubmitting}
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        {(isSubmitting) ? "Please wait..." : "Change Password"}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default ChangePassword;