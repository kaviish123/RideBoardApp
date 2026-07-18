import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import React, {
    useEffect,
    useState,
} from "react";
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Header from "../../components/ui/Header";
import RideCard from "../../components/ui/RideCard";

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

export default function ProfileScreen() {
  const router = useRouter();

  const user = auth.currentUser;

  const [rides, setRides] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "rides"),
      where(
        "userEmail",
        "==",
        user.email
      )
    );

    const unsubscribe = onSnapshot(
      q,
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
  }, [user]);

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

  const handleEdit = (ride: any) => {
    router.push({
      pathname: "/editRide",
      params: {
        id: ride.id,
        from: ride.from,
        to: ride.to,
        seats: String(ride.seats),
        type: ride.type,
        contact: ride.contact,
      },
    });
  };
    const deleteRide = async (
    id: string
  ) => {
    Alert.alert(
      "Delete Ride",
      "Are you sure you want to delete this ride?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(
                doc(db, "rides", id)
              );

              Alert.alert(
                "Success",
                "Ride deleted successfully."
              );
            } catch (error: any) {
              Alert.alert(
                "Error",
                error.message
              );
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 18, flex: 1 }}>
      <Header
        title="My Profile"
        subtitle="Manage your rides"
        onLogout={handleLogout}
      />

      <View style={styles.profileCard}>
        <Ionicons
          name="person-circle"
          size={72}
          color={AppColors.primary}
        />

        <Text style={styles.name}>
          {user?.email?.split("@")[0]}
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {rides.length}
            </Text>

            <Text style={styles.statLabel}>
              My Rides
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Posted Rides
      </Text>

      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <View>
            <RideCard
              from={item.from}
              to={item.to}
              seats={item.seats}
              type={item.type}
              contact={item.contact}
              userEmail={item.userEmail}
            />

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  handleEdit(item)
                }
              >
                <Ionicons
                  name="create"
                  size={18}
                  color={AppColors.white}
                />

                <Text style={styles.editText}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  deleteRide(item.id)
                }
              >
                <Ionicons
                  name="trash"
                  size={18}
                  color={AppColors.white}
                />

                <Text
                  style={styles.deleteText}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="car-sport-outline"
              size={70}
              color={AppColors.textSecondary}
            />

            <Text style={styles.emptyTitle}>
              No rides yet
            </Text>

            <Text style={styles.emptySubtitle}>
              Your posted rides will appear
              here.
            </Text>
          </View>
        }
      />
      </View>
    </SafeAreaView>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: Spacing.md,
  },

  profileCard: {
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    padding: 24,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: AppColors.border,
    ...Shadow.card,
  },

  name: {
    color: AppColors.white,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 12,
  },

  email: {
    color: AppColors.textSecondary,
    fontSize: 15,
    marginTop: 4,
    marginBottom: 20,
  },

  statsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },

  statCard: {
    flex: 1,
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.border,
  },

  statNumber: {
    color: AppColors.primary,
    fontSize: 28,
    fontWeight: "800",
  },

  statLabel: {
    color: AppColors.textSecondary,
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  sectionTitle: {
    color: AppColors.white,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: -4,
    marginBottom: 18,
  },

  editButton: {
    flex: 1,
    backgroundColor: AppColors.primary,
    borderRadius: Radius.lg,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  editText: {
    color: AppColors.white,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: AppColors.danger,
    borderRadius: Radius.lg,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  deleteText: {
    color: AppColors.white,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },

  emptyTitle: {
    color: AppColors.white,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 16,
  },

  emptySubtitle: {
    color: AppColors.textSecondary,
    textAlign: "center",
    fontSize: 15,
    marginTop: 8,
    lineHeight: 22,
  },
});