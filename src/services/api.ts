// API service layer ready for backend integration
const BASE_URL = 'https://api.mypoints.co.ke/v1';

export const apiClient = {
  async login(phone: string): Promise<{ success: boolean; message: string }> {
    try {
      // TODO: Replace with real fetch call when backend is connected
      console.log(`[API] POST /auth/login with phone: ${phone}`);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async verifyOtp(phone: string, otp: string): Promise<{ token: string; user: any }> {
    console.log(`[API] POST /auth/verify with phone: ${phone}, otp: ${otp}`);
    return {
      token: 'sample_jwt_token_xyz123',
      user: { name: 'Sally Achieng', phone, totalBalance: '4,205 KES', points: '26,110 pts' }
    };
  },

  async getLoyaltyWallets(): Promise<any[]> {
    console.log(`[API] GET /wallets`);
    return [
      { id: '1', name: 'MyPoints', points: '26,110 pts', kesValue: 'KES 4,205', linked: true },
      { id: '2', name: 'Bonga', points: '8,450 pts', kesValue: 'KES 845', linked: true },
      { id: '3', name: 'Trade Rewards', points: '2,100 pts', kesValue: 'KES 210', linked: true },
      { id: '4', name: 'Naivas', points: '8,450 pts', kesValue: 'KES 2,450', linked: true },
      { id: '5', name: 'Quickmart', points: '7,110 pts', kesValue: 'KES 710', linked: true },
    ];
  },

  async getAiSmartRecommendations(spendingHabits: string): Promise<string> {
    console.log(`[API] POST /ai/recommendations with habits: ${spendingHabits}`);
    return "AI Insight: You accumulate 40% more points shopping at Naivas over weekends. Redeem your 4,205 KES voucher on groceries for maximum savings!";
  }
};
