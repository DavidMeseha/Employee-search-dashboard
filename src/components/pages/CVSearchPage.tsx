"use client";

import { getApplications } from "@/actions";
import CvsDispay from "@/components/CvsDispay";
import SideFilters from "@/components/SideFilters";
import { filtersInit, viewInit } from "@/constants/initials";
import { APPLICATIONS_QUERY_KEY } from "@/constants/query-keys";
import { exactObjectIndex, includesExactObject } from "@/misc";
import { Filters, View } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function CVSearchPage() {
  const [filters, setFilters] = useState<Filters>(filtersInit);
  const [view, setView] = useState<View>(viewInit);
  const [showFilters, setShowFilters] = useState(false);

  const applicationsQuery = useQuery({
    queryKey: [
      APPLICATIONS_QUERY_KEY,
      view.state,
      view.sortBy,
      ...filters.yearsOfExp,
      ...filters.country,
      ...filters.education
    ],
    queryFn: () => getApplications(filters, view)
  });
  const apps = applicationsQuery.data ?? [];

  const handleFilterChange = (name: keyof Filters, value: any) => {
    const tempValues = [...filters[name]];
    const isChecked =
      typeof value !== "string" ? !includesExactObject(filters.yearsOfExp, value) : !tempValues.includes(value);

    if (isChecked) {
      if (value === "all") return setFilters({ ...filters, [name]: [] });
      else if (filters[name].length < 1) return setFilters({ ...filters, [name]: [value] });
      tempValues.push(value);
      setFilters({ ...filters, [name]: [...tempValues] });
    } else {
      tempValues.splice(typeof value === "string" ? tempValues.indexOf(value) : exactObjectIndex(tempValues, value), 1);
      setFilters({ ...filters, [name]: [...tempValues] });
    }
  };

  const handleViewChange = (name: keyof View, value: string) => {
    setView({ ...view, [name]: value });
  };

  return (
    <main className="flex gap-4">
      <SideFilters
        close={() => setShowFilters(false)}
        filters={filters}
        handleChange={handleFilterChange}
        isOpen={showFilters}
      />
      <CvsDispay
        applications={apps}
        handleChange={handleViewChange}
        isPending={applicationsQuery.isLoading}
        toggleFilters={() => setShowFilters(!showFilters)}
        view={view}
      />
    </main>
  );
}
