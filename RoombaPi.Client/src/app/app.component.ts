import { Component } from "@angular/core";

import {
  faTachometerAlt,
  faClock,
  faCalendarAlt,
  faCarSide,
  faBroom,
  faMusic,
  faLightbulb,
  faHeadphonesAlt,
  faMicrochip
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  dashboardIcon = faTachometerAlt;
  clockIcon = faClock;
  scheduleIcon = faCalendarAlt;
  driverIcon = faCarSide;
  advancedCleaningIcon = faBroom;
  composerIcon = faMusic;
  playerIcon = faHeadphonesAlt;
  ledsIcon = faLightbulb;
  deviceIcon = faMicrochip;
}
