import { Alert, Snackbar } from "@mui/material";
export type typeToast = {
  open: boolean;
  message: string;
  severity: "success" | "error";
};

type ToastProps = { setToast: (toast: typeToast) => void } & typeToast;

export const Toast = (props: ToastProps) => {
  const { open, message, severity, setToast } = props;

  const handleClose = () => {
    setToast({ open: false, message, severity });
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={handleClose}
    >
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
