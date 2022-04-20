import { Box, Card, Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ICandidate } from "../../../classes/IUser";

export interface IProps {
  candidate: ICandidate;
}

const ViewCandidate = (props: any) => {
  return (
    <Card>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Name : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Email : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Email}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Contact : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Contact}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">DOB : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.DOB}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Skills : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Skills}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Designation : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Designation}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Profile : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Profile}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Experience : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Experience}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Reason For Leaving : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Reason_For_Leaving}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Source : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Source}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Interview Schedule : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Interview_Schedule}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Date Of Joining : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Date_Of_Joining}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Hiring Status : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Hiring_Status}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Comment : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Comment}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Notice Period : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Notice_Period}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Ready To Relocate : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Ready_To_Relocate}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Communication : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Communication}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Current CTC : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Current_CTC}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Current Location : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Current_Location}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Expected CTC : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Expected_CTC}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">College Name : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.College_Name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Resume : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.candidate.Resume}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ViewCandidate;
