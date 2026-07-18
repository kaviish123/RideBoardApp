import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { auth } from "../constants/firebase";
import {
  AppColors,
  Radius,
  Shadow,
  Spacing,
} from "../constants/theme";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginLoading, setLoginLoading] =
    useState(false);

  const [signupLoading, setSignupLoading] =
    useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        "Missing Information",
        "Please enter email and password."
      );
      return;
    }

    try {
      setLoginLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert(
        "Missing Information",
        "Please enter email and password."
      );
      return;
    }

    try {
      setSignupLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message);
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={AppColors.background}
        barStyle="light-content"
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
        >
          <View style={styles.header}>
            <View style={styles.logo}>
              <Ionicons
                name="car-sport"
                size={46}
                color={AppColors.white}
              />
            </View>

            <Text style={styles.title}>
              RideBoard
            </Text>

            <Text style={styles.subtitle}>
              Find • Share • Travel
            </Text>
          </View>

          <View style={styles.card}>
            <Input
  placeholder="Email Address"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
/>

<View style={{ height: 16 }} />

<Input
  placeholder="Password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry
/>

<View style={{ height: 24 }} />

<Button
  title="Login"
  onPress={handleLogin}
  loading={loginLoading}
/>

<View style={{ height: 14 }} />

<Button
  title="Create New Account"
  onPress={handleSignup}
  loading={signupLoading}
/>

<Text style={styles.footer}>
  Secure ride sharing for everyone 🚗
</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
  },

  header: {
    alignItems: "center",
    marginBottom: 36,
  },

  logo: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    ...Shadow.card,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: AppColors.white,
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: AppColors.textSecondary,
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: AppColors.border,
    ...Shadow.card,
  },

  footer: {
    marginTop: 24,
    textAlign: "center",
    color: AppColors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
});