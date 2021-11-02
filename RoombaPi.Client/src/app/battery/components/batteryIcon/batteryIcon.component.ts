import { Component } from "@angular/core";

import { faBatteryHalf } from "@fortawesome/free-solid-svg-icons";

import { BatteryService } from "@app/battery/services/battery.service";

@Component({
  selector: "app-battery-icon",
  templateUrl: "batteryIcon.component.html",
  styleUrls: ["batteryIcon.component.scss"]
})
export class BatteryIconComponent {
  constructor(private batteryService: BatteryService) {
  }

  batteryHalf = faBatteryHalf;
}
