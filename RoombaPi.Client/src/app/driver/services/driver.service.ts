import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import {
  DriverServiceClient,
  DriveRequest,
  DriveDirectRequest,
  DrivePWMRequest,
  DriveStraightRequest
} from "@app/grpc/driver";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { RequestedValues } from "../models/requestedValues";
import { WheelsInfo } from "../models/wheelsInfo";

@Injectable({ providedIn: "root" })
export class DriverService {
  private readonly client: DriverServiceClient;

  constructor() {
    this.client = new DriverServiceClient(environment.grpcServer);
  }

  public drive(velocity: number, radius: number): void {
    const request = new DriveRequest();
    request.setVelocity(velocity);
    request.setRadius(radius);
    this.client.drive(request, null);
  }

  public driveDirect(leftVelocity: number, rightVelocity: number): void {
    const request = new DriveDirectRequest();
    request.setLeftVelocity(leftVelocity);
    request.setRightVelocity(rightVelocity);
    this.client.driveDirect(request, null);
  }

  public drivePWM(leftPWM: number, rightPWM: number): void {
    const request = new DrivePWMRequest();
    request.setLeftPwm(leftPWM);
    request.setRightPwm(rightPWM);
    this.client.drivePWM(request, null);
  }

  public driveStraight(velocity: number): void {
    const request = new DriveStraightRequest();
    request.setVelocity(velocity);
    this.client.driveStraight(request, null);
  }

  public seekDock(): void {
    this.client.seekDock(new Empty(), null);
  }

  public getAngle(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.client.getAngle(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.getAngle());
      });
    });
  }

  public getDistance(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.client.getDistance(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.getDistance());
      });
    });
  }

  public getRequestedValues(): Promise<RequestedValues> {
    return new Promise<RequestedValues>((resolve, reject) => {
      this.client.getRequestedValues(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }

  public getWheelsInfo(): Promise<WheelsInfo> {
    return new Promise<WheelsInfo>((resolve, reject) => {
      this.client.getWheelsInfo(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }
}
