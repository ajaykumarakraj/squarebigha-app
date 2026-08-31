import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

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

  const [category, setCategory] = useState(
    (route?.params?.category || "sale").toLowerCase()
  );

  // =========================
  // FILTER STATE
  // =========================

  const [filters, setFilters] = useState(
    route?.params?.filters || {}
  );

  const [loading, setLoading] = useState(false);

  // =========================
  // UPDATE FILTER
  // =========================

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    console.log("FILTER:", key, value);
  };

  // =========================
  // CHANGE CATEGORY
  // =========================

  const changeCategory = (newCategory) => {
    setCategory(newCategory);

    // Previous category ke filters remove
    setFilters({});
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
      case "sale":
        return (
          <BuyFilter
            filters={filters}
            updateFilter={updateFilter}
          />
        );

      case "rent":
        return (
          <RentFilter
            filters={filters}
            updateFilter={updateFilter}
          />
        );

      case "commercial":
        return (
          <CommercialFilter
            filters={filters}
            updateFilter={updateFilter}
          />
        );

      case "plots":
      case "plot":
        return (
          <PlotFilter
            filters={filters}
            updateFilter={updateFilter}
          />
        );

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
  // CATEGORY TITLE
  // =========================

  const getCategoryTitle = () => {
    switch (category) {
      case "sale":
        return "Buy Property";

      case "rent":
        return "Rent Property";

      case "commercial":
        return "Commercial";

      case "plots":
      case "plot":
        return "Plots";

      case "project":
      case "projects":
        return "Projects";

      default:
        return "Search Property";
    }
  };

  // =========================
  // APPLY FILTER
  // =========================

  const applyFilters = async () => {
    try {
      setLoading(true);

      const searchData = {
        category,
        ...filters,
      };

      console.log("FINAL SEARCH DATA:", searchData);

      const response = await axios.post(
        "https://api.squarebigha.com/api/search-property-data",
        {
          params: searchData,
        }
      );

      console.log("SEARCH RESPONSE:", response?.data);

      navigation.navigate("PropertyList", {
        searchData,
        properties: response?.data?.data || [],
      });

    } catch (error) {
      console.log(
        "SEARCH ERROR:",
        error?.response?.data || error?.message
      );
    } finally {
      setLoading(false);
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
          <Text style={styles.back}>‹</Text>
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

      {/* ================= CATEGORY TABS ================= */}

      <View style={styles.tabs}>

        {/* BUY */}

        <TouchableOpacity
          style={[
            styles.tab,
            category === "sale" && styles.activeTab,
          ]}
          onPress={() => changeCategory("sale")}
        >
          <Text
            style={[
              styles.tabText,
              category === "sale" &&
                styles.activeTabText,
            ]}
          >
            Buy
          </Text>
        </TouchableOpacity>

        {/* RENT */}

        <TouchableOpacity
          style={[
            styles.tab,
            category === "rent" && styles.activeTab,
          ]}
          onPress={() => changeCategory("rent")}
        >
          <Text
            style={[
              styles.tabText,
              category === "rent" &&
                styles.activeTabText,
            ]}
          >
            Rent
          </Text>
        </TouchableOpacity>

        {/* COMMERCIAL */}

        <TouchableOpacity
          style={[
            styles.tab,
            category === "commercial" &&
              styles.activeTab,
          ]}
          onPress={() =>
            changeCategory("commercial")
          }
        >
          <Text
            style={[
              styles.tabText,
              category === "commercial" &&
                styles.activeTabText,
            ]}
          >
            Commercial
          </Text>
        </TouchableOpacity>

        {/* PLOTS */}

        <TouchableOpacity
          style={[
            styles.tab,
            category === "plots" &&
              styles.activeTab,
          ]}
          onPress={() =>
            changeCategory("plots")
          }
        >
          <Text
            style={[
              styles.tabText,
              category === "plots" &&
                styles.activeTabText,
            ]}
          >
            Plots
          </Text>
        </TouchableOpacity>

        {/* PROJECT */}

        <TouchableOpacity
          style={[
            styles.tab,
            category === "project" &&
              styles.activeTab,
          ]}
          onPress={() =>
            changeCategory("project")
          }
        >
          <Text
            style={[
              styles.tabText,
              category === "project" &&
                styles.activeTabText,
            ]}
          >
            Project
          </Text>
        </TouchableOpacity>

      </View>

      {/* ================= FILTER CONTENT ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* LOCATION */}

        <LocationFilter
          value={filters.location}
          onChange={(value) =>
            updateFilter(
              "location",
              value
            )
          }
        />

        {/* CATEGORY FILTER */}

        {renderCategoryFilter()}


<View style={styles.bottom}>
  <TouchableOpacity
    style={[
      styles.searchButton,
      loading && styles.disabledButton,
    ]}
    onPress={applyFilters}
    disabled={loading}
    activeOpacity={0.8}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.searchButtonText}>
        🔍 Search Properties
      </Text>
    )}
  </TouchableOpacity>
</View>


      </ScrollView>

      {/* ================= APPLY ================= */}



    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#fff",
    paddingTop:30
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
  },

  clear: {
    color: "#ff6347",
    fontWeight: "600",
  },

  // =========================
  // TABS
  // =========================

  tabs: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#f3f3f3",
  },

  activeTab: {
    backgroundColor: "#955c06ff",
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },

  activeTabText: {
    color: "#fff",
  },

  // =========================
  // CONTENT
  // =========================

  content: {
    padding: 15,
    paddingBottom: 100,
  },

  // =========================
  // BOTTOM
  // =========================

  // bottom: {
  //   position: "absolute",
  //   left: 0,
  //   right: 0,
  //   bottom: 80,
  //   padding: 15,
  //   backgroundColor: "#fff",
  //   borderTopWidth: 1,
  //   borderTopColor: "#eee",
  // },

  applyButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#955c06ff",
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  searchButton: {
  height: 52,
  backgroundColor: "#955c06ff",
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  elevation: 3,
},

searchButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},

disabledButton: {
  opacity: 0.6,
},
});