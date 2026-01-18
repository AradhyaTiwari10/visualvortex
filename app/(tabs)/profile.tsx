import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInRight
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const badges = [
    { id: '1', name: 'Early Bird', icon: 'sunny', color: '#f59e0b' },
    { id: '2', name: 'Tech Guru', icon: 'code-slash', color: '#3b82f6' },
    { id: '3', name: 'Social Butterfly', icon: 'people', color: '#10b981' },
];

const insights = [
    { id: '1', title: 'Growing Diversification', desc: 'You attended 3 categories this week!', icon: 'trending-up', color: '#10b981' },
    { id: '2', title: 'Commitment Peer', desc: 'Top 5% in showing up on time.', icon: 'time', color: '#3b82f6' },
];

const leaderboardData = {
    'This Week': [
        { id: '1', name: 'Aradhya Tiwari', score: 2450, rank: 42, isMe: true },
        { id: '2', name: 'Alex Rivera', score: 2430, rank: 43 },
        { id: '3', name: 'Sarah Chen', score: 2390, rank: 44 },
    ],
    'This Month': [
        { id: '1', name: 'Aradhya Tiwari', score: 9850, rank: 12, isMe: true },
        { id: '2', name: 'Alex Rivera', score: 9430, rank: 15 },
        { id: '3', name: 'James Wilson', score: 9200, rank: 18 },
    ],
    'All Time': [
        { id: '1', name: 'Aradhya Tiwari', score: 45200, rank: 8, isMe: true },
        { id: '2', name: 'Priya Sharma', score: 44800, rank: 9 },
        { id: '3', name: 'David Kim', score: 44100, rank: 10 },
    ],
};

export default function ProfileScreen() {
    const [leaderboardTab, setLeaderboardTab] = React.useState<'This Week' | 'This Month' | 'All Time'>('This Week');
    const [showAuraInfo, setShowAuraInfo] = React.useState(false);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* HEADER / USER IDENTITY */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/200?u=student' }} // Student avatar
                            style={styles.avatar}
                        />
                        <View style={styles.auraRing} />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Aradhya Tiwari</Text>
                        <Text style={styles.userBio}>B.Tech Computer Science • 3rd Year</Text>
                        <View style={styles.locationRow}>
                            <Ionicons name="location-sharp" size={14} color="#64748b" />
                            <Text style={styles.locationText}>Main Campus, Building A</Text>
                        </View>
                    </View>
                </View>

                {/* SURFACE 4: EXPERIENCE SUMMARY */}
                <View style={styles.experienceSummary}>
                    <View style={styles.expCard}>
                        <Text style={styles.expValue}>12</Text>
                        <Text style={styles.expLabel}>Viewed</Text>
                    </View>
                    <View style={[styles.expCard, styles.expCardActive]}>
                        <Text style={[styles.expValue, { color: '#ffffff' }]}>5</Text>
                        <Text style={[styles.expLabel, { color: 'rgba(255,255,255,0.8)' }]}>Committed</Text>
                    </View>
                    <View style={styles.expCard}>
                        <Text style={styles.expValue}>8</Text>
                        <Text style={styles.expLabel}>Attended</Text>
                    </View>
                </View>

                {/* SURFACE 4: AURA & RANK */}
                <View style={styles.statsRow}>
                    <Animated.View
                        entering={FadeInRight.delay(200)}
                        style={styles.auraCard}
                    >
                        <TouchableOpacity
                            style={styles.auraHeader}
                            onPress={() => setShowAuraInfo(!showAuraInfo)}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Ionicons name="sparkles" size={18} color="#f59e0b" />
                                <Text style={styles.auraTitle}>AURA POINTS</Text>
                            </View>
                            <Ionicons name="information-circle-outline" size={16} color="#92400e" />
                        </TouchableOpacity>
                        <Text style={styles.auraValue}>2,450</Text>
                        <View style={styles.streakBadge}>
                            <Ionicons name="flame" size={14} color="#ef4444" />
                            <Text style={styles.streakText}>5 Day Streak</Text>
                        </View>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInRight.delay(400)}
                        style={styles.rankCard}
                    >
                        <Text style={styles.rankLabel}>CAMPUS RANK</Text>
                        <Text style={styles.rankValue}>#42</Text>
                        <Text style={styles.rankSub}>Top 2% students</Text>
                    </Animated.View>
                </View>

                {/* AURA ECOSYSTEM DEFINITION (TOGGLE) */}
                {showAuraInfo && (
                    <Animated.View
                        entering={FadeInDown}
                        style={styles.auraEcosystemCard}
                    >
                        <Text style={styles.auraEcosystemTitle}>The Aura Ecosystem</Text>
                        <Text style={styles.auraEcosystemDesc}>
                            Aura Points represent your engagement impact — not popularity. They reward:
                        </Text>
                        <View style={styles.auraPillars}>
                            <View style={styles.pillar}>
                                <Ionicons name="repeat" size={18} color="#2fb979" />
                                <Text style={styles.pillarText}>Consistency</Text>
                            </View>
                            <View style={styles.pillar}>
                                <Ionicons name="shapes" size={18} color="#3b82f6" />
                                <Text style={styles.pillarText}>Diversity</Text>
                            </View>
                            <View style={styles.pillar}>
                                <Ionicons name="checkmark-circle" size={18} color="#8b5cf6" />
                                <Text style={styles.pillarText}>Follow-through</Text>
                            </View>
                        </View>
                    </Animated.View>
                )}

                {/* LEADERBOARD SECTION */}
                <View style={styles.section}>
                    <View style={styles.leaderboardHeader}>
                        <Text style={styles.sectionTitle}>Leaderboard</Text>
                        <View style={styles.leaderboardTabs}>
                            {(['This Week', 'This Month', 'All Time'] as const).map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setLeaderboardTab(tab)}
                                    style={[styles.lTab, leaderboardTab === tab && styles.lTabActive]}
                                >
                                    <Text style={[styles.lTabText, leaderboardTab === tab && styles.lTabTextActive]}>
                                        {tab === 'This Week' ? 'Week' : tab === 'This Month' ? 'Month' : 'All'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.leaderboardList}>
                        {leaderboardData[leaderboardTab].map((item, idx) => (
                            <View
                                key={item.id}
                                style={[styles.leaderboardRow, item.isMe && styles.leaderboardRowMe]}
                            >
                                <Text style={styles.rankText}>#{item.rank}</Text>
                                <Text style={[styles.lName, item.isMe && styles.lNameMe]}>{item.name}</Text>
                                <View style={styles.lPoints}>
                                    <Text style={styles.lPointsText}>{item.score.toLocaleString()}</Text>
                                    <Text style={styles.lPointsUnit}>Aura</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* BADGES SECTION */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Streaks & Badges</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.badgesScrollView}
                    >
                        {badges.map((badge) => (
                            <View key={badge.id} style={styles.badgeItem}>
                                <View style={[styles.badgeIconBg, { backgroundColor: `${badge.color}15` }]}>
                                    <Ionicons name={badge.icon as any} size={28} color={badge.color} />
                                </View>
                                <Text style={styles.badgeName}>{badge.name}</Text>
                            </View>
                        ))}
                        <TouchableOpacity style={styles.addBadge}>
                            <Ionicons name="add" size={24} color="#94a3b8" />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* SURFACE 4: GROWTH INSIGHTS (Reflections) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Growth Insights</Text>
                    {insights.map((insight) => (
                        <Animated.View
                            key={insight.id}
                            entering={FadeInDown.delay(600)}
                            style={styles.insightCard}
                        >
                            <View style={[styles.insightIcon, { backgroundColor: insight.color }]}>
                                <Ionicons name={insight.icon as any} size={20} color="#ffffff" />
                            </View>
                            <View style={styles.insightContent}>
                                <Text style={styles.insightTitle}>{insight.title}</Text>
                                <Text style={styles.insightDesc}>{insight.desc}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                        </Animated.View>
                    ))}
                </View>

                {/* LOGOUT / SETTINGS */}
                <View style={styles.footer}>
                    <Text style={styles.footerLabel}>ACCOUNT SETTINGS</Text>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Ionicons name="log-out" size={20} color="#ef4444" />
                        <Text style={styles.logoutText}>Log Out from Campus ID</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        paddingBottom: 120, // Increased for tab bar clearance
    },
    profileHeader: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#f1f5f9',
    },
    auraRing: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#f59e0b',
        borderStyle: 'dashed',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1a1a1a',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    userBio: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2fb979',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },

    // EXPERIENCE SUMMARY
    experienceSummary: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        marginBottom: 32,
    },
    expCard: {
        flex: 1,
        backgroundColor: '#f8fafc',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    expCardActive: {
        backgroundColor: '#1a1a1a',
        borderColor: '#1a1a1a',
    },
    expValue: {
        fontSize: 20,
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    expLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    // AURA & RANK
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 16,
        marginBottom: 32,
    },
    auraCard: {
        flex: 1.2,
        backgroundColor: '#fffbeb',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#fef3c7',
    },
    auraHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    auraTitle: {
        fontSize: 11,
        fontWeight: '800',
        color: '#92400e',
        letterSpacing: 1,
    },
    auraValue: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    streakText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#ef4444',
    },
    rankCard: {
        flex: 1,
        backgroundColor: '#f0f9ff',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#e0f2fe',
    },
    rankLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#075985',
        letterSpacing: 1,
        marginBottom: 8,
    },
    rankValue: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    rankSub: {
        fontSize: 12,
        fontWeight: '600',
        color: '#0ea5e9',
    },

    // BADGES
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#1a1a1a',
        paddingHorizontal: 24,
        marginBottom: 20,
        letterSpacing: -0.5,
    },
    badgesScrollView: {
        paddingHorizontal: 24,
        gap: 20,
    },
    badgeItem: {
        alignItems: 'center',
        gap: 8,
    },
    badgeIconBg: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeName: {
        fontSize: 11,
        fontWeight: '700',
        color: '#475569',
    },
    addBadge: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: '#f1f5f9',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // INSIGHTS
    insightCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 24,
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        gap: 16,
    },
    insightIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    insightContent: {
        flex: 1,
    },
    insightTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    insightDesc: {
        fontSize: 13,
        color: '#64748b',
        fontWeight: '500',
    },

    // FOOTER
    footer: {
        paddingHorizontal: 24,
        marginTop: 40,
        marginBottom: 20,
    },
    footerLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: '#94a3b8',
        letterSpacing: 1,
        marginBottom: 16,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        borderRadius: 20,
        backgroundColor: '#fff1f2',
        gap: 10,
        borderWidth: 1,
        borderColor: '#fecaca',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#ef4444',
    },
    // AURA ECOSYSTEM
    auraEcosystemCard: {
        backgroundColor: '#1a1a1a',
        marginHorizontal: 24,
        padding: 24,
        borderRadius: 24,
        marginBottom: 32,
    },
    auraEcosystemTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#ffffff',
        marginBottom: 8,
    },
    auraEcosystemDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 20,
        marginBottom: 20,
    },
    auraPillars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pillar: {
        alignItems: 'center',
        gap: 6,
    },
    pillarText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#ffffff',
        textTransform: 'uppercase',
    },
    // LEADERBOARD
    leaderboardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 24,
        marginBottom: 20,
    },
    leaderboardTabs: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
    },
    lTab: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    lTabActive: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    lTabText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
    },
    lTabTextActive: {
        color: '#1a1a1a',
    },
    leaderboardList: {
        marginHorizontal: 24,
        backgroundColor: '#f8fafc',
        borderRadius: 24,
        padding: 12,
    },
    leaderboardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 4,
    },
    leaderboardRowMe: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    rankText: {
        width: 30,
        fontSize: 13,
        fontWeight: '800',
        color: '#94a3b8',
    },
    lName: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
    },
    lNameMe: {
        fontWeight: '900',
        color: '#1a1a1a',
    },
    lPoints: {
        alignItems: 'flex-end',
    },
    lPointsText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    lPointsUnit: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
    },
});
