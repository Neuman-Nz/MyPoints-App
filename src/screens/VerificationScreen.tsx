import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>;

export default function VerificationScreen({ route, navigation }: Props) {
  const { phoneNumber } = route.params || { phoneNumber: '+254712345678' };
  const [code, setCode] = useState(['4', '8', '2', '1', '', '']);

  const handleKeyPress = (num: string) => {
    const nextIndex = code.findIndex(c => c === '');
    if (nextIndex !== -1) {
      const newCode = [...code];
      newCode[nextIndex] = num;
      setCode(newCode);
    }
  };

  const handleDelete = () => {
    const lastFilled = code.map((c, i) => (c !== '' ? i : -1)).filter(i => i !== -1).pop();
    if (lastFilled !== undefined) {
      const newCode = [...code];
      newCode[lastFilled] = '';
      setCode(newCode);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#0c1b2a" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Verify your phone number</Text>
        <Text style={styles.subtitle}>We've sent a 6-digit code to</Text>
        <Text style={styles.phoneText}>{phoneNumber}</Text>
      </View>

      <View style={styles.otpRow}>
        {code.map((digit, idx) => (
          <View key={idx} style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}>
            <Text style={styles.otpText}>{digit}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.resendText}>Resend code <Text style={styles.timerText}>in 00:45</Text></Text>

      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={() => navigation.replace('LaunchSuccess')}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      {/* Simulated Keypad */}
      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <TouchableOpacity key={num} style={styles.key} onPress={() => handleKeyPress(num)}>
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.key} onPress={() => {}}>
          <Text style={styles.keyText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => handleKeyPress('0')}>
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={handleDelete}>
          <Ionicons name="backspace-outline" size={24} color="#0c1b2a" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 24 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eef1f5', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  headerContainer: { marginBottom: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0c1b2a', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#7a869a' },
  phoneText: { fontSize: 15, fontWeight: 'bold', color: '#0c1b2a', marginTop: 4 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  otpBox: { width: 48, height: 56, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  otpBoxFilled: { borderColor: '#0c1b2a', backgroundColor: '#fff' },
  otpText: { fontSize: 22, fontWeight: 'bold', color: '#0c1b2a' },
  resendText: { textAlign: 'center', fontSize: 14, color: '#64748b', marginBottom: 24 },
  timerText: { fontWeight: 'bold', color: '#0c1b2a' },
  verifyButton: { height: 52, backgroundColor: '#c7d2fe', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  verifyButtonText: { fontSize: 16, fontWeight: 'bold', color: '#0c1b2a' },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 'auto' },
  key: { width: '31%', height: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#edf2f7' },
  keyText: { fontSize: 22, fontWeight: '600', color: '#0c1b2a' }
});
