import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui";

interface FilterTabsProps {
  filter: "all" | "open" | "done";
  setFilter: (filter: "all" | "open" | "done") => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ filter, setFilter }) => {
  return (
    <Tabs
      value={filter}
      onValueChange={(value) => setFilter(value as "all" | "open" | "done")}
    >
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="open">Open</TabsTrigger>
        <TabsTrigger value="done">Done</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default FilterTabs;
