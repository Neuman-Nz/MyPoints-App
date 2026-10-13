import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import VerificationScreen from '../screens/VerificationScreen';
import LaunchSuccessScreen from '../screens/LaunchSuccessScreen';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import OffersScreen from '../screens/OffersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList, MainTabParamList } from '../types';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function PlaceholderScreen({ route }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0c1b2a' }}>{route.name} Screen</Text>
      <Text style={{ color: '#64748b', marginTop: 8 }}>Ready for custom API integration</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0c1b2a',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 8 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home-outline';
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'WalletsTab') iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          else if (route.name === 'OffersTab') iconName = focused ? 'pricetag' : 'pricetag-outline';
          else if (route.name === 'ProfileTab') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="WalletsTab" component={WalletScreen} options={{ title: 'Wallets' }} />
      <Tab.Screen name="OffersTab" component={OffersScreen} options={{ title: 'Offers' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="LaunchSuccess" component={LaunchSuccessScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Airtime" component={PlaceholderScreen} />
        <Stack.Screen name="Data" component={PlaceholderScreen} />
        <Stack.Screen name="BuyVoucher" component={PlaceholderScreen} />
        <Stack.Screen name="RedeemVoucher" component={PlaceholderScreen} />
        <Stack.Screen name="WalletDetail" component={PlaceholderScreen} />
        <Stack.Screen name="TransactionHistory" component={PlaceholderScreen} />
        <Stack.Screen name="AccountLimits" component={PlaceholderScreen} />
        <Stack.Screen name="NotificationSettings" component={PlaceholderScreen} />
        <Stack.Screen name="PrivacySecurity" component={PlaceholderScreen} />
        <Stack.Screen name="HelpSupport" component={PlaceholderScreen} />
        <Stack.Screen name="TermsPolicy" component={PlaceholderScreen} />
        <Stack.Screen name="AddScheme" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
