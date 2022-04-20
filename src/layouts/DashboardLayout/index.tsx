import React, { Component } from "react";
import { withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import TopBar from "../TopBar";
import IPage from "../../classes/IPage";
// Theme-dependent styles
// createStyles is just the identity function; it doesn't "do anything" at runtime, just helps guide type inference at compile time.
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
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
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

interface DashboardState {
  isMobileNavOpen: boolean
}

interface DashboardProps extends WithStyles<typeof styles> {
  pages: IPage[];
  children?: React.ReactNode
}

const DashboardLayout = withStyles(styles, { withTheme: true })(
  class extends Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
      super(props);
      this.state = {
        isMobileNavOpen: false
      }
    }

    setMobileNavOpen(isNavOpen: boolean) {
      this.setState({ isMobileNavOpen: isNavOpen });
    }

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.root}>
          <TopBar onMobileNavOpen={() => this.setMobileNavOpen(true)} />
          <NavBar
            pages={this.props.pages}
            onMobileClose={() => this.setMobileNavOpen(false)}
            openMobile={this.state.isMobileNavOpen}
          />
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
);

export default DashboardLayout;
