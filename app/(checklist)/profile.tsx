import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue, appleRed } from "@/constants/Colors";
import { IS_WEB } from "@/constants/Platform";
import { useAlert } from "@/hooks/useAlert";
import { useClerk, useUser } from "@clerk/clerk-expo";
import * as Application from "expo-application";
import { useRouter } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  Share,
  StyleSheet,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out Check List: Sync & Share on the Github!",
        // TODO: Link the repo
        url: "https://github.com/LowkeyGud",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRate = async () => {
    try {
      await Linking.openURL("https://github.com/LowkeyGud");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)");
  };

  const handleDeletePress = async () => {
    await user?.delete();
    router.replace("/(auth)");
  };

  const { showAlert, alertComponent, hideAlert } = useAlert();

  const handleDeleteAccount = () => {
    showAlert({
      title: "Delete account",
      message:
        "Are you sure you want to delete your account? This action is irreversible!",
      animationType: "scale",
      buttons: [
        {
          text: "Delete",
          onPress: () => {
            handleDeletePress();
            hideAlert();
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            hideAlert();
          },
        },
      ],
    });
  };

  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.header}>
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.profileImage}
            />
          ) : null}
          <View style={styles.userInfo}>
            <ThemedText type="defaultSemiBold" style={styles.email}>
              {user?.emailAddresses[0].emailAddress}
            </ThemedText>
            <ThemedText style={styles.joinDate}>
              Joined {user?.createdAt?.toDateString()}
            </ThemedText>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <Pressable onPress={handleShare} style={styles.actionButton}>
            <IconSymbol name="square.and.arrow.up" color={appleBlue} />
            <ThemedText type="defaultSemiBold" style={{ color: appleBlue }}>
              Share app
            </ThemedText>
          </Pressable>
          <Pressable onPress={handleRate} style={styles.actionButton}>
            <IconSymbol name="star" color={appleBlue} />
            <ThemedText type="defaultSemiBold" style={{ color: appleBlue }}>
              Rate app
            </ThemedText>
          </Pressable>
        </View>
      </View>
      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.appTitle}>
          Check List: Sync & Share
        </ThemedText>
        {!IS_WEB && (
          <ThemedText type="default" style={styles.version}>
            v{Application.nativeApplicationVersion}
          </ThemedText>
        )}
      </View>

      <Button
        onPress={handleSignOut}
        variant="ghost"
        textStyle={{ color: appleRed }}
      >
        Sign out
      </Button>

      <Button
        onPress={handleDeleteAccount}
        variant="ghost"
        textStyle={{ color: "gray" }}
      >
        Delete account
      </Button>
      {alertComponent}
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 32,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  email: {
    fontSize: 18,
    marginBottom: 4,
  },
  joinDate: {
    opacity: 0.7,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  section: {
    backgroundColor: "rgba(150, 150, 150, 0.1)",
    borderRadius: 12,
    padding: 16,
    paddingVertical: 8,
  },
  appTitle: {
    textAlign: "center",
  },
  version: {
    textAlign: "center",
    opacity: 0.7,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  updateText: {
    color: "#34C759",
  },
});
