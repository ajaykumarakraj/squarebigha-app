import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Slider from "@react-native-community/slider";

const MIN_RENT = 5000;
const MAX_RENT = 500000;
const STEP = 1000;

const RentBudgetFilter = ({
  value = {
    min: MIN_RENT,
    max: MAX_RENT,
  },
  onChange,
}) => {
  const minValue =
    Number(value?.min) || MIN_RENT;

  const maxValue =
    Number(value?.max) || MAX_RENT;

  const formatRent = (amount) => {
    if (amount >= 100000) {
      return `₹${(
        amount / 100000
      ).toFixed(1)} Lac`;
    }

    return `₹${Math.round(
      amount / 1000
    )}K`;
  };

  // const handleMinChange = (newMin) => {
  //   // Minimum maximum se upar nahi ja sakta
  //   const safeMin = Math.min(
  //     newMin,
  //     maxValue - STEP
  //   );

  //   onChange?.({
  //     min: safeMin,
  //     max: maxValue,
  //   });
  // };

  const handleMaxChange = (newMax) => {
    // Maximum minimum se neeche nahi ja sakta
    const safeMax = Math.max(
      newMax,
      minValue + STEP
    );

    onChange?.({
      min: minValue,
      max: safeMax,
    });
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Monthly Rent
        </Text>

        <Text style={styles.value}>
          {formatRent(minValue)} -{" "}
          {formatRent(maxValue)}
        </Text>
      </View>

      {/* MINIMUM */}
      <Text style={styles.label}>
        Minimum Rent: {formatRent(minValue)}
      </Text>

      {/* <Slider
        style={styles.slider}
        minimumValue={MIN_RENT}
        maximumValue={MAX_RENT}
        step={STEP}
        value={minValue}
        onValueChange={handleMinChange}
        minimumTrackTintColor="#955c06ff"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#955c06ff"
      /> */}

      {/* MAXIMUM */}
      <Text style={styles.label}>
        Maximum Rent: {formatRent(maxValue)}
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={MIN_RENT}
        maximumValue={MAX_RENT}
        step={STEP}
        value={maxValue}
        onValueChange={handleMaxChange}
        minimumTrackTintColor="#955c06ff"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#955c06ff"
      />

      {/* RANGE */}
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeText}>
          ₹5K
        </Text>

        <Text style={styles.rangeText}>
          ₹5 Lac
        </Text>
      </View>

    </View>
  );
};

export default RentBudgetFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  value: {
    fontSize: 14,
    fontWeight: "700",
    color: "#955c06ff",
  },

  label: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
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