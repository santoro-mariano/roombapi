import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DeviceInfoComponent } from "./pages/deviceInfo/deviceInfo.page";

const routes: Routes = [
  { path: "", redirectTo: "info" },
  { path: "info", component: DeviceInfoComponent }
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule {
}
