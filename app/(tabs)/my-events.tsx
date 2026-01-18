import { MOCK_EVENTS, MY_EVENTS } from '@/data/events';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, Layout } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyEventsScreen() {
  const [activeTab, setActiveTab] = useState<'Current' | 'Interested' | 'Past'>('Current');
  const [showTicket, setShowTicket] = useState(false);
  const [selectedEventForTicket, setSelectedEventForTicket] = useState<any>(null);

  const getEvents = () => {
    // In a real app, these would come from the user's state
    if (activeTab === 'Current') {
      return MOCK_EVENTS.filter(e => MY_EVENTS.includes(e.id));
    }
    if (activeTab === 'Interested') {
      // Mocking interested events
      return MOCK_EVENTS.filter(e => ['evt-002', 'evt-003'].includes(e.id));
    }
    // Mocking past events
    return MOCK_EVENTS.filter(e => ['evt-004'].includes(e.id));
  };

  const events = getEvents();

  const handleTicketPress = (event: any) => {
    setSelectedEventForTicket(event);
    setShowTicket(true);
  };

  const getPrimaryActionLabel = () => {
    if (activeTab === 'Current') return 'View Entry Ticket';
    if (activeTab === 'Interested') return 'Lock My Intent';
    return 'View My Summary';
  };

  const getPrimaryActionIcon = () => {
    if (activeTab === 'Current') return 'qr-code-outline';
    if (activeTab === 'Interested') return 'lock-closed-outline';
    return 'analytics-outline';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* TICKET MODAL */}
      <Modal
        visible={showTicket}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTicket(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTicket(false)}
        >
          <Animated.View
            entering={FadeIn.duration(300)}
            style={styles.ticketCard}
          >
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketEventTitle}>{selectedEventForTicket?.title}</Text>
              <Text style={styles.ticketEventMeta}>{selectedEventForTicket?.date} • {selectedEventForTicket?.time}</Text>
            </View>

            <View style={styles.qrContainer}>
              {/* STYLIZED QR PLACEHOLDER */}
              <View style={styles.qrCode}>
                <View style={styles.qrPattern}>
                  {Array(8).fill(0).map((_, i) => (
                    <View key={i} style={styles.qrRow}>
                      {Array(8).fill(0).map((_, j) => (
                        <View
                          key={j}
                          style={[
                            styles.qrDot,
                            { opacity: Math.random() > 0.4 ? 1 : 0.1 }
                          ]}
                        />
                      ))}
                    </View>
                  ))}
                </View>
                <View style={[styles.qrCorner, styles.topL]} />
                <View style={[styles.qrCorner, styles.topR]} />
                <View style={[styles.qrCorner, styles.botL]} />
              </View>
            </View>

            <View style={styles.ticketFooter}>
              <Text style={styles.scanText}>Scan at the entrance</Text>
              <TouchableOpacity
                style={styles.closeTicketBtn}
                onPress={() => setShowTicket(false)}
              >
                <Text style={styles.closeTicketText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* CONTROL CENTER HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Control Center</Text>
        <Text style={styles.headerSub}>Manage your campus journey</Text>
      </View>

      {/* PRIMARY NAVIGATION */}
      <View style={styles.tabBar}>
        {(['Current', 'Interested', 'Past'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {events.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={64} color="#e2e8f0" />
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptyText}>
              Your campus journey is just beginning. Explore the Discover tab to find events.
            </Text>
          </View>
        ) : (
          <View style={styles.eventList}>
            {events.map((event, index) => (
              <Animated.View
                key={event.id}
                entering={FadeInDown.delay(index * 100).springify()}
                layout={Layout.springify()}
              >
                <TouchableOpacity
                  style={styles.eventCard}
                  activeOpacity={0.9}
                  onPress={() => router.push(`/event-detail/${event.id}`)}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.eventCategory}>{event.category}</Text>
                    {activeTab === 'Current' && (
                      <View style={styles.urgencyBadge}>
                        <Text style={styles.urgencyText}>Confirmed</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.eventTitle}>{event.title}</Text>

                  <View style={styles.eventMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="calendar-outline" size={14} color="#64748b" />
                      <Text style={styles.metaText}>{event.date} • {event.time}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="location-outline" size={14} color="#64748b" />
                      <Text style={styles.metaText}>{event.location}</Text>
                    </View>
                  </View>

                  {/* SINGLE PRIMARY ACTION */}
                  <TouchableOpacity
                    style={[
                      styles.primaryAction,
                      activeTab === 'Interested' && styles.interestedAction,
                      activeTab === 'Past' && styles.pastAction,
                    ]}
                    onPress={() => {
                      if (activeTab === 'Current') handleTicketPress(event);
                      else router.push(`/event-detail/${event.id}`);
                    }}
                  >
                    <Ionicons name={getPrimaryActionIcon() as any} size={18} color="#ffffff" />
                    <Text style={styles.primaryActionText}>{getPrimaryActionLabel()}</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
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
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tab: {
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2fb979',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#94a3b8',
  },
  activeTabText: {
    color: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  eventList: {
    gap: 20,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventCategory: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  urgencyBadge: {
    backgroundColor: '#e6f7f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2fb979',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a1a',
    lineHeight: 26,
    marginBottom: 12,
  },
  eventMeta: {
    gap: 6,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  primaryAction: {
    backgroundColor: '#2fb979',
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  interestedAction: {
    backgroundColor: '#1a1a1a',
  },
  pastAction: {
    backgroundColor: '#64748b',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
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
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  ticketCard: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 32,
    overflow: 'hidden',
  },
  ticketHeader: {
    padding: 24,
    backgroundColor: '#2fb979',
  },
  ticketEventTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 28,
  },
  ticketEventMeta: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginTop: 4,
  },
  qrContainer: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  qrPattern: {
    gap: 4,
  },
  qrRow: {
    flexDirection: 'row',
    gap: 4,
  },
  qrDot: {
    width: 16,
    height: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
  },
  qrCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 6,
    borderColor: '#1a1a1a',
  },
  topL: { top: 15, left: 15, borderBottomWidth: 0, borderRightWidth: 0 },
  topR: { top: 15, right: 15, borderBottomWidth: 0, borderLeftWidth: 0 },
  botL: { bottom: 15, left: 15, borderTopWidth: 0, borderRightWidth: 0 },
  ticketFooter: {
    padding: 24,
    paddingTop: 0,
    alignItems: 'center',
  },
  scanText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '700',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeTicketBtn: {
    backgroundColor: '#f1f5f9',
    width: '100%',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeTicketText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});

