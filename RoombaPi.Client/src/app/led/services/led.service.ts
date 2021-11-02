import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import {
  LedServiceClient,
  SetAsciiRequest,
  SetSchedulingRequest,
  SetLedRequest,
  SetPowerLedRequest
} from "@app/grpc/led";

@Injectable({ providedIn: "root" })
export class LedService {
  private readonly client: LedServiceClient;

  constructor() {
    this.client = new LedServiceClient(environment.grpcServer);
  }

  public setAscii(char1: string, char2: string, char3: string, char4: string): void {
    const request = new SetAsciiRequest();
    request.setChar1(char1.charCodeAt(0));
    request.setChar2(char2.charCodeAt(0));
    request.setChar3(char3.charCodeAt(0));
    request.setChar4(char4.charCodeAt(0));
    this.client.setAscii(request, null);
  }

  public setScheduling(sunday: boolean = false,
                       monday: boolean = false,
                       tuesday: boolean = false,
                       wednesday: boolean = false,
                       thursday: boolean = false,
                       friday: boolean = false,
                       saturday: boolean = false): void {
    const request = new SetSchedulingRequest();
    request.setSunday(sunday);
    request.setMonday(monday);
    request.setTuesday(tuesday);
    request.setWednesday(wednesday);
    request.setThursday(thursday);
    request.setFriday(friday);
    request.setSaturday(saturday);
    this.client.setScheduling(request, null);
  }

  public setDebris(on: boolean): void {
    const request = new SetLedRequest();
    request.setStatus(on);
    this.client.setDebris(request, null);
  }

  public setSpot(on: boolean): void {
    const request = new SetLedRequest();
    request.setStatus(on);
    this.client.setSpot(request, null);
  }

  public setDock(on: boolean): void {
    const request = new SetLedRequest();
    request.setStatus(on);
    this.client.setDock(request, null);
  }

  public setCheckRobot(on: boolean): void {
    const request = new SetLedRequest();
    request.setStatus(on);
    this.client.setCheckRobot(request, null);
  }

  public setPower(color: number, intensity: number): void {
    const request = new SetPowerLedRequest();
    request.setColor(color);
    request.setIntensity(intensity);
    this.client.setPower(request, null);
  }
}
