import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";
import ILoginUser from "../classes/ILoginUser";
import IPage from "../classes/IPage";
import { PROJECT_PATHS } from "../shared/constants";

// Defined in interface so commented here.
//export type UpdateSessionState = (user: ILoginUser) => void;

// Define interface to pass in create context & Session class as state
interface ISessionState {
  isAuthenticated: boolean;
  user?: ILoginUser | undefined;
  LoginUser: (user: ILoginUser) => void;
  LogoutUser: () => void;
  UpdateProfilePicture: (profilephoto: string) => void;
}

// Define interface to pass in Session class as Props
interface ISessionProps {
  cookies: Cookies;
  children?: React.ReactNode;
}

// set initial value to pass in create context
const initialState: ISessionState = {
  isAuthenticated: false,
  user: undefined,
  LoginUser: (user: ILoginUser) => {},
  LogoutUser: () => {},
  UpdateProfilePicture: (profilephoto: string) => {},
};

// Create context with default value
const SessionContext = React.createContext<ISessionState>(initialState);

class Session extends Component<ISessionProps, ISessionState> {
  // Define static member of class, which can be access by Session.USER_COOKIE_KEY.
  private static USER_COOKIE_KEY: string = "dsr_user";

  constructor(props: ISessionProps) {
    super(props);
    const loguser = this.props.cookies.get(Session.USER_COOKIE_KEY);
    let isAuthenticated: boolean = false;

    if (loguser) {
      isAuthenticated = true;
    }

    this.state = {
      isAuthenticated: isAuthenticated,
      user: loguser,
      LoginUser: (currentuser: ILoginUser) => {
        this.props.cookies.set(Session.USER_COOKIE_KEY, currentuser, {
          path: "/",
        });
        this.setState({ isAuthenticated: true, user: currentuser });
        let redirect: IPage;
        redirect = PROJECT_PATHS.Manager.find(
          (x) => x.pagename === "viewcandidates"
        ) as IPage;

        window.location.href = redirect.path;
      },
      LogoutUser: () => {
        const landingPage = PROJECT_PATHS.Auth.find(
          (x) => x.pagename === "landing"
        ) as IPage;
        this.props.cookies.remove(Session.USER_COOKIE_KEY, { path: "/" });
        this.setState({ isAuthenticated: false, user: undefined });
        window.location.href = landingPage.path;
      },
      UpdateProfilePicture: (profilephoto: string) => {
        const currentuser = this.props.cookies.get(Session.USER_COOKIE_KEY);
        currentuser.ProfilePhoto = profilephoto;
        this.props.cookies.set(Session.USER_COOKIE_KEY, currentuser, {
          path: "/",
        });
        this.setState({ user: currentuser });
      },
    };
  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    );
  }
}

// Use withCookies() to give the app access to cookies. We call this function when exporting the component.
// If using React Router, pass the cookies prop into your Route components that require them.
export default SessionContext;
export const SessionProvider = withCookies(Session);
export const SessionConsumer = SessionContext.Consumer;
