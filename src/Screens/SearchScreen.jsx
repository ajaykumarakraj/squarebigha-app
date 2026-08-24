import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import LocationFilter from "../components/filters/LocationFilter";

import BuyFilter from "../components/filters/BuyFilter";
import RentFilter from "../components/filters/RentFilter";
import PlotFilter from "../components/filters/PlotFilter";
import CommercialFilter from "../components/filters/CommercialFilter";
import ProjectFilter from "../components/filters/ProjectFilter";

const SearchScreen = ({ route, navigation }) => {
  // =========================
  // CATEGORY
  // =========================
const category = (
  route?.params?.category || "sale"
).toLowerCase();



  console.log("CATEGORY:", category);

  // =========================
  // FILTER STATE
  // =========================

  const [filters, setFilters] = useState(
    route?.params?.filters || {}
  );

  // =========================
  // UPDATE FILTER
  // =========================

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    console.log("Filter:", key, value);
  };

  // =========================
  // CLEAR FILTER
  // =========================

  const clearFilters = () => {
    setFilters({});
  };

  // =========================
  // CATEGORY FILTER
  // =========================

  const renderCategoryFilter = () => {
    switch (category) {
      // BUY
      case "sale":
        return (
          <BuyFilter
            filters={filters}
            updateFilter={updateFilter}
          />
        );

      // RENT
      case "rent":
        return (
          <RentFilter
            filters={filters}
            updateFilter={updateFilter}
          />
        );

      // PLOT
      case "plot":
      case "plots":
        return (
          <PlotFilter
            filters={filters}
            updateFilter={updateFilter}
          />
        );

      // COMMERCIAL
      case "commercial":
        return (
          <CommercialFilter
            filters={filters}
            updateFilter={updateFilter}
          />
        );

      // PROJECT
      case "project":
      case "projects":
        return (
          <ProjectFilter
            filters={filters}
            updateFilter={updateFilter}
          />
        );

      default:
        return null;
    }
  };

  // =========================
  // APPLY FILTER
  // =========================

  const applyFilters = () => {
    const searchData = {
      category,
      ...filters,
    };

    console.log(
      "FINAL SEARCH DATA:",
      searchData
    );

    // Yahan API call kar sakte ho

    navigation.navigate("PropertyList", {
     searchData
    });
  };

  // =========================
  // CATEGORY TITLE
  // =========================

  const getCategoryTitle = () => {
    switch (category) {
      case "sale":
        return "Buy Property";

      case "rent":
        return "Rent Property";

      case "plot":
      case "plots":
        return "Plots";

      case "commercial":
        return "Commercial";

      case "project":
      case "projects":
        return "Projects";

      default:
        return "Search Property";
    }
  };

  return (
    <View style={styles.container}>

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.back}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          {getCategoryTitle()}
        </Text>

        <TouchableOpacity
          onPress={clearFilters}
        >
          <Text style={styles.clear}>
            Clear
          </Text>
        </TouchableOpacity>

      </View>

      {/* ================= FILTER CONTENT ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* COMMON LOCATION */}

        <LocationFilter
          value={filters.location}
          onChange={(value) =>
            updateFilter(
              "location",
              value
            )
          }
        />

        {/* CATEGORY WISE FILTER */}

        {renderCategoryFilter()}

      </ScrollView>

      {/* ================= APPLY BUTTON ================= */}

      <View style={styles.bottom}>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={applyFilters}
        >
          <Text style={styles.applyText}>
            Apply Filters
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  backButton: {
    width: 50,
    justifyContent: "center",
  },

  back: {
    fontSize: 35,
    color: "#222",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  clear: {
    width: 50,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "600",
    color: "#e53935",
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  applyButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: "#1e40af",
    alignItems: "center",
    justifyContent: "center",
  },

  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});