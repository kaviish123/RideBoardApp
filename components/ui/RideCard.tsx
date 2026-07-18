import { Ionicons } from "@expo/vector-icons";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  AppColors,
  Radius,
  Shadow,
} from "../../constants/theme";

interface RideCardProps {
  from: string;
  to: string;
  seats: number;
  type: string;
  contact: string;
  userEmail?: string;
  onCall?: () => void;
}

export default function RideCard({
  from,
  to,
  seats,
  type,
  contact,
  userEmail,
  onCall,
}: RideCardProps) {
  const handleCall = () => {
    if (onCall) {
      onCall();
      return;
    }

    Linking.openURL(`tel:${contact}`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
  AVAILABLE RIDE
</Text>
      <View style={styles.routeRow}>
        <Ionicons
          name="location"
          size={22}
          color={AppColors.primary}
        />

        <View style={styles.routeContainer}>
          <Text style={styles.route}>
            {from}
          </Text>

          <Ionicons
            name="arrow-down"
            size={16}
            color={AppColors.textSecondary}
          />

          <Text style={styles.route}>
            {to}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.badge}>
          <Ionicons
            name="people"
            size={16}
            color={AppColors.primary}
          />

          <Text style={styles.badgeText}>
            {seats} Seats
          </Text>
        </View>

        <View style={styles.badge}>
          <Ionicons
            name="car-sport"
            size={16}
            color={AppColors.primary}
          />

          <Text style={styles.badgeText}>
            {type}
          </Text>
        </View>
      </View>
            <View style={styles.footer}>
        <View style={styles.userSection}>
          <Ionicons
            name="person-circle"
            size={20}
            color={AppColors.textSecondary}
          />

          <Text
            style={styles.userEmail}
            numberOfLines={1}
          >
            {userEmail || "Anonymous"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCall}
        >
          <Ionicons
            name="call"
            size={18}
            color={AppColors.white}
          />

          <Text style={styles.callText}>
            Call
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    padding: 18,
    marginBottom: 16,
    borderLeftWidth: 5,
  borderLeftColor: AppColors.primary,
    ...Shadow.card,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  routeContainer: {
    flex: 1,
    marginLeft: 12,
  },
  route: {
    color: AppColors.white,
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  infoRow: {
    flexDirection: "row",
    marginTop: 18,
    gap: 12,
  },

badge: {
  flexDirection: "row",
  alignItems: "center",

  backgroundColor: "#1F2937",

  paddingHorizontal: 14,
  paddingVertical: 9,

  borderRadius: 30,

  borderWidth: 1,
  borderColor: "#334155",
},

  badgeText: {
    color: AppColors.text,
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },

userEmail: {
  color: AppColors.white,
  marginLeft: 8,
  fontSize: 14,
  fontWeight: "600",
  flex: 1,
},

  callButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },

  callText: {
    color: AppColors.white,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 6,
  },
  sectionTitle: {
  color: AppColors.primary,
  fontSize: 12,
  fontWeight: "800",
  letterSpacing: 1,
  marginBottom: 12,
},

});