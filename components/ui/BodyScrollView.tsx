import { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

/**
 * A forward-ref component that wraps the React Native `ScrollView` component
 * with additional default properties for consistent behavior.
 *
 * This component is designed to simplify the usage of `ScrollView` by pre-configuring
 * common properties such as `automaticallyAdjustsScrollIndicatorInsets`,
 * `contentInsetAdjustmentBehavior`, and `scrollIndicatorInsets`.
 *
 * ### Why we need this:
 * - **Consistency**: Ensures that all `ScrollView` instances in the application
 *   have a consistent configuration for better user experience.
 * - **Reusability**: Reduces boilerplate by allowing developers to reuse this
 *   pre-configured component instead of setting these properties manually every time.
 * - **Forwarding Refs**: Supports forwarding refs to the underlying `ScrollView`
 *   for advanced use cases like programmatic scrolling or accessing native methods.
 *
 * @param props - The props to pass to the `ScrollView` component.
 * @param ref - A forwarded ref to access the underlying `ScrollView` instance.
 * @returns A `ScrollView` component with pre-configured default properties.
 */
export const BodyScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
  return (
    <ScrollView
      // Automatically adjusts the scroll indicator insets to match the content insets for IOS.
      automaticallyAdjustsScrollIndicatorInsets
      // Adjusts the content inset behavior automatically based on the scroll view's environment.
      contentInsetAdjustmentBehavior="automatic"
      // Sets the bottom content inset to 0 to avoid extra padding at the bottom.
      contentInset={{ bottom: 0 }}
      // Sets the bottom scroll indicator inset to 0 to align with the content inset.
      scrollIndicatorInsets={{ bottom: 0 }}
      // Spreads the remaining props passed to the component.
      {...props}
      // Forwards the ref to the underlying ScrollView instance.
      ref={ref}
    />
  );
});
