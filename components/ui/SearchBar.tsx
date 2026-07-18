import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import {
  AppColors,
  Radius,
  Shadow,
} from "../../constants/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search destination...",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={AppColors.textSecondary}
        style={styles.icon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={
          AppColors.textSecondary
        }
        style={styles.input}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: AppColors.border,
    paddingHorizontal: 16,
    height: 56,
    marginVertical: 16,
    ...Shadow.card,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: AppColors.white,
    fontSize: 16,
    paddingVertical: 0,
  },
});