import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import { DeviceServiceClient, SetModeRequest } from "@app/grpc/device";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { FirmwareInfo } from "../models/firmwareInfo";
import { Mode } from "../models/mode";
import { ButtonPressStatus } from "../models/buttonPressStatus";

@Injectable({ providedIn: "root" })
export class DeviceService {
  private readonly client: DeviceServiceClient;

  constructor() {
    this.client = new DeviceServiceClient(environment.grpcServer);
  }

  public getFirmwareInfo(): Promise<FirmwareInfo> {
    return new Promise<FirmwareInfo>((resolve, reject) => {
      this.client.getFirmwareInfo(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }

  public start(): void {
    this.client.start(new Empty(), null);
  }

  public reset(): void {
    this.client.reset(new Empty(), null);
  }

  public stop(): void {
    this.client.stop(new Empty(), null);
  }

  public powderDown(): void {
    this.client.powderDown(new Empty(), null);
  }

  public setMode(mode: Mode): void {
    const request = new SetModeRequest();
    request.setMode(mode);
    this.client.setMode(request, null);
  }

  public getMode(): Promise<Mode> {
    return new Promise<Mode>((resolve, reject) => {
      this.client.getMode(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.getMode());
      });
    });
  }

  public getButtonPressStatus(): Promise<ButtonPressStatus> {
    return new Promise<ButtonPressStatus>((resolve, reject) => {
      this.client.getButtonPressStatus(new Empty(), null, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.toObject());
      });
    });
  }
}
