import { SideWheelInfo } from "./sideWheelInfo";
import { StasisStatus } from "./stasisStatus";

export interface WheelsInfo {
  leftWheel?: SideWheelInfo;
  rightWheel?: SideWheelInfo;
  stasisStatus?: StasisStatus;
}
