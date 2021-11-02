import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { Mode } from "../../models/mode";

@Component({
  templateUrl: "modeSelector.component.html",
  styleUrls: ["modeSelector.component.scss"]
})
export class ModeSelectorComponent {

  constructor(public dialogRef: MatDialogRef<ModeSelectorComponent>) {
  }

  public modeEnum = Mode;

  public selectedMode: Mode;

  cancel(): void {
    this.dialogRef.close();
  }
}
