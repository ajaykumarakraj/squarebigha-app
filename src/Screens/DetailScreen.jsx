// PropertyDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const property = route.params?.userdata;
    console.log(property)
    if (!property) {
        return (
            <View style={styles.center}>
                <Text>No property data found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>

            {/* Image */}
            <Image source={{ uri: property.image }} style={styles.image} />

            {/* Title */}
            <Text style={styles.title}>{property.title}</Text>

            {/* Location */}
            <Text style={styles.location}>{property.location}</Text>

            {/* Price */}
            <Text style={styles.price}>{property.price}</Text>

            {/* Details */}
            <View style={styles.detailsRow}>
                {property.area && <Text style={styles.detailItem}>{property.area}</Text>}
                {property.semiFurnished && <Text style={styles.detailItem}>Semi Furnished</Text>}
                {property.verified && <Text style={styles.verified}>✔ Verified</Text>}
                {property.sponsored && <Text style={styles.sponsored}>Sponsored</Text>}
            </View>

            {/* Highlights */}
            {property.highlights && (
                <View style={styles.highlights}>
                    <Text style={styles.sectionTitle}>Highlights:</Text>
                    {property.highlights.map((point, index) => (
                        <Text key={index} style={styles.highlightText}>• {point}</Text>
                    ))}
                </View>
            )}

            {/* Description */}
            <View style={styles.description}>
                <Text style={styles.sectionTitle}>Description:</Text>
                <Text style={styles.descriptionText}>
                    This is a beautiful {property.title} located in {property.location}.
                    It offers modern amenities, ample space, and comfort for families.
                </Text>
            </View>

            {/* Contact Buttons */}
            <View style={styles.contactButtons}>
                <View style={styles.buttonWrapper}>
                    <Button title="View Number" onPress={() => { }} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="WhatsApp" color="#25D366" onPress={() => { }} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Call" color="#3498db" onPress={() => { }} />
                </View>
            </View>
        </ScrollView>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        marginTop: 20,
        marginLeft: 15,
    },
    image: {
        width: '100%',
        height: 250,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginTop: 15,
    },
    location: {
        fontSize: 16,
        color: '#777',
        marginHorizontal: 15,
        marginBottom: 5,
    },
    price: {
        fontSize: 20,
        color: '#5a2bd0',
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginVertical: 5,
    },
    detailsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 15,
        marginVertical: 10,
    },
    detailItem: {
        marginRight: 10,
        color: '#555',
        fontSize: 14,
    },
    verified: {
        color: 'green',
        marginRight: 10,
    },
    sponsored: {
        color: '#f39c12',
        fontWeight: 'bold',
    },
    highlights: {
        marginHorizontal: 15,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    highlightText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 3,
    },
    description: {
        marginHorizontal: 15,
        marginTop: 15,
    },
    descriptionText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    contactButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
