import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const BHKFilter = ({ value = [], onChange }) => {
  const bhks = [
    "1 RK",
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5 BHK",
    "6 BH+"
  ];

  const handleSelect = (item) => {
    const alreadySelected = value.includes(item);

    if (alreadySelected) {
      // Remove selected BHK
      const updatedValue = value.filter(
        (bhk) => bhk !== item
      );

      onChange(updatedValue);
    } else {
      // Add selected BHK
      onChange([...value, item]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BHK</Text>

      <View style={styles.row}>
        {bhks.map((item) => {
          const selected = value.includes(item);

          return (
            <TouchableOpacity
              key={item}
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
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BHKFilter;

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