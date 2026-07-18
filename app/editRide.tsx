import { useLocalSearchParams, useRouter } from "expo-router";
import {
    doc,
    updateDoc,
} from "firebase/firestore";
import React, {
    useState,
} from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from "react-native";

import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";

import { db } from "../constants/firebase";

import {
    AppColors,
    Radius,
    Shadow,
    Spacing,
} from "../constants/theme";

export default function EditRideScreen() {
  const router = useRouter();

  const params =
    useLocalSearchParams();

  const [from, setFrom] =
    useState(
      (params.from as string) || ""
    );

  const [to, setTo] =
    useState(
      (params.to as string) || ""
    );

  const [seats, setSeats] =
    useState(
      (params.seats as string) || ""
    );

  const [type, setType] =
    useState(
      (params.type as string) || ""
    );

  const [contact, setContact] =
    useState(
      (params.contact as string) || ""
    );
      const handleUpdate = async () => {
    if (
      !from ||
      !to ||
      !seats ||
      !type ||
      !contact
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill all fields."
      );
      return;
    }

    try {
      await updateDoc(
        doc(db, "rides", params.id as string),
        {
          from,
          to,
          seats: Number(seats),
          type,
          contact,
        }
      );

      Alert.alert(
        "Success",
        "Ride updated successfully."
      );

      router.back();
    } catch (error: any) {
      Alert.alert(
        "Update Failed",
        error.message
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Ride"
        subtitle="Update your ride details"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Input
            label="From"
            placeholder="Starting location"
            value={from}
            onChangeText={setFrom}
          />

          <Input
            label="Destination"
            placeholder="Where are you going?"
            value={to}
            onChangeText={setTo}
          />

          <Input
            label="Seats"
            placeholder="Available seats"
            keyboardType="numeric"
            value={seats}
            onChangeText={setSeats}
          />

          <Input
            label="Ride Type"
            placeholder="Solo / Couple"
            value={type}
            onChangeText={setType}
          />

          <Input
            label="Contact Number"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
          />

          <View style={{ height: 20 }} />

          <Button
            title="Update Ride"
            onPress={handleUpdate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: Spacing.md,
  },

  card: {
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    padding: 20,
    marginTop: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: AppColors.border,
    ...Shadow.card,
  },
});