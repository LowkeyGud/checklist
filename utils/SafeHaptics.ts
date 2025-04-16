// utils/safeHaptics.ts
import { IS_WEB } from "@/constants/Platform";
import * as Haptics from "expo-haptics";

export const safeImpact = async (style: Haptics.ImpactFeedbackStyle) => {
  if (!IS_WEB) {
    await Haptics.impactAsync(style);
  }
};

export const safeImpactSoft = async () => {
  if (!IS_WEB) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  }
};

export const safeImpactMedium = async () => {
  if (!IS_WEB) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
};

export const safeImpactHeavy = async () => {
  if (!IS_WEB) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
};
