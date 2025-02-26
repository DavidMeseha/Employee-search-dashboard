import CheckboxListLoading from "@/components/loading-ui/CheckboxListLoading";
import AppCheckbox from "@/components/ui/AppCheckbox";
import SearchField from "@/components/ui/SearchField";
import { includesExactObject } from "@/misc";
import { Actions, Filters } from "@/types";
import { Collapse, FormControlLabel, List } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo, memo } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { CgClose } from "react-icons/cg";

type FilterSectionProps = {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  isLoading: boolean;
  loadingCount: number;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children: React.ReactNode;
};

const FilterSection = memo(function FilterSection({
  title,
  isExpanded,
  onToggle,
  isLoading,
  loadingCount,
  showSearch,
  searchValue,
  onSearchChange,
  children
}: FilterSectionProps) {
  return (
    <>
      <button className="mb-2 flex w-full items-start justify-between font-bold" onClick={onToggle}>
        {title}
        {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
      </button>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {isLoading ? <CheckboxListLoading count={loadingCount} /> : children}
          {showSearch && <SearchField value={searchValue} onChange={(e) => onSearchChange?.(e.target.value)} />}
        </List>
      </Collapse>
    </>
  );
});

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

  const educationQuery = useQuery({
    queryKey: ["education-filter-data"],
    queryFn: () => actions.getEducationOptions()
  });

  const experianceQuery = useQuery({
    queryKey: ["experiance-filter-data"],
    queryFn: () => actions.getYearsOfExp()
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
          isExpanded={showResidency}
          isLoading={countriesQuery.isPending}
          loadingCount={3}
          searchValue={findCountry}
          showSearch
          title="Residency Country"
          onSearchChange={setFindCountry}
          onToggle={() => setShowResidency(!showResidency)}
        >
          <div className="h-24">
            {renderFilterOption(!filters.country.length, `All(${total})`, () => handleChange("country", "all"))}
            {filterCountries.map((country) =>
              renderFilterOption(!!filters.country.includes(country.name), `${country.name}(${country.count})`, () =>
                handleChange("country", country.name)
              )
            )}
          </div>
        </FilterSection>

        <FilterSection
          isExpanded={showEducation}
          isLoading={educationQuery.isPending}
          loadingCount={5}
          title="Education Level"
          onToggle={() => setShowEducation(!showEducation)}
        >
          {renderFilterOption(!filters.education.length, `All(${total})`, () => handleChange("education", "all"))}
          {educationOptions.map((education) =>
            renderFilterOption(
              !!filters.education.includes(education.degree),
              `${education.degree}(${education.count})`,
              () => handleChange("education", education.degree)
            )
          )}
        </FilterSection>

        <FilterSection
          isExpanded={showExperience}
          isLoading={experianceQuery.isPending}
          loadingCount={5}
          title="Years of Experience"
          onToggle={() => setShowExperience(!showExperience)}
        >
          {renderFilterOption(!filters.yearsOfExp.length, `All(${total})`, () => handleChange("yearsOfExp", "all"))}
          {experiance.map((exp) =>
            renderFilterOption(
              !!includesExactObject(filters.yearsOfExp, { min: exp.min, max: exp.max }),
              `${exp.name}(${exp.count})`,
              () => handleChange("yearsOfExp", { min: exp.min, max: exp.max })
            )
          )}
        </FilterSection>
      </div>
    </aside>
  );
}
