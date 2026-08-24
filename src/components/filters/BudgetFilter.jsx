import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";

const MIN_BUDGET = 500000;        // ₹5 Lac
const MAX_BUDGET = 500000000;     // ₹50 Cr
const STEP = 100000;              // ₹1 Lac

const BudgetFilter = ({ value = MAX_BUDGET, onChange }) => {
  const formatBudget = (amount) => {
    if (amount >= 10000000) {
      return `₹${amount / 10000000} Cr`;
    }

    return `₹${amount / 100000} Lac`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budget</Text>

        <Text style={styles.value}>
          {formatBudget(value)}
        </Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={MIN_BUDGET}
        maximumValue={MAX_BUDGET}
        step={STEP}
        value={value}
        onValueChange={(newValue) => {
          onChange?.(newValue);
        }}
        minimumTrackTintColor="#1e40af"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#1e40af"
      />

      <View style={styles.rangeLabels}>
        <Text style={styles.rangeText}>₹5 Lac</Text>

        <Text style={styles.rangeText}>₹50 Cr</Text>
      </View>
    </View>
  );
};

export default BudgetFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e40af",
  },

  slider: {
    width: "100%",
    height: 40,
  },

  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rangeText: {
    fontSize: 12,
    color: "#777",
  },
});