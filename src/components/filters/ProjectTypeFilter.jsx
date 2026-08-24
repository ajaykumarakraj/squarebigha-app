import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PropertyTypeFilter = ({ value, onChange }) => {
  const types = [
    "Flat",
    "House",
    "Villa",
    "Builder Floor",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Property Type</Text>

      <View style={styles.row}>
        {types.map((item) => {
          const selected = value === item;

          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.option,
                selected && styles.selected,
              ]}
              onPress={() => onChange(item)}
            >
              <Text
                style={[
                  styles.text,
                  selected && styles.selectedText,
                ]}
              >
                {item}
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
    color: "#222",
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