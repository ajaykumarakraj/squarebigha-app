import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';


const HomeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedProperty, setSelectedProperty] = useState(null);
const [showEnquiry, setShowEnquiry] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
});
  const [saved, setSaved] = useState(false);
  // const [showNumber, setShowNumber] = useState(false);

  const { property: routeProperty, userdata } = route.params || {};
  const property = routeProperty || userdata;


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






  if (!property || typeof property !== 'object') {
    return (
      <View style={styles.emptyState}>
        <Feather name="home" size={32} color="#B9945A" />

        <Text style={styles.emptyTitle}>
          Property unavailable
        </Text>

        <Text style={styles.emptyText}>
          We could not find the details for this listing.
        </Text>
      </View>
    );
  }

  console.log('reshome', property);

  // ------------------------------------
  // BASIC DATA
  // ------------------------------------

  const title =
    property.title ||
    property.apartment_society ||
    property.property_sub_type ||
    'Property';

  const location = [
    property.locality,
    property.property_city,
  ]
    .filter(Boolean)
    .join(', ') || 'Location not available';

  const imageUri = property?.primary_media?.file_url || null;

  // ------------------------------------
  // PRICE
  // ------------------------------------

  const formatPrice = (value) => {
    const number = Number(value);

    if (!number || isNaN(number)) {
      return 'Price on request';
    }

    if (number >= 10000000) {
      return `₹ ${(number / 10000000).toFixed(2)} Cr`;
    }

    if (number >= 100000) {
      return `₹ ${(number / 100000).toFixed(2)} Lac`;
    }

    return `₹ ${number.toLocaleString('en-IN')}`;
  };

  const totalPrice = Number(property.total_price);

  const displayPrice =
    totalPrice > 0
      ? formatPrice(totalPrice)
      : property.price
        ? `₹ ${property.price}`
        : 'Price on request';

  // ------------------------------------
  // HIGHLIGHTS FROM API DATA
  // ------------------------------------

  const highlights = [
    property.bedrooms
      ? `${property.bedrooms} Bedroom`
      : null,

    property.bathrooms
      ? `${property.bathrooms} Bathroom`
      : null,

    property.area
      ? `${property.area} ${property.area_unit || ''}`
      : null,

    property.furnishing
      ? property.furnishing
      : null,

    property.status
      ? property.status
      : null,

    property.ownership
      ? property.ownership
      : null,

    property.balcony && property.balcony !== 'N/A'
      ? `${property.balcony} Balcony`
      : null,

    property.other_room
      ? property.other_room
      : null,

    property.property_age
      ? property.property_age
      : null,
  ].filter(Boolean);

  // ------------------------------------
  // DESCRIPTION
  // ------------------------------------

  const description =
    property.description ||
    `This beautiful ${title} is located in ${
      property.locality || property.property_city || 'a convenient location'
    }. It offers comfortable living space and modern facilities.`;

 

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >


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


      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* --------------------------------
            HERO IMAGE
        -------------------------------- */}

        <View style={styles.hero}>

          {imageUri ? (
            <Image
              source={{
                uri: `https://api.squarebigha.com/${imageUri}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.image,
                styles.imageFallback,
              ]}
            >
              <Feather
                name="image"
                size={36}
                color="#B9945A"
              />
            </View>
          )}

          <View style={styles.heroShade} />

          {/* TOP ACTIONS */}

          <View style={styles.heroActions}>

            <Pressable
              accessibilityLabel="Go back"
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
            >
              <Feather
                name="arrow-left"
                size={21}
                color="#18201D"
              />
            </Pressable>

            <Pressable
              accessibilityLabel={
                saved
                  ? 'Remove from saved'
                  : 'Save property'
              }
              style={styles.iconButton}
              onPress={() => setSaved(!saved)}
            >
              <Feather
                name="heart"
                size={20}
                color={
                  saved
                    ? '#B45E55'
                    : '#18201D'
                }
                fill={
                  saved
                    ? '#B45E55'
                    : 'none'
                }
              />
            </Pressable>

          </View>

          {/* IMAGE INFO */}

          <View style={styles.heroLabel}>

            <Text style={styles.heroEyebrow}>
              SQUARE BIGHA / PROPERTY
            </Text>

            <View style={styles.heroBadge}>

              <Feather
                name="camera"
                size={12}
                color="#FFF"
              />

              <Text style={styles.heroBadgeText}>
                1 PHOTO
              </Text>

            </View>

          </View>

        </View>

        {/* --------------------------------
            PROPERTY INTRO
        -------------------------------- */}

        <View style={styles.intro}>

          <View style={styles.tagRow}>

            {property.status === 'ready to move' && (
              <View style={styles.verifiedTag}>

                <Feather
                  name="check-circle"
                  size={13}
                  color="#3F6C5B"
                />

                <Text style={styles.verifiedText}>
                  READY TO MOVE
                </Text>

              </View>
            )}

            {property.listing_type && (
              <Text style={styles.sponsoredTag}>
                {property.listing_type.toUpperCase()}
              </Text>
            )}

          </View>

          <Text style={styles.title}>
            {title}
          </Text>

          <View style={styles.locationRow}>

            <Feather
              name="map-pin"
              size={16}
              color="#B45E55"
            />

            <Text style={styles.location}>
              {location}
            </Text>

          </View>

          {/* PROPERTY TYPE */}

          <View style={styles.propertyTypeRow}>

            <Text style={styles.propertyType}>
              {property.property_sub_type || 'Property'}
            </Text>

            {property.bhk_type && (
              <Text style={styles.propertyType}>
                {property.bhk_type}
              </Text>
            )}

          </View>

          {/* PRICE */}

          <View style={styles.priceRow}>

            <Text style={styles.price}>
              {displayPrice}
            </Text>

            <Text style={styles.priceNote}>
              ASKING PRICE
            </Text>

          </View>

        </View>

        <View style={styles.divider} />

        {/* --------------------------------
            STATS
        -------------------------------- */}

        <View style={styles.statsRow}>

          {property.area && (
            <View style={styles.stat}>

              <Feather
                name="maximize-2"
                size={18}
                color="#B9945A"
              />

              <Text style={styles.statValue}>
                {property.area} {property.area_unit}
              </Text>

              <Text style={styles.statLabel}>
                AREA
              </Text>

            </View>
          )}

          {property.bedrooms && (
            <View style={styles.stat}>

              <Feather
                name="grid"
                size={18}
                color="#B9945A"
              />

              <Text style={styles.statValue}>
                {property.bedrooms} BHK
              </Text>

              <Text style={styles.statLabel}>
                BEDROOMS
              </Text>

            </View>
          )}

          {property.bathrooms && (
            <View style={styles.stat}>

              <Feather
                name="droplet"
                size={18}
                color="#B9945A"
              />

              <Text style={styles.statValue}>
                {property.bathrooms}
              </Text>

              <Text style={styles.statLabel}>
                BATHROOMS
              </Text>

            </View>
          )}

        </View>

        {/* --------------------------------
            PROPERTY DETAILS
        -------------------------------- */}

        <View style={styles.section}>

          <Text style={styles.sectionKicker}>
            THE DETAILS
          </Text>

          <Text style={styles.sectionTitle}>
            Property Highlights
          </Text>

          <View style={styles.chipRow}>

            {highlights.map((point, index) => (

              <View
                key={`${point}-${index}`}
                style={styles.chip}
              >

                <Feather
                  name="check"
                  size={13}
                  color="#3F6C5B"
                />

                <Text style={styles.chipText}>
                  {point}
                </Text>

              </View>

            ))}

          </View>

        </View>

        {/* --------------------------------
            ABOUT PROPERTY
        -------------------------------- */}

        <View style={styles.section}>

          <Text style={styles.sectionKicker}>
            ABOUT THIS HOME
          </Text>

          <Text style={styles.sectionTitle}>
            A considered place to call home
          </Text>

          <Text style={styles.descriptionText}>
            {description}
          </Text>

        </View>

        {/* --------------------------------
            ADDITIONAL INFORMATION
        -------------------------------- */}

        <View style={styles.section}>

          <Text style={styles.sectionKicker}>
            PROPERTY INFORMATION
          </Text>

          <View style={styles.infoBox}>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Property Type
              </Text>

              <Text style={styles.infoValue}>
                {property.property_type || '-'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Property Sub Type
              </Text>

              <Text style={styles.infoValue}>
                {property.property_sub_type || '-'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Furnishing
              </Text>

              <Text style={styles.infoValue}>
                {property.furnishing || '-'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Ownership
              </Text>

              <Text style={styles.infoValue}>
                {property.ownership || '-'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Property Age
              </Text>

              <Text style={styles.infoValue}>
                {property.property_age || '-'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Status
              </Text>

              <Text style={styles.infoValue}>
                {property.status || '-'}
              </Text>
            </View>

          </View>

        </View>

        <View style={styles.bottomSpace} />

      </ScrollView>

      {/* --------------------------------
          CONTACT BAR
      -------------------------------- */}

      <View style={styles.contactBar}>
   {/* Call Button */}
         <Pressable
           style={({ pressed }) => [
             styles.callEnquiryButton,
             pressed && styles.buttonPressed,
           ]}
          onPress={() => {
         setSelectedProperty(property);
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
           setSelectedProperty(property);
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

    </SafeAreaView>
  );
};

export default HomeDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F5F0',
  },

  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F7F5F0',
  },

  content: {
    width: '100%',
    paddingBottom: 16,
  },

  hero: {
    width: '100%',
    height: 230,
    position: 'relative',
    backgroundColor: '#E7E1D6',
  },

  image: {
    width: '100%',
    height: 230,
  },

  imageFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 28, 25, 0.16)',
  },

  heroActions: {
    position: 'absolute',
    top: 16,
    left: 18,
    right: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroLabel: {
    position: 'absolute',
    bottom: 18,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heroEyebrow: {
    color: '#FFF',
    fontSize: 10,
    letterSpacing: 1.4,
    fontWeight: '700',
    flexShrink: 1,
  },

  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 3,
    backgroundColor: 'rgba(24, 32, 29, 0.72)',
  },

  heroBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },

  intro: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },

  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  verifiedText: {
    color: '#3F6C5B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  sponsoredTag: {
    color: '#B45E55',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  title: {
    flexShrink: 1,
    fontSize: 20,
    lineHeight: 36,
    color: '#18201D',
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    gap: 6,
  },

  location: {
    flex: 1,
    fontSize: 14,
    color: '#68736D',
    lineHeight: 20,
    textTransform: 'capitalize',
  },

  propertyTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },

  propertyType: {
    fontSize: 12,
    color: '#3F6C5B',
    backgroundColor: '#E8F0EA',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    textTransform: 'capitalize',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 18,
  },
  price: {
    flex: 1,
    flexShrink: 1,
    fontSize: 18,
    color: '#18201D',
    fontWeight: '700',
  },

  priceNote: {
    color: '#9A9B91',
    fontSize: 9,
    letterSpacing: 1.2,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#E3DFD6',
    marginHorizontal: 20,
    marginTop: 22,
  },

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  stat: {
    flex: 1,
    minWidth: 0,
    borderRightWidth: 1,
    borderRightColor: '#E3DFD6',
    minHeight: 52,
    marginRight: 16,
  },

  statValue: {
    color: '#18201D',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 7,
    flexShrink: 1,
  },

  statLabel: {
    color: '#9A9B91',
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 4,
    fontWeight: '700',
  },

  section: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  sectionKicker: {
    color: '#B45E55',
    fontSize: 10,
    letterSpacing: 1.6,
    fontWeight: '800',
  },

  sectionTitle: {
    color: '#18201D',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 7,
    marginBottom: 15,
    flexShrink: 1,
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },

  chip: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#E8F0EA',
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 4,
  },

  chipText: {
    flexShrink: 1,
    color: '#3F6C5B',
    fontSize: 12,
    fontWeight: '600',
  },

  descriptionText: {
    fontSize: 15,
    color: '#68736D',
    lineHeight: 24,
    flexShrink: 1,
  },

  infoBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E3DFD6',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEAE2',
  },

  infoLabel: {
    color: '#8A8F89',
    fontSize: 13,
    flex: 1,
  },

  infoValue: {
    color: '#18201D',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    textTransform: 'capitalize',
  },

  contactBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E3DFD6',
    marginBottom: 30,
  },

  numberButton: {
    flex: 1,
    height: 52,
    borderRadius: 5,
    backgroundColor: '#3F6C5B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  numberText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },

  callButton: {
    width: 52,
    height: 52,
    borderRadius: 5,
    backgroundColor: '#E8F0EA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatButton: {
    width: 52,
    height: 52,
    borderRadius: 5,
    backgroundColor: '#B45E55',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomSpace: {
    height: 18,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F5F0',
    padding: 30,
  },

  emptyTitle: {
    color: '#18201D',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 14,
  },

  emptyText: {
    color: '#68736D',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 7,
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
  paddingTop: 20,
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