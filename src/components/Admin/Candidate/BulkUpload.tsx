import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { uploadCandidateDataRequest } from "../../../services/Admin";
import { PROJECT_PATHS } from "../../../shared/constants";
import DashboardPage from "../../Page/DashboardPage";
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
  fileName: {
    marginLeft: theme.spacing(2),
  },
}));

const BulkUpload = (props: any) => {
  const classes = useStyles();
  const manageCandidatePath = PROJECT_PATHS.Manager.find(
    (x) => x.pagename === "viewcandidates"
  )?.path as string;

  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [file, setFile] = useState<File>();
  useEffect(() => {
    if (isSubmitting) {
      handleSubmit();
    }
  }, [isSubmitting]);

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (file) {
        const response = await uploadCandidateDataRequest(file);
        if (response && response.status) {
          snackbarAlert.success("File uploaded successfully.");
          props.history.push(manageCandidatePath);
        } else {
          snackbarAlert.error("Oops! Something Broke! Please try again.");
        }
      } else {
        snackbarAlert.error("File not found.");
      }
    } catch (error) {
      snackbarAlert.error("Oops! Something Broke!");
    }
    setIsSubmitting(false);
  };

  return (
    <DashboardPage title="Bulk Upload Candidates">
      <Box className={classes.mainBox}>
        <Card>
          <CardHeader
            title="Add Candidates"
            style={{ textAlign: "center" }}
            titleTypographyProps={{ variant: "h3", component: "h3" }}
          />
          <Divider />
          <Box p={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button variant="contained" component="label">
                  Upload Candidate Data
                  <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleFileChange}
                    hidden
                  />
                </Button>
                <Typography
                  variant="subtitle1"
                  component="span"
                  className={classes.fileName}
                >
                  {file ? file.name : null}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" p={1}>
            <Button
              color="primary"
              disabled={!file || isSubmitting}
              size="large"
              type="submit"
              variant="contained"
              className={classes.button}
              onClick={() => setIsSubmitting(true)}
            >
              {isSubmitting ? "Please wait..." : "Upload"}
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              className={classes.button}
              href={manageCandidatePath}
            >
              Back
            </Button>
          </Box>
        </Card>
      </Box>
    </DashboardPage>
  );
};

export default BulkUpload;
