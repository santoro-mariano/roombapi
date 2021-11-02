import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-main-buttons",
  templateUrl: "mainButtons.component.html",
  styleUrls: ["mainButtons.component.scss"]
})
export class MainButtonsComponent {

  @Output()
  public spot = new EventEmitter();

  @Output()
  public dock = new EventEmitter();

  @Output()
  public clean = new EventEmitter();
}
