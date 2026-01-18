import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INTERESTS = [
    'Coding', 'Design', 'Sports', 'AI', 'Marketing', 'Web3',
    'Photography', 'Writing', 'Gaming', 'Music', 'Volunteering',
    'Data Science', 'Hackathons', 'Networking', 'Startups'
];

export default function InterestsScreen() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>(['Coding', 'Design', 'Sports']);

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
                </TouchableOpacity>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.title}>What are you into?</Text>
                    <Text style={styles.subtitle}>
                        Select at least 3 interests to help us personalize your event feed.
                    </Text>

                    <View style={styles.chipsContainer}>
                        {INTERESTS.map((interest) => {
                            const isSelected = selectedInterests.includes(interest);
                            return (
                                <TouchableOpacity
                                    key={interest}
                                    style={[styles.chip, isSelected && styles.chipSelected]}
                                    onPress={() => toggleInterest(interest)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                                        {interest}
                                    </Text>
                                    {isSelected && (
                                        <Ionicons name="checkmark" size={16} color="#ffffff" style={styles.checkIcon} />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.getStartedButton} onPress={() => router.replace('/(tabs)')}>
                    <Text style={styles.getStartedText}>Get Started</Text>
                    <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.footerNote}>
                    You can change these anytime in your profile settings.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f9f6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        padding: 8,
    },
    stepText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 0.5,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        paddingHorizontal: 30,
        paddingTop: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },
    chip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    chipSelected: {
        backgroundColor: '#2fb979',
        borderColor: '#2fb979',
    },
    chipText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    chipTextSelected: {
        color: '#ffffff',
    },
    checkIcon: {
        marginLeft: 6,
    },
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 40,
        alignItems: 'center',
    },
    getStartedButton: {
        backgroundColor: '#2fb979',
        width: '100%',
        height: 64,
        borderRadius: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2fb979',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 8,
    },
    getStartedText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginRight: 8,
    },
    footerNote: {
        color: '#999',
        fontSize: 13,
        marginTop: 20,
        textAlign: 'center',
    },
});
