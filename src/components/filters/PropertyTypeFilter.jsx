import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PropertyTypeFilter = ({ value = [], onChange }) => {
  const [subtype, setSubtype] = useState([]);

  const filteredResidentialSubtypes = useMemo(() => {
    return subtype
      .filter((item) => item.status == "1")
      .filter((item) => item.property_type == "residential");
  }, [subtype]);

  useEffect(() => {
    getSubtype();
  }, []);

  const getSubtype = async () => {
    try {
      const res = await axios.get(
        "https://api.squarebigha.com/api/get-property-subtype"
      );

      if (res.data?.success) {
        setSubtype(res.data.data || []);
      }
    } catch (error) {
      console.log("Get subtype error:", error);
    }
  };

  // Multiple select / unselect
  const handleSelect = (item) => {
    const alreadySelected = value.some(
      (selectedItem) => selectedItem.id === item.id
    );

    if (alreadySelected) {
      // Remove item
      const updatedValue = value.filter(
        (selectedItem) => selectedItem.id !== item.id
      );

      onChange(updatedValue);
    } else {
      // Add item
      onChange([...value, item]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Property Type</Text>

      <View style={styles.row}>
        {filteredResidentialSubtypes.map((item) => {
          const selected = value.some(
            (selectedItem) => selectedItem.id === item.id
          );

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.option,
                selected && styles.selected,
              ]}
              onPress={() => handleSelect(item)}
            >
              <Text
                style={[
                  styles.text,
                  selected && styles.selectedText,
                ]}
              >
                {item.property_subtype}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default PropertyTypeFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  option: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
  },

  selected: {
    backgroundColor: "#1e40af",
    borderColor: "#1e40af",
  },

  text: {
    color: "#333",
  },

  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
});