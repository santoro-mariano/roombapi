import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ScheduleComponent } from "./pages/schedule/schedule.page";
import { ClockComponent } from "./pages/clock/clock.page";


const routes: Routes = [
  { path: "", redirectTo: "schedule" },
  { path: "schedule", component: ScheduleComponent },
  { path: "clock", component: ClockComponent },
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule {
}
