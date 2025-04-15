import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PrivacyPolicyScreen() {
  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <ThemedText type="title">Privacy Policy</ThemedText>
        <ThemedText style={styles.lastUpdated}>
          Last updated: {new Date().toLocaleDateString()}
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          1. Information We Collect
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          When you use our Checklist app, we collect the following information:
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Email address and basic profile information when you sign in with
          Google
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Checklists and items you create within the app
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Usage data and app performance metrics
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          2. How We Use Your Information
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          We use the collected information to:
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Provide and maintain the app's functionality
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Sync your Checklists across devices
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Improve and optimize the app experience
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Send important updates about the service
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          3. Data Storage and Security
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          We take appropriate measures to protect your personal information.
          Your data is stored securely using industry-standard encryption and
          security practices. We use Clerk.dev for authentication services and
          secure data storage.
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          4. Data Sharing
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          We do not sell your personal information to third parties. We may
          share your information only in the following circumstances:
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • With your explicit consent
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • To comply with legal obligations
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • With service providers who assist in operating our app
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          5. Your Rights
        </ThemedText>
        <ThemedText style={styles.paragraph}>You have the right to:</ThemedText>
        <ThemedText style={styles.listItem}>
          • Access your personal data
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Request correction of your data
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Request deletion of your data
        </ThemedText>
        <ThemedText style={styles.listItem}>
          • Opt-out of marketing communications
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          6. Children's Privacy
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Our service is not intended for use by children under the age of 13.
          We do not knowingly collect personal information from children under
          13.
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          7. Changes to This Policy
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new privacy policy on this page and
          updating the "Last updated" date.
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          8. Contact Us
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          If you have any questions about this privacy policy or our practices,
          please contact us at:
        </ThemedText>
        <ThemedText style={styles.contact}>
          lordfifth@fearlessmails.com
        </ThemedText>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
  },
  section: {
    marginBottom: 24,
  },
  lastUpdated: {
    color: "gray",
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
    lineHeight: 24,
  },
  listItem: {
    marginLeft: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  contact: {
    marginTop: 8,
    color: "#007AFF",
  },
});
