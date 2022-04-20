import "react-perfect-scrollbar/dist/css/styles.css";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import IPage from "../classes/IPage";
import DashboardLayout from "../layouts/DashboardLayout/";
import MyAccount from "../components/MyAccount/";
import ManageRole from "../components/Admin/Role/ManageRole";
import AddRole from "../components/Admin/Role/AddRole";
import ManageUser from "../components/Admin/User/ManageUser";
import AddUser from "../components/Admin/User/AddUser";
import ManageCandidate from "../components/Admin/Candidate/ManageCandidate";
import BulkUpload from "../components/Admin/Candidate/BulkUpload";
import AddCandidate from "../components/Admin/Candidate/AddCandidate";
// import ViewDSRDetail from "../components/Admin/DSR/ViewDSRDetail";
// import ViewMyDSR from "../components/User/DSR/ViewMyDSR";
// import ViewMyDSRDetail from "../components/User/DSR/ViewDSRDetail";
// import AddDSR from "../components/User/DSR/AddDSR";
// import AddTask from "../components/User/DSR/AddTask";
// import MyProjects from "../components/User/Project/MyProjects";
// import ViewEmployeeDSR from "../components/User/DSR/ViewEmployeeDSR";

interface IAdminDashboardProps {
  pages: IPage[];
}

class AdminDashboard extends Component<IAdminDashboardProps, {}> {
  constructor(props: IAdminDashboardProps) {
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
            path={Pages.find((x) => x.pagename === "viewroles")?.path}
            exact={true}
            component={ManageRole}
          />
          <Route
            path={Pages.find((x) => x.pagename === "addrole")?.path}
            exact={true}
            component={AddRole}
          />
          <Route
            path={Pages.find((x) => x.pagename === "editrole")?.path}
            exact={true}
            component={AddRole}
          />
          <Route
            path={Pages.find((x) => x.pagename === "viewusers")?.path}
            exact={true}
            component={ManageUser}
          />
          <Route
            path={Pages.find((x) => x.pagename === "adduser")?.path}
            exact={true}
            component={AddUser}
          />

          <Route
            path={Pages.find((x) => x.pagename === "edituser")?.path}
            exact={true}
            component={AddUser}
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
          {/* <Route path={Pages.find(x => x.pagename === 'viewprojects')?.path} exact={true} component={ManageProject} />
                    <Route path={Pages.find(x => x.pagename === 'addproject')?.path} exact={true} component={AddProject} />
                    <Route path={Pages.find(x => x.pagename === 'editproject')?.path} exact={true} component={AddProject} />
                   
                    <Route path={Pages.find(x => x.pagename === 'viewdsrs')?.path} exact={true} component={ViewDSR} />
                    <Route path={Pages.find(x => x.pagename === 'admindsrdetail')?.path} exact={true} component={ViewDSRDetail} />
                    <Route path={Pages.find(x => x.pagename === 'mydsrs')?.path} exact={true} component={ViewMyDSR} />
                   
                    <Route path={Pages.find(x => x.pagename === 'mydsrdetail')?.path} exact={true} component={ViewMyDSRDetail} />
                    <Route path={Pages.find(x => x.pagename === 'adddsr')?.path} exact={true} component={AddDSR} />
                    <Route path={Pages.find(x => x.pagename === 'addtask')?.path} exact={true} component={AddTask} />
                    <Route path={Pages.find(x => x.pagename === 'edittask')?.path} exact={true} component={AddTask} />
                    <Route path={Pages.find(x => x.pagename === 'myprojects')?.path} exact={true} component={MyProjects} /> */}
        </Switch>
      </DashboardLayout>
    );
  }
}

export default AdminDashboard;
