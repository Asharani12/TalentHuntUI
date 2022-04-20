import { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from "@material-ui/core";
import { PROJECT_PATHS } from "../../shared/constants";
import MainPage from "../Page/MainPage";
import { sendResetPasswordLinkRequest } from "../../services/Auth";
import snackbarAlert from "../SnackbarAlert/";

export interface IFormValues {
  email: string;
}

class ForgotPassword extends Component {

  constructor(props: any) {
    super(props);
  }

  handleSubmit = async (values: IFormValues, { resetForm }: any) => {
    try {
      const resetPasswordPath = PROJECT_PATHS.Auth.find(x => x.pagename === 'resetpassword')?.path.replace('/:id', '');
      const resetPasswordUrl = window.location.protocol + '//' + window.location.hostname + resetPasswordPath;

      const response = await sendResetPasswordLinkRequest(values.email, resetPasswordUrl);
      if (response) {
        if (response.Status.ResponseCode == 200) {
          snackbarAlert.success("Please check your email to reset password!");
          resetForm();
        }
        else if (response.Status.ResponseCode == 203) {
          snackbarAlert.warning("Email is not registered yet!");
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

  validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email!').max(100).required('Email is required!')
  });

  render() {
    const login = PROJECT_PATHS.Auth.find(x => x.pagename === 'landing');
    return (
      <MainPage title="Forgot Password">
        <Box display="flex" flexDirection="column" height="100%" justifyContent="center" padding={2}>
          <Container className="maincontent-box">
            <Box mb={3}>
              <Typography color="textPrimary" className="boxtitle" variant="h2">Forgot Your Password?</Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">If you forgot your password, no worries: enter your email address and we'll send you a link to pick a new password.</Typography>
            </Box>
            <Formik
              initialValues={{
                email: ''
              }}
              validationSchema={this.validationSchema}
              onSubmit={this.handleSubmit}
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
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    type="email"
                    value={values.email}
                    variant="outlined"
                    inputProps={{ maxLength: 100 }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {(isSubmitting) ? "Please wait..." : "Send link"}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1" >
                    <Link component={RouterLink} to={login ? login.path : '#'} variant="h6">
                      BACK TO SIGN IN
                  </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </MainPage>
    );
  }
};

export default ForgotPassword;