import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types';

type Props = BottomTabScreenProps<MainTabParamList, 'OffersTab'>;

export default function OffersScreen({}: Props) {
  const [filter, setFilter] = useState<'All' | 'Near me' | 'My brands'>('All');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Offers for you</Text>

        <View style={styles.filterRow}>
          {['All', 'Near me', 'My brands'].map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.filterChip, filter === cat && styles.filterChipActive]}
              onPress={() => setFilter(cat as any)}
            >
              <Text style={[styles.filterText, filter === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {[
          { title: '10% OFF', desc: 'When you redeem 500+ points', valid: 'Valid till 27 Oct 2026' },
          { title: 'Double points this weekend', desc: 'Earn 2x points on all purchases', valid: 'Valid till 16 Oct 2026' },
          { title: 'Redeem 300+ points', desc: 'Get KES 50 off your next shop', valid: 'Valid till 20 Oct 2026' },
        ].map((item, idx) => (
          <View key={idx} style={styles.offerCard}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.offerTitle}>{item.title}</Text>
              <Text style={styles.offerDesc}>{item.desc}</Text>
              <Text style={styles.offerValid}>{item.valid}</Text>
            </View>
            <View style={styles.offerImg} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scroll: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 16 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#e2e8f0' },
  filterChipActive: { backgroundColor: '#0c1b2a' },
  filterText: { fontSize: 14, fontWeight: '600', color: '#475569' },
  filterTextActive: { color: '#fff' },
  offerCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  offerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 6 },
  offerDesc: { fontSize: 14, color: '#64748b', marginBottom: 8 },
  offerValid: { fontSize: 12, color: '#94a3b8' },
  offerImg: { width: 90, height: 90, borderRadius: 12, backgroundColor: '#cbd5e1' }
});
