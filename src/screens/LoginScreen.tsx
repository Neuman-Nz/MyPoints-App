import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <TouchableOpacity style={styles.backButton} onPress={() => {}}>
          <Ionicons name="chevron-back" size={24} color="#0c1b2a" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Enter your phone number to continue</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone number</Text>
          <View style={styles.phoneInputRow}>
            <TouchableOpacity style={styles.countryPicker}>
              <Text style={styles.countryText}>KE +254</Text>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="7XX XXX XXX"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={9}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.continueButton, { opacity: phone.length >= 9 ? 1 : 0.6 }]}
          disabled={phone.length < 9}
          onPress={() => navigation.navigate('Verification', { phoneNumber: `+254${phone}` })}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={20} color="#EA4335" style={{ marginRight: 10 }} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our <Text style={styles.linkText}>Terms & Conditions</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  inner: { flex: 1, padding: 24, justifyContent: 'flex-start' },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eef1f5', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  headerContainer: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#7a869a' },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#0c1b2a', marginBottom: 8 },
  phoneInputRow: { flexDirection: 'row', height: 56, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, backgroundColor: '#fff', overflow: 'hidden' },
  countryPicker: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderRightWidth: 1, borderRightColor: '#e2e8f0', backgroundColor: '#fafbfc' },
  countryText: { fontSize: 15, fontWeight: '600', color: '#0c1b2a', marginRight: 4 },
  textInput: { flex: 1, paddingHorizontal: 16, fontSize: 16, color: '#0c1b2a' },
  continueButton: { height: 56, backgroundColor: '#c7d2fe', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  continueButtonText: { fontSize: 16, fontWeight: 'bold', color: '#0c1b2a' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  line: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  orText: { marginHorizontal: 12, color: '#94a3b8', fontSize: 14 },
  googleButton: { height: 56, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  googleButtonText: { fontSize: 16, fontWeight: '600', color: '#0c1b2a' },
  termsText: { textAlign: 'center', fontSize: 12, color: '#94a3b8', lineHeight: 18 },
  linkText: { color: '#0c1b2a', fontWeight: '600', textDecorationLine: 'underline' }
});
