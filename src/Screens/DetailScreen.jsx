import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [saved, setSaved] = useState(false);
    const { property: routeProperty, userdata } = route.params || {};
    const property = routeProperty || userdata;

    if (!property || typeof property !== 'object') {
        return (
            <View style={styles.emptyState}>
                <Feather name="home" size={32} color="#B9945A" />
                <Text style={styles.emptyTitle}>Property unavailable</Text>
                <Text style={styles.emptyText}>We could not find the details for this listing.</Text>
            </View>
        );
    }

    const title = property.title || property.apartment_society || property.property_type || 'Property';
    const location = property.location || [property.locality, property.property_city].filter(Boolean).join(', ') || 'Location not available';
    const imageUri = property.image || (property.primary_media?.file_url ? `https://api.squarebigha.com/${property.primary_media.file_url}` : null);
    const highlights = Array.isArray(property.highlights) ? property.highlights : [];

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView horizontal={false} style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : <View style={[styles.image, styles.imageFallback]}><Feather name="image" size={36} color="#B9945A" /></View>}
                    <View style={styles.heroShade} />
                    <View style={styles.heroActions}>
                        <Pressable accessibilityLabel="Go back" style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <Feather name="arrow-left" size={21} color="#18201D" />
                        </Pressable>
                        <Pressable accessibilityLabel={saved ? 'Remove from saved' : 'Save property'} style={styles.iconButton} onPress={() => setSaved(!saved)}>
                            <Feather name="heart" size={20} color={saved ? '#B45E55' : '#18201D'} fill={saved ? '#B45E55' : 'none'} />
                        </Pressable>
                    </View>
                    <View style={styles.heroLabel}>
                        <Text style={styles.heroEyebrow}>SQUARE BIGHA / PROPERTY</Text>
                        <View style={styles.heroBadge}><Feather name="camera" size={12} color="#FFF" /><Text style={styles.heroBadgeText}>1 PHOTO</Text></View>
                    </View>
                </View>

                <View style={styles.intro}>
                    <View style={styles.tagRow}>
                        {property.verified && <View style={styles.verifiedTag}><Feather name="check-circle" size={13} color="#3F6C5B" /><Text style={styles.verifiedText}>VERIFIED</Text></View>}
                        {property.sponsored && <Text style={styles.sponsoredTag}>FEATURED</Text>}
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.locationRow}><Feather name="map-pin" size={16} color="#B45E55" /><Text style={styles.location}>{location}</Text></View>
                    <View style={styles.priceRow}><Text style={styles.price}>{property.price || 'Price on request'}</Text><Text style={styles.priceNote}>ASKING PRICE</Text></View>
                </View>

                <View style={styles.divider} />
                <View style={styles.statsRow}>
                    {property.area && <View style={styles.stat}><Feather name="maximize-2" size={18} color="#B9945A" /><Text style={styles.statValue}>{property.area}</Text><Text style={styles.statLabel}>AREA</Text></View>}
                    {property.bedrooms && <View style={styles.stat}><Feather name="grid" size={18} color="#B9945A" /><Text style={styles.statValue}>{property.bedrooms} BHK</Text><Text style={styles.statLabel}>LAYOUT</Text></View>}
                    {property.semiFurnished && <View style={styles.stat}><Feather name="box" size={18} color="#B9945A" /><Text style={styles.statValue}>Semi</Text><Text style={styles.statLabel}>FURNISHED</Text></View>}
                </View>

                {highlights.length > 0 && <View style={styles.section}><Text style={styles.sectionKicker}>THE DETAILS</Text><Text style={styles.sectionTitle}>Made for everyday living</Text><View style={styles.chipRow}>{highlights.map((point, index) => <View key={`${point}-${index}`} style={styles.chip}><Feather name="check" size={13} color="#3F6C5B" /><Text style={styles.chipText}>{point}</Text></View>)}</View></View>}

                <View style={styles.section}><Text style={styles.sectionKicker}>ABOUT THIS HOME</Text><Text style={styles.sectionTitle}>A considered place to call home</Text><Text style={styles.descriptionText}>This is a beautiful {title.toLowerCase()} located in {property.location || property.locality || 'a convenient location'}. It offers modern amenities, generous space, and comfort for families.</Text></View>
                <View style={styles.bottomSpace} />
            </ScrollView>
            <View style={styles.contactBar}><Pressable style={styles.numberButton} onPress={() => {}}><Feather name="phone-call" size={18} color="#FFF" /><Text style={styles.numberText}>View number</Text></Pressable><Pressable accessibilityLabel="Call owner" style={styles.callButton} onPress={() => {}}><Feather name="phone" size={20} color="#3F6C5B" /></Pressable><Pressable accessibilityLabel="Message on WhatsApp" style={styles.chatButton} onPress={() => {}}><Feather name="message-circle" size={20} color="#FFF" /></Pressable></View>
        </SafeAreaView>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F5F0' },
    container: { flex: 1, width: '100%', backgroundColor: '#F7F5F0' },
    content: { width: '100%', paddingBottom: 16 },
    hero: { width: '100%', height: 318, position: 'relative', backgroundColor: '#E7E1D6' },
    image: { width: '100%', height: '100%' },
    imageFallback: { alignItems: 'center', justifyContent: 'center' },
    heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(20, 28, 25, 0.16)' },
    heroActions: { position: 'absolute', top: 16, left: 18, right: 18, flexDirection: 'row', justifyContent: 'space-between' },
    iconButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255, 255, 255, 0.92)', alignItems: 'center', justifyContent: 'center' },
    heroLabel: { position: 'absolute', bottom: 18, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    heroEyebrow: { color: '#FFF', fontSize: 10, letterSpacing: 1.4, fontWeight: '700', flexShrink: 1 },
    heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 3, backgroundColor: 'rgba(24, 32, 29, 0.72)' },
    heroBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '700', letterSpacing: 0.6 },
    intro: { paddingHorizontal: 20, paddingTop: 22 },
    tagRow: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 22 },
    verifiedTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    verifiedText: { color: '#3F6C5B', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    sponsoredTag: { color: '#B45E55', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    title: { flexShrink: 1, fontSize: 30, lineHeight: 36, color: '#18201D', fontWeight: '700', marginTop: 8 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9, gap: 6 },
    location: { flex: 1, fontSize: 14, color: '#68736D', lineHeight: 20 },
    priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 18 },
    price: { flex: 1, flexShrink: 1, fontSize: 23, color: '#18201D', fontWeight: '700' },
    priceNote: { color: '#9A9B91', fontSize: 9, letterSpacing: 1.2, fontWeight: '700' },
    divider: { height: 1, backgroundColor: '#E3DFD6', marginHorizontal: 20, marginTop: 22 },
    statsRow: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 20 },
    stat: { flex: 1, minWidth: 0, borderRightWidth: 1, borderRightColor: '#E3DFD6', minHeight: 52, marginRight: 16 },
    statValue: { color: '#18201D', fontSize: 14, fontWeight: '700', marginTop: 7, flexShrink: 1 },
    statLabel: { color: '#9A9B91', fontSize: 9, letterSpacing: 1, marginTop: 4, fontWeight: '700' },
    section: { paddingHorizontal: 20, paddingTop: 22 },
    sectionKicker: { color: '#B45E55', fontSize: 10, letterSpacing: 1.6, fontWeight: '800' },
    sectionTitle: { color: '#18201D', fontSize: 21, fontWeight: '700', marginTop: 7, marginBottom: 15, flexShrink: 1 },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
    chip: { maxWidth: '100%', flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#E8F0EA', paddingHorizontal: 11, paddingVertical: 9, borderRadius: 4 },
    chipText: { flexShrink: 1, color: '#3F6C5B', fontSize: 12, fontWeight: '600' },
    descriptionText: { fontSize: 15, color: '#68736D', lineHeight: 24, flexShrink: 1 },
    contactBar: { flexDirection: 'row', gap: 10, paddingHorizontal: 18, paddingVertical: 12, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E3DFD6' },
    numberButton: { flex: 1, height: 52, borderRadius: 5, backgroundColor: '#3F6C5B', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
    numberText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
    callButton: { width: 52, height: 52, borderRadius: 5, backgroundColor: '#E8F0EA', alignItems: 'center', justifyContent: 'center' },
    chatButton: { width: 52, height: 52, borderRadius: 5, backgroundColor: '#B45E55', alignItems: 'center', justifyContent: 'center' },
    bottomSpace: { height: 18 },
    emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7F5F0', padding: 30 },
    emptyTitle: { color: '#18201D', fontSize: 20, fontWeight: '700', marginTop: 14 },
    emptyText: { color: '#68736D', fontSize: 14, textAlign: 'center', marginTop: 7 },
});
