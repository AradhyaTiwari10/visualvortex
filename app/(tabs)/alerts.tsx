import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
    Layout,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ALERTS = [
    {
        id: '1',
        type: 'deadline',
        title: 'Registration closing soon',
        message: 'AI & Machine Learning 101: Only 2 hours left to secure your slot!',
        time: '2h ago',
        unread: true,
        icon: 'time',
        urgency: 'high',
    },
    {
        id: '2',
        type: 'schedule',
        title: 'Starts in 30 minutes',
        message: 'Design Sprint Workshop is about to begin. Head to Design Studio, Building 3.',
        time: '30m ago',
        unread: true,
        icon: 'flash',
        urgency: 'high',
    },
    {
        id: '3',
        type: 'update',
        title: 'Venue changed',
        message: 'Career Fair 2024 has been moved to the University Grand Ballroom.',
        time: '5h ago',
        unread: false,
        icon: 'location',
        urgency: 'medium',
    },
    {
        id: '4',
        type: 'post-event',
        title: 'How was the event?',
        message: 'Share your feedback on the Startup Pitch Night to help us improve.',
        time: '1d ago',
        unread: false,
        icon: 'chatbubble-ellipses',
        urgency: 'low',
    },
];

export default function AlertsScreen() {
    const [filter, setFilter] = useState<'All' | 'Unread'>('All');

    const filteredAlerts = ALERTS.filter(alert =>
        filter === 'All' || (filter === 'Unread' && alert.unread)
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <TouchableOpacity>
                        <Text style={styles.markRead}>Mark all read</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.filterRow}>
                    {['All', 'Unread'].map((f) => (
                        <TouchableOpacity
                            key={f}
                            style={[styles.filterChip, filter === f && styles.filterChipActive]}
                            onPress={() => setFilter(f as any)}
                        >
                            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                                {f}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {filteredAlerts.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off-outline" size={64} color="#cbd5e1" />
                        <Text style={styles.emptyTitle}>All caught up!</Text>
                        <Text style={styles.emptyText}>You don't have any unread notifications right now.</Text>
                    </View>
                ) : (
                    filteredAlerts.map((alert, index) => (
                        <Animated.View
                            key={alert.id}
                            entering={FadeInDown.delay(index * 100).springify()}
                            layout={Layout.springify()}
                        >
                            <TouchableOpacity
                                style={[styles.alertCard, alert.unread && styles.unreadCard]}
                                activeOpacity={0.7}
                            >
                                <View style={[
                                    styles.iconContainer,
                                    alert.urgency === 'high' ? styles.iconHigh :
                                        alert.urgency === 'medium' ? styles.iconMedium : styles.iconLow
                                ]}>
                                    <Ionicons
                                        name={alert.icon as any}
                                        size={20}
                                        color={
                                            alert.urgency === 'high' ? '#ef4444' :
                                                alert.urgency === 'medium' ? '#f59e0b' : '#3b82f6'
                                        }
                                    />
                                </View>
                                <View style={styles.alertContent}>
                                    <View style={styles.alertTop}>
                                        <Text style={[styles.alertTitle, alert.unread && styles.unreadText]}>
                                            {alert.title}
                                        </Text>
                                        <Text style={styles.alertTime}>{alert.time}</Text>
                                    </View>
                                    <Text style={styles.alertMessage} numberOfLines={2}>
                                        {alert.message}
                                    </Text>
                                </View>
                                {alert.unread && <View style={styles.unreadIndicator} />}
                            </TouchableOpacity>
                        </Animated.View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },
    markRead: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2fb979',
    },
    filterRow: {
        flexDirection: 'row',
        gap: 12,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    filterChipActive: {
        backgroundColor: '#2fb979',
        borderColor: '#2fb979',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94a3b8',
    },
    filterTextActive: {
        color: '#ffffff',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    alertCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    unreadCard: {
        borderColor: '#e6f7f0',
        backgroundColor: '#fcfdfd',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconHigh: {
        backgroundColor: '#fee2e2',
    },
    iconMedium: {
        backgroundColor: '#fef3c7',
    },
    iconLow: {
        backgroundColor: '#dbeafe',
    },
    alertContent: {
        flex: 1,
    },
    alertTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    alertTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        flex: 1,
    },
    unreadText: {
        color: '#0f172a',
    },
    alertTime: {
        fontSize: 12,
        color: '#94a3b8',
        fontWeight: '500',
    },
    alertMessage: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
        fontWeight: '500',
    },
    unreadIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2fb979',
        marginLeft: 12,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 100,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1a1a1a',
        marginTop: 20,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 22,
    },
});
