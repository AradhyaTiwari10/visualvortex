import { MOCK_EVENTS } from '@/data/events';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Animated, {
  FadeInDown,
  Layout,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');


const FILTERS = ['All', 'Tech', 'Culture', 'Sports', 'Leadership', 'Social'];

export default function DiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on active filter and search query
  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesFilter = activeFilter === 'All' ||
      event.category.toLowerCase() === activeFilter.toLowerCase() ||
      (activeFilter === 'Tech' && (event.category === 'WORKSHOP' || event.category === 'TECH'));

    const matchesSearch = searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Hello, Aarav!</Text>
            <Text style={styles.subGreeting}>Find what's happening today</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=aarav' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, clubs, or venues"
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={20} color="#2fb979" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Surface 1: Soft Category Balance Nudge */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.nudgeContainer}
        >
          <View style={styles.nudgeIcon}>
            <Ionicons name="sparkles" size={18} color="#2fb979" />
          </View>
          <View style={styles.nudgeTextContainer}>
            <Text style={styles.nudgeTitle}>Balanced Growth</Text>
            <Text style={styles.nudgeSubtitle}>Try a Leadership event to round out your profile?</Text>
          </View>
          <TouchableOpacity style={styles.nudgeClose}>
            <Ionicons name="close" size={16} color="#94a3b8" />
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.sectionTitle}>Featured Events</Text>

        {filteredEvents.map((event, index) => (
          <Animated.View
            key={event.id}
            entering={FadeInDown.delay(300 + (index * 100)).springify()}
            layout={Layout.springify()}
          >
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: '/event-detail/[id]', params: { id: event.id } })}
            >
              <Image source={{ uri: event.imageUrl }} style={styles.cardImage} />

              {/* Primary Signal: Match % */}
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{event.matchPercentage}% Match</Text>
              </View>

              {/* Secondary Signal: Status (if exists) */}
              {event.urgencySignal && (
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{event.urgencySignal}</Text>
                </View>
              )}

              <View style={styles.cardBody}>
                <View style={styles.cardMeta}>
                  <Text style={styles.eventCategory}>{event.category}</Text>
                  {event.teamNeeded && (
                    <View style={styles.teamBadge}>
                      <Ionicons name="people" size={12} color="#4c6ef5" />
                      <Text style={styles.teamText}>Team spots</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.eventTitle}>{event.title}</Text>

                {/* Slot Market Signal (Simple Progress Bar) */}
                {(() => {
                  const availableSpots = event.slotsTotal - event.slotsFilled;
                  const isGreen = availableSpots > 30;
                  const isYellow = availableSpots > 20;
                  const statusColor = isGreen ? '#10b981' : (isYellow ? '#f59e0b' : '#f43f5e');
                  const statusBg = isGreen ? '#f0fdf4' : (isYellow ? '#fffbeb' : '#f8fafc');

                  return (
                    <View style={[styles.slotMarketContainer, { backgroundColor: statusBg }]}>
                      <View style={styles.slotMarketHeader}>
                        <Text style={styles.slotMarketLabel}>Availability</Text>
                        <Text style={[styles.slotMarketValue, { color: statusColor }]}>
                          {availableSpots} left
                        </Text>
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
                    </View>
                  );
                })()}

                <View style={styles.eventFooter}>
                  <View style={styles.eventInfo}>
                    <Ionicons name="calendar-outline" size={14} color="#64748b" />
                    <Text style={styles.eventInfoText}>{event.date}</Text>
                  </View>
                  <View style={styles.eventInfo}>
                    <Ionicons name="location-outline" size={14} color="#64748b" />
                    <Text style={styles.eventInfoText} numberOfLines={1}>{event.location}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: -0.8,
  },
  subGreeting: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  profileIcon: {
    shadowColor: '#2fb979',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  filterBtn: {
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  filtersContainer: {
    marginTop: 20,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipActive: {
    backgroundColor: '#2fb979',
    borderColor: '#2fb979',
    shadowColor: '#2fb979',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.2,
  },
  filterTextActive: {
    color: '#ffffff',
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a1a',
    marginBottom: 20,
    letterSpacing: -0.4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginBottom: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  nudgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  nudgeIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nudgeTextContainer: {
    flex: 1,
  },
  nudgeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#166534',
    marginBottom: 2,
  },
  nudgeSubtitle: {
    fontSize: 12,
    color: '#15803d',
    fontWeight: '500',
  },
  nudgeClose: {
    padding: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  matchBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(47, 185, 121, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  matchText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: 0.2,
  },
  cardBody: {
    padding: 20,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventCategory: {
    fontSize: 11,
    fontWeight: '900',
    color: '#2fb979',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  teamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  teamText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4c6ef5',
    textTransform: 'uppercase',
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  slotMarketContainer: {
    marginBottom: 20,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  slotMarketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  slotMarketLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  slotMarketValue: {
    fontSize: 11,
    fontWeight: '800',
    color: '#f43f5e',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#f43f5e',
    borderRadius: 3,
  },
  eventFooter: {
    flexDirection: 'row',
    gap: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  eventInfoText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
});
