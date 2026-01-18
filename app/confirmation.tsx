import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ConfirmationScreen() {
    const scale = useSharedValue(0);
    const checkmarkScale = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(1, {
            damping: 12,
            stiffness: 90,
        });
        checkmarkScale.value = withDelay(
            300,
            withSpring(1, {
                damping: 10,
                stiffness: 100,
            })
        );
        opacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    }, []);

    const circleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const checkmarkStyle = useAnimatedStyle(() => ({
        transform: [{ scale: checkmarkScale.value }],
    }));

    const contentStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topNav}>
                <View style={{ width: 44 }} />
                <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
                    <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>You're In!</Text>

                    <View style={styles.animationContainer}>
                        <Animated.View style={[styles.successCircleContainer, circleStyle]}>
                            <View style={styles.successCircle}>
                                <Animated.View style={checkmarkStyle}>
                                    <Ionicons name="checkmark" size={56} color="#2fb979" />
                                </Animated.View>
                            </View>
                        </Animated.View>
                    </View>

                    <Animated.View style={[styles.detailsContainer, contentStyle]}>
                        <Text style={styles.message}>
                            Your spot is secured. We've sent a confirmation email with all the details.
                        </Text>

                        <View style={styles.eventCard}>
                            <View style={styles.eventCardHeader}>
                                <Ionicons name="calendar-outline" size={20} color="#2fb979" />
                                <Text style={styles.eventCardLabel}>EVENT CONFIRMED</Text>
                            </View>
                            <View style={styles.eventInfo}>
                                <Text style={styles.eventName}>Career Fair 2024</Text>
                                <View style={styles.eventMeta}>
                                    <Ionicons name="time-outline" size={16} color="#64748b" />
                                    <Text style={styles.eventTime}>Friday, Oct 25 • 10:00 AM</Text>
                                </View>
                                <View style={styles.eventMeta}>
                                    <Ionicons name="location-outline" size={16} color="#64748b" />
                                    <Text style={styles.eventLocation}>University Grand Ballroom</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.syncButton}>
                    <Ionicons name="calendar" size={20} color="#ffffff" />
                    <Text style={styles.syncButtonText}>Sync to Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
                    <Text style={styles.backButtonText}>Back to Events</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f9f6',
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    doneText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#2fb979',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 160,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 40,
        textAlign: 'center',
    },
    animationContainer: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    successCircleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    successCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#e6f7e0',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2fb979',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
        elevation: 12,
    },
    detailsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
        paddingHorizontal: 16,
    },
    eventCard: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#e6f7f0',
    },
    eventCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    eventCardLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#2fb979',
        letterSpacing: 0.5,
    },
    eventInfo: {
        gap: 10,
    },
    eventName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    eventMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    eventTime: {
        fontSize: 15,
        color: '#64748b',
        fontWeight: '500',
    },
    eventLocation: {
        fontSize: 15,
        color: '#64748b',
        fontWeight: '500',
        flex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 8,
    },
    syncButton: {
        backgroundColor: '#2fb979',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#2fb979',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    syncButtonText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
    },
    backButton: {
        backgroundColor: 'transparent',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        color: '#2fb979',
        fontSize: 17,
        fontWeight: '600',
    },
});
