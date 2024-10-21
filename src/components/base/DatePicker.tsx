import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: "transparent",
    color: "white",
    borderColor: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiFormLabel-root": {
    color: "white",
  },
  "& .MuiInputBase-root::before, & .MuiInputBase-root::after": {
    borderColor: "white",
  },
  "& .MuiIconButton-root": {
    color: "white",
  },
}));
