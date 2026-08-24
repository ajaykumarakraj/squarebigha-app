import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
const tabname = [
  {
    label: "Buy",
    icon: "home-outline",
    category: "sale",
  },
  {
    label: "Rent",
    icon: "cash-outline",
    category: "rent",
  },
  {
    label: "Commercial",
    icon: "business-outline",
    category: "commercial",
  },
  {
    label: "Plots",
    icon: "layers-outline",
    category: "plot",
  },
  {
    label: "Project",
    icon: "construct-outline",
    category: "project",
  },
];


const HomeScreen = () => {
  const navigation = useNavigation()

  const [HotSelling, setHotSelling] = useState([])
  const [Newly, setNewly] = useState([])
  const [Highdemand, setHighdemand] = useState([])
  const [Recommended, setRecommended] = useState([])

 const formatPrice = (amount) => {
    if (!amount) return "0";

    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(2) + " Cr";
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(2) + " Lakh";
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(2) + " K";
    }
    return amount;
  };
// get data on home page 
useEffect(()=>{
  gethomeData()
},[])

const gethomeData= async()=>{
  try{
   
    const res=await axios.get("https://api.squarebigha.com/api/get-home-property-list/buy")
    if(res.data.success==true){
       setHotSelling(res.data.data.hot_selling.data)
        setNewly(res.data.data.newly_launched.data)
        setHighdemand(res.data.data.high_demand.data)
        setRecommended(res.data.data.recommended.data)
      console.log("Home data fetched successfully");
    }
    console.log("Home data:", res.data);
  }
  catch(error){
    console.error("Error fetching home data:", error);
  }
}
const HotClick = (id, property) => {
  console.log("id", id, property);

  navigation.navigate("detail", {
    id: id,
    property: property,
  });
};
const handleTabPress = (item) => {
  console.log("Selected:", item);

  navigation.navigate("search", {
    category: item.category,
    filters: {},
  });
};
  // const handleTabPress = (item) => {
  //   // Navigate based on tab label, or use another identifier
  //   console.log(item,"tab select")
  //   navigation.navigate("search",item.category);
  // };

  console.log("HotSelling:", HotSelling);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greet}> Hi there! Searching in</Text>
            <Text style={styles.location}>Noida ▼</Text>
          </View>
          <TouchableOpacity style={styles.postBtn}>
            <Text style={styles.postBtnText}>+ Post Property</Text>
          </TouchableOpacity>

        </View>


        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categories}>
        {tabname.map((item, index) => (
  <TouchableOpacity
    key={index}
    onPress={() => handleTabPress(item)}
    style={[styles.catBtn, index === 0 && styles.activeCat]}
  >
    <Ionicons
      name={item.icon}
     
       size={18} color={index === 0 ? "#fff" : "#444"}
    />

    <Text  style={[styles.catText, index === 0 && styles.activeCatText]}>{item.label}</Text>
  </TouchableOpacity>
))}
          </View>
        </ScrollView>
        {/* Search Bar */}
       <TouchableOpacity
  onPress={() => handleTabPress("sale")}
  activeOpacity={0.8}
>
  <View style={styles.searchBar}>
    <TextInput
      placeholder="Search locality, landmark, project ..."
      style={{ flex: 1 }}
      editable={false}
      pointerEvents="none"
    />

    <Ionicons
      name="search"
      size={24}
      color="#fff"
      style={styles.searchIcon}
    />
  </View>
</TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={true}>
          {/* Banner */}
          <View style={styles.banner}>
            <Text style={{ color: "#fff", fontSize: 14 }}>
              Are you a Property Owner? <Text style={{ fontWeight: "bold" }}>Sell / Rent for FREE</Text>
            </Text>
          </View>

          {/* Popular Localities */}
          <Text style={styles.sectionTitle}>Hot Selling Real Estate Projects in India</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {HotSelling.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => HotClick(item.id, item)}
    >
      <Image
        source={{
          uri: `https://api.squarebigha.com/${item?.primary_media?.file_url}`,
        }}
        style={styles.cardImg}
      />

      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.apartment_society}, {item.locality}, {item.property_city}
      </Text>

      <Text style={styles.cardSub}>
        {item.rating} ⭐ | ₹{formatPrice(Number(item.price) * Number(item.area))}
      </Text>

      <Text
        style={styles.cardSub}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.description}
      </Text>

      <Text style={styles.cardLink}>
        Know more →
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>
        </ScrollView>

        <View style={styles.postsec}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Are You a Property Owner?</Text>
            <Text style={styles.subHeading}>Looking to Rent / Sell</Text>

            <View style={styles.features}>
              <Text style={styles.feature}>• Zero Brokerage</Text>
              <Text style={styles.feature}>• Genuine, Verified Leads</Text>
              <Text style={styles.feature}>• On-Demand Assistance</Text>
              <TouchableOpacity style={styles.postBtns}>
                <Text style={styles.postBtnText}>Post Property Free</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={{ uri: "https://i.postimg.cc/6p1BbPq5/12469795-Wavy-REst-03-Single-10-1.jpg" }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>


        <ScrollView showsVerticalScrollIndicator={true}>


          {/* Popular Localities */}
          <Text style={styles.sectionTitle}>High-demand projects to invest now</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Highdemand.map((item, index) => (
              <View key={index} style={styles.cardh}>
                <Image source={{ uri: `https://api.squarebigha.com/${item?.primary_media?.file_url}` }} style={styles.cardImgh} />
                <View style={styles.textsec}>
                  <Text style={styles.cardTitleh} numberOfLines={1}>{item.apartment_society},{item.locality},{item.property_city}</Text>
                  <Text style={styles.cardSubh}>{item.rating}  ₹{formatPrice(Number(item.price) * Number(item.area))}</Text>
                  <Text style={styles.cardSubh} numberOfLines={1} ellipsizeMode="tail">{item.description}</Text>
                  <Text style={styles.cardLinkh}>Know more →</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>



        <ScrollView showsVerticalScrollIndicator={true}>


          {/* Popular Localities */}
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Recommended.map((item, index) => (
              <View key={index} style={styles.cardR}>
                <View style={styles.box}>
                  <View>
                    <Image source={{ uri: `https://api.squarebigha.com/${item?.primary_media?.file_url}` }} style={styles.cardImgR} />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>{item.locality},{item.property_city}</Text>
                    <Text style={styles.cardSub}>{item.rating}  {formatPrice(Number(item.price) * Number(item.area))}</Text>
                 <Text style={styles.cardSub}>
  {item.description?.split(" ").slice(0, 4).join(" ")}
</Text>
                    <Text style={styles.cardLink}>Know more →</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={true}>


          {/* Popular Localities */}
          <Text style={styles.sectionTitle}>Newly Launched Projects</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Newly.map((item, index) => (
              <View key={index} style={styles.card} onClick={() => HotClick(item.id, item.property_type)}>
                <Image source={{ uri: `https://api.squarebigha.com/${item?.primary_media?.file_url}` }} style={styles.cardImg} />
                <Text style={styles.cardTitle} numberOfLines={1}>{item.apartment_society},{item.locality},{item.property_city}</Text>
                <Text style={styles.cardSub}>{item.rating}  {formatPrice(Number(item.price) * Number(item.area))}</Text>
                <Text style={styles.cardSub} numberOfLines={1} ellipsizeMode="tail">{item.description}</Text>
                <Text style={styles.cardLink}>Know more →</Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>



      </View>
    </ScrollView>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 100,
    paddingBottom: 10

  },
  header: {
    backgroundColor: "#955c06ff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50
  },
  greet: {
    fontSize: 15,
    color: "#eee"
  },
  location: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  postBtnText:
    { color: "#fff", fontSize: 12, fontWeight: "bold" },
  postBtn: {
    backgroundColor: "#28a745",
    alignSelf: "flex-end",
    margin: 10,
    padding: 8,
    borderRadius: 6
  },
  postBtns: {
    backgroundColor: "#28a745",
    alignSelf: "flex-start",
    margin: 10,
    padding: 8,
    borderRadius: 6
  },
  categories: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10, padding: 10, gap: 6 },
  catBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    marginTop: 10
  },
  catText: { marginLeft: 5, color: "#444" },
  activeCat: { backgroundColor: "#955c06ff" },
  activeCatText: { color: "#fff" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10
  },
  searchIcon: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 8,
    position: "relative",
    left: 8
  },
  banner: {
    backgroundColor: "#955c06ff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", margin: 15 },
  card: {
    width: 160,
    backgroundColor: "#fff",
    marginLeft: 15,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: "#dededeff",
    borderWidth: 1,
    elevation: 3
  },
  cardR: {
    // width: 160,
    backgroundColor: "#fff",
    marginLeft: 15,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: "#dededeff",
    borderWidth: 1,
    elevation: 3
  },
  cardh: {
    height: 270,
    width: 253,
    backgroundColor: "#fff",
    marginLeft: 15,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: "#dededeff",
    borderWidth: 1,
    elevation: 3
  },
  cardImg: { width: "100%", height: 100, borderRadius: 8 },
  cardImgR: { width: 100, height: 100, borderRadius: 8 },
  cardTitle: { fontSize: 14,  marginTop: 8 },
  cardSub: { fontSize: 12, color: "gray" },
  cardLink: { fontSize: 12, color: "#955c06ff", marginTop: 4 },



  // cardImgh: { width: "100%", height: 100, borderRadius: 8 },
  cardImgh: { width: 230, height: 250, borderRadius: 8 },
  cardTitleh: { fontSize: 17, fontWeight: "bold", marginTop: 8, color: "#fff" },
  cardSubh: { fontSize: 14, color: "#fff" },
  cardLinkh: { fontSize: 14, color: "#fefefeff", marginTop: 4 },
  box: {
    flexDirection: "row",
    gap: 8
  },
  postsec: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#cd0000ff',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginBottom: 10,
  },
  features: {
    marginTop: 5,
  },
  feature: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  image: {
    position: "absolute",
    width: 150,
    height: "100%",
    borderRadius: 12,
    objectFit: "cover",
    right: 0
  },
  textsec: {
    paddingLeft: 10,
    paddingRight: 10,
    position: "relative",
    backgroundColor: "#00000095",
    bottom: 95,
    borderRadius: 5
  }
})

