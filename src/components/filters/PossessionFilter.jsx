import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const PossessionFilter = ({ value, onChange }) => {
  const options = [
    "Ready to Move",
    "Under Construction",
    "Upcoming",
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
        Possession
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

export default PossessionFilter;