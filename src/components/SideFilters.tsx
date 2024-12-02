import CheckboxListLoading from "@/components/loading-ui/CheckboxListLoading";
import AppCheckbox from "@/components/ui/AppCheckbox";
import SearchField from "@/components/ui/SearchField";
import { includesExactObject } from "@/misc";
import { Actions, Filters } from "@/types";
import { Collapse, FormControlLabel, List } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { CgClose } from "react-icons/cg";

type Props = {
  handleChange: (name: keyof Filters, value: any) => void;
  filters: Filters;
  isOpen: boolean;
  close: () => void;
  actions: Actions;
};

export default function SideFilters({ handleChange, filters, isOpen, close, actions }: Props) {
  const [showResidency, setShowResidency] = useState<boolean>(true);
  const [showEducation, setShowEducation] = useState<boolean>(true);
  const [showExperience, setShowExperience] = useState<boolean>(true);
  const [findCountry, setFindCountry] = useState("");

  const countriesQuery = useQuery({
    queryKey: ["search-countries-data"],
    queryFn: () => actions.getCVCountries()
  });
  const countries = countriesQuery.data?.countries ?? [];
  const total = countriesQuery.data?.total;
  const filterCountries = countries
    .filter((country) => country.name.toLowerCase().includes(findCountry.toLowerCase()))
    .slice(0, 2);

  const educationQuery = useQuery({
    queryKey: ["education-filter-data"],
    queryFn: () => actions.getEducationOptions()
  });
  const educationOptions = educationQuery.data?.edu ?? [];

  const experianceQuery = useQuery({
    queryKey: ["experiance-filter-data"],
    queryFn: () => actions.getYearsOfExp()
  });
  const experiance = experianceQuery.data?.yearsOfexp ?? [];

  return (
    <aside
      className={`fixed bottom-0 start-0 overflow-auto transition-transform lg:overflow-hidden ${isOpen ? "translate-x-0" : "-translate-x-64 lg:translate-x-0"} top-20 w-64 border border-secondary bg-white lg:static lg:h-fit`}
    >
      <div className="flex bg-secondary py-3 text-center text-2xl font-bold">
        <span className="flex-grow">Filter</span>
        <button className="inline pe-2 text-gray-400 lg:hidden" onClick={close}>
          <CgClose />
        </button>
      </div>
      <div className="p-2 text-base">
        <button
          className="mb-2 flex w-full items-start justify-between font-bold"
          onClick={() => setShowResidency(!showResidency)}
        >
          Residency Country
          {showResidency ? <MdExpandLess /> : <MdExpandMore />}
        </button>
        <Collapse in={showResidency} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <div className="h-24">
              {countriesQuery.isPending ? (
                <CheckboxListLoading count={3} />
              ) : (
                <>
                  <li className="py-1">
                    <FormControlLabel
                      checked={!filters.country.length}
                      control={<AppCheckbox />}
                      label={`All(${total})`}
                      onChange={() => handleChange("country", "all")}
                    />
                  </li>
                  {filterCountries.map((country) => (
                    <li className="py-1" key={country.name}>
                      <FormControlLabel
                        checked={!!filters.country.includes(country.name)}
                        control={<AppCheckbox />}
                        label={`${country.name}(${country.count})`}
                        onChange={() => handleChange("country", country.name)}
                      />
                    </li>
                  ))}
                </>
              )}
            </div>
            <SearchField value={findCountry} onChange={(e) => setFindCountry(e.target.value)} />
          </List>
        </Collapse>

        <button
          className="mb-2 flex w-full items-start justify-between font-bold"
          onClick={() => setShowEducation(!showEducation)}
        >
          Education Level
          {showResidency ? <MdExpandLess /> : <MdExpandMore />}
        </button>
        <Collapse in={showEducation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {educationQuery.isPending ? (
              <CheckboxListLoading count={5} />
            ) : (
              <>
                <li className="py-1">
                  <FormControlLabel
                    checked={!filters.education.length}
                    control={<AppCheckbox />}
                    label={`All(${total})`}
                    onChange={() => handleChange("education", "all")}
                  />
                </li>
                {educationOptions.map((education) => (
                  <li className="py-1" key={education.degree}>
                    <FormControlLabel
                      checked={!!filters.education.includes(education.degree)}
                      control={<AppCheckbox />}
                      label={`${education.degree}(${education.count})`}
                      onChange={() => handleChange("education", education.degree)}
                    />
                  </li>
                ))}
              </>
            )}
          </List>
        </Collapse>
        <button
          className="mb-2 flex w-full items-start justify-between font-bold"
          onClick={() => setShowExperience(!showExperience)}
        >
          Years of Experience
          {showResidency ? <MdExpandLess /> : <MdExpandMore />}
        </button>
        <Collapse in={showExperience} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {experianceQuery.isPending ? (
              <CheckboxListLoading count={5} />
            ) : (
              <>
                <li className="py-1">
                  <FormControlLabel
                    checked={!filters.yearsOfExp.length}
                    control={<AppCheckbox />}
                    label={`All(${total})`}
                    onChange={() => handleChange("yearsOfExp", "all")}
                  />
                </li>
                {experiance.map((exp) => (
                  <li className="py-1" key={exp.name}>
                    <FormControlLabel
                      checked={!!includesExactObject(filters.yearsOfExp, { min: exp.min, max: exp.max })}
                      control={<AppCheckbox />}
                      label={`${exp.name}(${exp.count})`}
                      onChange={() => handleChange("yearsOfExp", { min: exp.min, max: exp.max })}
                    />
                  </li>
                ))}
              </>
            )}
          </List>
        </Collapse>
      </div>
    </aside>
  );
}
