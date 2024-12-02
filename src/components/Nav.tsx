"use client";

import { MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const menu = [
  {
    name: "Dashboard",
    to: "/dashboard"
  },
  {
    name: "My Jobs",
    to: "/my-jobs"
  },
  {
    name: "CV Search",
    to: "/"
  },
  {
    name: "Report",
    to: "/report"
  },
  {
    name: "Billing",
    to: "/billing"
  }
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <ul className="hidden lg:flex">
        {menu.map((item) => (
          <li key={item.name}>
            <Link className={`px-2.5 ${pathname === item.to ? "text-primary underline" : ""}`} href={item.to}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <span className="lg:hidden">
        <Select
          value={pathname}
          sx={{
            fontSize: "14px",
            border: 0,
            "& .MuiSelect-select": {
              padding: "0" // Adjust padding for the select input
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: 0
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: 0
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: 0
            }
          }}
        >
          {menu.map((item) => (
            <MenuItem key={item.name} value={item.to}>
              <Link href={item.to}>{item.name}</Link>
            </MenuItem>
          ))}
        </Select>
      </span>
    </>
  );
}
