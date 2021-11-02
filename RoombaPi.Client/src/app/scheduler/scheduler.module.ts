import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { SchedulerRoutingModule } from "./scheduler-routing.module";
import { ScheduleComponent } from "./pages/schedule/schedule.page";
import { ClockComponent } from "./pages/clock/clock.page";
import { TimePickerComponent } from "./components/timePicker/timePicker.component";

@NgModule({
  declarations: [
    ScheduleComponent,
    ClockComponent,
    TimePickerComponent
  ],
  imports: [
    SchedulerRoutingModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    MatSelectModule,
    MatListModule,
    MatSlideToggleModule
  ]
})
export class SchedulerModule {
}
