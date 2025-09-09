import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchScreen() {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const onPressSearch = () => {
        // Do something with searchQuery, e.g., navigate or filter

        navigation.navigate("filter")
        console.log('Search button pressed with query:', searchQuery);
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#444" style={styles.icon} />
                <TextInput
                    placeholder="Search here..."
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            {/* Search Button */}
            <TouchableOpacity style={styles.button} onPress={onPressSearch}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>

            {/* Optional: Search Result */}
            <Text style={styles.resultText}>You searched for: {searchQuery}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultText: {
        fontSize: 16,
        color: '#555',
    },
});
