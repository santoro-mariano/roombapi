import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

import { BatteryModule } from "@app/battery";
import { BumperModule } from "@app/bumper";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.page";
import { MainButtonsComponent } from "./components/mainButtons/mainButtons.component";

@NgModule({
  declarations: [
    DashboardComponent,
    MainButtonsComponent
  ],
  imports: [
    DashboardRoutingModule,
    MatCardModule,
    BatteryModule,
    BumperModule
  ]
})
export class DashboardModule {
}
