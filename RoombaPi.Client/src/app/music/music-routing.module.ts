import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ComposerComponent } from "./pages/composer/composer.page";


const routes: Routes = [
  { path: "", redirectTo: "player" },
  { path: "composer", component: ComposerComponent },
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule {
}
