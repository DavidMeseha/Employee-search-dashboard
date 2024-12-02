import { Checkbox, CheckboxProps } from "@mui/material";
import React from "react";

type Props = CheckboxProps;

export default function AppCheckbox(props: Props) {
  return (
    <Checkbox
      {...props}
      className="ms-2"
      sx={{
        color: "#D6DDEB",
        marginInlineEnd: 2,
        padding: "2px",
        "&.Mui-checked": {
          color: "#2EAE7D"
        }
      }}
    />
  );
}
