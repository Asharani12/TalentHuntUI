import React from "react";
import ReactDOM from "react-dom";
import { Snackbar } from "@material-ui/core";
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Alert from "@material-ui/lab/Alert";

export type Color = 'success' | 'info' | 'warning' | 'error';
type TransitionProps = Omit<SlideProps, 'direction'>;

interface ISnackbarAlertProps {
    isOpen: boolean;
    severity: Color | undefined;
    message: string;
}

interface ISnackbarAlertState {
    isOpen: boolean,
    severity: Color | undefined,
    message: string
}

class SnackbarAlertContainer extends React.Component {
    render() {
        return (
            <div id="snack-bar-container"></div>
        );
    };
}

class SnackbarAlertContent extends React.Component<ISnackbarAlertProps, ISnackbarAlertState> {
    constructor(props: ISnackbarAlertProps) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
            severity: this.props.severity,
            message: this.props.message
        };

        this.handleClose = this.handleClose.bind(this);
    }

    Transition(props: TransitionProps) {
        return <Slide {...props} direction="left" />;
    }

    handleClose() {
        this.setState({ isOpen: false });
        const snackbarContainer = document.getElementById('snack-bar-container') as HTMLDivElement;
        ReactDOM.unmountComponentAtNode(snackbarContainer);
    }

    render() {
        return (
            <Snackbar
                open={this.state.isOpen}
                autoHideDuration={6000}
                onClose={this.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                TransitionComponent={this.Transition}
                key={this.Transition ? this.Transition.name : ''}
            >
                <Alert variant="filled" severity={this.state.severity} onClose={this.handleClose}>
                    {this.state.message}
                </Alert>
            </Snackbar>
        );
    }
}

const snackbarAlert = {
    success(message: string) {
        this.ShowAlert(message, 'success')
    },
    warning(message: string) {
        this.ShowAlert(message, 'warning')
    },
    info(message: string) {
        this.ShowAlert(message, 'info')
    },
    error(message: string) {
        this.ShowAlert(message, 'error')
    },
    ShowAlert: (message: string, severity: Color) => {
        const snackbarContainer = document.getElementById('snack-bar-container') as HTMLDivElement;
        ReactDOM.render(
            <SnackbarAlertContent isOpen={true} severity={severity} message={message} />,
            snackbarContainer
        );
    }
}

export default snackbarAlert;
export { SnackbarAlertContainer };