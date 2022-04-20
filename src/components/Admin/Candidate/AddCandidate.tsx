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
import { Formik, yupToFormErrors } from "formik";
import {
  getRolesRequest,
  getReportingManagersRequest,
  getCandidateByIdRequest,
  addCandidateByIdRequest,
  updateCandidateByIdRequest,
} from "../../../services/Admin";
import { IUserDropdown } from "../../../classes/IUserShort";
import IRole from "../../../classes/IRole";
import { ICandidate, IRegisterUser, IUpdateUser } from "../../../classes/IUser";
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
  Name: String;
  DOB: String;
  Email: String;
  Skills: String;
  Contact: String;
  Designation: String;
  ModifiedBy: String;
  Profile: String;
  Experience: String;
  Reason_For_Leaving: String;
  Source: String;
  Interview_Schedule: String;
  Date_Of_Joining: String;
  Hiring_Status: String;
  Comment: String;
  Notice_Period: String;
  Ready_To_Relocate: String;
  Communication: String;
  Current_CTC: String;
  Current_Location: String;
  Expected_CTC: String;
  College_Name: String;
  _id: String;
  Resume: String;
}

const AddCandidate = (props: any) => {
  const classes = useStyles();
  const loggedInUser = useContext(SessionContext).user as ILoginUser;
  const CandidateId = props.match.params.id;
  const manageCandidatePath = PROJECT_PATHS.Manager.find(
    (x) => x.pagename === "viewcandidates"
  )?.path as string;

  const [loading, setLoading] = useState(true);
  const [viewOnly, setViewOnly] = useState(false);
  const [roles, setRoles] = useState([] as IRole[]);
  const [reportingmanagers, setReportingManagers] = useState(
    [] as IUserDropdown[]
  );
  const [editableCandidate, setEditableCandidate] = useState(
    undefined as ICandidate | undefined
  );
  const [initialValues, setInitialValues] = useState({
    Name: "",
    DOB: "",
    Email: "",
    Skills: "",
    Contact: "",
    Designation: "",
    ModifiedBy: "",
    Profile: "",
    Experience: "",
    Reason_For_Leaving: "",
    Source: "",
    Interview_Schedule: "",
    Date_Of_Joining: "",
    Hiring_Status: "",
    Comment: "",
    Notice_Period: "",
    Ready_To_Relocate: "",
    Communication: "",
    Current_CTC: "",
    Current_Location: "",
    Expected_CTC: "",
    College_Name: "",
    _id: "",
    Resume: "",
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

  const getCandidateById = async (CandidateId: string) => {
    try {
      const response = await getCandidateByIdRequest(CandidateId);
      console.log("respo", response.data);
      if (response) {
        const Candidate: ICandidate | undefined = response.data;
        if (Candidate) {
          setEditableCandidate(Candidate);
          setInitialValues({
            Name: Candidate.Name,
            DOB: Candidate.DOB,
            Email: Candidate.Email,
            Skills: Candidate.Skills,
            Contact: Candidate.Contact,
            Designation: Candidate.Designation,
            Experience: Candidate.Experience,
            Profile: Candidate.Profile,
            Reason_For_Leaving: Candidate.Reason_For_Leaving,
            Source: Candidate.Source,
            Interview_Schedule: Candidate.Interview_Schedule,
            Date_Of_Joining: Candidate.Date_Of_Joining,
            Hiring_Status: Candidate.Hiring_Status,
            Comment: Candidate.Comment,
            Notice_Period: Candidate.Notice_Period,
            Ready_To_Relocate: Candidate.Ready_To_Relocate,
            Communication: Candidate.Communication,
            Current_CTC: Candidate.Current_CTC,
            Current_Location: Candidate.Current_Location,
            Expected_CTC: Candidate.Expected_CTC,
            College_Name: Candidate.College_Name,
            ModifiedBy: loggedInUser._id,
            _id: CandidateId,
            Resume: "",
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
    console.log("CandidateId", CandidateId);
    (async function execPreLoadFunctions() {
      // await getRoles();
      // await getReportingManagers();
      if (CandidateId) {
        await getCandidateById(CandidateId);
        setViewOnly(false);
      } else {
        setLoading(false);
        setViewOnly(false);
      }
    })();
  }, []);

  const handleSubmit = async (values: IFormValues, { resetForm }: any) => {
    try {
      console.log("handle called");
      if (CandidateId) {
        const candidate: ICandidate = {
          Name: values.Name,
          DOB: values.DOB,
          Email: values.Email,
          Skills: values.Skills,
          Contact: values.Contact,
          Designation: values.Designation,
          Experience: values.Experience,
          Profile: values.Profile,
          Reason_For_Leaving: values.Reason_For_Leaving,
          Source: values.Source,
          Interview_Schedule: values.Interview_Schedule,
          Date_Of_Joining: values.Date_Of_Joining,
          Hiring_Status: values.Hiring_Status,
          Comment: values.Comment,
          Notice_Period: values.Notice_Period,
          Ready_To_Relocate: values.Ready_To_Relocate,
          Communication: values.Communication,
          Current_CTC: values.Current_CTC,
          Current_Location: values.Current_Location,
          Expected_CTC: values.Expected_CTC,
          College_Name: values.College_Name,
          ModifiedBy: loggedInUser._id,
          Resume: "",
          _id: CandidateId,
        };
        console.log("candidate", candidate);
        const response = await updateCandidateByIdRequest(
          CandidateId,
          candidate
        );
        console.log("response submit", response.status);
        if (response && response.status === true) {
          props.history.push(manageCandidatePath);
        } else if (response.status == 205) {
          snackbarAlert.warning(
            "Email or phone already exists! Please enter unique one."
          );
        } else {
          console.log("response submit", response.status);
          snackbarAlert.error("Oops! Something Broke! Please try again.");
        }
      } else {
        const candidate: ICandidate = {
          Name: values.Name,
          DOB: values.DOB,
          Email: values.Email,
          Skills: values.Skills,
          Contact: values.Contact,
          Designation: values.Designation,
          Experience: values.Experience,
          Profile: values.Profile,
          Reason_For_Leaving: values.Reason_For_Leaving,
          Source: values.Source,
          Interview_Schedule: values.Interview_Schedule,
          Date_Of_Joining: values.Date_Of_Joining,
          Hiring_Status: values.Hiring_Status,
          Comment: values.Comment,
          Notice_Period: values.Notice_Period,
          Ready_To_Relocate: values.Ready_To_Relocate,
          Communication: values.Communication,
          Current_CTC: values.Current_CTC,
          Current_Location: values.Current_Location,
          Expected_CTC: values.Expected_CTC,
          College_Name: values.College_Name,
          ModifiedBy: loggedInUser._id,
          _id: "",
          Resume: "",
        };
        console.log("candidate", candidate);
        const response = await addCandidateByIdRequest(candidate);
        if (response && response.status === true) {
          snackbarAlert.success("Candidate added successfully!");
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
    Name: Yup.string()
      .min(3, "Name should be minimum 3 characters!")
      .max(100, "Name should be maximum 100 characters!")
      .required("Name is required!"),
    Email: Yup.string()
      .email("Must be a valid email!")
      .max(100, "Email should be maximum 100 characters!")
      .required("Email is required!"),
    DOB: Yup.string()
      .required("Date of Birth is required!" ), 
    Skills: Yup.string()
         .required("Skills are required"),
    Contact: Yup.string()
      .min(10, "Phone number should be 10 digits!")
      .max(10, "Phone number should be 10 digits!")
      .matches(NumbersRegExp, "Must be a valid phone number!")
      .required("Phone number is required!"),
    Designation: Yup.string()
      .min(5, "designation should have minimum 5 charaters!")
      .max(100,"designation should have maximum 100 charater!")
      .required("designation should required"),  
    Experience: Yup.string()
      .required("Experience is required"),
    Profile: Yup.string()
      .required("Profile is required"),
    Reason_For_Leaving: Yup.string()
      .required("Reason for leaving is required"),
    Source: Yup.string()
      .required("Source is required"),
    Interview_Schedule: Yup.string()
       .required("schedule for interview is required"),
    Date_Of_Joining: Yup.string()
       .required("joining date is required"),
    Hiring_Status: Yup.string()
       .required("hiring status is required"),   
    Comment: Yup.string()
       .required("comment is required"),
    Notice_Period: Yup.string()
       .required("notice period is required"),
    Ready_To_Relocate: Yup.string()
       .required("ready to relocate is required"),
    Communication: Yup.string()
      .min(3, "should be minimum 3 charaters")
      .max(100, "communication should have maximun 100 charaters!")
      .required("communication is required"),           
    Current_CTC: Yup.string()
      .required("current CTC is required"),
    Current_Location: Yup.string()
       .required("current location is required"),  
    Expected_CTC: Yup.string()
      .required("expected ctc is required"),
    College_Name: Yup.string()
       .min(10,"college name should be 10 charaters!")  
       .max(100,"college name should be 100 charaters!")
       .required("college name is required"),
    Resume: Yup.string()
      .required("resume is required")    
  });

  return (
    <DashboardPage
      title={
        CandidateId
          ? "Manage Candidates | Edit Candidate"
          : "Manage Candidates | Add Candidate"
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
                      CandidateId
                        ? "Please change the below details to update candidate."
                        : "Please fill the below details to add candidate."
                    }
                    title={CandidateId ? "Edit Candidate" : "Add Candidate"}
                    style={{ textAlign: "center" }}
                    titleTypographyProps={{ variant: "h3", component: "h3" }}
                  />
                  <Divider />
                  <Box p={3}>
                    <Grid container spacing={2}>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Name"
                          name="Name"
                          value={values.Name}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.Name && errors.Name)}
                          helperText={touched.Name && errors.Name}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="DOB"
                          variant="outlined"
                          value={values.DOB}
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.DOB && errors.DOB)}
                          helperText={touched.DOB && errors.DOB}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Designation"
                          name="Designation"
                          value={values.Designation}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Designation && errors.Designation
                          )}
                          helperText={touched.Designation && errors.Designation}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Email"
                          name="Email"
                          type="Email"
                          value={values.Email}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.Email && errors.Email)}
                          helperText={touched.Email && errors.Email}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Skills"
                          name="Skills"
                          variant="outlined"
                          value={values.Skills}
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.Skills && errors.Skills}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Contact"
                          name="Contact"
                          value={values.Contact}
                          variant="outlined"
                          inputProps={{ maxLength: 10 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.Contact && errors.Contact)}
                          helperText={touched.Contact && errors.Contact}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Experience"
                          name="Experience"
                          value={values.Experience}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Experience && errors.Experience
                          )}
                          helperText={touched.Experience && errors.Experience}
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Profile"
                          name="Profile"
                          value={values.Profile}
                          variant="outlined"
                          SelectProps={{ native: true }}
                          InputLabelProps={{ shrink: true }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.Profile && errors.Profile)}
                          helperText={touched.Profile && errors.Profile}
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
                          fullWidth
                          disabled={viewOnly}
                          label="Reason For Leaveing"
                          name="Reason_For_Leaving"
                          value={values.Reason_For_Leaving}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Reason_For_Leaving &&
                              errors.Reason_For_Leaving
                          )}
                          helperText={
                            touched.Reason_For_Leaving &&
                            errors.Reason_For_Leaving
                          }
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Source"
                          name="Source"
                          value={values.Source}
                          variant="outlined"
                          SelectProps={{ native: true }}
                          InputLabelProps={{ shrink: true }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.Source && errors.Source)}
                          helperText={touched.Source && errors.Source}
                        >
                          <option value="">- None -</option>
                          {reportingmanagers.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.Name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Interview Schedule"
                          name="Interview_Schedule"
                          value={values.Interview_Schedule}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Interview_Schedule &&
                              errors.Interview_Schedule
                          )}
                          helperText={
                            touched.Interview_Schedule &&
                            errors.Interview_Schedule
                          }
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Date Of Joining"
                          name="Date_Of_Joining"
                          value={values.Date_Of_Joining}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Date_Of_Joining && errors.Date_Of_Joining
                          )}
                          helperText={
                            touched.Date_Of_Joining && errors.Date_Of_Joining
                          }
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Hiring Status"
                          name="Hiring_Status"
                          value={values.Hiring_Status}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Hiring_Status && errors.Hiring_Status
                          )}
                          helperText={
                            touched.Hiring_Status && errors.Hiring_Status
                          }
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Comment"
                          name="Comment"
                          value={values.Comment}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.Comment && errors.Comment)}
                          helperText={touched.Comment && errors.Comment}
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Notice Period"
                          name="Notice_Period"
                          value={values.Notice_Period}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Notice_Period && errors.Notice_Period
                          )}
                          helperText={
                            touched.Notice_Period && errors.Notice_Period
                          }
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Ready To Relocate"
                          name="Ready_To_Relocate"
                          value={values.Ready_To_Relocate}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Ready_To_Relocate &&
                              errors.Ready_To_Relocate
                          )}
                          helperText={
                            touched.Ready_To_Relocate &&
                            errors.Ready_To_Relocate
                          }
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Communication"
                          name="Communication"
                          value={values.Communication}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Communication && errors.Communication
                          )}
                          helperText={
                            touched.Communication && errors.Communication
                          }
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Current CTC"
                          name="Current_CTC"
                          value={values.Current_CTC}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Current_CTC && errors.Current_CTC
                          )}
                          helperText={touched.Current_CTC && errors.Current_CTC}
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Current Location"
                          name="Current_Location"
                          value={values.Current_Location}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Current_Location && errors.Current_Location
                          )}
                          helperText={
                            touched.Current_Location && errors.Current_Location
                          }
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Expected CTC"
                          name="Expected_CTC"
                          value={values.Expected_CTC}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.Expected_CTC && errors.Expected_CTC
                          )}
                          helperText={
                            touched.Expected_CTC && errors.Expected_CTC
                          }
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="College Name"
                          name="College_Name"
                          value={values.College_Name}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.College_Name && errors.College_Name
                          )}
                          helperText={
                            touched.College_Name && errors.College_Name
                          }
                        />
                      </Grid>

                      <Grid item md={6} sm={6} xs={12}>
                        <TextField
                          fullWidth
                          disabled={viewOnly}
                          label="Resume"
                          name="Resume"
                          value={values.Resume}
                          variant="outlined"
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.Resume && errors.Resume)}
                          helperText={touched.Resume && errors.Resume}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="center" p={1}>
                    <Button
                      color="primary"
                      disabled={viewOnly}
                      size="large"
                      type="submit"
                      variant="contained"
                      className={classes.button}
                    >
                      {isSubmitting
                        ? "Please wait..."
                        : CandidateId
                        ? "Update"
                        : "Add"}
                    </Button>
                    <Button
                      color="secondary"
                      size="large"
                      variant="contained"
                      className={classes.button}
                      href={manageCandidatePath}
                    >
                      {CandidateId ? "Cancel" : "Back"}
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
export default AddCandidate;
