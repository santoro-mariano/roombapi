import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ManualCleaningComponent } from "./pages/manualCleaning/manualCleaning.page";


const routes: Routes = [
  { path: "", redirectTo: "advanced" },
  { path: "manual", component: ManualCleaningComponent },
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleanerRoutingModule {
}
