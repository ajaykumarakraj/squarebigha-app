import React from "react";

import CommercialTypeFilter from "./CommercialTypeFilter";
import BudgetFilter from "./BudgetFilter";
// import AreaFilter from "./AreaFilter";

const CommercialFilter = ({ filters, updateFilter }) => {
  return (
    <>
      <CommercialTypeFilter
        value={filters.commercialType}
        onChange={(value) =>
          updateFilter("commercialType", value)
        }
      />

      <BudgetFilter
        value={filters.budget}
        onChange={(value) =>
          updateFilter("budget", value)
        }
      />

      {/* <AreaFilter
        value={filters.area}
        onChange={(value) =>
          updateFilter("area", value)
        }
      /> */}
    </>
  );
};

export default CommercialFilter;