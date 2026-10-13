export type RootStackParamList = {
  Login: undefined;
  Verification: { phoneNumber: string };
  LaunchSuccess: undefined;
  MainTabs: undefined;
  Airtime: undefined;
  Data: undefined;
  BuyVoucher: undefined;
  RedeemVoucher: undefined;
  WalletDetail: { walletName: string; balance: string; pts: string };
  TransactionHistory: undefined;
  AccountLimits: undefined;
  NotificationSettings: undefined;
  PrivacySecurity: undefined;
  HelpSupport: undefined;
  TermsPolicy: undefined;
  AddScheme: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  WalletsTab: undefined;
  OffersTab: undefined;
  ProfileTab: undefined;
};

export interface LoyaltyProgram {
  id: string;
  name: string;
  points: string;
  kesValue: string;
  logo: string;
  color: string;
  linked: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: string;
  type: 'earned' | 'redeemed';
}

export interface Offer {
  id: string;
  brand: string;
  title: string;
  description: string;
  expiry: string;
  category: 'All' | 'Near me' | 'My brands';
  imageBg: string;
}
