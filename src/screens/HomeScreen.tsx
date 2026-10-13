import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../types';
import { apiClient } from '../services/api';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const [showBalance, setShowBalance] = useState(true);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const fetchAiAdvice = async () => {
    const advice = await apiClient.getAiSmartRecommendations('Naivas groceries & weekend fuel');
    setAiInsight(advice);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Sally 😋</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('NotificationSettings')}>
            <Ionicons name="notifications-outline" size={20} color="#0c1b2a" />
          </TouchableOpacity>
        </View>

        {/* Total Loyalty Card */}
        <View style={styles.loyaltyCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.dotsRow}>
              <View style={[styles.dot, { backgroundColor: '#3b82f6' }]} />
              <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
              <View style={[styles.dot, { backgroundColor: '#10b981' }]} />
            </View>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Ionicons name={showBalance ? "eye-outline" : "eye-off-outline"} size={18} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.cardLabel}>TOTAL LOYALTY VALUE</Text>
          <Text style={styles.cardAmount}>
            {showBalance ? 'KES 4,205' : '••••••••'}
          </Text>
          <View style={styles.cardFooterRow}>
            <Text style={styles.totalPointsText}>Total points <Text style={{ fontWeight: 'bold' }}>26,110 pts</Text></Text>
            <Text style={styles.userNameBadge}>SALLY A.</Text>
          </View>
        </View>

        {/* AI Smart Assistant Banner */}
        <TouchableOpacity style={styles.aiBanner} onPress={fetchAiAdvice}>
          <View style={styles.aiBadge}>
            <Ionicons name="flash" size={14} color="#8b5cf6" />
            <Text style={styles.aiBadgeText}>AI Smart Insight</Text>
          </View>
          <Text style={styles.aiText}>
            {aiInsight || "Tap here for AI-powered redemption tips tailored to your spending habits!"}
          </Text>
        </TouchableOpacity>

        {/* Loyalty Programs Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Loyalty Program</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity onPress={() => navigation.navigate('AddScheme')}>
              <Text style={styles.actionLink}>+ Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('WalletDetail', { walletName: 'All Schemes', balance: 'KES 4,205', pts: '26,110 pts' })}>
              <Text style={styles.actionLink}>See all</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.programsScroll}>
          {[
            { name: 'Bonga', color: '#22c55e' },
            { name: 'Trade Rew...', color: '#10b981' },
            { name: 'Naivas', color: '#f97316' },
            { name: 'Quickmart', color: '#ef4444' },
          ].map((prog, idx) => (
            <TouchableOpacity key={idx} style={styles.programCard} onPress={() => navigation.navigate('WalletDetail', { walletName: prog.name, balance: 'KES 1,200', pts: '8,450 pts' })}>
              <View style={[styles.programIcon, { backgroundColor: prog.color }]} />
              <Text style={styles.programName}>{prog.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Offers for You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Offers for you</Text>
          <TouchableOpacity onPress={() => navigation.navigate('OffersTab')}>
            <Text style={styles.actionLink}>See all</Text>
          </TouchableOpacity>
        </View>

        {[
          { title: '10% OFF', subtitle: 'When you redeem 500+ points', valid: 'Valid till 27 Oct 2026' },
          { title: 'Double points this weekend', subtitle: 'Earn 2x points on all purchases', valid: 'Valid till 16 Oct 2026' },
          { title: 'Redeem 300+ points', subtitle: 'Get KES 50 off your next shop', valid: 'Valid till 20 Oct 2026' },
        ].map((offer, idx) => (
          <View key={idx} style={styles.offerCard}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerSub}>{offer.subtitle}</Text>
              <Text style={styles.offerValid}>{offer.valid}</Text>
            </View>
            <View style={styles.offerThumb} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#0c1b2a' },
  notifBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  loyaltyCard: { backgroundColor: '#102a43', borderRadius: 24, padding: 20, marginBottom: 20, shadowColor: '#102a43', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 12 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  dotsRow: { flexDirection: 'row', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  cardLabel: { fontSize: 12, fontWeight: '600', color: '#94a3b8', letterSpacing: 1, marginBottom: 4 },
  cardAmount: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  cardFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 12, marginTop: 4 },
  totalPointsText: { fontSize: 13, color: '#cbd5e1' },
  userNameBadge: { fontSize: 12, fontWeight: 'bold', color: '#fbbf24', letterSpacing: 1 },
  aiBanner: { backgroundColor: '#f3e8ff', borderWidth: 1, borderColor: '#d8b4fe', borderRadius: 16, padding: 16, marginBottom: 24 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 6 },
  aiBadgeText: { fontSize: 12, fontWeight: 'bold', color: '#7c3aed' },
  aiText: { fontSize: 13, color: '#6b21a8', lineHeight: 18 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0c1b2a' },
  actionLink: { fontSize: 14, fontWeight: '600', color: '#3b82f6' },
  programsScroll: { marginBottom: 24 },
  programCard: { width: 90, height: 90, backgroundColor: '#fff', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  programIcon: { width: 36, height: 36, borderRadius: 18, marginBottom: 8 },
  programName: { fontSize: 12, fontWeight: '600', color: '#0c1b2a' },
  offerCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  offerTitle: { fontSize: 16, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 4 },
  offerSub: { fontSize: 13, color: '#64748b', marginBottom: 6 },
  offerValid: { fontSize: 11, color: '#94a3b8' },
  offerThumb: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#e2e8f0' }
});
