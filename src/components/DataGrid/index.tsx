import { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  DataGrid,
  GridOverlay,
  GridBaseComponentProps,
  GridColDef,
} from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiDataGrid-window": {
      position: "relative !important",
      top: "0 !important",
    },
    "& .MuiDataGrid-viewport, .rendering-zone, .MuiDataGrid-row": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-main > div:nth-child(2):not(.MuiDataGrid-overlay) > div": {
      height: "auto !important",
    },
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: theme.palette.type === "light" ? "#fafafa" : "#1d1d1d",
      position: "relative !important",
    },
    "& .MuiDataGrid-colCellWrapper": {
      flex: 1,
    },
    "& .MuiDataGrid-colCell": {
      padding: "10px 16px",
      minHeight: 56,
    },
    "& .MuiDataGrid-colCell:not(:last-child)": {
      borderRight: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-colCellTitle": {
      whiteSpace: "normal !important",
      lineHeight: 1.5,
      wordBreak: "break-word",
      display: "flex",
      alignItems: "center",
    },
    "& .MuiDataGrid-cell": {
      borderColor: `${theme.palette.type === "light" ? "#f0f0f0" : "#303030"}`,
      whiteSpace: "normal !important",
      lineHeight: "1.5 !important",
      wordBreak: "break-word",
      alignItems: "center",
      display: "flex",
      padding: "10px 16px",
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-footer": {
      padding: 15,
      position: "relative !important",
    },
    "& .MuiDataGrid-overlay": {
      backgroundColor: "#FFFFFF",
    },
    "& .text-center": {
      justifyContent: "center",
    },
    "& .text-left": {
      textAlign: "left",
    },
    "& .gridbutton": {
      color: "#FFFFFF",
      borderRadius: 5,
      padding: 5,
      margin: 5,
    },
    "& .btnEdit": {
      backgroundColor: "#3F51B5",
    },
    "& .btnEdit:hover": {
      backgroundColor: "#1A237E",
    },
    "& .btnDelete": {
      backgroundColor: "#E65100",
    },
    "& .btnDelete:hover": {
      backgroundColor: "#BF360C",
    },
    "& .btnEdit.Mui-disabled, .btnDelete.Mui-disabled": {
      background: "none",
      color: "#BDBDBD",
    },
  },
  norecord: {
    padding: theme.spacing(1),
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface DataGridProps {
  columns: GridColDef[];
  rows: any;
}

const GridView = ({ columns, rows }: DataGridProps) => {
  const classes = useStyles();

  function CustomNoRowsOverlay() {
    return (
      <GridOverlay className={classes.root}>
        <div className={classes.norecord}>
          <img
            src="/static/images/norecordfound.png"
            alt="No Records Available."
            style={{ maxHeight: 100 }}
          />
        </div>
      </GridOverlay>
    );
  }

  function CustomPagination(props: GridBaseComponentProps) {
    const { state, api } = props;
    let currentPage = state.pagination.page + 1;

    useEffect(() => {
      if (state.pagination.page >= state.pagination.pageCount) {
        currentPage = state.pagination.page;
        api.current.setPage(currentPage - 1);
      }
    });

    return (
      <Pagination
        className={classes.root}
        color="primary"
        variant="outlined"
        shape="rounded"
        page={currentPage}
        count={state.pagination.pageCount}
        onChange={(event, value) => {
          api.current.setPage(value - 1);
        }}
      />
    );
  }

  return (
    <DataGrid
      className={classes.root}
      autoHeight={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      disableSelectionOnClick={true}
      showCellRightBorder={true}
      showColumnRightBorder={true}
      hideFooter={rows.length > 0 ? false : true}
      pageSize={10}
      components={{
        Pagination: CustomPagination,
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      getRowId={(row) => row._id}
      rows={rows}
      columns={columns}
    />
  );
};

export default GridView;
