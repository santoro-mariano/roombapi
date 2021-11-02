import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

import { DeviceService } from "../../services/device.service";
import { Mode } from "../../models/mode";
import { ModeSelectorComponent } from "../../components/modeSelector/modeSelector.component";

@Component({
  templateUrl: "deviceInfo.page.html",
  styleUrls: ["deviceInfo.page.scss"]
})
export class DeviceInfoComponent {

  constructor(private service: DeviceService, public dialog: MatDialog) {
    this.firmwareVersion = from(this.service.getFirmwareInfo()).pipe(
        map(x => x.version)
    );

    this.deviceMode = from(this.service.getMode()).pipe(
        map(x => Mode[x])
    );
  }

  public readonly firmwareVersion: Observable<string>;

  public readonly deviceMode: Observable<string>;

  public reset(): void {
    this.service.reset();
  }

  public selectMode(): void {
    const dialogRef = this.dialog.open(ModeSelectorComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.service.setMode(result);
      }
    });
  }
}
