import { MOCK_EVENTS, MY_EVENTS } from '@/data/events';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import Animated, {
    FadeInDown
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function EventDetailScreen() {
    const { width } = useWindowDimensions();
    const { id } = useLocalSearchParams();
    const event = MOCK_EVENTS.find(e => e.id === id);

    const [showClashModal, setShowClashModal] = React.useState(false);
    const [clashStatus, setClashStatus] = React.useState<'none' | 'updated'>('none');
    const [showToast, setShowToast] = React.useState(false);
    const [isInterested, setIsInterested] = React.useState(false);

    if (!event) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>Event not found</Text>
            </SafeAreaView>
        );
    }

    // Surface 2: Clash Detection Logic
    const clashingEventId = MY_EVENTS.find(myId => {
        const myEvent = MOCK_EVENTS.find(me => me.id === myId);
        return myEvent && myEvent.date === event.date && myEvent.id !== event.id;
    });
    const clashingEvent = MOCK_EVENTS.find(e => e.id === clashingEventId);

    // Nearby Events (Mocked: same date, different location/time)
    const nearbyEvents = MOCK_EVENTS.filter(e => e.date === event.date && e.id !== event.id && e.id !== clashingEventId);

    const handleCommit = () => {
        if (clashingEvent) {
            setShowClashModal(true);
        } else {
            router.push('/confirmation');
        }
    };

    const handleInterested = () => {
        setIsInterested(prev => !prev);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleClashSwitch = () => {
        // CASE A: User switches to new event
        // 1. Move clashing event to interested
        // 2. Commit new event
        setShowClashModal(false);
        setClashStatus('updated');
        setTimeout(() => {
            setClashStatus('none');
            router.push('/confirmation');
        }, 1500);
    };

    const handleClashKeep = () => {
        // CASE B: User keeps existing event
        // 1. Keep clashing event as upcoming
        // 2. Save new event as interested
        setShowClashModal(false);
        setIsInterested(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Determine regret level
    const regretLevel = event.regretScore >= 85 ? 'High' : event.regretScore >= 70 ? 'Moderate' : 'Low';
    const regretColor = event.regretScore >= 85 ? '#ef4444' : event.regretScore >= 70 ? '#f59e0b' : '#10b981';

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* HERO IMAGE */}
                <View style={styles.headerImageContainer}>
                    <Image source={{ uri: event.imageUrl }} style={styles.headerImage} />
                    <SafeAreaView style={styles.headerOverlay}>
                        <View style={styles.topNav}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.iconCircle}>
                                <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconCircle}>
                                <Ionicons name="share-outline" size={24} color="#1a1a1a" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>

                {/* CLASH FEEDBACK TOAST */}
                {clashStatus === 'updated' && (
                    <Animated.View entering={FadeInDown} style={styles.toast}>
                        <Ionicons name="checkmark-circle" size={18} color="#ffffff" />
                        <Text style={styles.toastText}>Your schedule has been updated.</Text>
                    </Animated.View>
                )}

                <View style={styles.content}>
                    {/* Surface 2: Clash Preview (Non-Intrusive) */}
                    {clashingEvent && (
                        <View style={styles.clashPreview}>
                            <Ionicons name="time-outline" size={14} color="#92400e" />
                            <Text style={styles.clashPreviewText}>
                                Overlaps with {clashingEvent.title}
                            </Text>
                        </View>
                    )}

                    {/* SECTION 1: EVENT HEADER */}
                    <View style={styles.headerSection}>
                        <View style={styles.matchBadge}>
                            <Text style={styles.matchText}>{event.matchPercentage}% Match</Text>
                        </View>
                        <Text style={styles.category}>{event.category}</Text>
                        <Text style={styles.title}>{event.title}</Text>
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Ionicons name="calendar-outline" size={16} color="#64748b" />
                                <Text style={styles.metaText}>{event.date} • {event.time}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="location-outline" size={16} color="#64748b" />
                                <Text style={styles.metaText}>{event.location}</Text>
                            </View>
                        </View>
                    </View>


                    {/* SECTION 2: DECISION PANEL - HERO MOMENT */}
                    <View style={styles.decisionPanel}>
                        <Text style={styles.decisionQuestion}>Should you attend this?</Text>

                        <View style={styles.regretScoreContainer}>
                            <View style={styles.regretScoreCircle}>
                                <Text style={[styles.regretScoreNumber, { color: regretColor }]}>
                                    {event.regretScore}
                                </Text>
                                <Text style={styles.regretScoreOutOf}>/100</Text>
                            </View>
                            <View style={styles.regretContent}>
                                <Text style={styles.regretLabel}>REGRET SCORE</Text>
                                <Text style={[styles.regretLevel, { color: regretColor }]}>
                                    {regretLevel} regret reported
                                </Text>
                            </View>
                        </View>

                        <View style={styles.regretMissContainer}>
                            <Text style={styles.regretMissTitle}>What will you miss?</Text>
                            <Text style={styles.regretInsight}>{event.regretInsight}</Text>
                            <View style={styles.skillsLostList}>
                                <Text style={styles.skillsLostLabel}>Skills you'll lose out on:</Text>
                                {event.skillsGained.map((skill, si) => (
                                    <View key={si} style={styles.skillMatchRow}>
                                        <View style={styles.dot} />
                                        <Text style={styles.skillMatchText}>{skill}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* SECTION 3: WHY THIS FITS YOU */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Why this fits you</Text>
                        {event.whyFitsYou.map((reason, index) => (
                            <View key={index} style={styles.reasonRow}>
                                <View style={styles.checkCircle}>
                                    <Ionicons name="checkmark" size={14} color="#2fb979" />
                                </View>
                                <Text style={styles.reasonText}>{reason}</Text>
                            </View>
                        ))}
                    </View>

                    {/* SECTION 4: COMMITMENT DETAILS */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Availability & Commitment</Text>

                        {(() => {
                            const availableSpots = event.slotsTotal - event.slotsFilled;
                            const isGreen = availableSpots > 30;
                            const isYellow = availableSpots > 20;
                            const statusColor = isGreen ? '#10b981' : (isYellow ? '#f59e0b' : '#e11d48');
                            const statusBg = isGreen ? '#f0fdf4' : (isYellow ? '#fffbeb' : '#fff1f2');
                            const statusBorder = isGreen ? '#dcfce7' : (isYellow ? '#fef3c7' : '#ffe4e6');

                            return (
                                <View style={[styles.availabilityBox, { backgroundColor: statusBg, borderColor: statusBorder }]}>
                                    <View style={styles.availabilityHeader}>
                                        <Text style={[styles.availabilityLabel, { color: statusColor }]}>Slot Market Status</Text>
                                        <Text style={[styles.availabilityValue, { color: statusColor }]}>{event.slotsFilled}/{event.slotsTotal} filled</Text>
                                    </View>
                                    <View style={styles.progressBarBg}>
                                        <View
                                            style={[
                                                styles.progressBarFill,
                                                {
                                                    width: `${(event.slotsFilled / event.slotsTotal) * 100}%`,
                                                    backgroundColor: statusColor
                                                }
                                            ]}
                                        />
                                    </View>
                                    <Text style={[styles.availabilitySub, { color: statusColor }]}>
                                        {availableSpots} spots left. {isGreen ? 'Plentiful availability.' : (isYellow ? 'Moderate availability.' : 'Filling fast!')}
                                    </Text>
                                </View>
                            );
                        })()}

                        {event.teamNeeded && (
                            <View style={[styles.availabilityBox, { marginTop: 12, backgroundColor: '#eff6ff', borderColor: '#dbeafe' }]}>
                                <View style={styles.availabilityHeader}>
                                    <Text style={[styles.availabilityLabel, { color: '#1e40af' }]}>Team Formation</Text>
                                    <Text style={[styles.availabilityValue, { color: '#1e40af' }]}>Open</Text>
                                </View>
                                <Text style={[styles.availabilitySub, { color: '#1e40af' }]}>
                                    This event requires a team of {event.teamSize}. Looking for 2 more members with similar interests.
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* SECTION 5: ABOUT */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About this event</Text>
                        <Text style={styles.description}>{event.description}</Text>

                        {/* TRUST & TRANSPARENCY NOTICE */}
                        <View style={styles.trustNotice}>
                            <Ionicons name="information-circle-outline" size={14} color="#94a3b8" />
                            <Text style={styles.trustNoticeText}>
                                Regret Score is calculated using your goals, past participation, and event relevance.
                            </Text>
                        </View>
                    </View>

                    {/* SECTION 6: JOURNEY ROADMAP (NEW REDESIGN) */}
                    <View style={styles.roadmapSection}>
                        {/* JOURNEY TOP STATS */}
                        <View style={styles.journeyStatsRow}>
                            <View style={styles.userAuraBadge}>
                                <Ionicons name="flash" size={14} color="#2fb979" />
                                <View>
                                    <Text style={styles.auraLevelText}>LEVEL 12</Text>
                                    <Text style={styles.auraNameText}>Campus Explorer</Text>
                                </View>
                            </View>
                            <View style={styles.journeyMetaBadges}>
                                <View style={styles.flameBadge}>
                                    <Text style={styles.flameEmoji}>🔥</Text>
                                    <Text style={styles.flameText}>3</Text>
                                </View>
                                <View style={styles.xpBadge}>
                                    <Text style={styles.xpText}>450 XP</Text>
                                </View>
                            </View>
                        </View>

                        {/* UNIT PROGRESS CARD */}
                        <View style={styles.unitProgressCard}>
                            <View style={styles.unitHeader}>
                                <View>
                                    <Text style={styles.unitLabel}>CURRENT UNIT</Text>
                                    <Text style={styles.unitTitle}>Freshman Welcome Week</Text>
                                </View>
                                <Ionicons name="book-outline" size={24} color="#ffffff" opacity={0.8} />
                            </View>

                            <View style={styles.unitProgressBarContainer}>
                                <View style={styles.unitProgressBarBg}>
                                    <View style={[styles.unitProgressBarFill, { width: '60%' }]} />
                                </View>
                                <Text style={styles.unitProgressText}>6 OF 10 EVENTS COMPLETED</Text>
                            </View>
                        </View>

                        <View style={styles.pathWrapper}>
                            <View style={styles.wavyLineCentric} />

                            {/* Zone Label */}
                            <View style={styles.zoneLabel}>
                                <Text style={styles.zoneLabelText}>SOCIAL QUAD ZONE</Text>
                            </View>

                            {/* Node 1: Cleared */}
                            <View style={styles.nodeWrapperCentric}>
                                <View style={styles.clearedBadge}>
                                    <Text style={styles.clearedBadgePrefix}>CLEARED</Text>
                                    <Text style={styles.clearedBadgeTitle}>Orientation</Text>
                                </View>
                                <View style={styles.nodeCircleCleared}>
                                    <Ionicons name="checkmark" size={28} color="#ffffff" />
                                </View>
                            </View>

                            {/* Node 2: Current Destination Card */}
                            <View style={styles.nodeWrapperCentric}>
                                <View style={styles.destinationCard}>
                                    <View style={styles.destinationCardHeader}>
                                        <Image
                                            source={{ uri: 'https://i.pravatar.cc/150?u=host' }}
                                            style={styles.destinationAvatar}
                                        />
                                        <View style={styles.destinationInfo}>
                                            <Text style={styles.destLabel}>CURRENT DESTINATION</Text>
                                            <Text style={styles.destTitle}>{event.title}</Text>
                                            <Text style={styles.destSub}>{event.time} • {event.location}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity style={styles.viewDetailsBtn}>
                                        <Text style={styles.viewDetailsText}>View Details</Text>
                                    </TouchableOpacity>
                                    <View style={styles.cardPointer} />
                                </View>
                            </View>

                            {/* Node 3: Aura Point Activity */}
                            <View style={styles.nodeWrapperCentric}>
                                <View style={styles.nodeCircleAura}>
                                    <Ionicons name="flash" size={32} color="#ffffff" />
                                </View>
                            </View>

                            {/* Node 4: Reward Box */}
                            <View style={styles.nodeWrapperCentric}>
                                <View style={styles.rewardIndicator}>
                                    <Text style={styles.rewardIndicatorText}>REWARD</Text>
                                </View>
                                <View style={styles.rewardBox}>
                                    <Ionicons name="gift" size={32} color="#ffffff" />
                                </View>
                            </View>

                            {/* Node 5: Locked */}
                            <View style={styles.nodeWrapperCentric}>
                                <View style={styles.nodeCircleLocked}>
                                    <Ionicons name="lock-closed" size={24} color="#cbd5e1" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {showToast && (
                <Animated.View entering={FadeInDown} style={styles.toast}>
                    <Ionicons name="bookmark" size={18} color="#ffffff" />
                    <Text style={styles.toastText}>Saved for later.</Text>
                </Animated.View>
            )}

            {/* ACTION FOOTER */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleCommit}
                >
                    <Ionicons name="lock-closed" size={20} color="#ffffff" />
                    <Text style={styles.primaryButtonText}>Lock My Intent</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={handleInterested}
                >
                    <Text style={styles.secondaryButtonText}>{isInterested ? "Saved" : "Save for Later"}</Text>
                </TouchableOpacity>
            </View>

            {/* TIME CLASH RESOLUTION MODAL */}
            <Modal
                visible={showClashModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowClashModal(false)}
            >
                <View style={styles.clashModalOverlay}>
                    <Animated.View entering={FadeInDown} style={styles.clashModalContent}>
                        <View style={styles.clashModalHeader}>
                            <Text style={styles.clashModalEmoji}>🤝</Text>
                            <Text style={styles.clashModalTitle}>Tough choice!</Text>
                            <Text style={styles.clashModalDesc}>These events overlap in your schedule.</Text>
                        </View>

                        <View style={styles.clashComparison}>
                            {/* Current committed event */}
                            <View style={styles.clashSlot}>
                                <Text style={styles.slotLabel}>EXISTING</Text>
                                <View style={[styles.slotCard, styles.slotCardMuted]}>
                                    <Text style={styles.slotEventTitle} numberOfLines={2}>{clashingEvent?.title}</Text>
                                    <View style={styles.slotMeta}>
                                        <Text style={styles.slotMatchMuted}>{clashingEvent?.matchPercentage}% Match</Text>
                                    </View>
                                    <View style={styles.scoreRow}>
                                        <Text style={styles.scoreLabel}>Impact Score</Text>
                                        <Text style={styles.scoreValueMuted}>{clashingEvent?.regretScore}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.clashVS}>
                                <Text style={styles.vsText}>VS</Text>
                            </View>

                            {/* New event */}
                            <View style={styles.clashSlot}>
                                <Text style={styles.slotLabel}>HIGHER IMPACT</Text>
                                <View style={[styles.slotCard, styles.slotCardHighlight]}>
                                    <Text style={styles.slotEventTitle} numberOfLines={2}>{event.title}</Text>
                                    <View style={styles.slotMeta}>
                                        <Text style={[styles.slotMatch, { color: '#2fb979' }]}>{event.matchPercentage}% Match</Text>
                                        <View style={styles.impactBadge}>
                                            <Text style={styles.impactText}>Goal Match</Text>
                                        </View>
                                    </View>
                                    <View style={styles.scoreRow}>
                                        <Text style={styles.scoreLabelHighlight}>Impact Score</Text>
                                        <Text style={styles.scoreValueHighlight}>{event.regretScore}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.clashActions}>
                            <TouchableOpacity style={styles.clashPrimaryBtn} onPress={handleClashSwitch}>
                                <Text style={styles.clashPrimaryBtnText}>Switch to {event.title}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.clashSecondaryBtn} onPress={handleClashKeep}>
                                <Text style={styles.clashSecondaryBtnText}>Keep {clashingEvent?.title}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.clashCloseBtn}
                            onPress={() => setShowClashModal(false)}
                        >
                            <Text style={styles.clashCloseText}>Decide later</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        paddingBottom: 140,
    },
    headerImageContainer: {
        width: SCREEN_WIDTH,
        height: 240,
    },
    headerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    headerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    content: {
        padding: 24,
    },
    toast: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: '#1a1a1a',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    toastText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
    },
    clashPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#fffbeb',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 20,
    },
    clashPreviewText: {
        fontSize: 12,
        color: '#92400e',
        fontWeight: '800',
    },
    headerSection: {
        marginBottom: 32,
    },
    matchBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#e6f7f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 12,
    },
    matchText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2fb979',
        letterSpacing: 0.3,
    },
    category: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748b',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1a1a1a',
        lineHeight: 34,
        marginBottom: 16,
    },
    metaRow: {
        gap: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
    },
    metaText: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
    },
    decisionPanel: {
        backgroundColor: '#fffbf5',
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
        borderWidth: 2,
        borderColor: '#ffedc2',
    },
    decisionQuestion: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 20,
    },
    regretScoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 20,
    },
    regretScoreCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#ffedc2',
    },
    regretScoreNumber: {
        fontSize: 36,
        fontWeight: '900',
        lineHeight: 40,
    },
    regretScoreOutOf: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94a3b8',
    },
    regretContent: {
        flex: 1,
    },
    regretLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#92400e',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    regretLevel: {
        fontSize: 16,
        fontWeight: '700',
    },
    regretMissContainer: {
        marginTop: 12,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    regretMissTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    regretInsight: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 20,
        opacity: 0.9,
        marginBottom: 12,
    },
    skillsLostList: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        padding: 12,
        borderRadius: 12,
    },
    skillsLostLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    skillMatchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#64748b',
    },
    skillMatchText: {
        fontSize: 13,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    reasonRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 12,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#e6f7f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    reasonText: {
        flex: 1,
        fontSize: 15,
        color: '#1a1a1a',
        lineHeight: 22,
        fontWeight: '500',
    },
    availabilityBox: {
        backgroundColor: '#fff1f2',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ffe4e6',
    },
    availabilityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    availabilityLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#9f1239',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    availabilityValue: {
        fontSize: 14,
        fontWeight: '900',
        color: '#e11d48',
    },
    availabilitySub: {
        fontSize: 13,
        color: '#e11d48',
        marginTop: 10,
        fontWeight: '500',
        fontStyle: 'italic',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#e11d48',
        borderRadius: 4,
    },
    description: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
    },
    trustNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    trustNoticeText: {
        fontSize: 11,
        color: '#94a3b8',
        lineHeight: 16,
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
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 8,
    },
    primaryButton: {
        backgroundColor: '#2fb979',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
        shadowColor: '#2fb979',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
    },
    secondaryButton: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#64748b',
        fontSize: 15,
        fontWeight: '600',
    },
    // CONTEXT MAP
    contextMapSection: {
        marginBottom: 32,
    },
    mapTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    contextMapTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    contextMapSub: {
        fontSize: 13,
        color: '#2fb979',
        fontWeight: '800',
    },
    miniMap: {
        height: 120,
        backgroundColor: '#f1f5f9',
        borderRadius: 20,
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
    },
    mapPin: {
        position: 'absolute',
        top: 50,
        left: 50,
    },
    nearbyDot: {
        position: 'absolute',
    },
    nearbyList: {
        gap: 12,
    },
    nearbyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    nearbyIcon: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: '#f0fdf4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nearbyName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    nearbyTime: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
    // JOURNEY REDESIGN STYLES
    journeyStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    userAuraBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    auraLevelText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94a3b8',
        letterSpacing: 0.5,
    },
    auraNameText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    journeyMetaBadges: {
        flexDirection: 'row',
        gap: 8,
    },
    flameBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff7ed',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    flameEmoji: {
        fontSize: 12,
    },
    flameText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#f97316',
    },
    xpBadge: {
        backgroundColor: '#f0fdf4',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    xpText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#2fb979',
    },
    unitProgressCard: {
        backgroundColor: '#2fb979',
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        shadowColor: '#2fb979',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 10,
    },
    unitHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    unitLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1,
        marginBottom: 4,
    },
    unitTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#ffffff',
    },
    unitProgressBarContainer: {
        gap: 12,
    },
    unitProgressBarBg: {
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    unitProgressBarFill: {
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    unitProgressText: {
        fontSize: 11,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.8)',
    },
    contrastToggle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    pathWrapper: {
        alignItems: 'center',
        paddingVertical: 20,
        position: 'relative',
    },
    wavyLineCentric: {
        position: 'absolute',
        width: 6,
        top: 0,
        bottom: 0,
        backgroundColor: '#f0fdf4',
        borderRadius: 3,
        zIndex: -1,
    },
    zoneLabel: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 40,
        marginTop: -10,
    },
    zoneLabelText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#94a3b8',
        letterSpacing: 1,
    },
    nodeWrapperCentric: {
        alignItems: 'center',
        marginBottom: 60,
        width: '100%',
    },
    clearedBadge: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    clearedBadgePrefix: {
        fontSize: 9,
        fontWeight: '900',
        color: '#94a3b8',
        marginBottom: 2,
    },
    clearedBadgeTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    nodeCircleCleared: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#2fb979',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 6,
        borderColor: '#f0fdf4',
        shadowColor: '#2fb979',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    destinationCard: {
        backgroundColor: '#ffffff',
        width: '90%',
        borderRadius: 28,
        padding: 20,
        borderWidth: 2,
        borderColor: '#f0fdf4',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 12,
        position: 'relative',
    },
    destinationCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    destinationAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#f0fdf4',
    },
    destinationInfo: {
        flex: 1,
    },
    destLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#2fb979',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    destTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    destSub: {
        fontSize: 13,
        color: '#64748b',
        fontWeight: '600',
    },
    viewDetailsBtn: {
        backgroundColor: '#2fb979',
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewDetailsText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '800',
    },
    cardPointer: {
        position: 'absolute',
        bottom: -10,
        left: '50%',
        marginLeft: -10,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#ffffff',
    },
    nodeCircleAura: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#2fb979',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 8,
        borderColor: '#f0fdf4',
        shadowColor: '#2fb979',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    rewardIndicator: {
        backgroundColor: '#f43f5e',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 8,
    },
    rewardIndicatorText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#ffffff',
    },
    rewardBox: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#f59e0b',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#f59e0b',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 4,
        borderColor: '#fef3c7',
    },
    nodeCircleLocked: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#f1f5f9',
    },
    // CLASH MODAL
    clashModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    clashModalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: 40,
    },
    clashModalHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    clashModalEmoji: {
        fontSize: 40,
        marginBottom: 12,
    },
    clashModalTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    clashModalDesc: {
        fontSize: 15,
        color: '#64748b',
        fontWeight: '600',
        textAlign: 'center',
    },
    clashComparison: {
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: 12,
        marginBottom: 32,
    },
    clashVS: {
        backgroundColor: '#f1f5f9',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        alignSelf: 'center',
    },
    vsText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94a3b8',
    },
    clashSlot: {
        flex: 1,
    },
    slotLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94a3b8',
        letterSpacing: 1,
        marginBottom: 8,
        textAlign: 'center',
    },
    slotCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        minHeight: 180,
    },
    slotCardMuted: {
        opacity: 0.6,
        backgroundColor: '#f1f5f9',
    },
    slotCardHighlight: {
        backgroundColor: '#f0fdf4',
        borderColor: '#2fb979',
        borderWidth: 2,
    },
    slotEventTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#1a1a1a',
        lineHeight: 18,
        marginBottom: 4,
    },
    slotMeta: {
        marginBottom: 12,
    },
    slotMatchMuted: {
        fontSize: 11,
        fontWeight: '700',
        color: '#94a3b8',
    },
    slotMatch: {
        fontSize: 11,
        fontWeight: '700',
        color: '#2fb979',
    },
    impactBadge: {
        backgroundColor: 'rgba(47, 185, 121, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
    impactText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#2fb979',
        textTransform: 'uppercase',
    },
    scoreRow: {
        marginTop: 'auto',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    scoreLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    scoreLabelHighlight: {
        fontSize: 9,
        fontWeight: '700',
        color: '#10b981',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    scoreValueMuted: {
        fontSize: 18,
        fontWeight: '900',
        color: '#64748b',
    },
    scoreValueHighlight: {
        fontSize: 20,
        fontWeight: '900',
        color: '#10b981',
    },
    clashActions: {
        gap: 12,
        marginBottom: 16,
    },
    clashPrimaryBtn: {
        backgroundColor: '#2fb979',
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2fb979',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    clashPrimaryBtnText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '800',
        textAlign: 'center',
        paddingHorizontal: 12,
    },
    clashSecondaryBtn: {
        backgroundColor: '#f8fafc',
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    clashSecondaryBtnText: {
        color: '#64748b',
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
        paddingHorizontal: 12,
    },
    clashCloseBtn: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    clashCloseText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#94a3b8',
    },
    roadmapSection: {
        marginTop: 40,
        paddingTop: 32,
    },
});
