import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const [email, setEmail] = useState('');

    const handleContinue = () => {
        router.push('/interests');
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {/* HEADER */}
                    <View style={styles.header}>
                        <View style={styles.illustrationContainer}>
                            <Image
                                source={require('@/assets/images/login-illustration.png')}
                                style={styles.illustration}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>Let's find something</Text>
                            <View style={styles.highlightRow}>
                                <View style={styles.highlight}>
                                    <Text style={styles.titleHighlight}>fun</Text>
                                </View>
                                <Text style={styles.title}> to join!</Text>
                            </View>
                        </View>

                        <Text style={styles.subtitle}>
                            Connect with campus events and meet your people.
                        </Text>
                    </View>

                    {/* CARD */}
                    <View style={styles.card}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>College Email</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="mail" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="yourname@college.edu"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                            <Text style={styles.continueButtonText}>CONTINUE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.guestButton}
                            onPress={() => router.replace('/(tabs)/discover')}
                        >
                            <Text style={styles.guestButtonText}>Explore as Guest</Text>
                        </TouchableOpacity>

                        <View style={styles.cardFooter}>
                            <TouchableOpacity>
                                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ssoButton}>
                                <Text style={styles.ssoText}>SSO Login</Text>
                                <Ionicons name="arrow-forward" size={16} color="#2fb979" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* FOOTER */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>New here? </Text>
                        <TouchableOpacity>
                            <Text style={styles.signUpText}>Sign up for free</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f9f6',
    },
    inner: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 30,
    },
    header: {
        alignItems: 'center',
        width: '100%',
    },
    illustrationContainer: {
        width: 110,
        height: 110,
        backgroundColor: '#f8ead2',
        borderRadius: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    illustration: {
        width: '100%',
        height: '100%',
    },
    titleWrapper: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1a1a1a',
        textAlign: 'center',
        lineHeight: 34,
    },
    highlightRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    highlight: {
        backgroundColor: '#e6f7f0',
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    titleHighlight: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1a1a1a',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#666666',
        textAlign: 'center',
        marginTop: 12,
        paddingHorizontal: 15,
        lineHeight: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        width: '100%',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    inputWrapper: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        height: 56,
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#333333',
        fontSize: 16,
    },
    continueButton: {
        width: '100%',
        backgroundColor: '#2fb979',
        height: 56,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 14,
    },
    continueButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
    guestButton: {
        width: '100%',
        height: 56,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e6f7f0',
        marginBottom: 16,
    },
    guestButtonText: {
        color: '#2fb979',
        fontSize: 16,
        fontWeight: '700',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    forgotPasswordText: {
        color: '#999999',
        fontSize: 14,
    },
    ssoButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ssoText: {
        color: '#2fb979',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    footerText: {
        color: '#999999',
        fontSize: 15,
    },
    signUpText: {
        color: '#2fb979',
        fontSize: 15,
        fontWeight: '700',
    },
});

