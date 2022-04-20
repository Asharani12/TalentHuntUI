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
  getCandidateRequest,
  deleteUserRequest,
} from "../../../services/Admin";
import SessionContext from "../../../context/SessionContext";
import { PROJECT_PATHS } from "../../../shared/constants";
import { ICandidate } from "../../../classes/IUser";
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
import ViewDialogBox from "../../DialogBox/ViewDialogBox";
import ViewCandidate from "./ViewCandidate";

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
  SourceId: "",
  ProfileId: "",
  SearchStr: "",
};

const ManageCandidate = () => {
  const classes = useStyles();
  const loggedInUser = useContext(SessionContext).user as ILoginUser;

  const initialDialogState = {
    open: false,
    title: "Delete User",
    description: <>Are you sure you want to delete this user?</>,
    UserId: "",
  };

  const initialViewDialogState = {
    open: false,
    title: "View Candidate",
    content: null,
  };

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([] as ICandidate[]);
  const [originalData, setOriginalData] = useState([] as ICandidate[]);
  const [roles, setRoles] = useState([] as IRole[]);
  const [reportingmanagers, setReportingManagers] = useState(
    [] as IUserDropdown[]
  );
  const [submmitting, setSubmmitting] = useState(false);
  const [dialog, setDialog] = useState(initialDialogState);
  const [viewDialog, setViewDialog] = useState(initialViewDialogState);

  const addCandidatePath = PROJECT_PATHS.HiringManager.find(
    (x) => x.pagename === "addcandidate"
  )?.path as string;

  const editCandidatePath = PROJECT_PATHS.HiringManager.find(
    (x) => x.pagename === "editcandidate"
  )?.path as string;

  const SOURCE = [
    { key: "Indeed", value: "Indeed" },
    { key: "Angel.Co", value: "Angel.Co" },
    { key: "LinkedIn", value: "Linkedin" },
    { key: "Hirect", value: "Hirect" },
    { key: "Newton", value: "Newton" },
    { key: "FunctionUp", value: "FunctionUp" },
    { key: "Referrals", value: "Referrals" },
    { key: "Website", value: "Website" },
    { key: "Others", value: "Others" },
  ];
  const PROFILES = [
    { key: "UI/UX Designer", value: "UI/UX Designer" },
    { key: "UI Developer", value: "UI Developer" },
    { key: "FullStack", value: "FullStack" },
    { key: "DevOps", value: "DevOps" },
    { key: ".NET", value: ".NET" },
    { key: "PHP", value: "PHP" },
    { key: "BDE", value: "BDE" },
    { key: "Blockchain Developer", value: "Blockchain Developer" },
  ];
  const columns: GridColDef[] = [
    // {
    //   field: "Photo",
    //   headerName: "Photo",
    //   headerAlign: "center",
    //   cellClassName: "text-center",
    //   width: 70,
    //   sortable: false,
    //   renderCell: (params: GridCellParams) => (
    //     <Avatar className={classes.avatar} src={params.row.ProfilePhoto}>
    //       {getInitials(params.row.FirstName + " " + params.row.LastName)}
    //     </Avatar>
    //   ),
    // },
    {
      field: "Name",
      headerName: "Name",
      width: 110,
      // valueGetter: (params: GridValueGetterParams) => `${params.row.Name}`,
      renderCell: (params: GridCellParams) => (
        <Button
          variant="text"
          style={{
            fontWeight: "normal",
            textTransform: "unset",
            padding: 0,
          }}
          onClick={() => showViewDialogBox(params.row)}
        >
          {params.row.Name}
        </Button>
      ),
    },
    {
      field: "Email",
      headerName: "Email",
      width: 110,
    },
    {
      field: "Contact",
      headerName: "Contact",
      width: 110,
    },
    {
      field: "Skills",
      headerName: "Skills",
      flex: 1,
    },
    {
      field: "Source",
      headerName: "Source",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => `${params.row.Source}`,
    },

    {
      field: "Profile",
      headerName: "Profile",
      width: 125,
      headerClassName: "text-left",
      valueFormatter: (params: GridValueFormatterParams) =>
        `${params.row.Profile}`,
    },
  ];

  if (
    loggedInUser.Role.RoleName.toUpperCase() === "ADMIN" ||
    loggedInUser.Role.RoleName.toUpperCase() === "HIRING MANAGER"
  ) {
    columns.push({
      field: " ",
      headerName: " ",
      cellClassName: "text-center",
      width: 120,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          {(loggedInUser.Role.RoleName.toUpperCase() === "ADMIN" ||
            loggedInUser.Role.RoleName.toUpperCase() === "HIRING MANAGER") && (
            <IconButton
              size="small"
              className="gridbutton btnEdit"
              aria-label="edit"
              disabled={submmitting}
              href={editCandidatePath.replace(":id", `${params.row._id}`)}
            >
              <EditIcon />
            </IconButton>
          )}
          {(loggedInUser.Role.RoleName.toUpperCase() === "ADMIN" ||
            loggedInUser.Role.RoleName.toUpperCase() === "HIRING MANAGER") && (
            <IconButton
              size="small"
              className="gridbutton btnDelete"
              aria-label="delete"
              disabled={submmitting}
              onClick={() =>
                showDialogBox(`${params.row._id}`, `${params.row.Name}`)
              }
            >
              <DeleteIcon />
            </IconButton>
          )}
        </>
      ),
    });
  }
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
        Are you sure you want to delete this Candidate - <b>"{Name}"</b>?
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

  const showViewDialogBox = (candidate: any) => {
    setViewDialog({
      ...viewDialog,
      open: true,
      content: candidate,
    });
  };

  const closeViewDialogBox = () => {
    setViewDialog({
      ...viewDialog,
      open: false,
    });
  };

  // const getRoles = async () => {
  //   try {
  //     const response = await getRolesRequest();
  //     if (response && response.Status.ResponseCode == 200) {
  //       const drp_roles: IRole[] = response.Roles;
  //       setRoles(drp_roles);
  //     } else {
  //       snackbarAlert.error("Oops! Something Broke!");
  //     }
  //   } catch (error) {
  //     snackbarAlert.error("Oops! Something Broke!");
  //   }
  // };

  // const getReportingManagers = async () => {
  //   try {
  //     const response = await getReportingManagersRequest();
  //     if (response && response.Status.ResponseCode == 200) {
  //       const drp_users: IUserDropdown[] = response.Users;
  //       setReportingManagers(drp_users);
  //     } else {
  //       snackbarAlert.error("Oops! Something Broke!");
  //     }
  //   } catch (error) {
  //     snackbarAlert.error("Oops! Something Broke!");
  //   }
  // };

  const getCandidate = async () => {
    try {
      const response = await getCandidateRequest();

      if (response) {
        console.log("cand response", response.Data);
        const gridrows = response.Data;
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
          // await getReportingManagers();
          await getCandidate();
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

    if (filters.ProfileId) {
      gridrows = gridrows.filter((item) => item.Profile === filters.ProfileId);
    }

    if (filters.SourceId) {
      gridrows = gridrows.filter((item) => item.Source === filters.SourceId);
    }

    if (filters.SearchStr) {
      gridrows = gridrows.filter((item) => {
        // item.Name.toLowerCase().indexOf(filters.SearchStr.toLowerCase()) >
        //   -1 ||
        if (
          item.Name.toLowerCase().indexOf(filters.SearchStr.toLowerCase()) > -1
        )
          return true;

        if (
          item.Skills &&
          item.Skills.toLowerCase().indexOf(filters.SearchStr.toLowerCase()) >
            -1
        )
          return true;

        if (
          item.Email &&
          item.Email.toLowerCase().indexOf(filters.SearchStr.toLowerCase()) > -1
        )
          return true;

        if (
          item.Designation &&
          item.Designation.toLowerCase().indexOf(
            filters.SearchStr.toLowerCase()
          ) > -1
        )
          return true;

        if (
          item.Current_Location &&
          item.Current_Location.toLowerCase().indexOf(
            filters.SearchStr.toLowerCase()
          ) > -1
        )
          return true;

        if (
          item.College_Name &&
          item.College_Name.toLowerCase().indexOf(
            filters.SearchStr.toLowerCase()
          ) > -1
        )
          return true;
      });
    }
    setRows(gridrows);
  };

  useEffect(() => {
    console.log("loggedInUser", loggedInUser);
    (async function execPreLoadFunctions() {
      // await getRoles();
      // await getReportingManagers();
      await getCandidate();
      setLoading(false);
    })();
  }, []);

  return (
    <DashboardPage title="Manage Candidates">
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
                {(loggedInUser.Role.RoleName.toUpperCase() === "ADMIN" ||
                  loggedInUser.Role.RoleName.toUpperCase() ===
                    "HIRING MANAGER") && (
                  <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    startIcon={<AddIcon />}
                    href={addCandidatePath}
                  >
                    Add Candidate
                  </Button>
                )}
              </Grid>
              <Grid item md={3} sm={6} xs={12} className={classes.mbottom}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Select Source"
                  variant="outlined"
                  SelectProps={{ native: true }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    filters.SourceId = e.target.value;
                    handleSearchChange();
                  }}
                >
                  <option key="-1" value="">
                    - None -
                  </option>
                  {SOURCE.map((option) => (
                    <option key={option.key} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={3} sm={6} xs={12} className={classes.mbottom}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Select Profile"
                  variant="outlined"
                  SelectProps={{ native: true }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    filters.ProfileId = e.target.value;
                    handleSearchChange();
                  }}
                >
                  <option key="-1" value="">
                    - None -
                  </option>
                  {PROFILES.map((option) => (
                    <option key={option.key} value={option.value}>
                      {option.value}
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
            <ViewDialogBox
              open={viewDialog.open}
              title={viewDialog.title}
              content={
                viewDialog.content ? (
                  <ViewCandidate candidate={viewDialog.content} />
                ) : (
                  <></>
                )
              }
              onDialogClose={closeViewDialogBox}
            />
          </Card>
        </>
      ) : (
        <Spinner />
      )}
    </DashboardPage>
  );
};

export default ManageCandidate;
