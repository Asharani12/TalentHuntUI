import {
  Settings as SettingsIcon,
  Users as UsersIcon,
  List as ListIcon,
  FileText as FileTextIcon,
} from "react-feather";
import AssignmentIcon from "@material-ui/icons/AssignmentOutlined";
import PostAdd from "@material-ui/icons/PostAdd";

export const PROJECT_PATHS = {
  Auth: [
    {
      path: "/",
      pagename: "landing",
      title: "Sign In",
      icon: {},
      isnavitem: false,
    },
    {
      path: "/login",
      pagename: "login",
      title: "Sign In",
      icon: {},
      isnavitem: false,
    },
    {
      path: "/forgotpassword",
      pagename: "forgotpassword",
      title: "Forgot Password",
      icon: {},
      isnavitem: false,
    },
    {
      path: "/resetpassword/:id",
      pagename: "resetpassword",
      title: "Reset Password",
      icon: {},
      isnavitem: false,
    },
  ],
  Profile: [
    {
      path: "/myaccount",
      pagename: "myaccount",
      title: "My Account",
      icon: {},
      isnavitem: false,
    },
  ],
  Admin: [
    {
      path: "/roles",
      pagename: "viewroles",
      title: "Manage Roles",
      icon: SettingsIcon,
      isnavitem: true,
    },
    {
      path: "/roles/add",
      pagename: "addrole",
      title: "Add Role",
      icon: {},
      isnavitem: false,
    },
    {
      path: "/roles/edit/:id",
      pagename: "editrole",
      title: "Edit Role",
      icon: {},
      isnavitem: false,
    },
    {
      path: "/users",
      pagename: "viewusers",
      title: "Manage Users",
      icon: UsersIcon,
      isnavitem: true,
    },
    {
      path: "/users/register",
      pagename: "adduser",
      title: "Register User",
      icon: {},
      isnavitem: false,
    },
    {
      path: "/users/edit/:id",
      pagename: "edituser",
      title: "Edit User",
      icon: {},
      isnavitem: false,
    },
  ],
  HiringManager: [
    {
      path: "/candidates/bulkupload",
      pagename: "bulkupload",
      title: "Bulk Upload Candidates",
      icon: FileTextIcon,
      isnavitem: true,
    },
    {
      path: "/candidates/edit/:id",
      pagename: "editcandidate",
      title: "Edit Candidate",
      icon: {},
      isnavitem: false,
    },
    {
      path: "/candidates/add",
      pagename: "addcandidate",
      title: "Add Candidate",
      icon: {},
      isnavitem: false,
    },
  ],
  Manager: [
    {
      path: "/candidates",
      pagename: "viewcandidates",
      title: "Manage Candidates",
      icon: ListIcon,
      isnavitem: true,
    },
  ],
};

export const NumbersRegExp = /^[0-9\s]+$/;
