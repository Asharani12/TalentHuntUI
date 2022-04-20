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
  Typography,
} from "@material-ui/core";
import { PROJECT_PATHS } from "../../shared/constants";
import MainPage from "../Page/MainPage";
import ILoginUser from "../../classes/ILoginUser";
import { loginRequest } from "../../services/Auth";
import SessionContext from "../../context/SessionContext";
import snackbarAlert from "../SnackbarAlert/";

export interface IFormValues {
  email: string;
  password: string;
}

class Login extends Component {
  static contextType = SessionContext;

  constructor(props: any) {
    super(props);
  }

  handleSubmit = async (values: IFormValues) => {
    try {
      const response = await loginRequest(values.email, values.password);
      if (response) {
        if (response.Status.ResponseCode == 200) {
          const User: ILoginUser = response.User;
          this.context.LoginUser(User);
        } else if (response.Status.ResponseCode == 202) {
          snackbarAlert.warning("You have entered wrong credentials!");
        } else if (response.Status.ResponseCode == 203) {
          snackbarAlert.warning("Email is not registered yet!");
        }
      } else {
        snackbarAlert.error("Oops! Something Broke! Please try again.");
      }
    } catch (error) {
      snackbarAlert.error("Oops! Something Broke!");
    }
  };

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email!")
      .max(100)
      .required("Email is required!"),
    password: Yup.string().max(100).required("Password is required!"),
  });

  render() {
    const forgotPassword = PROJECT_PATHS.Auth.find(
      (x) => x.pagename === "forgotpassword"
    );
    return (
      <MainPage title="Sign In">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
          padding={2}
        >
          <Container className="maincontent-box">
            <Box mb={3}>
              <Typography color="textPrimary" className="boxtitle" variant="h2">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in to HRM platform
              </Typography>
            </Box>
            <Formik
              initialValues={{
                email: "",
                password: "",
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
                values,
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
                    // required // This enables the browser messages
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Password"
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
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {isSubmitting ? "Signing in..." : "Sign in now"}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    <Link
                      component={RouterLink}
                      to={forgotPassword ? forgotPassword.path : "#"}
                      variant="h6"
                    >
                      FORGOT PASSWORD ?
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
}

export default Login;
