import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    textAlign: 'center'
  }
}));

interface Props {
  children: React.ReactNode,
  title?: string,
}

const MainPage = forwardRef<HTMLDivElement, Props>(({ children, title, ...rest }, ref) => {
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
      {children}
    </div>
  );
});

export default MainPage;
