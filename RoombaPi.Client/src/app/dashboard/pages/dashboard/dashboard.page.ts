import { Component } from "@angular/core";

import { CleanerService, CleanType } from "@app/cleaner";
import { DriverService } from "@app/driver";

@Component({
  templateUrl: "dashboard.page.html",
  styleUrls: ["dashboard.page.scss"]
})
export class DashboardComponent {

  constructor(private cleanerService: CleanerService,
              private driverService: DriverService) {
  }

  public onCleanClick(): void {
    this.cleanerService.clean(CleanType.normal);
  }

  public onDockClick(): void {
    this.driverService.seekDock();
  }

  public onSpotClick(): void {
    this.cleanerService.clean(CleanType.spot);
  }
}
