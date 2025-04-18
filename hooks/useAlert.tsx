import CustomAlert, { CustomAlertProps } from "@/components/ui/CustomAlert";
import { useState } from "react";

export const useAlert = () => {
  const [alertProps, setAlertProps] = useState<CustomAlertProps>({
    visible: false,
    title: "",
    message: "",
    buttons: [{ text: "OK", onPress: () => {} }],
  });

  const showAlert = (props: Omit<CustomAlertProps, "visible">) => {
    setAlertProps({ ...props, visible: true });
  };

  const hideAlert = () => {
    setAlertProps((prev) => ({ ...prev, visible: false }));
  };

  const alertComponent = (
    <CustomAlert
      {...alertProps}
      onDismiss={() => {
        if (alertProps.onDismiss) {
          alertProps.onDismiss();
        }
        hideAlert();
      }}
    />
  );

  return { showAlert, hideAlert, alertComponent };
};

export default CustomAlert;
