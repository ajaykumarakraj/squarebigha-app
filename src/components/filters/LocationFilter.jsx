import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const LocationFilter = ({ value, onChange }) => {
  const [query, setQuery] = useState(
    typeof value === "string" ? value : ""
  );
const skipAutocomplete = useRef(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Parent se selected location aaye
  useEffect(() => {
    if (typeof value === "string") {
      setQuery(value);
    } else if (value?.formatted_address) {
      setQuery(value.formatted_address);
    } else {
      setQuery("");
    }
  }, [value]);

  // Autocomplete
useEffect(() => {
  const searchText =
    typeof query === "string" ? query.trim() : "";

  if (skipAutocomplete.current) {
    skipAutocomplete.current = false;
    return;
  }

  if (!searchText || searchText.length < 2) {
    setSuggestions([]);
    setShowDropdown(false);
    return;
  }

  const timer = setTimeout(() => {
    fetchSuggestions(searchText);
  }, 400);

  return () => clearTimeout(timer);
}, [query]);
  const fetchSuggestions = async (text) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.squarebigha.com/api/google/places/autocomplete?input=${encodeURIComponent(
          text
        )}`
      );

      if (response.data?.success) {
        setSuggestions(response.data.data || []);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.log(
        "Autocomplete Error:",
        error.response?.data || error.message
      );

      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Select location
 const handleSelectLocation = async (item) => {
  try {
    setLoading(true);

    // Important: next query change par autocomplete API mat chalana
    skipAutocomplete.current = true;

    setQuery(item.description);

    // Immediately dropdown close
    setShowDropdown(false);
    setSuggestions([]);

    const response = await axios.get(
      `https://api.squarebigha.com/api/google/places/details/${item.place_id}`
    );

    if (response.data?.success) {
      const location = response.data.data;

      console.log("Selected Location:", location);

      onChange(location);
    }
  } catch (error) {
    console.log(
      "Place Details Error:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>

      {/* Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          value={query}
         onChangeText={(text) => {
  skipAutocomplete.current = false;
  setQuery(text);
  setShowDropdown(true);
}}
          placeholder="Select city, locality, sector"
          placeholderTextColor="#999"
          style={styles.input}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowDropdown(true);
            }
          }}
        />

        {loading && (
          <ActivityIndicator
            size="small"
            color="#666"
            style={styles.loader}
          />
        )}
      </View>

      {/* Suggestions */}
      {showDropdown && suggestions.length > 0 && (
        <View style={styles.dropdown}>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.place_id}
              style={styles.suggestion}
              onPress={() => handleSelectLocation(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.mainText}>
                {item.main_text}
              </Text>

              <Text style={styles.secondaryText}>
                {item.secondary_text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default LocationFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: "relative",
    zIndex: 1000,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },

  inputWrapper: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingRight: 40,
    fontSize: 14,
    color: "#222",
  },

  loader: {
    position: "absolute",
    right: 12,
  },

  dropdown: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,

    backgroundColor: "#fff",

    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,

    maxHeight: 220,

    zIndex: 9999,
    elevation: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  suggestion: {
    paddingHorizontal: 14,
    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  mainText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  secondaryText: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },
});