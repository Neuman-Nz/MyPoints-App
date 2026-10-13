import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'LaunchSuccess'>;

export default function LaunchSuccessScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <Ionicons name="checkmark" size={36} color="#fff" />
        </View>

        <Text style={styles.title}>You're all set!</Text>
        <Text style={styles.subtitle}>Welcome to mypoints. Your loyalty wallet is ready.</Text>

        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Text style={styles.cardIconText}>mp</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.cardTitle}>Add to Home Screen</Text>
            <Text style={styles.cardSubtitle}>Tap your browser menu then "Add to Home Screen" for quick access.</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={styles.primaryButtonText}>Go to My Wallet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  successIconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#22c55e', justifyContent: 'center', alignItems: 'center', marginBottom: 24, shadowColor: '#22c55e', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 12 },
  subtitle: { fontSize: 15, color: '#64748b', textAlign: 'center', marginBottom: 32, paddingHorizontal: 20 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 16, padding: 16, width: '100%', marginBottom: 32 },
  cardIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#0c1b2a', justifyContent: 'center', alignItems: 'center' },
  cardIconText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 2 },
  cardSubtitle: { fontSize: 12, color: '#64748b', lineHeight: 16 },
  primaryButton: { width: '100%', height: 56, backgroundColor: '#0c1b2a', borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: '#0c1b2a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  primaryButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' }
});
