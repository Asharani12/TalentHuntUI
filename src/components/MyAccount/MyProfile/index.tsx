import { Component } from "react";
import { Grid } from "@material-ui/core";
import IProfile from "../../../classes/IProfile";
import SessionContext from "../../../context/SessionContext";
import { getProfileRequest } from "../../../services/MyAccount";
import LeftProfile from "./LeftProfile";
import RightProfile from "./RightProfile";
import snackbarAlert from "../../SnackbarAlert/";
import Spinner from "../../Spinner/";

export interface IMyProfileStates {
    UserId: string;
    Profile?: IProfile;
    loading: boolean;
}

const initialState = {
    UserId: '',
    loading: true
}

class MyProfile extends Component<{}, IMyProfileStates> {
    static contextType = SessionContext;

    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.getMyProfile(this.context.user._id);
    }

    async getMyProfile(UserId: string) {
        try {
            if (UserId) {
                const response = await getProfileRequest(UserId);
                if (response) {
                    if (response.Status.ResponseCode == 200) {
                        this.setState({
                            UserId: this.context.user._id,
                            Profile: response.User,
                            loading:false
                        });
                    }
                    else {
                        snackbarAlert.error("Oops! Something Broke!");
                    }
                }
                else {
                    snackbarAlert.error("Oops! Something Broke!");
                }
            }
            else {
                snackbarAlert.error("Oops! Something Broke!");
            }
        }
        catch (error) {
            snackbarAlert.error("Oops! Something Broke!");
        }
    }

    renderContent() {
        if (!this.state.loading) {
            return (
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xs={12}
                    >
                        {this.state.Profile &&
                            <LeftProfile UserId={this.state.UserId} Profile={this.state.Profile} />
                        }
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={8}
                        xs={12}
                    >
                        {this.state.Profile &&
                            <RightProfile Profile={this.state.Profile} />
                        }
                    </Grid>
                </Grid>
            );
        }

        return (
            <Spinner />
        );
    }

    render() {
        return <> {this.renderContent()}</>;
    }
};

export default MyProfile;