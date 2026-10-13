import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'WalletsTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function WalletScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'Transactions' | 'Details'>('Transactions');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Top Navigation / Back */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#0c1b2a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('AccountLimits')}>
            <Ionicons name="ellipsis-vertical" size={20} color="#0c1b2a" />
          </TouchableOpacity>
        </View>

        {/* Balance Overview */}
        <View style={styles.balanceContainer}>
          <View style={styles.avatarGroup}>
            <View style={[styles.avatarCircle, { backgroundColor: '#334155' }]} />
            <View style={[styles.avatarCircleOverlap, { backgroundColor: '#f59e0b' }]} />
          </View>
          <Text style={styles.balanceLabel}>MyPoints balance</Text>
          <Text style={styles.balanceAmount}>4,205 KES</Text>
          <Text style={styles.pointsSubText}>26,110 pts</Text>

          <TouchableOpacity style={styles.limitsBtn} onPress={() => navigation.navigate('AccountLimits')}>
            <Ionicons name="lock-closed-outline" size={14} color="#64748b" style={{ marginRight: 6 }} />
            <Text style={styles.limitsBtnText}>View account limits</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.actionsRow}>
          {[
            { title: 'Airtime', icon: 'call-outline', screen: 'Airtime' },
            { title: 'Data', icon: 'wifi-outline', screen: 'Data' },
            { title: 'Buy voucher', icon: 'ticket-outline', screen: 'BuyVoucher' },
            { title: 'Redeem voucher', icon: 'gift-outline', screen: 'RedeemVoucher' },
          ].map((act, idx) => (
            <TouchableOpacity key={idx} style={styles.actionItem} onPress={() => navigation.navigate(act.screen as any)}>
              <View style={styles.actionCircle}>
                <Ionicons name={act.icon as any} size={22} color="#0c1b2a" />
              </View>
              <Text style={styles.actionTitle}>{act.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabSwitcher}>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'Transactions' && styles.tabBtnActive]}
            onPress={() => setActiveTab('Transactions')}
          >
            <Text style={[styles.tabText, activeTab === 'Transactions' && styles.tabTextActive]}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'Details' && styles.tabBtnActive]}
            onPress={() => setActiveTab('Details')}
          >
            <Text style={[styles.tabText, activeTab === 'Details' && styles.tabTextActive]}>Account details</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Transactions' ? (
          <View style={styles.listCard}>
            {[
              { title: 'Earned at Naivas – Waiyaki Way', date: '12 May 2024', amount: '+350 pts' },
              { title: 'Earned at Naivas – Kitengela', date: '07 May 2024', amount: '+280 pts' },
              { title: 'Earned at Naivas – Thika Road', date: '02 May 2024', amount: '+420 pts' },
            ].map((tx, idx) => (
              <View key={idx} style={styles.txRow}>
                <View>
                  <Text style={styles.txTitle}>{tx.title}</Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
                <Text style={styles.txAmount}>{tx.amount}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.listCard}>
            {[
              { label: 'Account holder', value: 'Sally Achieng' },
              { label: 'Loyalty program', value: 'MyPoints' },
              { label: 'Loyalty number', value: 'MP-100221' },
              { label: 'Available', value: '26,110 pts · KES 4,205' },
              { label: 'Closed voucher', value: 'KES 0' },
            ].map((det, idx) => (
              <View key={idx} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{det.label}</Text>
                <Text style={styles.detailValue}>{det.value}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scroll: { padding: 20, paddingBottom: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  balanceContainer: { alignItems: 'center', marginBottom: 24 },
  avatarGroup: { width: 56, height: 56, position: 'relative', marginBottom: 12 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, position: 'absolute', top: 0, left: 0 },
  avatarCircleOverlap: { width: 32, height: 32, borderRadius: 16, position: 'absolute', bottom: 0, right: 0 },
  balanceLabel: { fontSize: 14, color: '#64748b', marginBottom: 4 },
  balanceAmount: { fontSize: 36, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 2 },
  pointsSubText: { fontSize: 14, fontWeight: '600', color: '#64748b', marginBottom: 16 },
  limitsBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#edf2f7', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  limitsBtnText: { fontSize: 13, fontWeight: '600', color: '#475569' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  actionItem: { alignItems: 'center', width: '23%' },
  actionCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#dbeafe', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionTitle: { fontSize: 12, fontWeight: '600', color: '#0c1b2a', textAlign: 'center' },
  tabSwitcher: { flexDirection: 'row', backgroundColor: '#e2e8f0', borderRadius: 16, padding: 4, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  tabBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  tabText: { fontSize: 14, fontWeight: '600', color: '#64748b' },
  tabTextActive: { color: '#0c1b2a' },
  listCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  txRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  txTitle: { fontSize: 14, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 4 },
  txDate: { fontSize: 12, color: '#94a3b8' },
  txAmount: { fontSize: 15, fontWeight: 'bold', color: '#16a34a' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  detailLabel: { fontSize: 14, color: '#64748b' },
  detailValue: { fontSize: 14, fontWeight: 'bold', color: '#0c1b2a' }
});
