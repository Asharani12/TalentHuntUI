import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import IPage from "../classes/IPage";
import MainLayout from "../layouts/MainLayout/";
import "./Auth.css";
import Login from "../components/Auth/Login";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";


interface IAuthContainerProps {
    pages: IPage[];
}

interface IAuthContainerState {
    landingPage?: IPage;
}

class AuthContainer extends Component<IAuthContainerProps, IAuthContainerState> {
    constructor(props: IAuthContainerProps) {
        super(props);

        this.state = {
            landingPage: this.props.pages.find(x => x.pagename === 'landing')
        }
    }

    render() {
        const Pages = this.props.pages;
        return (
            <MainLayout>
                <Switch>
                    <Route path={Pages.find(x => x.pagename === 'landing')?.path} exact={true} component={Login} />
                    <Route path={Pages.find(x => x.pagename === 'login')?.path} exact={true}
                        render={() =>
                            <Redirect to={this.state.landingPage ? this.state.landingPage.path : '/'} />
                        } />
                    <Route path={Pages.find(x => x.pagename === 'forgotpassword')?.path} exact={true} component={ForgotPassword} />
                    <Route path={Pages.find(x => x.pagename === 'resetpassword')?.path} exact={true} component={ResetPassword} />
                </Switch>
            </MainLayout>
        );
    }
}

export default AuthContainer;