import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { DriverModule } from "@app/driver";
import { CleanerRoutingModule } from "./cleaner-routing.module";
import { ManualCleaningComponent } from "./pages/manualCleaning/manualCleaning.page";

@NgModule({
  declarations: [
    ManualCleaningComponent
  ],
  imports: [
    CleanerRoutingModule,
    DriverModule,
    MatCardModule,
    MatSlideToggleModule
  ]
})
export class CleanerModule {
}
