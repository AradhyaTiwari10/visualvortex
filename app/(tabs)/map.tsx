import { MOCK_EVENTS } from '@/data/events';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeInUp,
    SlideInDown
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Category Colors
const CATEGORY_COLORS: Record<string, string> = {
    'WORKSHOP': '#3b82f6',
    'SPORTS': '#f59e0b',
    'CULTURE': '#ec4899',
    'LEADERSHIP': '#8b5cf6',
    'TECH': '#3b82f6',
    'SOCIAL': '#10b981',
};

export default function MapScreen() {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const handlePinPress = (event: any) => {
        setSelectedEvent(event);
    };

    return (
        <View style={styles.container}>
            {/* SPATIAL MAP CANVAS */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.canvasWrapper}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.canvasWrapper}
                >
                    <View style={styles.mapContainer}>
                        {/* ARCHITECTURAL DRAWING LAYER */}
                        <View style={styles.drawingLayer}>
                            {/* GRASS AREAS */}
                            <View style={[styles.grass, { top: 100, left: 100, width: 300, height: 200 }]} />
                            <View style={[styles.grass, { top: 400, left: 600, width: 250, height: 300 }]} />
                            <View style={[styles.grass, { top: 700, left: 150, width: 400, height: 150 }]} />

                            {/* ROADS */}
                            <View style={[styles.road, { top: 0, left: 450, width: 60, height: 1000 }]} />
                            <View style={[styles.road, { top: 350, left: 0, width: 1000, height: 50, transform: [{ rotate: '0deg' }] }]} />
                            <View style={[styles.road, { top: 650, left: 0, width: 1000, height: 50 }]} />

                            {/* BUILDINGS (BLOCKS) */}
                            {/* Residency-1 */}
                            <View style={[styles.building, { top: 150, left: 150, width: 180, height: 120, borderColor: '#e2e8f0' }]}>
                                <Text style={styles.buildingLabel}>RESIDENCY-1</Text>
                            </View>

                            {/* Academic Block */}
                            <View style={[styles.building, { top: 450, left: 100, width: 220, height: 140, backgroundColor: '#f1f5f9' }]}>
                                <Text style={styles.buildingLabel}>ACADEMIC BLOCK</Text>
                            </View>

                            {/* Rishihood University (Main) */}
                            <View style={[styles.building, { top: 750, left: 400, width: 350, height: 180, backgroundColor: '#f8fafc' }]}>
                                <View style={styles.buildingAccent} />
                                <Text style={styles.buildingLabel}>RISHIHOOD UNIVERSITY</Text>
                            </View>

                            {/* Sports Complex */}
                            <View style={[styles.building, { top: 50, left: 650, width: 200, height: 200, borderRadius: 100, backgroundColor: '#ecfdf5' }]}>
                                <Text style={styles.buildingLabel}>SPORTS ARENA</Text>
                            </View>

                            {/* Auditorium */}
                            <View style={[styles.building, { top: 450, left: 600, width: 160, height: 120, transform: [{ rotate: '15deg' }] }]}>
                                <Text style={styles.buildingLabel}>AUDITORIUM</Text>
                            </View>
                        </View>

                        {/* EVENT PINS */}
                        {MOCK_EVENTS.map((event) => (
                            <TouchableOpacity
                                key={event.id}
                                style={[
                                    styles.pinWrapper,
                                    { left: event.coords.x, top: event.coords.y }
                                ]}
                                onPress={() => handlePinPress(event)}
                            >
                                <Animated.View
                                    entering={FadeInUp.delay(Math.random() * 500)}
                                    style={[
                                        styles.pin,
                                        { backgroundColor: CATEGORY_COLORS[event.category] || '#2fb979' },
                                        selectedEvent?.id === event.id && styles.selectedPin
                                    ]}
                                >
                                    <Ionicons
                                        name={event.category === 'SPORTS' ? 'football' : 'sparkles'}
                                        size={14}
                                        color="#ffffff"
                                    />
                                </Animated.View>
                                {/* Pin Stem */}
                                <View style={styles.pinStem} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>

            {/* TOP SEARCH OVERLAY */}
            <SafeAreaView style={styles.overlayTop} edges={['top']}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#94a3b8" />
                    <Text style={styles.searchPlaceholder}>Search rishihood campus...</Text>
                </View>
                <View style={styles.filterPills}>
                    {['Academic', 'Social', 'Sports'].map((pill) => (
                        <TouchableOpacity key={pill} style={styles.pill}>
                            <Text style={styles.pillText}>{pill}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>

            {/* LIGHTWEIGHT PREVIEW CARD */}
            {selectedEvent && (
                <Animated.View
                    entering={SlideInDown.springify()}
                    style={styles.bottomSheet}
                >
                    <View style={styles.previewContent}>
                        <View style={styles.previewHeader}>
                            <View style={[styles.categoryBadge, { backgroundColor: CATEGORY_COLORS[selectedEvent.category] || '#10b981' }]}>
                                <Text style={styles.categoryBadgeText}>{selectedEvent.category}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setSelectedEvent(null)} style={styles.closeIcon}>
                                <Ionicons name="close-circle" size={24} color="#CBD5E1" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.previewTitle}>{selectedEvent.title}</Text>

                        <View style={styles.previewMeta}>
                            <View style={styles.metaRow}>
                                <Ionicons name="time-outline" size={16} color="#64748b" />
                                <Text style={styles.metaText}>{selectedEvent.time}</Text>
                            </View>
                            <View style={styles.metaRow}>
                                <Ionicons name="location-outline" size={16} color="#64748b" />
                                <Text style={styles.metaText}>{selectedEvent.location}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.exploreBtn}
                            onPress={() => router.push(`/event-detail/${selectedEvent.id}`)}
                        >
                            <Text style={styles.exploreBtnText}>Explore Event</Text>
                            <Ionicons name="arrow-forward" size={18} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            {/* FAB (LOCATE ME) */}
            <TouchableOpacity style={styles.fab}>
                <Ionicons name="navigate" size={24} color="#ffffff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9',
    },
    canvasWrapper: {
        width: 1000,
        height: 1000,
    },
    mapContainer: {
        width: 1000,
        height: 1000,
        position: 'relative',
        backgroundColor: '#f8fafc',
    },
    drawingLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f8fafc',
    },
    grass: {
        position: 'absolute',
        backgroundColor: '#f0fdf4',
        borderRadius: 20,
    },
    road: {
        position: 'absolute',
        backgroundColor: '#e2e8f0',
    },
    building: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#cbd5e1',
        borderRadius: 12,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    buildingLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#64748b',
        textAlign: 'center',
        letterSpacing: 1,
    },
    buildingAccent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        backgroundColor: '#10b981',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    pinWrapper: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    pin: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    selectedPin: {
        transform: [{ scale: 1.2 }],
        borderColor: '#fbbf24',
        borderWidth: 4,
    },
    pinStem: {
        width: 2,
        height: 8,
        backgroundColor: '#ffffff',
        marginTop: -1,
    },
    overlayTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 10,
        zIndex: 100,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 54,
        borderRadius: 20,
        paddingHorizontal: 16,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 12,
    },
    searchPlaceholder: {
        fontSize: 15,
        color: '#94a3b8',
        fontWeight: '500',
    },
    filterPills: {
        flexDirection: 'row',
        gap: 8,
    },
    pill: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    pillText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#64748b',
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 110,
        left: 20,
        right: 20,
        zIndex: 200,
    },
    previewContent: {
        backgroundColor: '#ffffff',
        borderRadius: 28,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 30,
        elevation: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    previewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    categoryBadgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#ffffff',
        letterSpacing: 0.5,
    },
    closeIcon: {
        padding: 4,
    },
    previewTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0f172a',
        marginBottom: 12,
        lineHeight: 28,
    },
    previewMeta: {
        gap: 8,
        marginBottom: 20,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    metaText: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '600',
    },
    exploreBtn: {
        backgroundColor: '#10b981',
        height: 56,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    exploreBtnText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '800',
    },
    fab: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#10b981',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        zIndex: 100,
    },
});
