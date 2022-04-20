import { useState, useEffect, useContext } from "react";
import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    Grid,
    TextField
} from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';
import * as Yup from "yup";
import { Formik } from "formik";
import {
    getRoleByIdRequest,
    insertRoleRequest,
    updateRoleRequest
} from "../../../services/Admin";
import IRole from "../../../classes/IRole";
import { PROJECT_PATHS } from "../../../shared/constants";
import DashboardPage from "../../Page/DashboardPage";
import SessionContext from "../../../context/SessionContext";
import snackbarAlert from "../../SnackbarAlert";
import Spinner from "../../Spinner";

const useStyles = makeStyles((theme: Theme) => ({
    mainBox: {
        maxWidth: 800,
        margin: '16px auto 0'
    },
    button: {
        margin: theme.spacing(1),
    }
}));

export interface IFormValues {
    rolename: string;
}

const AddRole = (props: any) => {
    const classes = useStyles();
    const context = useContext(SessionContext);
    const RoleId = props.match.params.id;
    const manageRole = PROJECT_PATHS.Admin.find(x => x.pagename === 'viewroles')?.path as string;

    const [loading, setLoading] = useState(true);
    const [initialValues, setInitialValues] = useState({
        rolename: ''
    } as IFormValues);


    const getRoleById = async (RoleId: string) => {
        try {
            const response = await getRoleByIdRequest(RoleId);
            if (response && response.Status.ResponseCode == 200) {
                const Role: IRole = response.Role;
                setInitialValues({ rolename: Role.RoleName });
                setLoading(false);
            }
            else {
                snackbarAlert.error("Oops! Something Broke!");
            }
        }
        catch (error) {
            snackbarAlert.error("Oops! Something Broke!");
        }
    }

    useEffect(() => {
        (async function execPreLoadFunctions() {
            if (RoleId) {
                await getRoleById(RoleId);
            }
            else {
                setLoading(false);
            }
        }());
    }, []);

    const handleSubmit = async (values: IFormValues, { resetForm }: any) => {
        try {
            const loggedinUserId = context.user?._id as string;
            if (RoleId) {
                const response = await updateRoleRequest(RoleId, values.rolename, loggedinUserId);
                if (response && response.Status.ResponseCode == 200) {
                    props.history.push(manageRole)
                }
                else if (response.Status.ResponseCode == 206) {
                    snackbarAlert.warning("Role name already exists! Please enter unique one.");
                }
                else {
                    snackbarAlert.error("Oops! Something Broke! Please try again.");
                }
            }
            else {
                const response = await insertRoleRequest(values.rolename, loggedinUserId);
                if (response && response.Status.ResponseCode == 200) {
                    snackbarAlert.success("Role added successfully!");
                    resetForm();
                }
                else if (response.Status.ResponseCode == 206) {
                    snackbarAlert.warning("Role name already exists! Please enter unique one.");
                }
                else {
                    snackbarAlert.error("Oops! Something Broke! Please try again.");
                }
            }
        }
        catch (error) {
            snackbarAlert.error("Oops! Something Broke!");
        }
    };

    const validationSchema = Yup.object().shape({
        rolename: Yup.string()
            .min(2, 'Role name should be minimum 2 characters!')
            .max(100, 'Role name should be maximum 100 characters!')
            .required('Role name is required!')
    });


    return (
        <DashboardPage title={RoleId ? "Manage Roles | Edit Role" : "Manage Roles | Add Role"}>
            {(!loading) ?
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
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Card>
                                    <CardHeader
                                        subheader={RoleId ? "Please change the below details to update role." : "Please fill the below details to add new role."}
                                        title={RoleId ? "Edit Role" : "Add Role"}
                                        style={{ textAlign: "center" }}
                                        titleTypographyProps={{ variant: 'h3', component: 'h3' }}
                                    />
                                    <Divider />
                                    <Box p={3}>
                                        <Grid container spacing={2}>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Role Name"
                                                    name="rolename"
                                                    value={values.rolename}
                                                    variant="outlined"
                                                    inputProps={{ maxLength: 100 }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={Boolean(touched.rolename && errors.rolename)}
                                                    helperText={touched.rolename && errors.rolename}

                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider />
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        p={1}
                                    >
                                        <Button
                                            color="primary"
                                            disabled={isSubmitting}
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            className={classes.button}
                                        >
                                            {(isSubmitting) ? "Please wait..." : (RoleId ? "Update" : "Save")}
                                        </Button>
                                        <Button
                                            color="secondary"
                                            size="large"
                                            variant="contained"
                                            className={classes.button}
                                            href={manageRole}
                                        >
                                            {RoleId ? 'Cancel' : 'Back'}
                                        </Button>
                                    </Box>
                                </Card>
                            </form>
                        )}
                    </Formik>
                </Box>
                :
                <Spinner />
            }
        </DashboardPage>
    );
};

export default AddRole;