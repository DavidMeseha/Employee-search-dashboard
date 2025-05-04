import { Collapse, List } from "@mui/material";
import React, { memo, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import CheckboxListLoading from "../loading-ui/CheckboxListLoading";
import SearchField from "./SearchField";

type FilterSectionProps = {
  title: string;
  isExpanded: boolean;
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
  isLoading,
  loadingCount,
  showSearch,
  searchValue,
  onSearchChange,
  children
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(isExpanded);

  return (
    <>
      <button className="mb-2 flex w-full items-start justify-between font-bold" onClick={() => setIsOpen(!isOpen)}>
        {title}
        {isOpen ? <MdExpandLess /> : <MdExpandMore />}
      </button>
      <Collapse in={isOpen}>
        <List component="div">
          {isLoading ? <CheckboxListLoading count={loadingCount} /> : children}
          {showSearch && <SearchField value={searchValue} onChange={(e) => onSearchChange?.(e.target.value)} />}
        </List>
      </Collapse>
    </>
  );
});

export default FilterSection;
