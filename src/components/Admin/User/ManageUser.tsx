import { useContext, useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  SvgIcon,
  TextField,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import {
  GridColDef,
  GridCellParams,
  GridValueGetterParams,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import {
  getRolesRequest,
  getReportingManagersRequest,
  getUsersRequest,
  deleteUserRequest,
} from "../../../services/Admin";
import SessionContext from "../../../context/SessionContext";
import { PROJECT_PATHS } from "../../../shared/constants";
import { IUser } from "../../../classes/IUser";
import { IUserDropdown, IUserShort } from "../../../classes/IUserShort";
import IRole from "../../../classes/IRole";
import ILoginUser from "../../../classes/ILoginUser";
import getInitials from "../../../utils/getInitials";
import moment from "moment";
import DashboardPage from "../../Page/DashboardPage";
import GridView from "../../DataGrid";
import DialogBox from "../../DialogBox";
import snackbarAlert from "../../SnackbarAlert";
import Spinner from "../../Spinner";

const useStyles = makeStyles((theme: Theme) => ({
  mbottom: {
    marginBottom: theme.spacing(3),
  },
  avatar: {
    cursor: "pointer",
    width: 40,
    height: 40,
  },
}));

let filters = {
  RoleId: "",
  ReportingManagerId: "",
  SearchStr: "",
};

const ManageUser = () => {
  const classes = useStyles();
  const loggedInUser = useContext(SessionContext).user as ILoginUser;

  const initialDialogState = {
    open: false,
    title: "Delete User",
    description: <>Are you sure you want to delete this user?</>,
    UserId: "",
  };

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([] as IUser[]);
  const [originalData, setOriginalData] = useState([] as IUser[]);
  const [roles, setRoles] = useState([] as IRole[]);
  const [reportingmanagers, setReportingManagers] = useState(
    [] as IUserDropdown[]
  );
  const [submmitting, setSubmmitting] = useState(false);
  const [dialog, setDialog] = useState(initialDialogState);

  const addUserPath = PROJECT_PATHS.Admin.find((x) => x.pagename === "adduser")
    ?.path as string;
  const editUserPath = PROJECT_PATHS.Admin.find(
    (x) => x.pagename === "edituser"
  )?.path as string;

  const columns: GridColDef[] = [
    {
      field: "Photo",
      headerName: "Photo",
      headerAlign: "center",
      cellClassName: "text-center",
      width: 70,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <Avatar className={classes.avatar} src={params.row.ProfilePhoto}>
          {getInitials(params.row.FirstName + " " + params.row.LastName)}
        </Avatar>
      ),
    },
    {
      field: "Name",
      headerName: "Name",
      width: 110,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.FirstName} ${params.row.LastName}`,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "Phone",
      headerName: "Phone",
      width: 110,
    },
    {
      field: "EmployeeCode",
      headerName: "Emp. Code",
      width: 100,
    },
    {
      field: "Role",
      headerName: "Role",
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.Role ? params.row.Role.RoleName : ""}`,
    },
    {
      field: "ReportingManager",
      headerName: "Reporting Manager",
      width: 120,
      headerClassName: "text-left",
      valueGetter: (params: GridValueGetterParams) =>
        `${
          params.row.ReportingManager
            ? `${params.row.ReportingManager.FirstName} ${params.row.ReportingManager.LastName}`
            : ""
        }`,
    },
    {
      field: "ReminderTime",
      headerName: "Reminder Time",
      width: 115,
      headerClassName: "text-left",
      valueFormatter: (params: GridValueFormatterParams) =>
        convertTime24to12(`${params.row.ReminderTime}`),
    },
    {
      field: "CreatedDate",
      headerName: "Registered Date",
      type: "date",
      width: 125,
      headerClassName: "text-left",
      valueFormatter: (params: GridValueFormatterParams) =>
        moment(`${params.row.CreatedDate}`).format("YYYY-MM-DD"),
    },
    {
      field: " ",
      headerName: " ",
      cellClassName: "text-center",
      width: 120,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          {(loggedInUser.IsHost ||
            (loggedInUser.IsSuperAdmin && !params.row.IsSuperAdmin) ||
            loggedInUser._id === params.row._id ||
            loggedInUser._id === params.row.CreatedBy ||
            (params.row.Role &&
              params.row.Role.RoleName.toLowerCase() !== "admin")) && (
            <IconButton
              size="small"
              className="gridbutton btnEdit"
              aria-label="edit"
              disabled={submmitting}
              href={editUserPath.replace(":id", `${params.row._id}`)}
            >
              <EditIcon />
            </IconButton>
          )}
          {(loggedInUser.IsHost ||
            (loggedInUser.IsSuperAdmin &&
              loggedInUser._id !== params.row._id &&
              !params.row.IsSuperAdmin) ||
            loggedInUser._id === params.row.CreatedBy ||
            (params.row.Role &&
              params.row.Role.RoleName.toLowerCase() !== "admin")) && (
            <IconButton
              size="small"
              className="gridbutton btnDelete"
              aria-label="delete"
              disabled={submmitting}
              onClick={() =>
                showDialogBox(
                  `${params.row._id}`,
                  `${params.row.FirstName} ${params.row.LastName}`
                )
              }
            >
              <DeleteIcon />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  const convertTime24to12 = (time: string) => {
    let convertedTime: string = time;
    if (time) {
      let [hours, minutes] = time.split(":").map(Number);

      const AmOrPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      convertedTime =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        " " +
        AmOrPm;
    }
    return convertedTime;
  };

  const showDialogBox = (UserId: string, Name: string) => {
    let popupdesc = (
      <>
        Are you sure you want to delete this user - <b>"{Name}"</b>?
      </>
    );
    setDialog({
      ...dialog,
      open: true,
      description: popupdesc,
      UserId: UserId,
    });
  };

  const closeDialogBox = () => {
    setDialog({
      ...dialog,
      open: false,
      UserId: "",
    });
  };

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

  const getUsers = async () => {
    try {
      const response = await getUsersRequest();
      if (response && response.Status.ResponseCode == 200) {
        const gridrows: IUser[] = response.Users;
        setRows(gridrows);
        setOriginalData(gridrows);
      } else {
        snackbarAlert.error("Oops! Something Broke!");
      }
    } catch (error) {
      snackbarAlert.error("Oops! Something Broke!");
    }
  };

  const deleteUser = async () => {
    try {
      const UserId = dialog.UserId;
      if (UserId) {
        const response = await deleteUserRequest(UserId);
        if (response && response.Status.ResponseCode == 200) {
          await getReportingManagers();
          await getUsers();
        } else {
          snackbarAlert.error("Oops! Something Broke!");
        }
      } else {
        snackbarAlert.error("Oops! Something Broke!");
      }
    } catch (error) {
      snackbarAlert.error("Oops! Something Broke!");
    }
    setSubmmitting(false);
    closeDialogBox();
  };

  const handleSearchChange = () => {
    let gridrows = originalData;
    if (filters.RoleId) {
      gridrows = gridrows.filter((item) => item.Role._id === filters.RoleId);
    }

    if (filters.ReportingManagerId) {
      gridrows = gridrows.filter(
        (item) => item.ReportingManager._id === filters.ReportingManagerId
      );
    }

    if (filters.SearchStr) {
      gridrows = gridrows.filter(
        (item) =>
          item.FirstName.toLowerCase().indexOf(
            filters.SearchStr.toLowerCase()
          ) > -1 ||
          item.LastName.toLowerCase().indexOf(filters.SearchStr.toLowerCase()) >
            -1 ||
          item.Email.toLowerCase().indexOf(filters.SearchStr.toLowerCase()) >
            -1 ||
          item.Phone.toString().indexOf(filters.SearchStr.toLowerCase()) > -1 ||
          item.EmployeeCode.toLowerCase().indexOf(
            filters.SearchStr.toLowerCase()
          ) > -1
      );
    }
    setRows(gridrows);
  };

  useEffect(() => {
    (async function execPreLoadFunctions() {
      await getRoles();
      await getReportingManagers();
      await getUsers();
      setLoading(false);
    })();
  }, []);

  return (
    <DashboardPage title="Manage Users">
      {!loading ? (
        <>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid
                item
                md={3}
                sm={6}
                xs={12}
                className={classes.mbottom}
                style={{ textAlign: "left" }}
              >
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  startIcon={<AddIcon />}
                  href={addUserPath}
                >
                  Register User
                </Button>
              </Grid>
              <Grid item md={3} sm={6} xs={12} className={classes.mbottom}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Select Role"
                  variant="outlined"
                  SelectProps={{ native: true }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    filters.RoleId = e.target.value;
                    handleSearchChange();
                  }}
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
              <Grid item md={3} sm={6} xs={12} className={classes.mbottom}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Select Reporting Manager"
                  variant="outlined"
                  SelectProps={{ native: true }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    filters.ReportingManagerId = e.target.value;
                    handleSearchChange();
                  }}
                >
                  <option key="-1" value="">
                    - None -
                  </option>
                  {reportingmanagers.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.Name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={3} sm={6} xs={12} className={classes.mbottom}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search..."
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="disabled">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    filters.SearchStr = e.target.value;
                    handleSearchChange();
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Card>
            <PerfectScrollbar>
              <Box minWidth={1170}>
                <GridView columns={columns} rows={rows} />
              </Box>
            </PerfectScrollbar>
            <DialogBox
              open={dialog.open}
              title={dialog.title}
              description={dialog.description}
              isSubmitting={submmitting}
              onDialogAction={(isAgree: boolean) => {
                if (isAgree) {
                  setSubmmitting(true);
                  deleteUser();
                } else {
                  closeDialogBox();
                }
              }}
            />
          </Card>
        </>
      ) : (
        <Spinner />
      )}
    </DashboardPage>
  );
};

export default ManageUser;
