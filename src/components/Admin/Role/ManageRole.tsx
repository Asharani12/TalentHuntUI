import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    Box,
    Button,
    Card,
    Grid,
    InputAdornment,
    SvgIcon,
    TextField
} from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { GridColDef, GridCellParams } from "@material-ui/data-grid";
import { getRolesRequest, deleteRoleRequest } from "../../../services/Admin";
import { PROJECT_PATHS } from "../../../shared/constants";
import IRole from "../../../classes/IRole";
import DashboardPage from "../../Page/DashboardPage";
import GridView from "../../DataGrid";
import DialogBox from "../../DialogBox";
import snackbarAlert from "../../SnackbarAlert";
import Spinner from "../../Spinner";

const useStyles = makeStyles((theme: Theme) => ({
    mbottom: {
        marginBottom: theme.spacing(3),
    }
}));

const ManageRole = () => {
    const classes = useStyles();

    const initialDialogState = {
        open: false,
        title: 'Delete Role',
        description: <>Are you sure you want to delete this role?</>,
        RoleId: ''
    };

    const [loading, setloading] = useState(true);
    const [rows, setrows] = useState([] as IRole[]);
    const [originalData, setOriginalData] = useState([] as IRole[]);
    const [submmitting, setsubmmitting] = useState(false);
    const [dialog, setdialog] = useState(initialDialogState);

    const addRolePath = PROJECT_PATHS.Admin.find(x => x.pagename === 'addrole')?.path as string;
    const editRolePath = PROJECT_PATHS.Admin.find(x => x.pagename === 'editrole')?.path as string;

    const columns: GridColDef[] = [
        {
            field: 'RoleName',
            headerName: 'Role Name',
            flex: 1
        },
        {
            field: ' ',
            headerName: ' ',
            cellClassName: 'text-center',
            width: 200,
            sortable: false,
            renderCell: (params: GridCellParams) => (
                <>
                    {params.row.IsPublic &&
                        <>
                            <IconButton
                                size="small"
                                className="gridbutton btnEdit"
                                aria-label="edit"
                                disabled={submmitting}
                                href={editRolePath.replace(':id', `${params.row._id}`)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                className="gridbutton btnDelete"
                                aria-label="delete"
                                disabled={submmitting}
                                onClick={() => showDialogBox(`${params.row._id}`, `${params.row.RoleName}`)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }
                </>
            )
        }
    ];

    const showDialogBox = (RoleId: string, RoleName: string) => {
        let popupdesc = <>Are you sure you want to delete this role - <b>"{RoleName}"</b>?</>;
        setdialog({
            ...dialog,
            open: true,
            description: popupdesc,
            RoleId: RoleId
        })
    };

    const closeDialogBox = () => {
        setdialog({
            ...dialog,
            open: false,
            RoleId: ''
        })
    };

    const getRoles = async () => {
        try {
            const response = await getRolesRequest();
            if (response && response.Status.ResponseCode == 200) {
                const gridrows: IRole[] = response.Roles;
                setrows(gridrows);
                setOriginalData(gridrows);
            }
            else {
                snackbarAlert.error("Oops! Something Broke!");
            }
        }
        catch (error) {
            snackbarAlert.error("Oops! Something Broke!");
        }
    }

    const deleteRole = async () => {
        try {
            const RoleId = dialog.RoleId;
            if (RoleId) {
                const response = await deleteRoleRequest(RoleId);
                if (response && response.Status.ResponseCode == 200) {
                    await getRoles();
                }
                else {
                    snackbarAlert.error("Oops! Something Broke!");
                }
            }
            else {
                snackbarAlert.error("Oops! Something Broke!");
            }
        }
        catch (error) {
            snackbarAlert.error("Oops! Something Broke!");
        }
        setsubmmitting(false);
        closeDialogBox();
    }

    const handleSearchChange = (e: any) => {
        if (e.target.value) {
            let gridrows = originalData;
            gridrows = gridrows.filter(item => item.RoleName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
            setrows(gridrows);
        } else {
            setrows(originalData);
        }
    };

    useEffect(() => {
        (async function execPreLoadFunctions() {
            await getRoles();
            setloading(false);
        }());
    }, []); // <-- Have to pass [] here, to make single call of api. It will work as componentDidMount. If it will not be passed, function will be called in every render and it will work as componentDidUpdate.

    return (
        <DashboardPage title="Manage Roles">
            {(!loading) ?
                <>
                    <Box mt={2}>
                        <Grid container>
                            <Grid item md={9} sm={6} xs={12} className={classes.mbottom} style={{ textAlign: 'left' }}>
                                <Button
                                    color="primary"
                                    size="large"
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    href={addRolePath}
                                >
                                    Add Role
                                </Button>
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
                                                <SvgIcon
                                                    fontSize="small"
                                                    color="disabled"
                                                >
                                                    <SearchIcon />
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleSearchChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <PerfectScrollbar>
                            <Box minWidth={800}>
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
                                    setsubmmitting(true);
                                    deleteRole();
                                } else {
                                    closeDialogBox();
                                }
                            }}
                        />
                    </Card>
                </>
                :
                <Spinner />
            }
        </DashboardPage>
    );
};

export default ManageRole;
