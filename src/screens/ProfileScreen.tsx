import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'ProfileTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SA</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.profileName}>Sally Achieng</Text>
            <Text style={styles.profilePhone}>+254 712 345 678</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Linked Schemes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddScheme')}>
              <Text style={styles.addLink}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {[
            { name: 'MyPoints', pts: '26,110 pts', removable: false },
            { name: 'Bonga', pts: '8,450 pts', removable: false },
            { name: 'Trade Rewards', pts: '2,100 pts', removable: false },
            { name: 'Naivas', pts: '8,450 pts', removable: true },
            { name: 'Quickmart', pts: '7,110 pts', removable: true },
          ].map((item, idx) => (
            <View key={idx} style={styles.schemeRow}>
              <View style={styles.schemeIcon} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.schemeName}>{item.name}</Text>
                <Text style={styles.schemePts}>{item.pts}</Text>
              </View>
              {item.removable && (
                <TouchableOpacity style={styles.removeBtn}>
                  <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.menuCard}>
          {[
            { title: 'Redemption History', icon: 'receipt-outline', screen: 'TransactionHistory' },
            { title: 'Notification Settings', icon: 'notifications-outline', screen: 'NotificationSettings' },
            { title: 'Privacy & Security', icon: 'lock-closed-outline', screen: 'PrivacySecurity' },
            { title: 'Help & Support', icon: 'help-circle-outline', screen: 'HelpSupport' },
            { title: 'Terms & Privacy Policy', icon: 'document-text-outline', screen: 'TermsPolicy' },
          ].map((menu, idx) => (
            <TouchableOpacity key={idx} style={styles.menuRow} onPress={() => navigation.navigate(menu.screen as any)}>
              <Ionicons name={menu.icon as any} size={20} color="#0c1b2a" style={{ marginRight: 16 }} />
              <Text style={styles.menuTitle}>{menu.title}</Text>
              <Ionicons name="chevron-forward" size={18} color="#94a3b8" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutBtn} onPress={() => navigation.replace('Login')}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scroll: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 16 },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#0c1b2a' },
  profileName: { fontSize: 18, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 2 },
  profilePhone: { fontSize: 14, color: '#64748b' },
  sectionCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0c1b2a' },
  addLink: { fontSize: 14, fontWeight: '600', color: '#3b82f6' },
  schemeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  schemeIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#e2e8f0' },
  schemeName: { fontSize: 15, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 2 },
  schemePts: { fontSize: 13, color: '#64748b' },
  removeBtn: { backgroundColor: '#fee2e2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  removeBtnText: { fontSize: 12, fontWeight: 'bold', color: '#dc2626' },
  menuCard: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  menuTitle: { fontSize: 15, fontWeight: '600', color: '#0c1b2a' },
  signOutBtn: { height: 56, backgroundColor: '#fee2e2', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  signOutText: { fontSize: 16, fontWeight: 'bold', color: '#dc2626' }
});
