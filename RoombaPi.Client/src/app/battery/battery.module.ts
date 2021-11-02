import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { BatteryIconComponent } from "./components/batteryIcon/batteryIcon.component";
import { BatteryInfoComponent } from "./components/batteryInfo/batteryInfo.component";

@NgModule({
  declarations: [
    BatteryIconComponent,
    BatteryInfoComponent
  ],
  imports: [
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  exports: [
    BatteryIconComponent,
    BatteryInfoComponent
  ]
})
export class BatteryModule {
}
