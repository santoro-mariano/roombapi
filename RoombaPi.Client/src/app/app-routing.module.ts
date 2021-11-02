import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(mod => mod.DashboardModule) },
  { path: "scheduler", loadChildren: () => import("./scheduler/scheduler.module").then(mod => mod.SchedulerModule) },
  { path: "cleaner", loadChildren: () => import("./cleaner/cleaner.module").then(mod => mod.CleanerModule) },
  { path: "music", loadChildren: () => import("./music/music.module").then(mod => mod.MusicModule) },
  { path: "led", loadChildren: () => import("./led/led.module").then(mod => mod.LedModule) },
  { path: "device", loadChildren: () => import("./device/device.module").then(mod => mod.DeviceModule) },
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
