import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import IPage from "../classes/IPage";
import ILoginUser from "../classes/ILoginUser";
import DashboardLayout from "../layouts/DashboardLayout/";
import MyAccount from "../components/MyAccount/";
import ManageCandidate from "../components/Admin/Candidate/ManageCandidate";
import BulkUpload from "../components/Admin/Candidate/BulkUpload";
import AddCandidate from "../components/Admin/Candidate/AddCandidate";

interface IUserDashboardProps {
  pages: IPage[];
  user: ILoginUser;
}

class UserDashboard extends Component<IUserDashboardProps, {}> {
  constructor(props: IUserDashboardProps) {
    super(props);
  }

  render() {
    const Pages = this.props.pages;
    return (
      <DashboardLayout pages={Pages}>
        <Switch>
          <Route
            path={Pages.find((x) => x.pagename === "myaccount")?.path}
            exact={true}
            component={MyAccount}
          />

          <Route
            path={Pages.find((x) => x.pagename === "viewcandidates")?.path}
            exact={true}
            component={ManageCandidate}
          />

          <Route
            path={Pages.find((x) => x.pagename === "addcandidate")?.path}
            exact={true}
            component={AddCandidate}
          />
          <Route
            path={Pages.find((x) => x.pagename === "bulkupload")?.path}
            exact={true}
            component={BulkUpload}
          />
          <Route
            path={Pages.find((x) => x.pagename === "editcandidate")?.path}
            exact={true}
            component={AddCandidate}
          />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default UserDashboard;
