import { Component, Input } from "@angular/core";

@Component({
  selector: "app-roomba-icon",
  templateUrl: "roombaIcon.component.html",
  styleUrls: ["roombaIcon.component.scss"]
})
export class RoombaIconComponent {

  @Input()
  public alternative = false;
}
