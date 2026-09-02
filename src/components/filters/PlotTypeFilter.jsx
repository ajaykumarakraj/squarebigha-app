import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const PlotTypeFilter = ({ value, onChange }) => {
  const options = [
    "Residential Plot",
    "Agricultural Land",
    "Farm House",
    "Industrial Plot",
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
        Plot Type
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
                  ? "#955c06ff"
                  : "#ddd",
                backgroundColor: selected
                  ? "#955c06ff"
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

export default PlotTypeFilter;