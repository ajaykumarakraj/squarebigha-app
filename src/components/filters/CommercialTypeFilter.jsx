import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const CommercialTypeFilter = ({ value, onChange }) => {
  const options = [
    "Office",
    "Shop",
    "Showroom",
    "Warehouse",
    "Industrial",
  ];

  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          marginBottom: 10,
        }}
      >
        Commercial Type
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {options.map((item) => {
          const selected = value === item;

          return (
            <TouchableOpacity
              key={item}
              onPress={() => onChange(item)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: selected
                  ? "#1e40af"
                  : "#ddd",
                backgroundColor: selected
                  ? "#1e40af"
                  : "#fff",
              }}
            >
              <Text
                style={{
                  color: selected ? "#fff" : "#333",
                }}
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

export default CommercialTypeFilter;