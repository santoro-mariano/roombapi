import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";

import { DeviceRoutingModule } from "./device-routing.module";
import { DeviceInfoComponent } from "./pages/deviceInfo/deviceInfo.page";
import { ModeSelectorComponent } from "./components/modeSelector/modeSelector.component";

@NgModule({
  declarations: [
    DeviceInfoComponent,
    ModeSelectorComponent
  ],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule
  ],
  entryComponents: [
    ModeSelectorComponent
  ]
})
export class DeviceModule {
}
