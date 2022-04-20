import { Component } from "react";
import IProfile from "../../../classes/IProfile";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";

interface IRightProfileProps {
    Profile: IProfile;
}

interface IRightProfileState {
    isEditMode: boolean;
}

class RightProfile extends Component<IRightProfileProps, IRightProfileState>{

    constructor(props: IRightProfileProps) {
        super(props);
        this.state = {
            isEditMode: false
        }
        this.updateRightProfileMode = this.updateRightProfileMode.bind(this);
    }

    updateRightProfileMode(newEditMode: boolean) {
        this.setState({ isEditMode: newEditMode });
    }

    render() {
        return (
            <>
                {(this.state.isEditMode) ?
                    <EditProfile Profile={this.props.Profile} ChageRightProfileMode={this.updateRightProfileMode} />
                    :
                    <ViewProfile Profile={this.props.Profile} ChageRightProfileMode={this.updateRightProfileMode} />
                }
            </>
        );
    }
};

export default RightProfile;