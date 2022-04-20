import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  getRolesRequest,
  getReportingManagersRequest,
  getUserByIdRequest,
  registerUserRequest,
  updateUserRequest,
} from "../../../services/Admin";
import { IUserDropdown } from "../../../classes/IUserShort";
import IRole from "../../../classes/IRole";
import { IUser, IRegisterUser, IUpdateUser } from "../../../classes/IUser";
import ILoginUser from "../../../classes/ILoginUser";
import { PROJECT_PATHS, NumbersRegExp } from "../../../shared/constants";
import DashboardPage from "../../Page/DashboardPage";
import SessionContext from "../../../context/SessionContext";
import snackbarAlert from "../../SnackbarAlert";
import Spinner from "../../Spinner";

const useStyles = makeStyles((theme: Theme) => ({
  mainBox: {
    maxWidth: 800,
    margin: "16px auto 0",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export interface IFormValues {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phone: number | "";
  employeecode: string;
  designation: string;
  role: string;
  reportingmanager: string;
}

const AddUser = (props: any) => {
  const classes = useStyles();
  const loggedInUser = useContext(SessionContext).user as ILoginUser;
  const UserId = props.match.params.id;
  const manageUserPath = PROJECT_PATHS.Admin.find(
    (x) => x.pagename === "viewusers"
  )?.path as string;

  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([] as IRole[]);
  const [reportingmanagers, setReportingManagers] = useState(
    [] as IUserDropdown[]
  );
  const [editableUser, setEditableUser] = useState(
    undefined as IUser | undefined
  );
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    employeecode: "",
    designation: "",
    role: "",
    reportingmanager: "",
  } as IFormValues);

  const getRoles = async () => {
    try {
      const response = await getRolesRequest();
      if (response && response.Status.ResponseCode == 200) {
        const drp_roles: IRole[] = response.Roles;
        setRoles(drp_roles);
      } else {
        snackbarAlert.error("Oops! Something Broke!");
      }
    } catch (error) {
      snackbarAlert.error("Oops! Something Broke!");
    }
  };

  const getReportingManagers = async () => {
    try {
      const response = await getReportingManagersRequest();
      if (response && response.Status.ResponseCode == 200) {
        const drp_users: IUserDropdown[] = response.Users;
        setReportingManagers(drp_users);
      } else {
        snackbarAlert.error("Oops! Something Broke!");
      }
    } catch (error) {
      snackbarAlert.error("Oops! Something Broke!");
    }
  };

  const getUserById = async (UserId: string) => {
    try {
      const response = await getUserByIdRequest(UserId);
      if (response && response.Status.ResponseCode == 200) {
        const User: IUser | undefined = response.User;
        if (
          User &&
          (loggedInUser.IsHost ||
            (loggedInUser.IsSuperAdmin && !User.IsSuperAdmin) ||
            loggedInUser._id === User._id ||
            loggedInUser._id === User.CreatedBy ||
            User.Role.RoleName.toLowerCase() !== "admin")
        ) {
          setEditableUser(User);
          setInitialValues({
            firstname: User.FirstName,
            lastname: User.LastName,
            email: User.Email,
            phone: User.Phone,
            employeecode: User.EmployeeCode,
            designation: User.Designation,
            role: User.Role._id,
            reportingmanager: User.ReportingManager._id,
          });
          setLoading(false);
        } else {
          snackbarAlert.error("Oops! Something Broke!");
        }
      } else {
        snackbarAlert.error("Oops! Something Broke!");
      }
    } catch (error) {
      snackbarAlert.error("Oops! Something Broke!");
    }
  };

  useEffect(() => {
    (async function execPreLoadFunctions() {
      await getRoles();
      await getReportingManagers();
      if (UserId) {
        await getUserById(UserId);
      } else {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (values: IFormValues, { resetForm }: any) => {
    try {
      if (UserId) {
        const user: IUpdateUser = {
          FirstName: values.firstname,
          LastName: values.lastname,
          Phone: values.phone as number,
          Email: values.email,
          EmployeeCode: values.employeecode,
          Designation: values.designation,
          RoleId: values.role,
          ReportingManagerId: values.reportingmanager,
          ModifiedBy: loggedInUser._id,
        };
        const response = await updateUserRequest(UserId, user);
        if (response && response.Status.ResponseCode == 200) {
          props.history.push(manageUserPath);
        } else if (response.Status.ResponseCode == 205) {
          snackbarAlert.warning(
            "Email or phone already exists! Please enter unique one."
          );
        } else {
          snackbarAlert.error("Oops! Something Broke! Please try again.");
        }
      } else {
        const user: IRegisterUser = {
          FirstName: values.firstname,
          LastName: values.lastname,
          Phone: values.phone as number,
          Email: values.email,
          Password: values.password as string,
          EmployeeCode: values.employeecode,
          Designation: values.designation,
          RoleId: values.role,
          ReportingManagerId: values.reportingmanager,
          CreatedBy: loggedInUser._id,
        };
        const response = await registerUserRequest(user);
        if (response && response.Status.ResponseCode == 200) {
          snackbarAlert.success("User registered successfully!");
          resetForm();
        } else if (response.Status.ResponseCode == 205) {
          snackbarAlert.warning(
            "Email or phone already exists! Please enter unique one."
          );
        } else {
          snackbarAlert.error("Oops! Something Broke! Please try again.");
        }
      }
    } catch (error) {
      snackbarAlert.error("Oops! Something Broke!");
    }
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "First name should be minimum 2 characters!")
      .max(100, "First name should be maximum 100 characters!")
      .required("First name is required!"),
    lastname: Yup.string()
      .min(2, "Last name should be minimum 2 characters!")
      .max(100, "Last name should be maximum 100 characters!")
      .required("Last name is required!"),
    email: Yup.string()
      .email("Must be a valid email!")
      .max(100, "Email should be maximum 100 characters!")
      .required("Email is required!"),
    password: !UserId
      ? Yup.string()
          .min(7, "Password should be minimum 7 characters!")
          .max(100, "Password should be maximum 100 characters!")
          .required("Password is required!")
      : Yup.string(),
    phone: Yup.string()
      .min(10, "Phone number should be 10 digits!")
      .max(10, "Phone number should be 10 digits!")
      .matches(NumbersRegExp, "Must be a valid phone number!")
      .required("Phone number is required!"),
    employeecode: Yup.string()
      .max(100, "Employee code should be maximum 100 characters!")
      .required("Employee code is required!"),
    designation: Yup.string()
      .max(100, "Designation should be maximum 100 characters!")
      .required("Designation is required!"),
    role: Yup.string().required("Role is required!"),
    reportingmanager: Yup.string().required("Reporting manager is required!"),
  });

  return (
    <DashboardPage
      title={
        UserId ? "Manage Users | Edit User" : "Manage Users | Register User"
      }
    >
      {!loading ? (
        <Box className={classes.mainBox}>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
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
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader
                    subheader={
                      UserId
                        ? "Please change the below details to update user."
                        : "Please fill the below details to register user."
                    }
                    title={UserId ? "Edit User" : "Register User"}
                    style={{ textAlign: "center" }}
                    titleTypographyProps={{ variant: "h3", component: "h3" }}
                  />
                  <Divider />
                  <Box p={3}>
                    <Grid container spacing={2}>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstname"
                          value={values.firstname}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.firstname && errors.firstname)}
                          helperText={touched.firstname && errors.firstname}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastname"
                          value={values.lastname}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.lastname && errors.lastname)}
                          helperText={touched.lastname && errors.lastname}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={values.email}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      {!UserId && (
                        <Grid item md={6} sm={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Password"
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
                        </Grid>
                      )}
                      <Grid item md={6} sm={6} xs={12}>
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
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Employee Code"
                          name="employeecode"
                          value={values.employeecode}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.employeecode && errors.employeecode
                          )}
                          helperText={
                            touched.employeecode && errors.employeecode
                          }
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Designation"
                          name="designation"
                          value={values.designation}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.designation && errors.designation
                          )}
                          helperText={touched.designation && errors.designation}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          select
                          fullWidth
                          label="Select Role"
                          name="role"
                          value={values.role}
                          variant="outlined"
                          disabled={
                            editableUser &&
                            editableUser.Role.RoleName.toLowerCase() ===
                              "admin" &&
                            editableUser._id === loggedInUser._id
                              ? true
                              : false
                          }
                          SelectProps={{ native: true }}
                          InputLabelProps={{ shrink: true }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.role && errors.role)}
                          helperText={touched.role && errors.role}
                        >
                          <option key="-1" value="">
                            - None -
                          </option>
                          {roles.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.RoleName}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          select
                          fullWidth
                          label="Select Reporting Manager"
                          name="reportingmanager"
                          value={values.reportingmanager}
                          variant="outlined"
                          disabled={
                            editableUser &&
                            editableUser.Role.RoleName.toLowerCase() ===
                              "admin" &&
                            editableUser._id === loggedInUser._id
                              ? true
                              : false
                          }
                          SelectProps={{ native: true }}
                          InputLabelProps={{ shrink: true }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.reportingmanager && errors.reportingmanager
                          )}
                          helperText={
                            touched.reportingmanager && errors.reportingmanager
                          }
                        >
                          <option value="">- None -</option>
                          {reportingmanagers.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.Name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="center" p={1}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                      className={classes.button}
                    >
                      {isSubmitting
                        ? "Please wait..."
                        : UserId
                        ? "Update"
                        : "Register"}
                    </Button>
                    <Button
                      color="secondary"
                      size="large"
                      variant="contained"
                      className={classes.button}
                      href={manageUserPath}
                    >
                      {UserId ? "Cancel" : "Back"}
                    </Button>
                  </Box>
                </Card>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        <Spinner />
      )}
    </DashboardPage>
  );
};

export default AddUser;
