import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputLoginRegisterProps {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
}

export const InputLoginRegister = ({
  label,
  type,
  name,
  register,
  rules,
  onBlur,
  error,
}: InputLoginRegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mt-3 w-full">
      <TextField
        label={error ? error : label}
        variant="standard"
        type={type === "password" && showPassword ? "text" : type}
        {...register(name, rules)}
        onBlur={onBlur}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                onClick={togglePasswordVisibility}
                onMouseDown={(e) => e.preventDefault()} // Evita comportamento indesejado ao clicar
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-input": {
            color: "#e4e4e7",
          },
          "& .MuiInputLabel-root": {
            color: error ? "#ff0000" : "#e4e4e7",
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: error ? "#ff0000" : "#e4e4e7",
          },
          "& .MuiInputBase-input:focus": {
            color: "#ea580c",
          },
          "& .Mui-focused": {
            color: error ? "#ff0000 !important" : "#ea580c !important",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: error ? "#ff0000" : "#ea580c",
          },
        }}
      />
    </div>
  );
};
