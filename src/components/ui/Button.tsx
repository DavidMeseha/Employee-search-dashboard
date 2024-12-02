import { classNameMerge } from "@/misc";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...props }: Props) {
  return (
    <button
      {...props}
      className={classNameMerge(
        "w-36 bg-gradient-to-b from-primary to-primary-shade py-3 font-semibold text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
