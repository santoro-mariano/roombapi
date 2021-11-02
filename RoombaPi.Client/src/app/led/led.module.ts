import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSliderModule } from "@angular/material/slider";

import { BatteryModule } from "@app/battery";
import { BumperModule } from "@app/bumper";

import { LedRoutingModule } from "./led-routing.module";
import { LedSettingsComponent } from "./pages/ledSettings/ledSettings.page";

@NgModule({
  declarations: [
    LedSettingsComponent
  ],
  imports: [
    LedRoutingModule,
    MatCardModule,
    BatteryModule,
    BumperModule,
    MatSlideToggleModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule
  ]
})
export class LedModule {
}
