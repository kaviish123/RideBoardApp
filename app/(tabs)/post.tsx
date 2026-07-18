//import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { addDoc, collection } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import {
  auth,
  db,
  storage,
} from "../../constants/firebase";

import {
  AppColors,
  Radius,
  Shadow,
  Spacing,
} from "../../constants/theme";

import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import Input from "../../components/ui/Input";

export default function PostScreen() {
  const router = useRouter();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seats, setSeats] = useState("");
  const [type, setType] = useState("");
  const [contact, setContact] =
    useState("");
  const [document, setDocument] =
    useState<any>(null);

  const pickDocument = async () => {
    const result =
      await DocumentPicker.getDocumentAsync(
        {}
      );

    if (
      result.assets &&
      result.assets.length > 0
    ) {
      setDocument(result.assets[0]);
    }
  };

  const uploadDocument = async () => {
    if (!document) return null;

    try {
      const response = await fetch(
        document.uri
      );

      const blob =
        await response.blob();

      const storageRef = ref(
        storage,
        `documents/${Date.now()}_${
          document.name
        }`
      );

      await uploadBytes(
        storageRef,
        blob
      );

      return await getDownloadURL(
        storageRef
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };
    const handlePost = async () => {
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
      const fileURL =
        await uploadDocument();

      await addDoc(
        collection(db, "rides"),
        {
          from,
          to,
          seats: Number(seats),
          type,
          contact,

          userId: auth.currentUser?.uid,
          userEmail:
            auth.currentUser?.email,

          documentUrl: fileURL,
          isVerified: !!fileURL,

          createdAt: new Date(),
        }
      );

      Alert.alert(
        "Success",
        "Ride posted successfully!"
      );

      setFrom("");
      setTo("");
      setSeats("");
      setType("");
      setContact("");
      setDocument(null);

      router.replace("/(tabs)");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to post ride."
      );
    }
  };

 return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 18, flex: 1 }}>
      <Header
      title="Post Ride"
      subtitle="Share your journey"
      />
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
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
          <Text style={styles.label}>
  Ride Type
</Text>

<View style={styles.typeContainer}>
  <TouchableOpacity
    style={[
      styles.typeButton,
      type === "solo" && styles.typeButtonActive,
    ]}
    onPress={() => setType("solo")}
  >
    <Text
      style={[
        styles.typeText,
        type === "solo" && styles.typeTextActive,
      ]}
    >
      Solo
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.typeButton,
      type === "couple" && styles.typeButtonActive,
    ]}
    onPress={() => setType("couple")}
  >
    <Text
      style={[
        styles.typeText,
        type === "couple" && styles.typeTextActive,
      ]}
    >
      Couple
    </Text>
  </TouchableOpacity>
</View>

          <Input
            label="Contact Number"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
          />

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={pickDocument}
          >
            <Text style={styles.uploadText}>
              {document
                ? document.name
                : "Upload Verification Document"}
            </Text>
          </TouchableOpacity>

          <View
            style={{ height: 20 }}
          />

          <Button
            title="Post Ride"
            onPress={handlePost}
          />
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
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
  typeContainer: {
  flexDirection: "row",
  gap: 12,
  marginBottom: 18,
},

typeButton: {
  flex: 1,
  backgroundColor: AppColors.surface,
  borderRadius: 14,
  paddingVertical: 14,
  alignItems: "center",
  borderWidth: 1,
  borderColor: AppColors.border,
},

typeButtonActive: {
  backgroundColor: AppColors.primary,
  borderColor: AppColors.primary,
},

typeText: {
  color: AppColors.textSecondary,
  fontWeight: "700",
  fontSize: 16,
},

typeTextActive: {
  color: AppColors.white,
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

  label: {
    color: AppColors.text,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
  },

  picker: {
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AppColors.border,
    marginBottom: 18,
    overflow: "hidden",
  },

  uploadButton: {
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: AppColors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  uploadText: {
    color: AppColors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
