import { Ionicons } from "@expo/vector-icons";
import RotatingComponent from "../animation/rotate";
import Theme from "../../theme";

interface LoadingSpinnerProps {}

const LoadingSpinner = ({}: LoadingSpinnerProps) => {
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
