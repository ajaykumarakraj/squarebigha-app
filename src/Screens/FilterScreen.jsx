import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Button
} from 'react-native';
import { Modal } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const sliderImages = [
    'https://i.postimg.cc/HsMmfHWq/download-1.jpg',
    'https://i.postimg.cc/3x3QzSGq/mountain.jpg',
    'https://i.postimg.cc/HsMmfHWq/download-1.jpg',
];
const listings = [
    {
        id: '1',
        title: '3 BHK Apartment',
        semiFurnished: true,
        area: '1675 sq.ft',
        location: 'ATS Pious Hideaways, Sector 150, Noida',
        price: '₹35,000/ Month',
        image: 'https://i.postimg.cc/HsMmfHWq/download-1.jpg',
        sponsored: true,
    },
    {
        id: '2',
        title: '3 BHK Flat',
        semiFurnished: true,
        area: '1425 sq.ft',
        location: 'ATS Pious Hideaways, Sector 150, Noida',
        price: '₹26,000/ Month',
        image: 'https://i.postimg.cc/HsMmfHWq/download-1.jpg',
        verified: true,
        highlights: ['24x7 Security', 'Children Play Area', 'Gated Community', 'Lift'],
    },
    {
        id: '3',
        title: '3 BHK Flat',
        semiFurnished: true,
        area: '1425 sq.ft',
        location: 'ATS Pious Hideaways, Sector 150, Noida',
        price: '₹26,000/ Month',
        image: 'https://i.postimg.cc/HsMmfHWq/download-1.jpg',
        verified: true,
        highlights: ['24x7 Security', 'Children Play Area', 'Gated Community', 'Lift'],
    },
];

const tabs = ['All', 'Owner Properties', 'Housing Verified', 'Apartment'];

const FilterScreen = ({ item }) => {
    const navigation = useNavigation();
    const [filterVisible, setFilterVisible] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedBHK, setSelectedBHK] = useState(null);
    const [furnishing, setFurnishing] = useState(null);


    const [selectedTab, setSelectedTab] = useState('All');
    const cardClick = (selectedItem) => {
        console.log("hjfhdfhhdcs")
        navigation.navigate("detail", { userdata: selectedItem })
    }
    return (
        <View style={styles.container}>

            {/* 🔍 Search and Filters */}
            <View style={styles.searchFilterContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />

                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Sector 150"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
                    <Feather name="filter" size={20} color="#5a2bd0" />
                    <Text style={styles.filterText}>Filters</Text>
                </TouchableOpacity>

            </View>

            {/* 🧭 Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tab, selectedTab === tab && styles.activeTab]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* 📋 Listings */}
            <FlatList
                data={listings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => cardClick(item)}>
                        <View style={styles.card} >
                            <View style={styles.sliderContainer}>
                                <FlatList
                                    data={sliderImages}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    pagingEnabled
                                    renderItem={({ item }) => (
                                        <Image source={{ uri: item }} style={styles.sliderImage} />
                                    )}
                                />
                            </View>
                            {item.verified && <Text style={styles.verified}>✔ Verified</Text>}
                            {item.sponsored && <Text style={styles.sponsored}>Sponsored</Text>}

                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.details}>
                                {item.semiFurnished ? 'Semi Furnished · ' : ''}
                                {item.area}
                            </Text>
                            <Text style={styles.location}>{item.location}</Text>
                            <Text style={styles.price}>{item.price}</Text>

                            {item.highlights && (
                                <View style={styles.highlights}>
                                    {item.highlights.map((point, index) => (
                                        <Text key={index} style={styles.highlightText}>• {point}</Text>
                                    ))}
                                </View>
                            )}


                        </View>
                    </TouchableOpacity>
                )}
            />
            <Modal
                visible={filterVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFilterVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Apply Filters</Text>

                        {/* Price Range */}
                        <Text style={styles.label}>Price Range (₹)</Text>
                        <View style={styles.priceRow}>
                            <TextInput
                                placeholder="Min"
                                keyboardType="numeric"
                                style={styles.priceInput}
                                value={minPrice}
                                onChangeText={setMinPrice}
                            />
                            <Text style={{ marginHorizontal: 10 }}>to</Text>
                            <TextInput
                                placeholder="Max"
                                keyboardType="numeric"
                                style={styles.priceInput}
                                value={maxPrice}
                                onChangeText={setMaxPrice}
                            />
                        </View>

                        {/* BHK */}
                        <Text style={styles.label}>BHK Type</Text>
                        <View style={styles.optionsRow}>
                            {[1, 2, 3, 4].map((bhk) => (
                                <TouchableOpacity
                                    key={bhk}
                                    style={[
                                        styles.optionButton,
                                        selectedBHK === bhk && styles.optionSelected,
                                    ]}
                                    onPress={() => setSelectedBHK(bhk)}
                                >
                                    <Text style={selectedBHK === bhk ? styles.optionSelectedText : styles.optionText}>
                                        {bhk} BHK
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Furnishing */}
                        <Text style={styles.label}>Furnishing</Text>
                        <View style={styles.optionsRow}>
                            {['Furnished', 'Semi Furnished', 'Unfurnished'].map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[
                                        styles.optionButton,
                                        furnishing === type && styles.optionSelected,
                                    ]}
                                    onPress={() => setFurnishing(type)}
                                >
                                    <Text style={furnishing === type ? styles.optionSelectedText : styles.optionText}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={[styles.actionButton, { backgroundColor: '#ccc' }]}
                                onPress={() => {
                                    setMinPrice('');
                                    setMaxPrice('');
                                    setSelectedBHK(null);
                                    setFurnishing(null);
                                }}
                            >
                                <Text style={styles.actionText}>Reset</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionButton, { backgroundColor: '#5a2bd0' }]}
                                onPress={() => {
                                    // 🔍 Apply logic goes here
                                    setFilterVisible(false);
                                }}
                            >
                                <Text style={[styles.actionText, { color: '#fff' }]}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


        </View>

    );
};

export default FilterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 10,
        color: '#333',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    priceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 14,
        marginRight: 10,
        marginBottom: 10,
    },
    optionText: {
        color: '#333',
    },
    optionSelected: {
        backgroundColor: '#5a2bd0',
        borderColor: '#5a2bd0',
    },
    optionSelectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    actionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    sliderContainer: {
        height: 180,
        marginBottom: 10,
    },
    sliderImage: {
        width: 300,
        height: 180,
        marginHorizontal: 10,
        borderRadius: 10,
    },

    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0,
        marginBottom: 0,
    },
    backText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#000',
    },
    // 🔍 Search and Filter
    searchFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        fontSize: 16,
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
    },
    filterText: {
        marginLeft: 5,
        color: '#5a2bd0',
        fontWeight: '600',
    },

    // 🧭 Tabs
    tabsContainer: {
        flexGrow: 0,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tabText: {
        fontSize: 14,
        color: '#555',
    },
    activeTab: {
        backgroundColor: '#5a2bd0',
        borderColor: '#5a2bd0',
    },
    activeTabText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    // 📋 Listing Cards
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    verified: {
        color: 'green',
        marginTop: 5,
    },
    sponsored: {
        color: '#f39c12',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    details: {
        fontSize: 14,
        color: '#777',
    },
    location: {
        fontSize: 14,
        color: '#555',
    },
    price: {
        fontSize: 16,
        color: '#000',
        marginTop: 5,
    },
    highlights: {
        marginTop: 5,
    },
    highlightText: {
        fontSize: 12,
        color: '#555',
    },
    contactButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
});
