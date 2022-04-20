import React, { Component } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";

import TopBar from "../TopBar";

// Theme-dependent styles
const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
});

//interface Props extends WithStyles<typeof styles>{ }

interface MainLayoutProps {
  classes: any;
  children?: React.ReactNode;
}

class MainLayout extends Component<MainLayoutProps, {}> {
  constructor(props: MainLayoutProps) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} >
        <TopBar />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainLayout);
