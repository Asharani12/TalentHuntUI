import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type EventHandler = (event: any) => void;

interface DialogBoxProps {
    open: boolean;
    title?: string;
    description?: any;
    isSubmitting: boolean;
    onDialogAction: EventHandler;
}

const DialogBox = ({ open, title, description, isSubmitting, onDialogAction }: DialogBoxProps) => {
    return (
        <Dialog
            open={open}
            onClose={() => onDialogAction(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={() => onDialogAction(false)}>
                    No
                </Button>
                <Button color="primary" disabled={isSubmitting} autoFocus onClick={() => onDialogAction(true)}>
                    {isSubmitting ? "Please wait.." : "Yes"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogBox;
