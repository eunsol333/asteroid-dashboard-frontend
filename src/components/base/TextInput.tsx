import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const TextInput = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },

  "& .MuiInputBase-input": {
    color: "white",
  },
});
