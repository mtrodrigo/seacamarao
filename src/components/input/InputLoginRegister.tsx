import { TextField } from "@mui/material";

interface InputLoginRegisterProps {
  label: string;
  type: string;
}

export const InputLoginRegister = ({
  label,
  type,
}: InputLoginRegisterProps) => {
  return (
    <div className="mt-3" style={{ width: "100%" }}>
      <TextField
      id="standard-basic"
      label={label}
      variant="standard"
      type={type}
      fullWidth
      sx={{
        "& .MuiInputBase-input": {
        color: "#e4e4e7",
        },

        "& .MuiInputLabel-root": {
        color: "#e4e4e7",
        },

        "& .MuiInput-underline:before": {
        borderBottomColor: "#e4e4e7",
        },

        "& .MuiInputBase-input:focus": {
        color: "#ea580c",
        },
        "& .Mui-focused": {
        color: "#ea580c !important",
        },
        "& .MuiInput-underline:after": {
        borderBottomColor: "#ea580c",
        },
      }}
      />
    </div>
  );
};
