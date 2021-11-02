import { Component } from "@angular/core";

import { Observable, from } from "rxjs";

import { SchedulerService } from "../../services/scheduler.service";

@Component({
  templateUrl: "clock.page.html",
  styleUrls: ["clock.page.scss"]
})
export class ClockComponent {

  constructor(private service: SchedulerService) {
    //this.deviceTime = from(this.service.getClock())
  }

  public readonly deviceTime: Observable<Date>;

  public readonly systemTime: Observable<Date>;
}
