import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../types';

/**
 * ------------------------------------------------------------------
 *  EXTERNAL IMAGES
 *  Hosted on a free image host (hotlinkable direct URLs).
 *  To swap in your own postimages links: upload the files from
 *  /assets (bonga.png, traderewards.png, naivas.png, quickmart.png,
 *  offer1.jpg, offer2.jpg, offer3.jpg) at https://postimages.org,
 *  pick "Direct link" and paste them below. Nothing else changes.
 * ------------------------------------------------------------------
 */
const IMAGES = {
  programs: {
    bonga: 'https://iili.io/nWeOAsS.png',
    tradeRewards: 'https://iili.io/nWeOh11.png',
    naivas: 'https://iili.io/nWeOULN.png',
    quickmart: 'https://iili.io/nWeO6rX.png',
  },
  offers: {
    pointsPromo: 'https://iili.io/nWeOpBS.jpg', // grocery aisle
    fuelWeekend: 'https://iili.io/nWeeIYg.jpg', // fuel pump
    redeem: 'https://iili.io/nWeehZl.jpg', // checkout counter
  },
};

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

const PROGRAMS = [
  { name: 'Bonga', logo: IMAGES.programs.bonga, fallback: '#2f8f45' },
  { name: 'Trade Rewards', logo: IMAGES.programs.tradeRewards, fallback: '#d62828' }, // ellipsises to “Trade Rew…” like the design
  { name: 'Naivas', logo: IMAGES.programs.naivas, fallback: '#e8710a' },
  { name: 'Quickmart', logo: IMAGES.programs.quickmart, fallback: '#c41026' },
];

/** Tile that falls back to a coloured initial if the remote logo can't load. */
function ProgramLogo({
  uri,
  name,
  fallback,
  size,
}: {
  uri: string;
  name: string;
  fallback: string;
  size: number;
}) {
  const [failed, setFailed] = useState(false);
  const box = {
    width: size,
    height: size,
    borderRadius: Math.round(size * 0.27),
    marginBottom: Math.round(size * 0.35),
  };
  if (failed) {
    return (
      <View style={[box, styles.programLogoFallback, { backgroundColor: fallback }]}>
        <Text style={styles.programLogoInitial}>{name.charAt(0)}</Text>
      </View>
    );
  }
  return (
    <Image
      source={{ uri }}
      style={[box, { backgroundColor: '#f1f5f9' }]}
      resizeMode="contain"
      onError={() => setFailed(true)}
    />
  );
}

const OFFERS = [
  {
    title: '10% OFF',
    subtitle: 'When you redeem 500+ points',
    valid: 'Valid till 27 Oct 2026',
    thumb: IMAGES.offers.pointsPromo,
  },
  {
    title: 'Double points this weekend',
    subtitle: 'Earn 2x points on all purchases',
    valid: 'Valid till 16 Oct 2026',
    thumb: IMAGES.offers.fuelWeekend,
  },
  {
    title: 'Redeem 300+ points',
    subtitle: 'Get KES 50 off your next shop',
    valid: 'Valid till 20 Oct 2026',
    thumb: IMAGES.offers.redeem,
  },
];

const HIDDEN_DOTS = [0, 1, 2, 3, 4, 5]; // the design masks the amount with 6 dots
const HIDDEN_POINT_DOTS = [0, 1, 2, 3];

/** Layout constants shared with the scroll container padding. */
const SCREEN_PADDING = 20;
const TILE_GAP = 8;

export default function HomeScreen({ navigation }: Props) {
  const [showBalance, setShowBalance] = useState(false); // starts hidden, exactly like the design
  const { width: screenW } = useWindowDimensions();

  // The design fits exactly 4 tiles per row: 17 pt side margins, 7 pt gaps,
  // 74 x 61 pt tiles on a 349 pt wide screen (82.7 x 68.2 on a 390 pt screen).
  // Deriving the size keeps that proportion on every device instead of
  // overflowing on narrow phones.
  const TILE_W = (screenW - SCREEN_PADDING * 2 - TILE_GAP * 3) / 4;
  const TILE_H = Math.round(TILE_W * 0.825);          // design ratio 68.2 / 82.7
  const LOGO_SIZE = Math.round(TILE_W * 0.317);       // design ratio  26  / 82.7
  const LABEL_SIZE = Math.max(10, Math.round(TILE_W * 0.133)); // ≈ 11 pt at 82 pt

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ---------- Header ---------- */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Sally 😋</Text>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => navigation.navigate('NotificationSettings')}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={21} color="#0c1b2a" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* ---------- Total Loyalty Card ---------- */}
        <View style={styles.loyaltyCard}>
          {/* top row: gold card-chip on the left, card-network mark on the right */}
          <View style={styles.cardTopRow}>
            <View style={styles.chip}>
              <View style={[styles.chipLine, { width: 14 }]} />
              <View style={[styles.chipLine, { width: 16 }]} />
              <View style={[styles.chipLine, { width: 11 }]} />
            </View>
            <View style={styles.networkMark}>
              <View style={styles.networkBack} />
              <View style={styles.networkFront} />
              <View style={styles.networkRing} />
            </View>
          </View>

          {/* label + eye toggle (sits right after the label, like the design) */}
          <View style={styles.cardLabelRow}>
            <Text style={styles.cardLabel}>TOTAL LOYALTY VALUE</Text>
            <TouchableOpacity
              onPress={() => setShowBalance(!showBalance)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel={showBalance ? 'Hide balance' : 'Show balance'}
            >
              <Ionicons
                name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                size={15}
                color="#8fa3b8"
              />
            </TouchableOpacity>
          </View>

          {/* amount */}
          <View style={styles.amountRow}>
            <Text style={styles.currency}>KES</Text>
            {showBalance ? (
              <Text style={styles.amount}>4,205</Text>
            ) : (
              <View style={styles.maskedRow}>
                {HIDDEN_DOTS.map((d) => (
                  <View key={d} style={styles.maskedDot} />
                ))}
              </View>
            )}
          </View>

          {/* points */}
          <View style={styles.pointsRow}>
            <Text style={styles.pointsLabel}>Total points</Text>
            {showBalance ? (
              <Text style={styles.pointsValue}>26,110 pts</Text>
            ) : (
              <View style={styles.maskedPointsRow}>
                {HIDDEN_POINT_DOTS.map((d) => (
                  <View key={d} style={styles.maskedPointDot} />
                ))}
              </View>
            )}
          </View>

          <Text style={styles.userName}>SALLY A.</Text>
        </View>

        {/* ---------- Loyalty Program ---------- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Loyalty Program</Text>
          <View style={styles.sectionActions}>
            <TouchableOpacity onPress={() => navigation.navigate('AddScheme')}>
              <Text style={styles.actionLink}>+ Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WalletDetail', {
                  walletName: 'All Schemes',
                  balance: 'KES 4,205',
                  pts: '26,110 pts',
                })
              }
            >
              <Text style={styles.actionLink}>See all</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.programsScroll}
          contentContainerStyle={styles.programsContent}
        >
          {PROGRAMS.map((prog) => (
            <TouchableOpacity
              key={prog.name}
              style={[styles.programCard, { width: TILE_W, height: TILE_H }]}
              onPress={() =>
                navigation.navigate('WalletDetail', {
                  walletName: prog.name,
                  balance: 'KES 1,200',
                  pts: '8,450 pts',
                })
              }
            >
              <ProgramLogo uri={prog.logo} name={prog.name} fallback={prog.fallback} size={LOGO_SIZE} />
              <Text
                style={[styles.programName, { fontSize: LABEL_SIZE, maxWidth: TILE_W - 6 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {prog.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ---------- Offers for you ---------- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Offers for you</Text>
          <TouchableOpacity onPress={() => navigation.navigate('OffersTab')}>
            <Text style={styles.actionLink}>See all</Text>
          </TouchableOpacity>
        </View>

        {OFFERS.map((offer) => (
          <TouchableOpacity
            key={offer.title}
            style={styles.offerCard}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('OffersTab')
            }
          >
            <Image source={{ uri: offer.thumb }} style={styles.offerThumb} resizeMode="cover" />
            <View style={styles.offerTextCol}>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerSub}>{offer.subtitle}</Text>
              <Text style={styles.offerValid}>{offer.valid}</Text>
            </View>
            <View style={styles.offerChevron}>
              <Ionicons name="chevron-forward" size={17} color="#33415c" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* page */
  container: { flex: 1, backgroundColor: '#f5f5f7' },
  scroll: { paddingHorizontal: SCREEN_PADDING, paddingTop: 6, paddingBottom: 40 },

  /* header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  greeting: { fontSize: 23, fontWeight: '800', color: '#0c1b2a' },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0c1b2a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#fff',
  },

  /* loyalty card */
  loyaltyCard: {
    backgroundColor: '#12304c',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 20,
    shadowColor: '#102a43',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  chip: {
    width: 28,
    height: 23,
    borderRadius: 5,
    backgroundColor: '#d3a02c',
    justifyContent: 'center',
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  chipLine: {
    height: 1.6,
    borderRadius: 1,
    backgroundColor: 'rgba(70,45,0,0.45)',
    marginVertical: 1.7,
  },
  /* card mark: two overlapping circles (navy + gold) with a white ring on top,
     matching the artwork in the design */
  networkMark: { width: 26, height: 26 },
  networkBack: {
    position: 'absolute',
    left: 0,
    top: 3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#24405e',
  },
  networkFront: {
    position: 'absolute',
    left: 8,
    top: 10,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#d8a04b',
  },
  networkRing: {
    position: 'absolute',
    left: 5.5,
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  cardLabelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  cardLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#93a6bb',
    letterSpacing: 1.5,
    marginRight: 7,
  },

  amountRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  currency: { fontSize: 17, fontWeight: '800', color: '#ffffff', marginRight: 8 },
  amount: { fontSize: 17, fontWeight: '800', color: '#ffffff' },
  maskedRow: { flexDirection: 'row', alignItems: 'center' },
  maskedDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#ffffff',
    marginRight: 6.5,
  },

  pointsRow: { flexDirection: 'row', alignItems: 'center' },
  pointsLabel: { fontSize: 12.5, color: '#9fb1c4', marginRight: 6 },
  pointsValue: { fontSize: 12.5, fontWeight: '700', color: '#dbe4ee' },
  maskedPointsRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 1 },
  maskedPointDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 1.75,
    backgroundColor: 'rgba(255,255,255,0.55)',
    marginRight: 3,
  },

  userName: {
    marginTop: 10,
    fontSize: 11.5,
    fontWeight: '800',
    color: '#e0a92c',
    letterSpacing: 1.2,
  },

  /* section headers */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0c1b2a' },
  sectionActions: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  actionLink: { fontSize: 14, fontWeight: '700', color: '#f97316' },

  /* loyalty program tiles — geometry measured from the design:
     82 × 68 pt white cards, 26 pt logos, 8 pt gaps */
  programsScroll: { marginBottom: 24, marginHorizontal: -SCREEN_PADDING },
  programsContent: { paddingHorizontal: SCREEN_PADDING },
  programCard: {
    // width / height are computed in the component so the 4 tiles always
    // fit the row exactly like the design
    backgroundColor: '#fff',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: TILE_GAP,
    shadowColor: '#0c1b2a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  programLogoFallback: { justifyContent: 'center', alignItems: 'center' },
  programLogoInitial: { color: '#fff', fontSize: 13, fontWeight: '800' },
  programName: {
    // font size is derived from the tile width in the component
    fontWeight: '700',
    color: '#111c2e',
    letterSpacing: 0.1,
    textAlign: 'center',
  },

  /* offers */
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#0c1b2a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  offerThumb: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#e2e8f0' },
  offerTextCol: { flex: 1, paddingHorizontal: 14 },
  offerTitle: { fontSize: 15, fontWeight: '800', color: '#0c1b2a', marginBottom: 4 },
  offerSub: { fontSize: 13, color: '#94a3b8', marginBottom: 4 },
  offerValid: { fontSize: 11.5, color: '#b6c0cc' },
  offerChevron: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#eef2f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
