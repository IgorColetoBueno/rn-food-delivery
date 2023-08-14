import { Ionicons } from "@expo/vector-icons";

import Theme from "../../theme";
import RotatingComponent from "../animation/rotate";

const LoadingSpinner = () => {
  return (
    <RotatingComponent
      style={{
        width: Theme.spacing.lg,
        height: Theme.spacing.lg,
        backgroundColor: "red",
      }}
    >
      <Ionicons name="sync-outline" size={Theme.spacing.lg} />
    </RotatingComponent>
  );
};

export default LoadingSpinner;
