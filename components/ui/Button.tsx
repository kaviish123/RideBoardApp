import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  AppColors,
  Radius,
  Shadow,
} from "../../constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        (disabled || loading) &&
          styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={AppColors.white}
        />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: Radius.xl,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadow.card,
  },

  disabled: {
    opacity: 0.6,
  },

  text: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});