"use client";

import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function CheckboxListLoading({ count }: { count: number }) {
  return (
    <SkeletonTheme baseColor="#d5d5d5" highlightColor="#ececec">
      {Array.from({ length: count }, (_, index) => (
        <div className="flex gap-4 py-1.5" key={index}>
          <Skeleton height={20} width={20} />
          <Skeleton height={20} width={130} />
        </div>
      ))}
    </SkeletonTheme>
  );
}
