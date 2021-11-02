import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

import { JoystickComponent } from "./components/joystick/joystick.component";

@NgModule({
  declarations: [
    JoystickComponent
  ],
  imports: [
    MatCardModule
  ],
  exports: [
    JoystickComponent
  ]
})
export class DriverModule {
}
