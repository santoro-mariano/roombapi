import { Component, Input } from "@angular/core";

@Component({
  selector: "app-bumper-status-map",
  templateUrl: "bumperStatusMap.component.html",
  styleUrls: ["bumperStatusMap.component.scss"]
})
export class BumperStatusMapComponent {

  constructor() {
    setInterval(() => this.leftBumper = !this.leftBumper, 2000);
  }

  @Input()
  public leftBumper: boolean;

  @Input()
  public rightBumper: boolean;

  @Input()
  public leftLightBumper: number;

  @Input()
  public frontLeftLightBumper: number;

  @Input()
  public centerLeftLightBumper: number;

  @Input()
  public centerRightLightBumper: number;

  @Input()
  public frontRightLightBumper: number;

  @Input()
  public rightLightBumper: number;
}
