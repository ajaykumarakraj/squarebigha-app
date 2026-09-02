import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
 
} from "react-native";
import { useNavigation } from "@react-navigation/native";


const UserListScreen = () => {
  const navigation = useNavigation();

  const [btnValue, setBtnValue] = useState("residential");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
useEffect(() => {
  fetchProperties();
}, [btnValue]);

const fetchProperties = async () => {
  try {
    setLoading(true);
    setListings([]); // tab change par old data remove

    const response = await api.get(
      `https://api.squarebigha.com/api/get-property/residential`
    );

    console.log("API Response:", response?.data);

    setListings(response?.data?.data || []);
  } catch (error) {
    console.log(
      "API Error:",
      error?.response?.data || error?.message
    );

    setListings([]);
  } finally {
    setLoading(false);
  }
};

  const formatPrice = (amount) => {
    if (!amount) return "0";

    const num = Number(amount);

    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + " Cr";
    }

    if (num >= 100000) {
      return (num / 100000).toFixed(2) + " L";
    }

    return num;
  };

  const handleDelete = async (id) => {
    try {
      await api.post("https://api.squarebigha.com/api/delete-property-list", {
        type: btnValue,
        id,
      });

      setListings((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    navigation.navigate("UpdateProperty", {
      id: item.id,
      propertyType: item.property_type,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item?.media?.[0]?.file_url
            ? getApiAssetUrl(item.media[0].file_url)
            : "https://via.placeholder.com/400",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {item.bhk_type || "Property"}
          {item.property_type
            ? `, ${item.property_type}`
            : ""}
        </Text>

        <Text style={styles.location}>
          📍 {item.locality}, {item.property_city}
        </Text>

        <Text style={styles.price}>
          ₹ {formatPrice(item.total_price)}
        </Text>

        <Text>
          Area: {item.area} {item.area_unit}
        </Text>

        <Text>
          Price: ₹ {item.price}/{item.area_unit}
        </Text>

        <Text>Status: Approved</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            btnValue == "residential" &&
              styles.activeTab,
          ]}
          onPress={() => setBtnValue("residential")}
        >
          <Text>🏠 Residential</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            btnValue == "commercial" &&
              styles.activeTab,
          ]}
          onPress={() => setBtnValue("commercial")}
        >
          <Text>🏢 Commercial</Text>
        </TouchableOpacity>
      </View>

      {/* Add Property */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() =>
          navigation.navigate("PostProperty")
        }
      >
        <Text style={styles.addBtnText}>
          + Add Property
        </Text>
      </TouchableOpacity>

      {/* Loading */}
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No Properties Found
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  tabs: {
    flexDirection: "row",
    padding: 15,
  },

  tab: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: "#ff6347",
  },

  addBtn: {
    marginHorizontal: 15,
    backgroundColor: "#0d6efd",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  addBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 15,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 200,
  },

  content: {
    padding: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  location: {
    color: "#666",
    marginVertical: 5,
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0d6efd",
    marginVertical: 10,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  editBtn: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginRight: 5,
    alignItems: "center",
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },

  emptyText: {
    fontSize: 18,
    color: "#777",
  },
});