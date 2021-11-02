import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RoombaIconComponent } from "./components/roombaIcon/roombaIcon.component";

@NgModule({
  declarations: [
    RoombaIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RoombaIconComponent
  ]
})
export class SharedModule {
}
