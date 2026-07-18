import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Alert,
  FlatList,
  Linking,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import Header from "../../components/ui/Header";
import RideCard from "../../components/ui/RideCard";
import SearchBar from "../../components/ui/SearchBar";

import {
  auth,
  db,
} from "../../constants/firebase";

import {
  AppColors,
  Radius,
  Shadow,
  Spacing,
} from "../../constants/theme";

export default function HomeScreen() {
  const router = useRouter();

  const [rides, setRides] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [onlyCouple, setOnlyCouple] =
    useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error: any) {
      Alert.alert(
        "Logout Error",
        error.message
      );
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "rides"),
      (snapshot) => {
        const list: any[] = [];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setRides(list);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      const matchesSearch =
        ride.from
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ride.to
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesType = onlyCouple
        ? ride.type?.toLowerCase() ===
          "couple"
        : true;

      return (
        matchesSearch &&
        matchesType
      );
    });
  }, [
    rides,
    search,
    onlyCouple,
  ]);

  const makeCall = (
    number: string
  ) => {
    Linking.openURL(
      `tel:${number}`
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={{marginTop: 18 }}>
      <Header
      title="RideBoard"
      subtitle="Find your next ride"
      onLogout={handleLogout}
      />

      <FlatList
        data={filteredRides}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 170,
        }}
                ListHeaderComponent={
          <>
            <View style={styles.heroCard}>
  <View style={styles.heroBadge}>
    <Text style={styles.heroBadgeText}>
      🚗 RideBoard
    </Text>
  </View>

  <Text style={styles.heroTitle}>
    Travel Smarter,
    {"\n"}Ride Together
  </Text>

  <Text style={styles.heroSubtitle}>
    Find trusted rides, save money,
    and travel safely with verified
    community members.
  </Text>

  <View style={styles.heroStats}>
    <View style={styles.heroStat}>
      <Text style={styles.heroStatNumber}>24/7</Text>
      <Text style={styles.heroStatLabel}>Available</Text>
    </View>

    <View style={styles.heroDivider} />

    <View style={styles.heroStat}>
      <Text style={styles.heroStatNumber}>100%</Text>
      <Text style={styles.heroStatLabel}>Community</Text>
    </View>

    <View style={styles.heroDivider} />

    <View style={styles.heroStat}>
      <Text style={styles.heroStatNumber}>Safe</Text>
      <Text style={styles.heroStatLabel}>Travel</Text>
    </View>
  </View>
</View>

            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search by From or To"
            />

            <View style={styles.filterContainer}>
              <View>
                <Text style={styles.filterTitle}>
                  Couple Rides
                </Text>

                <Text style={styles.filterSubtitle}>
                  Show only couple rides
                </Text>
              </View>

              <Switch
                value={onlyCouple}
                onValueChange={
                  setOnlyCouple
                }
                trackColor={{
                  false:
                    AppColors.border,
                  true:
                    AppColors.primary,
                }}
                thumbColor={
                  AppColors.white
                }
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text
                  style={styles.statNumber}
                >
                  {rides.length}
                </Text>

                <Text
                  style={styles.statLabel}
                >
                  Total
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text
                  style={styles.statNumber}
                >
                  {filteredRides.length}
                </Text>

                <Text
                  style={styles.statLabel}
                >
                  Results
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              Available Rides
            </Text>
          </>
        }

        renderItem={({ item }) => (
          <RideCard
            from={item.from}
            to={item.to}
            seats={item.seats}
            type={item.type}
            contact={item.contact}
            userEmail={item.userEmail}
            onCall={() =>
              makeCall(item.contact)
            }
          />
        )}

        ListEmptyComponent={
          <View
            style={styles.emptyContainer}
          >
            <Text
              style={styles.emptyEmoji}
            >
              🚗
            </Text>

            <Text
              style={styles.emptyTitle}
            >
              No Rides Found
            </Text>

            <Text
              style={
                styles.emptySubtitle
              }
            >
              Try another search or be
              the first to post a ride.
            </Text>
          </View>
        }
      />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: Spacing.md,
  },

  heroCard: {
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    padding: 24,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: AppColors.border,
    ...Shadow.card,
  },

 heroTitle: {
  fontSize: 30,
  fontWeight: "800",
  color: AppColors.white,
  lineHeight: 36,
  marginTop: 14,
},

heroSubtitle: {
  marginTop: 14,
  fontSize: 15,
  color: AppColors.textSecondary,
  lineHeight: 24,
},
heroBadge: {
  alignSelf: "flex-start",
  backgroundColor: "rgba(255,255,255,0.12)",
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 30,
},

heroBadgeText: {
  color: AppColors.white,
  fontWeight: "700",
  fontSize: 13,
},

heroStats: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 24,
},

heroStat: {
  flex: 1,
  alignItems: "center",
},

heroStatNumber: {
  color: AppColors.white,
  fontSize: 18,
  fontWeight: "800",
},

heroStatLabel: {
  color: AppColors.textSecondary,
  fontSize: 12,
  marginTop: 4,
},

heroDivider: {
  width: 1,
  height: 32,
  backgroundColor: "rgba(255,255,255,0.15)",
},

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: AppColors.card,
    borderRadius: Radius.lg,
    padding: 18,
    marginVertical: 18,
    borderWidth: 1,
    borderColor: AppColors.border,
    ...Shadow.card,
  },

  filterTitle: {
    color: AppColors.text,
    fontSize: 16,
    fontWeight: "700",
  },

  filterSubtitle: {
    color: AppColors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    paddingVertical: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.border,
    ...Shadow.card,
  },

  statNumber: {
    fontSize: 30,
    fontWeight: "800",
    color: AppColors.primary,
  },

  statLabel: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: AppColors.textSecondary,
  },

  sectionTitle: {
    color: AppColors.white,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 20,
  },

  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },

  emptyTitle: {
    color: AppColors.white,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },

  emptySubtitle: {
    color: AppColors.textSecondary,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
