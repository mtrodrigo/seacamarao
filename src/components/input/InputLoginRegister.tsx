import { TextField } from "@mui/material";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputLoginRegisterProps {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
}

export const InputLoginRegister = ({
  label,
  type,
  name,
  register,
  rules,
}: InputLoginRegisterProps) => {
  return (
    <div className="mt-3" style={{ width: "100%" }}>
      <TextField
      label={label}
      variant="standard"
      type={type}
      {...register(name, rules)}
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
