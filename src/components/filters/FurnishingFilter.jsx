import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const FurnishingFilter = ({ value, onChange }) => {
  const options = [
    "Unfurnished",
    "Semi Furnished",
    "Fully Furnished",
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
        Furnishing
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
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: selected
                  ? "#1e40af"
                  : "#ddd",
                backgroundColor: selected
                  ? "#1e40af"
                  : "#fff",
                borderRadius: 20,
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

export default FurnishingFilter;