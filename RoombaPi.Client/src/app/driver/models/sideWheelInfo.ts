import { WheelPostionStatus } from "./wheelPositionStatus";

export interface SideWheelInfo {
  positionStatus: WheelPostionStatus;
  current: number;
  overcurrent: boolean;
}
