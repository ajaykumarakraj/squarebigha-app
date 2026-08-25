import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import CommercialTypeFilter from "./CommercialTypeFilter";
import BudgetFilter from "./BudgetFilter";
// import AreaFilter from "./AreaFilter";

const CommercialFilter = ({ filters, updateFilter }) => {
  return (
    <>
     <View style={styles.section}>
      <CommercialTypeFilter
        value={filters.commercialType}
        onChange={(value) =>
          updateFilter("commercialType", value)
        }
      />
</View>
 <View style={styles.section}>
      <BudgetFilter
        value={filters.budget}
        onChange={(value) =>
          updateFilter("budget", value)
        }
      />
</View>
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  section: {
    marginBottom: 12,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",

    // Android
    elevation: 1,

    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
});