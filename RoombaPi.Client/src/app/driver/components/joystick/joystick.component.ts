import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";

import { create, JoystickManager } from "nipplejs";

@Component({
  selector: "app-joystick",
  templateUrl: "joystick.component.html",
  styleUrls: ["joystick.component.scss"]
})
export class JoystickComponent implements AfterViewInit, OnDestroy {

  private manager: JoystickManager;

  @ViewChild("zoneJoystick", { static: true })
  private zone: ElementRef;

  ngAfterViewInit(): void {
    this.manager = create({
      zone: this.zone.nativeElement,
      mode: "static",
      position: { top: "50px", left: "50px" }
    });
    // this.manager.on("move", (_, data) => {

    // });
  }

  ngOnDestroy(): void {
    if (this.manager) {
      this.manager.destroy();
    }
  }
}
