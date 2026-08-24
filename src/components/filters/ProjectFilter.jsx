import React from "react";

import ProjectTypeFilter from "./ProjectTypeFilter";
import BudgetFilter from "./BudgetFilter";
import BHKFilter from "./BHKFilter";
import PossessionFilter from "./PossessionFilter";

const ProjectFilter = ({ filters, updateFilter }) => {
  return (
    <>
      <ProjectTypeFilter
        value={filters.projectType}
        onChange={(value) =>
          updateFilter("projectType", value)
        }
      />

      <BudgetFilter
        value={filters.budget}
        onChange={(value) =>
          updateFilter("budget", value)
        }
      />

      <BHKFilter
        value={filters.bhk}
        onChange={(value) =>
          updateFilter("bhk", value)
        }
      />

      <PossessionFilter
        value={filters.possession}
        onChange={(value) =>
          updateFilter("possession", value)
        }
      />
    </>
  );
};

export default ProjectFilter;