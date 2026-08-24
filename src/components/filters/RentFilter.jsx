import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import PropertyTypeFilter from "./PropertyTypeFilter";
import RentBudgetFilter from "./RentBudgetFilter";
import BHKFilter from "./BHKFilter";
import FurnishingFilter from "./FurnishingFilter";

const RentFilter = ({ filters, updateFilter }) => {
  return (
    <View style={styles.container}>

      {/* Property Type */}
      <View style={styles.section}>
        <PropertyTypeFilter
          value={filters.propertyType}
          onChange={(value) =>
            updateFilter("propertyType", value)
          }
        />
      </View>

      {/* Rent Budget */}
      <View style={styles.section}>
        <RentBudgetFilter
          value={filters.rent}
          onChange={(value) =>
            updateFilter("rent", value)
          }
        />
      </View>

      {/* BHK */}
      <View style={styles.section}>
        <BHKFilter
          value={filters.bhk}
          onChange={(value) =>
            updateFilter("bhk", value)
          }
        />
      </View>

      {/* Furnishing */}
      <View style={styles.section}>
        <FurnishingFilter
          value={filters.furnishing}
          onChange={(value) =>
            updateFilter("furnishing", value)
          }
        />
      </View>

    </View>
  );
};

export default RentFilter;

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