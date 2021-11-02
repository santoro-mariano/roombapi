import { LightBumperInfo } from "./lightBumperInfo";

export interface LightBumperStatus {
  left?: LightBumperInfo;
  frontLeft?: LightBumperInfo;
  centerLeft?: LightBumperInfo;
  centerRight?: LightBumperInfo;
  frontRight?: LightBumperInfo;
  right?: LightBumperInfo;
}
