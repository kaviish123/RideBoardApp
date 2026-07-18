import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  AppColors,
  Shadow
} from "../../constants/theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onLogout?: () => void;
}

export default function Header({
  title,
  subtitle,
  onLogout,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {onLogout ? (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color={AppColors.white}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginBottom: 22,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: AppColors.white,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 14,
    color: AppColors.textSecondary,
  },

  logoutButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadow.card,
  },

  placeholder: {
    width: 48,
    height: 48,
  },
});