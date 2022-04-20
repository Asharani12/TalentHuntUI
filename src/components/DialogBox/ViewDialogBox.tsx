import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface ViewDialogBoxProps {
  open: boolean;
  title?: string;
  content: any;
  onDialogClose: () => void;
}

const ViewDialogBox = ({
  open,
  title,
  content,
  onDialogClose,
}: ViewDialogBoxProps) => {
  return (
    <Dialog
      open={open}
      onClose={onDialogClose}
      fullWidth
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onDialogClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDialogBox;
