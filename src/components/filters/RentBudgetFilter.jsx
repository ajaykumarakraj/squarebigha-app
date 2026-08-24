import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const RentBudgetFilter = ({ value, onChange }) => {
  const budgets = [
    "₹5,000",
    "₹10,000",
    "₹20,000",
    "₹30,000",
    "₹50,000+",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Monthly Rent
      </Text>

      <View style={styles.row}>
        {budgets.map((item) => {
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

export default RentBudgetFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  option: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    backgroundColor: "#fff",

    marginRight: 8,
    marginBottom: 8,
  },

  selected: {
    backgroundColor: "#1e40af",
    borderColor: "#1e40af",
  },

  text: {
    fontSize: 14,
    color: "#333",
  },

  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
});