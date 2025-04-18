import Landing from "@/components/Landing";
import { IS_WEB } from "@/constants/Platform";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { safeImpactMedium } from "@/utils/SafeHaptics";
import { isClerkAPIResponseError, useSSO } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import * as AuthSession from "expo-auth-session";
import { Href, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Platform, ScrollView } from "react-native";
// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  if (!IS_WEB) {
    useWarmUpBrowser();
  }
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);

  const handleSignInWithGoogle = React.useCallback(async () => {
    safeImpactMedium();
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // concatenate (auth) since clerk's dashboard requires it
          // trying to use the scheme alone doesn't work, also for production
          // add the scheme in the "Allowlist for mobile SSO redirect" section under configure > sso connections
          redirectUrl: AuthSession.makeRedirectUri({ path: "(auth)" }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace("/(checklist)");
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  const onNavigatePress = React.useCallback(
    (href: string) => {
      safeImpactMedium();
      router.push(href as Href);
    },
    [router]
  );

  return Platform.OS === "web" ? (
    <ScrollView>
      <Landing
        onGoogleSignIn={handleSignInWithGoogle}
        onEmailSignIn={() => onNavigatePress("/sign-in")}
        onPrivacyPolicy={() => onNavigatePress("/privacy-policy")}
      />
    </ScrollView>
  ) : (
    <Landing
      onGoogleSignIn={handleSignInWithGoogle}
      onEmailSignIn={() => onNavigatePress("/sign-in")}
      onPrivacyPolicy={() => onNavigatePress("/privacy-policy")}
    />
  );
}
