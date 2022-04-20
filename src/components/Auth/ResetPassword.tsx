import { Component } from "react";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
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
import { resetPasswordRequest } from "../../services/Auth";
import snackbarAlert from "../SnackbarAlert/";

export interface IFormValues {
  password: string;
  confirmpassword: string;
}

export interface IParams {
  id: string;
}

export interface IState {
  loginPath: string;
}

class ResetPassword extends Component<RouteComponentProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loginPath: PROJECT_PATHS.Auth.find(x => x.pagename === 'landing')?.path as string
    }
  }

  handleSubmit = async (values: IFormValues, { resetForm }: any) => {
    try {
      const params = this.props.match.params as IParams;

      const response = await resetPasswordRequest(params.id, values.password);
      if (response) {
        if (response.Status.ResponseCode == 200) {
          snackbarAlert.success("Password updated successfully! Please sign in with new password.");
          resetForm();
          const loginPath = PROJECT_PATHS.Auth.find(x => x.pagename === 'landing')?.path as string;
          this.props.history.push(this.state.loginPath);
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
    password: Yup.string()
      .min(7, 'Password should be minimum 7 characters!')
      .max(100, 'Password should be maximum 100 characters!')
      .required('Password is required!'),
    confirmpassword: Yup.string()
      .required("Confirm passsword is required!")
      .test('passwords-match', 'Passwords must match!', function (value) {
        return this.parent.password === value
      })
  });

  render() {
    const login = PROJECT_PATHS.Auth.find(x => x.pagename === 'landing');
    return (
      <MainPage title="Reset Password">
        <Box display="flex" flexDirection="column" height="100%" justifyContent="center" padding={2}>
          <Container className="maincontent-box">
            <Box mb={3}>
              <Typography color="textPrimary" className="boxtitle" variant="h2">Reset Your Password</Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">Please enter a new password to reset.</Typography>
            </Box>
            <Formik
              initialValues={{
                password: '',
                confirmpassword: ''
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
                    label="New Password"
                    margin="normal"
                    name="password"
                    type="password"
                    value={values.password}
                    variant="outlined"
                    inputProps={{ maxLength: 100 }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    margin="normal"
                    name="confirmpassword"
                    type="password"
                    inputProps={{ maxLength: 100 }}
                    value={values.confirmpassword}
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.confirmpassword && errors.confirmpassword)}
                    helperText={touched.confirmpassword && errors.confirmpassword}
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
                      {(isSubmitting) ? "Please wait..." : "Reset Password"}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1" >
                    <Link component={RouterLink} to={this.state.loginPath} variant="h6">
                      GO TO SIGN IN
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

export default ResetPassword;