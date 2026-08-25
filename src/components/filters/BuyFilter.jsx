import React from "react";
import PropertyTypeFilter from "./PropertyTypeFilter";
import BudgetFilter from "./BudgetFilter";
import BHKFilter from "./BHKFilter";
import {
  View,
  StyleSheet,
} from "react-native";
const MAX_BUDGET = 500000000; // ₹50 Cr

const BuyFilter = ({ filters, updateFilter }) => {
  return (
    <>
     <View style={styles.section}>
      <PropertyTypeFilter
        value={filters.propertyType}
        onChange={(value) =>
          updateFilter("propertyType", value)
        }
      />
</View>
 <View style={styles.section}>
      <BudgetFilter
        value={filters.budget ?? MAX_BUDGET}
        onChange={(value) =>
          updateFilter("budget", value)
        }
      />
</View>
 <View style={styles.section}>
      <BHKFilter
        value={filters.bhk}
        onChange={(value) =>
          updateFilter("bhk", value)
        }
      />
      </View>
    </>
  );
};

export default BuyFilter;


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