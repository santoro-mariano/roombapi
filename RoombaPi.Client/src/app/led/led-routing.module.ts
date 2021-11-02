import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LedSettingsComponent } from "./pages/ledSettings/ledSettings.page";


const routes: Routes = [
  { path: "", redirectTo: "settings" },
  { path: "settings", component: LedSettingsComponent },
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedRoutingModule {
}
