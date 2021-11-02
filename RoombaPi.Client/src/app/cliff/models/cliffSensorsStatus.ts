import { CliffSensorInfo } from "./cliffSensorInfo";

export interface CliffSensorsStatus {
  left?: CliffSensorInfo;
  frontLeft?: CliffSensorInfo;
  frontRight?: CliffSensorInfo;
  right?: CliffSensorInfo;
}
