import { Switch, Route, Redirect } from "react-router-dom";
import { SessionConsumer } from "./../context/SessionContext";
import IPage from "../classes/IPage";
import ILoginUser from "../classes/ILoginUser";
import { PROJECT_PATHS } from "./../shared/constants";
import MainLayout from "../layouts/MainLayout/";
import AuthContainer from "./../containers/AuthContainer";
import AdminDashboard from "./../containers/AdminDashboard";
import NotFoundView from "../components/Errors/NotFoundView";
import UserDashboard from "../containers/UserDashboard";

const setRoutes = (isAuthenticated: boolean, user?: ILoginUser) => {
  let authPages: IPage[] = [];
  let adminPages: IPage[] = [];
  let managerPages: IPage[] = [];
  let loggedInModePages: IPage[] = [];
  const landingPagePath = authPages.find((x) => x.pagename === "landing")
    ?.path as string;

  authPages.push(...PROJECT_PATHS.Auth);
  adminPages.push(...PROJECT_PATHS.Profile, ...PROJECT_PATHS.Admin);
  managerPages.push(...PROJECT_PATHS.Profile, ...PROJECT_PATHS.Manager);
  loggedInModePages.push(
    ...PROJECT_PATHS.Profile,
    ...PROJECT_PATHS.Admin,
    ...PROJECT_PATHS.HiringManager,
    ...PROJECT_PATHS.Manager
  );

  if (user) {
    if (user.IsHost || user.Role.RoleName.toUpperCase() === "ADMIN") {
      adminPages.push(...PROJECT_PATHS.Manager, ...PROJECT_PATHS.HiringManager);
    } else if (user.Role.RoleName.toUpperCase() === "HIRING MANAGER") {
      managerPages.push(...PROJECT_PATHS.HiringManager);
    }
  }

  const authPaths = authPages.map((p) => p.path);
  const adminPaths = adminPages.map((p) => p.path);
  const managerPaths = managerPages.map((p) => p.path);
  const loggedInModePaths = loggedInModePages.map((p) => p.path);

  return (
    <>
      {isAuthenticated && user ? (
        user.IsHost || user.Role.RoleName.toUpperCase() === "ADMIN" ? (
          <Switch>
            <Route
              path={adminPaths}
              exact={true}
              render={(props) => {
                return <AdminDashboard pages={adminPages} {...props} />;
              }}
            />
            <Route
              path={authPaths}
              exact={true}
              render={(props) => {
                return <Redirect to={PROJECT_PATHS.Admin[0].path} />;
              }}
            />
            <Route
              path="*"
              render={() => {
                return (
                  <MainLayout>
                    <NotFoundView />
                  </MainLayout>
                );
              }}
            />
          </Switch>
        ) : (
          <Switch>
            <Route
              path={managerPaths}
              exact={true}
              render={(props) => {
                return (
                  <UserDashboard pages={managerPages} user={user} {...props} />
                );
              }}
            />
            <Route
              path={authPaths}
              exact={true}
              render={(props) => {
                return <Redirect to={PROJECT_PATHS.Manager[0].path} />;
              }}
            />
            <Route
              path="*"
              render={() => {
                return (
                  <MainLayout>
                    <NotFoundView />
                  </MainLayout>
                );
              }}
            />
          </Switch>
        )
      ) : (
        <Switch>
          <Route
            path={authPaths}
            exact={true}
            render={(props) => {
              return <AuthContainer pages={authPages} {...props} />;
            }}
          />
          <Route
            path={loggedInModePaths}
            exact={true}
            render={(props) => {
              return <Redirect to={landingPagePath} />;
            }}
          />
          <Route
            path="*"
            render={() => {
              return (
                <MainLayout>
                  <NotFoundView />
                </MainLayout>
              );
            }}
          />
        </Switch>
      )}
    </>
  );
};

// If define as function component, you need to return from here and use tag (<Routes />) format in app.js
const Routes = (
  <SessionConsumer>
    {(context) => setRoutes(context.isAuthenticated, context.user)}
  </SessionConsumer>
);

export default Routes;
