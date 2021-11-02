import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import {
  SchedulerServiceClient,
  SetClockRequest,
  SetScheduleRequest,
  ScheduleDay as RequestScheduleDay
} from "@app/grpc/scheduler";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { WeekDay } from "../models/weekDay";
import { ScheduleDay } from "../models/scheduleDay";

@Injectable({ providedIn: "root" })
export class SchedulerService {
  private readonly client: SchedulerServiceClient;

  constructor() {
    this.client = new SchedulerServiceClient(environment.grpcServer);
  }

  public setClock(day: WeekDay, hour: number, minute: number): void {
    const request = new SetClockRequest();
    request.setDay(day);
    request.setHour(hour);
    request.setMinute(minute);
    this.client.setClock(request, null);
  }

  public SetSchedule(days: Array<ScheduleDay>): void {
    const request = new SetScheduleRequest();
    days.forEach(x => {
      const day = new RequestScheduleDay();
      day.setDay(x.day);
      day.setHour(x.hour);
      day.setMinute(x.minute);
      request.addDays(day);
    });

    this.client.setSchedule(request, null);
  }

  public clearSchedule(): void {
    this.client.clearSchedule(new Empty(), null);
  }
}
