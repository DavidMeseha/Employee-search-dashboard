import { customColors } from "../../constants/twColors";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { BiSearch } from "react-icons/bi";

type Props = TextFieldProps;

export default function SearchField(props: Props) {
  return (
    <div className="relative">
      <TextField
        {...props}
        placeholder="Find country"
        sx={{ width: "100%", paddingBlock: 2, borderRadius: "0px" }}
        inputProps={{
          style: {
            paddingInlineStart: 48,
            paddingBlock: 14,
            backgroundColor: customColors["secondary-highlight"],
            borderRadius: "0px"
          }
        }}
      />
      <div className="absolute start-0 top-0 ps-5 pt-8 text-gray-400">
        <BiSearch size={20} />
      </div>
    </div>
  );
}
