import React from "react";
import PropertyTypeFilter from "./PropertyTypeFilter";
import BudgetFilter from "./BudgetFilter";
import BHKFilter from "./BHKFilter";

const MAX_BUDGET = 500000000; // ₹50 Cr

const BuyFilter = ({ filters, updateFilter }) => {
  return (
    <>
      <PropertyTypeFilter
        value={filters.propertyType}
        onChange={(value) =>
          updateFilter("propertyType", value)
        }
      />

      <BudgetFilter
        value={filters.budget ?? MAX_BUDGET}
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
    </>
  );
};

export default BuyFilter;

