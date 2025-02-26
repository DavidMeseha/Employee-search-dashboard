import ApplicationCard from "@/components/ApplicationCard";
import { Application, View } from "@/types";
import { MenuItem, Select } from "@mui/material";
import React, { memo, useMemo } from "react";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { PiExport } from "react-icons/pi";
import LoadingSpinner from "./loading-ui/LoadingSpinner";
import { RiFilterFill } from "react-icons/ri";

type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  count: number;
  label: string;
  icon?: React.ReactNode;
};

const TabButton = memo(function TabButton({ isActive, onClick, count, label, icon }: TabButtonProps) {
  return (
    <button
      aria-selected={isActive}
      className={`flex w-full justify-center py-3 ${isActive ? activeTap : ""}`}
      role="tab"
      onClick={onClick}
    >
      {`${label}(${count})`}
      {icon}
    </button>
  );
});

type Props = {
  applications: Application[];
  isPending: boolean;
  view: View;
  handleChange: (name: keyof View, value: string) => void;
  toggleFilters: () => void;
};

const activeTap = "border-x-[4px] border-b-[4px] border-x-transparent border-b-black pb-2 text-primary-shade";

export default function CvsDispay({ applications, isPending, view, handleChange, toggleFilters }: Props) {
  const tabButtons = useMemo(
    () => [
      { state: "all", label: "All Applicants", count: 100 },
      { state: "locked", label: "Locked", count: 20, icon: <BiLock className="fill-red-600" size={20} /> },
      { state: "unlocked", label: "Unlocked", count: 5, icon: <BiLockOpen className="fill-primary" size={20} /> },
      { state: "shortlisted", label: "Shortlisted", count: 50, icon: <BsStarFill className="fill-primary" size={18} /> }
    ],
    []
  );

  const applicationsList = useMemo(
    () => (
      <div className="mt-6 space-y-4">
        {applications.map((app, index) => (
          <ApplicationCard application={app} key={app.appliedDate + index} />
        ))}
      </div>
    ),
    [applications]
  );
  return (
    <section className="min-h-[160dvh] w-[calc(100%)] px-3 sm:p-6 lg:w-[calc(100%-256px)]">
      <h1 className="mb-6 text-2xl font-bold text-primary-shade">Clinical Pharmacist in Damam, Saudi Arabia</h1>

      <div className="flex flex-grow flex-col gap-6 text-subtext lg:flex-row">
        <div className="w-full overflow-auto">
          <ul className="flex min-w-[600px] items-end gap-4 border-b text-center text-sm font-semibold" role="tablist">
            {tabButtons.map((tab) => (
              <li className="w-1/4" key={tab.state} role="presentation">
                <TabButton
                  count={tab.count}
                  icon={tab.icon}
                  isActive={view.state === tab.state}
                  label={tab.label}
                  onClick={() => handleChange("state", tab.state)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-end justify-between">
          <button className="flex gap-2 text-primary lg:hidden" onClick={toggleFilters}>
            <RiFilterFill size={25} />
            Filers
          </button>
          <div className="flex gap-2">
            <div>
              <label className="block text-xs">Sort by</label>
              <Select
                value={view.sortBy}
                sx={{
                  width: 80,
                  padding: 0,
                  "& .MuiSelect-select": {
                    padding: "4px 8px" // Adjust padding for the select input
                  }
                }}
                onChange={(e) => handleChange("sortBy", e.target.value)}
              >
                <MenuItem value={"any"}>Any</MenuItem>
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"age"}>Age</MenuItem>
                <MenuItem value={"application"}>Applied Time</MenuItem>
              </Select>
            </div>
            <div className="flex flex-col items-center">
              <PiExport size={30} />
              <span>Export</span>
            </div>
          </div>
        </div>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : applications.length > 0 ? (
        <div className="mt-6 space-y-4">{applicationsList}</div>
      ) : (
        <div className="py-12 text-center text-subtext">No Applications Mtch Your Search</div>
      )}
    </section>
  );
}
