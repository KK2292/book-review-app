import { TextField } from "@mui/material";

type DefaultTextFeildProps = {
  label: string;
  type: string;
  value: string;
  autoFocus?: boolean;
};

export const DefaultTextFeild = (props: DefaultTextFeildProps) => {
  const { label, type, value, autoFocus } = props;
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={label}
      id={type}
      type={type}
      name={type}
      autoComplete={type}
      autoFocus={autoFocus}
      value={value}
    />
  );
};
