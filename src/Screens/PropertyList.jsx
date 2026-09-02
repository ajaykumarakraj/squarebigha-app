import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Pressable,
    Modal,
    Dimensions,
    Alert,
    Linking,
    ActivityIndicator,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const { width } = Dimensions.get("window");

const API_URL ="https://api.squarebigha.com/api/search-property-data";

const IMAGE_BASE_URL = "https://api.squarebigha.com/";


const FilterScreen = ({ route }) => {
    const navigation = useNavigation();

    const { searchData } = route.params || {};
    console.log("get data", searchData)
    const [GetList, setGetList] = useState([]);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const [selectedProperty, setSelectedProperty] = useState(null);
const [showEnquiry, setShowEnquiry] = useState(false);

const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
});
console.log(selectedProperty,"GetList")
const handleCallSubmit = async () => {
  if (!formData.name || !formData.email || !formData.phone) {
    Alert.alert('Required', 'Please fill all fields');
    return;
  }

  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      project_id: selectedProperty.id,
       type: selectedProperty.property_type,
    };

    console.log("Enquiry Payload:", payload);

    const response = await axios.post(
       "https://api.squarebigha.com/api/submit-enquiry",
      payload
    );

    console.log("Enquiry Response:", response.data);

    setShowEnquiry(false);

  } catch (error) {
    console.log(
      "Enquiry Error:",
      error?.response?.data || error?.message
    );

    Alert.alert("Error", "Something went wrong");
  }
};

const handleWhatsApp = () => {

 

  console.log("WhatsApp Property Type:", selectedProperty.property_type);
  console.log("WhatsApp Property ID:",  selectedProperty.id);
  const message = `Hello, I am interested in your property listing.
Property ID: ${selectedProperty.id}
Property Type: ${selectedProperty.property_type}`;

  Linking.openURL(
    `https://wa.me/919761407482?text=${encodeURIComponent(message)}`
  );
};


    useEffect(() => {
        setGetList([]);
        setCurrentPage(1);
        setLastPage(1);

        getList(1);
    }, [searchData]);

    const getList = async (pageNumber = 1) => {
        try {
            if (pageNumber === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const payload = {
                listing_type: searchData?.category,
                min_price: 1000,
                max_price: searchData?.budget ??
                    searchData?.rent?.max ??
                    500000000,
                bhk_type: searchData?.bhk,

                property_sub_type: (
                    searchData?.propertyType || []
                ).map(
                    (item) => item.property_subtype
                ),

                commercial_list_type: (
                    searchData?.commercialType || []
                ).map(
                    (item) => item.property_subtype
                ),
                city:
                    searchData?.location?.city || "",
                state:
                    searchData?.location?.state || "",
                locality:
                    searchData?.location?.locality || "",
            };

            console.log(
                ` POST DATA:`,
                payload
            );

            const res = await axios.post(
                `${API_URL}?page=${pageNumber}`,
                payload
            );

            console.log(
                `RESPONSE:`,
                res?.data
            );

            const newData =
                res?.data?.data || [];

            const meta =
                res?.data?.meta || {};

            // First page
            if (pageNumber === 1) {
                setGetList(newData);
            } else {
                // Next pages append
                setGetList((prev) => [
                    ...prev,
                    ...newData,
                ]);
            }

            // API pagination data
            setCurrentPage(
                Number(meta.current_page) ||
                pageNumber
            );

            setLastPage(
                Number(meta.last_page) || 1
            );
        } catch (error) {
            console.log(
                "Search API Error:",
                error?.response?.data ||
                error?.message
            );
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Load next page
    const loadMore = () => {
        if (
            loading ||
            loadingMore ||
            currentPage >= lastPage
        ) {
            return;
        }

        const nextPage =
            currentPage + 1;

        console.log(
            "Loading next page:",
            nextPage
        );

        getList(nextPage);
    };

  
const cardClick = (selectedItem) => {
  setSelectedProperty(selectedItem);
  navigation.navigate("detail", {
    property: selectedItem,
  });
};
    const formatPrice = (price) => {
        const amount = Number(price);

        if (!amount) {
            return "Price on request";
        }

        if (amount >= 10000000) {
            return `₹${(
                amount / 10000000
            ).toFixed(2)} Cr`;
        }

        if (amount >= 100000) {
            return `₹${(
                amount / 100000
            ).toFixed(2)} Lac`;
        }

        return `₹${amount.toLocaleString(
            "en-IN"
        )}`;
    };

    // Primary media + other media
    const getImages = (item) => {
        const images = [];

        if (
            item?.primary_media?.file_url
        ) {
            images.push(
                `${IMAGE_BASE_URL}${item.primary_media.file_url}`
            );
        }

        if (
            Array.isArray(item?.media)
        ) {
            item.media.forEach(
                (media) => {
                    const fileUrl =
                        media?.file_url ||
                        media?.url ||
                        media?.image_url ||
                        media?.media_url;

                    if (!fileUrl) {
                        return;
                    }

                    const imageUrl =
                        fileUrl.startsWith(
                            "http"
                        )
                            ? fileUrl
                            : `${IMAGE_BASE_URL}${fileUrl}`;

                    if (
                        !images.includes(
                            imageUrl
                        )
                    ) {
                        images.push(
                            imageUrl
                        );
                    }
                }
            );
        }

        return images;
    };

    const renderPropertyCard = ({
        item,
    }) => {
        const images = getImages(item);

        const title =
            item?.title ||
            `${item?.bhk_type || ""} ${item?.property_sub_type ||
            "Property"
            }`;

        const location =
            item?.google_address ||
            `${item?.locality || ""}${item?.property_city
                ? `, ${item.property_city}`
                : ""
            }`;

        return (
            <>
            {/* ================= ENQUIRY POPUP ================= */}

<Modal
  visible={showEnquiry}
  transparent={true}
  animationType="fade"
  onRequestClose={() => setShowEnquiry(false)}
>
  <View style={styles.modalOverlay}>

    <View style={styles.enquiryModal}>

      {/* Header */}
      <View style={styles.modalHeader}>
        <View>
          <Text style={styles.modalTitle}>
            Contact Seller
          </Text>

          <Text style={styles.modalSubtitle}>
            Please enter your details
          </Text>
        </View>

        <Pressable
          style={styles.closeBtn}
          onPress={() => setShowEnquiry(false)}
        >
          <Feather
            name="x"
            size={20}
            color="#18201D"
          />
        </Pressable>
      </View>

      {/* Name */}
      <Text style={styles.inputLabel}>
        Name
      </Text>

      <View style={styles.inputContainer}>
        <Feather
          name="user"
          size={18}
          color="#8A8F89"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#A5AAA5"
          value={formData.name}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              name: text,
            })
          }
        />
      </View>

      {/* Email */}
      <Text style={styles.inputLabel}>
        Email
      </Text>

      <View style={styles.inputContainer}>
        <Feather
          name="mail"
          size={18}
          color="#8A8F89"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#A5AAA5"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              email: text,
            })
          }
        />
      </View>

      {/* Mobile */}
      <Text style={styles.inputLabel}>
        Mobile Number
      </Text>

      <View style={styles.inputContainer}>
        <Feather
          name="phone"
          size={18}
          color="#8A8F89"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          placeholderTextColor="#A5AAA5"
          keyboardType="phone-pad"
          maxLength={10}
          value={formData.phone}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              phone: text.replace(/[^0-9]/g, ''),
            })
          }
        />
      </View>

      {/* Submit */}
      <Pressable
        style={styles.submitBtn}
        onPress={handleCallSubmit}
      >
        <Feather
          name="phone"
          size={18}
          color="#FFF"
        />

        <Text style={styles.submitBtnText}>
          Submit 
        </Text>
      </Pressable>

      {/* Privacy */}
      <Text style={styles.privacyText}>
        Your details are safe and will only be used
        for this property enquiry.
      </Text>

    </View>

  </View>
</Modal>
            <TouchableOpacity
                activeOpacity={0.95}
                style={styles.card}
                onPress={() =>
                    cardClick(item)
                }
            >
                {/* IMAGE SLIDER */}
                <View
                    style={
                        styles.imageContainer
                    }
                >
                    {images.length > 0 ? (
                        <FlatList
                            data={images}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={
                                false
                            }
                            nestedScrollEnabled
                            keyExtractor={(
                                image,
                                index
                            ) =>
                                `${image}-${index}`
                            }
                            renderItem={({   item: image, }) => (
                                <Image
                                    source={{
                                        uri: image,
                                    }}
                                    style={
                                        styles.propertyImage
                                    }
                                    resizeMode="cover"
                                />
                            )}
                        />
                    ) : (
                        <View
                            style={
                                styles.noImage
                            }
                        >
                            <Feather
                                name="image"
                                size={45}
                                color="#aaa"
                            />

                            <Text
                                style={
                                    styles.noImageText
                                }
                            >
                                No Image Available
                            </Text>
                        </View>
                    )}

                    <View
                        style={
                            styles.topBadges
                        }
                    >
                        <View
                            style={
                                styles.premiumBadge
                            }
                        >
                            <Feather
                                name="star"
                                size={12}
                                color="#fff"
                            />

                            <Text
                                style={
                                    styles.premiumText
                                }
                            >
                                PREMIUM
                            </Text>
                        </View>

                        {item?.active ===
                            1 && (
                                <View
                                    style={
                                        styles.activeBadge
                                    }
                                >
                                    <Text
                                        style={
                                            styles.activeText
                                        }
                                    >
                                        Active
                                    </Text>
                                </View>
                            )}
                    </View>

                    {images.length >
                        0 && (
                            <View
                                style={
                                    styles.imageCount
                                }
                            >
                                <Feather
                                    name="camera"
                                    size={12}
                                    color="#fff"
                                />

                                <Text
                                    style={
                                        styles.imageCountText
                                    }
                                >
                                    {images.length}
                                </Text>
                            </View>
                        )}

                    <TouchableOpacity
                        style={
                            styles.heartButton
                        }
                    >
                        <Feather
                            name="heart"
                            size={19}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

                {/* CARD CONTENT */}
                <View
                    style={
                        styles.cardContent
                    }
                >
                    {item?.user_type ===
                        "agent" && (
                            <View
                                style={
                                    styles.verifiedRow
                                }
                            >
                                <View
                                    style={
                                        styles.verifiedBadge
                                    }
                                >
                                    <Feather
                                        name="check"
                                        size={11}
                                        color="#fff"
                                    />
                                </View>

                                <Text
                                    style={
                                        styles.verifiedText
                                    }
                                >
                                    Verified Agent
                                </Text>
                            </View>
                        )}

                    <Text
                        style={styles.title}
                        numberOfLines={2}
                    >
                        {title}
                    </Text>

                    <View
                        style={
                            styles.locationRow
                        }
                    >
                        <Feather
                            name="map-pin"
                            size={15}
                            color="#777"
                        />

                        <Text
                            style={
                                styles.location
                            }
                            numberOfLines={1}
                        >
                            {location}
                        </Text>
                    </View>

                    <View
                        style={
                            styles.detailsRow
                        }
                    >
                        {item?.bhk_type && (
                            <View
                                style={
                                    styles.detailItem
                                }
                            >
                                <Feather
                                    name="home"
                                    size={15}
                                    color="#555"
                                />

                                <Text
                                    style={
                                        styles.detailText
                                    }
                                >
                                    {
                                        item.bhk_type
                                    }
                                </Text>
                            </View>
                        )}

                        {item?.bathrooms && (
                            <View
                                style={
                                    styles.detailItem
                                }
                            >
                                <Feather
                                    name="droplet"
                                    size={15}
                                    color="#555"
                                />

                                <Text
                                    style={
                                        styles.detailText
                                    }
                                >
                                    {
                                        item.bathrooms
                                    }{" "}
                                    Bath
                                </Text>
                            </View>
                        )}

                        {item?.area && (
                            <View
                                style={
                                    styles.detailItem
                                }
                            >
                                <Feather
                                    name="maximize"
                                    size={15}
                                    color="#555"
                                />

                                <Text
                                    style={
                                        styles.detailText
                                    }
                                >
                                    {
                                        item.area
                                    }{" "}
                                    {
                                        item.area_unit
                                    }
                                </Text>
                            </View>
                        )}
                    </View>

                    <View
                        style={styles.divider}
                    />

                    <View
                        style={
                            styles.bottomRow
                        }
                    >
                        <View>
                            <Text
                                style={
                                    styles.price
                                }
                            >
                                {formatPrice(
                                    item?.total_price
                                )}
                            </Text>

                            {item?.price &&
                                item?.price_unit && (
                                    <Text
                                        style={
                                            styles.pricePerSqft
                                        }
                                    >
                                        ₹
                                        {Number(
                                            item.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}{" "}
                                        /{" "}
                                        {
                                            item.price_unit
                                        }
                                    </Text>
                                )}
                        </View>

                        {item?.furnishing && (
                            <View
                                style={
                                    styles.furnishingBadge
                                }
                            >
                                <Text
                                    style={
                                        styles.furnishingText
                                    }
                                >
                                    {
                                        item.furnishing
                                    }
                                </Text>
                            </View>
                        )}
                    </View>

                    <View
                        style={
                            styles.propertyInfoRow
                        }
                    >
                        <Text
                            style={
                                styles.propertyType
                            }
                        >
                            {
                                item?.property_sub_type
                            }
                        </Text>

                        {item?.status && (
                            <Text
                                style={
                                    styles.status
                                }
                            >
                                {item.status}
                            </Text>
                        )}
                    </View>
<View style={styles.actionButtons}>

  {/* Call Button */}
  <Pressable
    style={({ pressed }) => [
      styles.callEnquiryButton,
      pressed && styles.buttonPressed,
    ]}
   onPress={() => {
  setSelectedProperty(item);
  setShowEnquiry(true);
}}
  >
    <Feather
      name="phone"
      size={19}
      color="#FFF"
    />

    <Text style={styles.callEnquiryText}>
      Call
    </Text>
  </Pressable>


  {/* WhatsApp Button */}
  <Pressable
  style={({ pressed }) => [
    styles.whatsappEnquiryButton,
    pressed && styles.buttonPressed,
  ]}
  onPress={() => {
    setSelectedProperty(item);
    handleWhatsApp();
  }}
>
  <Feather
    name="message-circle"
    size={19}
    color="#FFF"
  />

  <Text style={styles.whatsappText}>
    WhatsApp
  </Text>
</Pressable>

</View>

                </View>

             

            </TouchableOpacity>
          
            </>
        );
    };

    return (
        <View
            style={styles.container}
        >
            {/* HEADER */}
            <View
                style={
                    styles.searchFilterContainer
                }
            >
                <TouchableOpacity
                    style={
                        styles.backButton
                    }
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color="#000"
                    />
                </TouchableOpacity>

               

                <TouchableOpacity
                    style={
                        styles.filterBtn
                    }
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Feather
                        name="filter"
                        size={20}
                        color="#5a2bd0"
                    />

                    <Text
                        style={
                            styles.filterText
                        }
                    >
                        Filters
                    </Text>
                </TouchableOpacity>
            </View>

        
            {/* RESULT */}
            <View
                style={
                    styles.resultHeader
                }
            >
                <Text
                    style={
                        styles.resultCount
                    }
                >
                    {GetList.length} Properties
                </Text>

                <Text
                    style={
                        styles.sortText
                    }
                >
                    Page {currentPage} of{" "}
                    {lastPage}
                </Text>
            </View>

            {/* LIST */}
            {loading ? (
                <View
                    style={
                        styles.loader
                    }
                >
                    <ActivityIndicator
                        size="large"
                        color="#5a2bd0"
                    />

                    <Text
                        style={
                            styles.loadingText
                        }
                    >
                        Finding properties...
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={GetList}
                    keyExtractor={(item) =>
                        String(item.id)
                    }
                    renderItem={
                        renderPropertyCard
                    }
                    showsVerticalScrollIndicator={
                        false
                    }
                    contentContainerStyle={
                        styles.listContent
                    }
                    onEndReached={
                        loadMore
                    }
                    onEndReachedThreshold={
                        0.5
                    }
                    ListFooterComponent={
                        loadingMore ? (
                            <View
                                style={
                                    styles.footerLoader
                                }
                            >
                                <ActivityIndicator
                                    size="small"
                                    color="#5a2bd0"
                                />

                                <Text
                                    style={
                                        styles.loadingMoreText
                                    }
                                >
                                    Loading more...
                                </Text>
                            </View>
                        ) : null
                    }
                    ListEmptyComponent={
                        <View
                            style={
                                styles.emptyContainer
                            }
                        >
                            <Feather
                                name="home"
                                size={50}
                                color="#bbb"
                            />

                            <Text
                                style={
                                    styles.emptyTitle
                                }
                            >
                                No Properties Found
                            </Text>

                            <Text
                                style={
                                    styles.emptyText
                                }
                            >
                                Try changing your search
                                filters.
                            </Text>
                        </View>
                    }
                />
            )}


        </View>
    );
};

export default FilterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f9",
        paddingTop: 30,
    },

    searchFilterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        marginHorizontal: 12,
        marginBottom: 10,
        borderBottomWidth:1,
        paddingBottom:4
        // borderBottomColor:1px solid red,
    },

    backButton: {
        width: 40,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
    },

    searchInput: {
        flex: 1,
        height: 42,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginRight: 8,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#eee",
    },

    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0eaff",
        paddingHorizontal: 12,
        height: 42,
        borderRadius: 10,
    },

    filterText: {
        marginLeft: 5,
        color: "#5a2bd0",
        fontWeight: "700",
    },

    tabsContainer: {
        flexGrow: 0,
        paddingHorizontal: 12,
        marginBottom: 5,
    },

    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },

    activeTab: {
        backgroundColor: "#5a2bd0",
        borderColor: "#5a2bd0",
    },

    tabText: {
        fontSize: 13,
        color: "#555",
        fontWeight: "500",
    },

    activeTabText: {
        color: "#fff",
        fontWeight: "700",
    },

    resultHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
    },

    resultCount: {
        fontSize: 15,
        fontWeight: "700",
        color: "#222",
    },

    sortText: {
        fontSize: 13,
        color: "#777",
    },

    listContent: {
        paddingBottom: 30,
    },

    card: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginBottom: 16,
        borderRadius: 16,
        overflow: "hidden",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },

    imageContainer: {
        height: 210,
        width: "100%",
        position: "relative",
        backgroundColor: "#eee",
    },

    propertyImage: {
        width: width - 24,
        height: 210,
    },

    noImage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
    },

    noImageText: {
        marginTop: 5,
        color: "#999",
        fontSize: 13,
    },

    topBadges: {
        position: "absolute",
        top: 12,
        left: 12,
        right: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    premiumBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#5a2bd0",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 7,
    },

    premiumText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "800",
        marginLeft: 4,
    },

    activeBadge: {
        backgroundColor: "#fff",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 7,
    },

    activeText: {
        color: "#16833b",
        fontSize: 11,
        fontWeight: "700",
    },

    imageCount: {
        position: "absolute",
        bottom: 12,
        left: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.55)",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 7,
    },

    imageCountText: {
        color: "#fff",
        marginLeft: 4,
        fontSize: 11,
        fontWeight: "600",
    },

    heartButton: {
        position: "absolute",
        right: 12,
        bottom: 12,
        width: 38,
        height: 38,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.45)",
        alignItems: "center",
        justifyContent: "center",
    },

    cardContent: {
        padding: 14,
    },

    verifiedRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },

    verifiedBadge: {
        width: 17,
        height: 17,
        borderRadius: 9,
        backgroundColor: "#16833b",
        alignItems: "center",
        justifyContent: "center",
    },

    verifiedText: {
        color: "#16833b",
        fontSize: 11,
        fontWeight: "700",
        marginLeft: 5,
    },

    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#171717",
        marginTop: 2,
        lineHeight: 23,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
    },

    location: {
        flex: 1,
        fontSize: 13,
        color: "#666",
        marginLeft: 5,
    },

    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 12,
    },

    detailItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
        marginBottom: 5,
    },

    detailText: {
        fontSize: 12,
        color: "#555",
        marginLeft: 5,
        fontWeight: "500",
    },

    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 11,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    price: {
        fontSize: 20,
        fontWeight: "900",
        color: "#171717",
    },

    pricePerSqft: {
        fontSize: 11,
        color: "#888",
        marginTop: 2,
    },

    furnishingBadge: {
        backgroundColor: "#f3efff",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 7,
    },

    furnishingText: {
        color: "#5a2bd0",
        fontSize: 10,
        fontWeight: "700",
    },

    propertyInfoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    propertyType: {
        fontSize: 12,
        color: "#555",
        fontWeight: "600",
        textTransform: "capitalize",
    },

    status: {
        fontSize: 11,
        color: "#16833b",
        fontWeight: "700",
        textTransform: "capitalize",
    },

    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    loadingText: {
        marginTop: 10,
        color: "#777",
        fontSize: 14,
    },

    footerLoader: {
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    loadingMoreText: {
        marginLeft: 8,
        color: "#777",
        fontSize: 13,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 80,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
        marginTop: 12,
    },

    emptyText: {
        fontSize: 13,
        color: "#888",
        marginTop: 5,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },

    modalContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#222",
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "700",
        marginVertical: 10,
        color: "#333",
    },

    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    priceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 9,
        fontSize: 14,
        backgroundColor: "#f9f9f9",
    },

    optionsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
    },

    optionButton: {
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 14,
        marginRight: 8,
        marginBottom: 8,
    },

    optionText: {
        color: "#333",
    },

    optionSelected: {
        backgroundColor: "#5a2bd0",
        borderColor: "#5a2bd0",
    },

    optionSelectedText: {
        color: "#fff",
        fontWeight: "700",
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    actionButton: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },

    actionText: {
        fontSize: 15,
        fontWeight: "700",
    },
    modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.55)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
},

enquiryModal: {
  width: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: 18,
  padding: 22,
  elevation: 12,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.2,
  shadowRadius: 12,
},

modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 10,
},

modalTitle: {
  fontSize: 23,
  fontWeight: '700',
  color: '#18201D',
},

modalSubtitle: {
  fontSize: 13,
  color: '#8A8F89',
  marginTop: 4,
},

closeBtn: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: '#F3F4F1',
  alignItems: 'center',
  justifyContent: 'center',
},

inputLabel: {
  fontSize: 13,
  fontWeight: '600',
  color: '#18201D',
  marginTop: 14,
  marginBottom: 7,
},

inputContainer: {
  height: 50,
  borderWidth: 1,
  borderColor: '#E1E3DE',
  borderRadius: 9,
  backgroundColor: '#FAFAF8',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 13,
},

input: {
  flex: 1,
  height: 50,
  marginLeft: 10,
  color: '#18201D',
  fontSize: 14,
},

submitBtn: {
  height: 35,
  borderRadius: 9,
  backgroundColor: '#955c06ff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 9,
  marginTop: 24,
},

submitBtnText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '700',
},

privacyText: {
  textAlign: 'center',
  color: '#9A9B91',
  fontSize: 11,
  lineHeight: 17,
  marginTop: 12,
},
actionButtons: {
  flexDirection: 'row',
  paddingHorizontal: 20,
  marginTop: 10,
  gap: 12,
  borderTopWidth: 1,
  borderTopColor: '#E1E3DE',
  paddingTop: 10,
},

callEnquiryButton: {
  flex: 1,
  height: 35,
  borderRadius: 10,
  backgroundColor: '#955c06ff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 9,

  elevation: 3,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.12,
  shadowRadius: 4,
},

callEnquiryText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '700',
},

whatsappEnquiryButton: {
  flex: 1,
  height: 35,
  borderRadius: 10,
  backgroundColor: '#25D366',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 9,

  elevation: 3,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.12,
  shadowRadius: 4,
},

whatsappText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '700',
},

buttonPressed: {
  opacity: 0.75,
  transform: [{ scale: 0.98 }],
},
});