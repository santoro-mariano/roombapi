import { NgModule } from "@angular/core";

import { BumperStatusMapComponent } from "./components/bumperStatusMap/bumperStatusMap.component";

@NgModule({
  declarations: [
    BumperStatusMapComponent
  ],
  exports: [
    BumperStatusMapComponent
  ]
})
export class BumperModule {
}
