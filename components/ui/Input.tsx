import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import {
  AppColors,
  Radius,
  Shadow,
} from "../../constants/theme";

interface InputProps extends TextInputProps {
  label?: string;
}

export default function Input({
  label,
  style,
  ...props
}: InputProps) {
  return (
    <View style={styles.container}>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ) : null}

      <TextInput
        {...props}
        placeholderTextColor={
          AppColors.textSecondary
        }
        style={[
          styles.input,
          style,
        ]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    color: AppColors.text,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    height: 56,
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AppColors.border,
    paddingHorizontal: 16,
    color: AppColors.white,
    fontSize: 16,
    ...Shadow.card,
  },
});