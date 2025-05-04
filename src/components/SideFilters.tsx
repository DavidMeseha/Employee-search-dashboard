import AppCheckbox from "@/components/ui/AppCheckbox";
import { includesExactObject } from "@/misc";
import { Filters } from "@/types";
import { FormControlLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { CgClose } from "react-icons/cg";
import { getCountries, getEducationOptions, getYearsOfExp } from "@/actions";
import FilterSection from "./ui/FilterSection";
import {
  COUNTRIES_FILTERS_QUERY_KEY,
  EDUCATION_FILTERS_QUERY_KEY,
  EXPERIANCE_FILTERS_QUERY_KEY
} from "@/constants/query-keys";

type Props = {
  handleChange: (name: keyof Filters, value: any) => void;
  filters: Filters;
  isOpen: boolean;
  close: () => void;
};

export default function SideFilters({ handleChange, filters, isOpen, close }: Props) {
  const [findCountry, setFindCountry] = useState("");

  const countriesQuery = useQuery({
    queryKey: [COUNTRIES_FILTERS_QUERY_KEY],
    queryFn: () => getCountries()
  });

  const educationQuery = useQuery({
    queryKey: [EDUCATION_FILTERS_QUERY_KEY],
    queryFn: () => getEducationOptions()
  });

  const experianceQuery = useQuery({
    queryKey: [EXPERIANCE_FILTERS_QUERY_KEY],
    queryFn: () => getYearsOfExp()
  });

  const { countries, total } = useMemo(() => {
    const countries = countriesQuery.data?.countries ?? [];
    const total = countriesQuery.data?.total;
    return { countries, total };
  }, [countriesQuery.data]);

  const filterCountries = useMemo(() => {
    return countries.filter((country) => country.name.toLowerCase().includes(findCountry.toLowerCase())).slice(0, 2);
  }, [countries, findCountry]);

  const educationOptions = educationQuery.data?.edu ?? [];
  const experiance = experianceQuery.data?.yearsOfexp ?? [];

  const renderFilterOption = (checked: boolean, label: string, onChange: () => void) => (
    <li className="py-1">
      <FormControlLabel checked={checked} control={<AppCheckbox />} label={label} onChange={onChange} />
    </li>
  );

  return (
    <aside
      className={`sx:z-0 fixed bottom-0 start-0 z-20 overflow-auto transition-transform lg:overflow-hidden ${isOpen ? "translate-x-0" : "-translate-x-64 lg:translate-x-0"} top-20 w-64 border border-secondary bg-white lg:static lg:h-fit`}
    >
      <div className="flex bg-secondary py-3 text-center text-2xl font-bold">
        <span className="flex-grow">Filter</span>
        <button className="inline pe-2 text-gray-400 lg:hidden" onClick={close}>
          <CgClose />
        </button>
      </div>
      <div className="p-2 text-base">
        <FilterSection
          isExpanded={true}
          isLoading={countriesQuery.isPending}
          loadingCount={3}
          searchValue={findCountry}
          showSearch
          title="Residency Country"
          onSearchChange={setFindCountry}
        >
          <div className="h-24">
            {renderFilterOption(!filters.country.length, `All(${total})`, () => handleChange("country", "all"))}
            {filterCountries.map((country) => (
              <React.Fragment key={country.name}>
                {renderFilterOption(!!filters.country.includes(country.name), `${country.name}(${country.count})`, () =>
                  handleChange("country", country.name)
                )}
              </React.Fragment>
            ))}
          </div>
        </FilterSection>

        <FilterSection isExpanded={true} isLoading={educationQuery.isPending} loadingCount={5} title="Education Level">
          {renderFilterOption(!filters.education.length, `All(${total})`, () => handleChange("education", "all"))}
          {educationOptions.map((education) => (
            <React.Fragment key={education.degree}>
              {renderFilterOption(
                !!filters.education.includes(education.degree),
                `${education.degree}(${education.count})`,
                () => handleChange("education", education.degree)
              )}
            </React.Fragment>
          ))}
        </FilterSection>

        <FilterSection
          isExpanded={true}
          isLoading={experianceQuery.isPending}
          loadingCount={5}
          title="Years of Experience"
        >
          {renderFilterOption(!filters.yearsOfExp.length, `All(${total})`, () => handleChange("yearsOfExp", "all"))}
          {experiance.map((exp) => (
            <React.Fragment key={exp.min + exp.name + exp.max}>
              {renderFilterOption(
                !!includesExactObject(filters.yearsOfExp, { min: exp.min, max: exp.max }),
                `${exp.name}(${exp.count})`,
                () => handleChange("yearsOfExp", { min: exp.min, max: exp.max })
              )}
            </React.Fragment>
          ))}
        </FilterSection>
      </div>
    </aside>
  );
}
