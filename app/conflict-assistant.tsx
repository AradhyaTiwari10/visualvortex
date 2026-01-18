import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ConflictAssistantScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Conflict Assistant</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.progressSection}>
                <View style={styles.progressLabelRow}>
                    <Text style={styles.progressLabel}>Resolution Progress</Text>
                    <Text style={styles.progressValue}>8 of 10</Text>
                </View>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '80%' }]} />
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Resolve Schedule Clash</Text>
                <Text style={styles.subtitle}>These two events overlap. Pick the best one for you.</Text>

                <View style={styles.comparisonContainer}>
                    <View style={[styles.eventCard, styles.aiChoiceCard]}>
                        <View style={styles.aiChoiceBadge}>
                            <Text style={styles.aiChoiceText}>AI CHOICE</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97' }}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.eventName}>Advanced Python Workshop</Text>
                            <Text style={styles.eventTime}>10:00 AM - 12:00 PM</Text>
                            <View style={styles.locationRow}>
                                <Ionicons name="location" size={14} color="#2fb979" />
                                <Text style={styles.locationText}>Room 402</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.eventCard}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c' }}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.eventName}>Weekly Team Sync</Text>
                            <Text style={styles.eventTime}>10:30 AM - 11:30 AM</Text>
                            <View style={styles.locationRow}>
                                <Ionicons name="videocam" size={14} color="#64748b" />
                                <Text style={styles.locationText}>Google Meet</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.recommendationContainer}>
                    <View style={styles.recommendationHeader}>
                        <Ionicons name="sparkles" size={20} color="#2fb979" />
                        <Text style={styles.recommendationTitle}>AI Recommendation</Text>
                    </View>
                    <Text style={styles.recommendationQuote}>"This suits your skill growth better"</Text>
                    <Text style={styles.recommendationContext}>Based on your Q3 focus on Data Engineering.</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.selectBtn} onPress={() => router.push('/confirmation')}>
                    <Text style={styles.selectBtnText}>Select Workshop</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.keepBtn} onPress={() => router.back()}>
                    <Text style={styles.keepBtnText}>Keep Team Sync</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressSection: {
        paddingHorizontal: 24,
        marginTop: 10,
    },
    progressLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    progressLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    progressValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#2fb979',
        borderRadius: 4,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: '#2fb979',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 40,
    },
    comparisonContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 40,
    },
    eventCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    aiChoiceCard: {
        borderColor: '#2fb979',
        borderWidth: 2,
    },
    aiChoiceBadge: {
        position: 'absolute',
        top: -1,
        left: '15%',
        right: '15%',
        backgroundColor: '#2fb979',
        paddingVertical: 4,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        zIndex: 1,
        alignItems: 'center',
    },
    aiChoiceText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '800',
    },
    cardImage: {
        width: '100%',
        height: 140,
    },
    cardContent: {
        padding: 12,
    },
    eventName: {
        fontSize: 14,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 6,
        height: 36,
    },
    eventTime: {
        fontSize: 11,
        fontWeight: '700',
        color: '#2fb979',
        marginBottom: 6,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 11,
        color: '#64748b',
        fontWeight: '600',
    },
    recommendationContainer: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
    },
    recommendationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },
    recommendationTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    recommendationQuote: {
        fontSize: 16,
        fontWeight: '600',
        color: '#475569',
        fontStyle: 'italic',
        marginBottom: 8,
        textAlign: 'center',
    },
    recommendationContext: {
        fontSize: 13,
        color: '#94a3b8',
        textAlign: 'center',
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        gap: 12,
    },
    selectBtn: {
        backgroundColor: '#2fb979',
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectBtnText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
    },
    keepBtn: {
        backgroundColor: '#ffffff',
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    keepBtnText: {
        color: '#1a1a1a',
        fontSize: 17,
        fontWeight: '700',
    },
});
