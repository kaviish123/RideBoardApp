import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/ui/Header";

import {
  AppColors,
  Radius,
  Shadow,
  Spacing,
} from "../../constants/theme";

const features = [
  {
    icon: "car-sport",
    title: "Easy Ride Sharing",
    description:
      "Post rides or join existing trips in just a few taps.",
  },
  {
    icon: "shield-checkmark",
    title: "Verified Drivers",
    description:
      "Upload documents to build trust within the community.",
  },
  {
    icon: "cash",
    title: "Save Money",
    description:
      "Split travel costs with fellow passengers.",
  },
  {
    icon: "people",
    title: "Community Driven",
    description:
      "Connect with students, professionals and travelers nearby.",
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Explore"
        subtitle="Why RideBoard?"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Travel Smarter
          </Text>

          <Text style={styles.heroSubtitle}>
            Find reliable rides, reduce travel costs,
            and connect with trusted people on every
            journey.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
                    {features.map((feature, index) => (
            <View
              key={index}
              style={styles.featureCard}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={feature.icon as any}
                  size={28}
                  color={AppColors.primary}
                />
              </View>

              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  {feature.title}
                </Text>

                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footerCard}>
          <Ionicons
            name="heart"
            size={34}
            color={AppColors.primary}
          />

          <Text style={styles.footerTitle}>
            Ride Together
          </Text>

          <Text style={styles.footerDescription}>
            RideBoard helps people travel safely,
            save money, and reduce empty seats on
            every journey.
          </Text>
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

  hero: {
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    padding: 24,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: AppColors.border,
    ...Shadow.card,
  },

  heroTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: AppColors.white,
    marginBottom: 10,
  },

  heroSubtitle: {
    fontSize: 15,
    color: AppColors.textSecondary,
    lineHeight: 24,
  },

  featuresContainer: {
    gap: 16,
    marginBottom: 24,
  },

  featureCard: {
    flexDirection: "row",
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: AppColors.border,
    ...Shadow.card,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  featureContent: {
    flex: 1,
    justifyContent: "center",
  },

  featureTitle: {
    color: AppColors.white,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },

  featureDescription: {
    color: AppColors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },

  footerCard: {
    backgroundColor: AppColors.card,
    borderRadius: Radius.xl,
    padding: 24,
    marginBottom: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.border,
    ...Shadow.card,
  },

  footerTitle: {
    color: AppColors.white,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 10,
  },

  footerDescription: {
    color: AppColors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
  },
});