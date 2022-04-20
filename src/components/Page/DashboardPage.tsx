import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  CardContent,
  CardHeader,
  Container,
  Divider,
  makeStyles,
  Theme
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    display: 'flex',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  container: {
    display: 'flex'
  },
  box: {
    boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 2px 0 rgb(63 63 68 / 15%)',
    width: '100%',
    backgroundColor: '#FFFFFF'
  },
  cardheader: {
    textAlign: "left",
    textTransform: 'uppercase',
    color: '#3f51b5'
  },
  devider: {
    backgroundColor: '#ff9800',
    height: 2
  },
  cardcontent: {
    padding: 24
  },
}));

interface Props {
  children: React.ReactNode,
  title?: string,
}

const DashboardPage = forwardRef<HTMLDivElement, Props>(({ children, title, ...rest }, ref) => {
  const classes = useStyles();
  return (
    <div
      ref={ref}
      className={classes.root}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container className={classes.container} maxWidth={false}>
        <Box className={classes.box}>
          <CardHeader
            title={title}
            className={classes.cardheader}
            titleTypographyProps={{ variant: 'h4', component: 'h4' }}
          />
          <Divider className={classes.devider} />
          <CardContent className={classes.cardcontent}>
            {children}
          </CardContent>
        </Box>
      </Container>
    </div>
  );
});

export default DashboardPage;
